import { useState } from "react";
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
import lifeConfig from "../../data/life/index.json";
import myCatPosts from "../../data/life/my-cat.json";
import hcmuePosts from "../../data/life/hcmue.json";
import dailyPosts from "../../data/life/daily.json";
import travelPosts from "../../data/life/travel.json";

const iconMap = {
  Cat,
  GraduationCap,
  Clock,
  Plane,
};

// Get post counts per category
const postCounts = {
  "my-cat": myCatPosts.posts.length,
  hcmue: hcmuePosts.posts.length,
  daily: dailyPosts.posts.length,
  travel: travelPosts.posts.length,
};

// Get all posts for featured section
const allPosts = [
  ...myCatPosts.posts.map((p) => ({ ...p, category: "my-cat" })),
  ...hcmuePosts.posts.map((p) => ({ ...p, category: "hcmue" })),
  ...dailyPosts.posts.map((p) => ({ ...p, category: "daily" })),
  ...travelPosts.posts.map((p) => ({ ...p, category: "travel" })),
].sort((a, b) => new Date(b.date) - new Date(a.date));

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
  const { hero, categories } = lifeConfig;

  // Filter out "all" category
  const categoryCards = categories.filter((c) => c.id !== "all");

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-surface dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-accent ring-offset-4 ring-offset-background dark:ring-offset-zinc-900">
              <img
                src={hero.profileImage}
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
                }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-primary dark:text-white">
              {hero.title}
            </h1>
            <p className="text-lg text-text-muted dark:text-zinc-400">
              {hero.subtitle}
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
            {categoryCards.map((category) => {
              const IconComponent = iconMap[category.icon];
              const count = postCounts[category.id] || 0;

              return (
                <Link
                  key={category.id}
                  to={`/life/${category.id}`}
                  className="group relative h-56 md:h-64 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <LazyImage
                      src={category.banner?.image || "/images/placeholder.jpg"}
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
                        {count} {count === 1 ? "post" : "posts"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {category.banner?.subtitle || "Explore more"}
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
      <section className="py-12 bg-surface dark:bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold font-heading mb-8 text-center text-primary dark:text-white">
            Recent Stories
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {allPosts.slice(0, 3).map((post) => {
              const categoryInfo = getCategoryInfo(post.category);
              const CategoryIcon = categoryInfo
                ? iconMap[categoryInfo.icon]
                : null;

              return (
                <article
                  key={`${post.category}-${post.id}`}
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
                        to={`/life/${post.category}`}
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
                      src={post.featuredImage}
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
    </div>
  );
}
