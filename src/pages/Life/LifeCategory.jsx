import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
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
  ArrowLeft,
} from "lucide-react";
import { getCategory, getPostsByCategory } from "../../lib/supabase";

const iconMap = {
  Cat,
  GraduationCap,
  Clock,
  Plane,
};

// Lazy image component
function LazyImage({ src, alt, className, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full" onClick={onClick}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded-xl" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function LifeCategory() {
  const { category } = useParams();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [sortOrder, setSortOrder] = useState("desc");
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [catData, postsData] = await Promise.all([
          getCategory(category),
          getPostsByCategory(category),
        ]);
        setCategoryInfo(catData);
        setPosts(postsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [category]);

  const CategoryIcon = categoryInfo ? iconMap[categoryInfo.icon] : null;

  // Sort posts
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [posts, sortOrder]);

  const toggleExpand = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

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

  // 404 if category not found
  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">
            Category Not Found
          </h1>
          <Link to="/life" className="text-accent hover:underline">
            ← Back to Life
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={categoryInfo.banner_image || "/images/placeholder.jpg"}
          alt={categoryInfo.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=600&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <Link
          to="/life"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-2">
              {CategoryIcon && (
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <CategoryIcon size={24} className="text-white" />
                </div>
              )}
              <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">
              {categoryInfo.name}
            </h1>
            <p className="text-lg text-white/80">
              {categoryInfo.banner_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Sort Controls */}
      <section className="sticky top-20 z-40 py-4 bg-background/80 dark:bg-dark-background/80 backdrop-blur-lg border-b border-border dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <p className="text-text-muted dark:text-zinc-400">
              {sortedPosts.length}{" "}
              {sortedPosts.length === 1 ? "story" : "stories"}
            </p>
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

      {/* Posts List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {sortedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-text-muted dark:text-zinc-500">
                  No posts in this category yet.
                </p>
              </div>
            ) : (
              sortedPosts.map((post) => {
                const expanded = expandedPosts.has(post.id);

                return (
                  <article
                    key={post.id}
                    className="bg-surface dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 overflow-hidden transition-all hover:shadow-lg"
                  >
                    {/* Post Header */}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Featured Image */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 cursor-pointer">
                          <LazyImage
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            onClick={() =>
                              post.images?.length > 0 &&
                              openLightbox(post.images, 0)
                            }
                          />
                        </div>

                        {/* Post Info */}
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-text-muted dark:text-zinc-500 flex items-center gap-1 mb-2">
                            <Calendar size={12} />
                            {formatDate(post.date)}
                          </span>

                          <h3 className="text-lg md:text-xl font-semibold font-heading mb-2 line-clamp-2 text-primary dark:text-white">
                            {post.title}
                          </h3>

                          <p
                            className={`whitespace-pre-line leading-relaxed ${
                              !expanded
                                ? "text-sm text-text-muted dark:text-zinc-400 line-clamp-2"
                                : "text-base md:text-lg text-primary/80 dark:text-zinc-300"
                            }`}
                          >
                            {post.description}
                          </p>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleExpand(post.id)}
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
                            {post.images?.length > 0
                              ? `Show More (${post.images.length} photos)`
                              : "Show More"}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Expanded Content */}
                    {expanded && post.images?.length > 0 && (
                      <div className="px-6 pb-6 border-t border-border dark:border-zinc-800 pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {post.images.map((img, index) => (
                            <div
                              key={index}
                              className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all group"
                            >
                              <LazyImage
                                src={img.src}
                                alt={img.caption || `Photo ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onClick={() => openLightbox(post.images, index)}
                              />
                            </div>
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
