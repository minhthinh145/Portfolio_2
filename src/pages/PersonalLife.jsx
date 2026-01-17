import { useState, useMemo } from "react";
import {
  LayoutGrid,
  Cat,
  GraduationCap,
  Clock,
  Plane,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import globalData from "../data/global.json";
import lifeConfig from "../data/life/index.json";
import myCatPosts from "../data/life/my-cat.json";
import hcmuePosts from "../data/life/hcmue.json";
import dailyPosts from "../data/life/daily.json";
import travelPosts from "../data/life/travel.json";

const iconMap = {
  LayoutGrid,
  Cat,
  GraduationCap,
  Clock,
  Plane,
};

// Merge all posts with their category
const allPosts = [
  ...myCatPosts.posts.map((p) => ({ ...p, category: "my-cat" })),
  ...hcmuePosts.posts.map((p) => ({ ...p, category: "hcmue" })),
  ...dailyPosts.posts.map((p) => ({ ...p, category: "daily" })),
  ...travelPosts.posts.map((p) => ({ ...p, category: "travel" })),
];

export default function PersonalLife() {
  const { personal } = globalData;
  const { hero, categories } = lifeConfig;

  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [sortOrder, setSortOrder] = useState("desc");
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered =
      activeCategory === "all"
        ? allPosts
        : allPosts.filter((post) => post.category === activeCategory);

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [activeCategory, sortOrder]);

  const toggleExpand = (postId, category) => {
    const key = `${category}-${postId}`;
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedPosts(newExpanded);
  };

  const isExpanded = (postId, category) =>
    expandedPosts.has(`${category}-${postId}`);

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, images: [], currentIndex: 0 });
  };

  const navigateLightbox = (direction) => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex + direction + prev.images.length) %
        prev.images.length,
    }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find((c) => c.id === categoryId) || categories[0];
  };

  // Get active category banner info
  const activeCategoryInfo = getCategoryInfo(activeCategory);
  const showCategoryBanner =
    activeCategory !== "all" && activeCategoryInfo.banner;

  return (
    <div className="min-h-screen">
      {/* Hero / Banner Section */}
      {showCategoryBanner ? (
        // Category-specific Banner
        <section className="relative h-80 md:h-[28rem] overflow-hidden">
          <img
            src={activeCategoryInfo.banner.image}
            alt={activeCategoryInfo.banner.title}
            className="w-full h-full object-contain bg-zinc-900 rounded-2xl"
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=600&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">
                {activeCategoryInfo.banner.title}
              </h1>
              <p className="text-lg text-white/80">
                {activeCategoryInfo.banner.subtitle}
              </p>
            </div>
          </div>
        </section>
      ) : (
        // Default "My Life" Hero
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
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3">
                {hero.title}
              </h1>
              <p className="text-lg text-text-muted dark:text-zinc-400">
                {hero.subtitle}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter & Controls */}
      <section className="sticky top-20 z-40 py-4 bg-background/80 dark:bg-dark-background/80 backdrop-blur-lg border-b border-border dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      activeCategory === category.id
                        ? "bg-accent text-white shadow-lg shadow-accent/25"
                        : "bg-surface dark:bg-zinc-800 text-text-muted dark:text-zinc-300 hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    {IconComponent && <IconComponent size={16} />}
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Sort Button */}
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface dark:bg-zinc-800 rounded-full text-sm font-medium hover:bg-accent/10 hover:text-accent transition-all cursor-pointer"
            >
              <ArrowUpDown size={16} />
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>
      </section>

      {/* Posts Timeline */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-muted dark:text-zinc-500">
                  No posts in this category yet.
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const expanded = isExpanded(post.id, post.category);
                const categoryInfo = getCategoryInfo(post.category);
                const CategoryIcon = iconMap[categoryInfo.icon];

                return (
                  <article
                    key={`${post.category}-${post.id}`}
                    className="bg-surface dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 overflow-hidden transition-all hover:shadow-lg"
                  >
                    {/* Post Header */}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Featured Image */}
                        <div
                          className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 cursor-pointer"
                          onClick={() =>
                            post.images.length > 0 &&
                            openLightbox(post.images, 0)
                          }
                        >
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        {/* Post Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                              {CategoryIcon && <CategoryIcon size={12} />}
                              {categoryInfo.name}
                            </span>
                            <span className="text-xs text-text-muted dark:text-zinc-500 flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(post.date)}
                            </span>
                          </div>

                          <h3 className="text-lg md:text-xl font-semibold font-heading mb-2 line-clamp-2">
                            {post.title}
                          </h3>

                          <p
                            className={`text-sm text-text-muted dark:text-zinc-400 ${!expanded ? "line-clamp-2" : ""}`}
                          >
                            {post.description}
                          </p>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleExpand(post.id, post.category)}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-accent hover:bg-accent/10 rounded-lg transition-colors cursor-pointer"
                      >
                        {expanded ? (
                          <>
                            <ChevronUp size={16} />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} />
                            {post.images.length > 0
                              ? `Show More (${post.images.length} photos)`
                              : "Show More"}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Expanded Content */}
                    {expanded && post.images.length > 0 && (
                      <div className="px-6 pb-6 border-t border-border dark:border-zinc-800 pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {post.images.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => openLightbox(post.images, index)}
                              className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all group"
                            >
                              <img
                                src={img.src}
                                alt={img.caption || `Photo ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10 cursor-pointer"
          >
            <X size={32} />
          </button>

          {lightbox.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.currentIndex]?.src}
              alt={lightbox.images[lightbox.currentIndex]?.caption || "Photo"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
            />
            {lightbox.images[lightbox.currentIndex]?.caption && (
              <p className="text-center text-white mt-4 text-sm">
                {lightbox.images[lightbox.currentIndex].caption}
              </p>
            )}
            {lightbox.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {lightbox.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setLightbox((prev) => ({ ...prev, currentIndex: index }))
                    }
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      index === lightbox.currentIndex
                        ? "bg-white"
                        : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
