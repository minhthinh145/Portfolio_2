import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// Fetch all categories with post counts
export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  // Get post counts
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const { count } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("category_id", cat.id);
      return { ...cat, postCount: count || 0 };
    }),
  );

  return categoriesWithCounts;
}

// Fetch posts by category
export async function getPostsByCategory(categoryId) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category_id", categoryId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return posts || [];
}

// Fetch single category
export async function getCategory(categoryId) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}
