import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cat,
  GraduationCap,
  Clock,
  Plane,
  Calendar,
  Heart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import globalData from "../../data/global.json";
import { getCategories, supabase } from "../../lib/supabase";

const iconMap = {
  Cat,
  GraduationCap,
  Clock,
  Plane,
};

// Lazy image component
function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default function LifeMain() {
  const { personal } = globalData;
  const [categories, setCategories] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch categories
        const cats = await getCategories();
        setCategories(cats);

        // Fetch all posts for featured section
        const { data: posts } = await supabase
          .from("posts")
          .select("*")
          .order("date", { ascending: false })
          .limit(3);

        setAllPosts(posts || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find((c) => c.id === categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-surface dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-accent ring-offset-4 ring-offset-background dark:ring-offset-zinc-900">
              <img
                src="/images/profile-life.jpg"
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
                }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-primary dark:text-white">
              My Life
            </h1>
            <p className="text-lg text-text-muted dark:text-zinc-400">
              Beyond the code - a glimpse into my world
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold font-heading mb-8 text-center text-primary dark:text-white">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon];

              return (
                <Link
                  key={category.id}
                  to={`/life/${category.id}`}
                  className="group relative h-56 md:h-64 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <LazyImage
                      src={category.banner_image || "/images/placeholder.jpg"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-2">
                      {IconComponent && (
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                          <IconComponent size={24} className="text-white" />
                        </div>
                      )}
                      <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                        {category.postCount || 0}{" "}
                        {category.postCount === 1 ? "post" : "posts"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {category.banner_subtitle || "Explore more"}
                    </p>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-6 right-6 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      <ArrowRight size={20} className="text-white" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {allPosts.length > 0 && (
        <section className="py-12 bg-surface dark:bg-zinc-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold font-heading mb-8 text-center text-primary dark:text-white">
              Recent Stories
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
              {allPosts.map((post) => {
                const categoryInfo = getCategoryInfo(post.category_id);
                const CategoryIcon = categoryInfo
                  ? iconMap[categoryInfo.icon]
                  : null;

                return (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Post Header */}
                    <div className="p-4 flex items-center gap-3 border-b border-border dark:border-zinc-700">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        {CategoryIcon && (
                          <CategoryIcon size={20} className="text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Link
                          to={`/life/${post.category_id}`}
                          className="font-semibold text-primary dark:text-white hover:text-accent transition-colors"
                        >
                          {categoryInfo?.name}
                        </Link>
                        <p className="text-xs text-text-muted dark:text-zinc-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </div>

                    {/* Post Image */}
                    <div className="aspect-video">
                      <LazyImage
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-primary dark:text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-text-muted dark:text-zinc-400 text-sm line-clamp-2">
                        {post.description}
                      </p>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-4 text-text-muted dark:text-zinc-500">
                        <button className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer">
                          <Heart size={18} />
                          <span className="text-sm">Like</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer">
                          <MessageCircle size={18} />
                          <span className="text-sm">Comment</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
