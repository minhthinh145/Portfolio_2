import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Folder, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import { TECH_STACK } from "../data/techStack";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order");

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
        const cats = [
          "All",
          ...new Set(data.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(cats);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My Projects
          </h1>
          <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
            A collection of work I've done over the years. Each project
            represents challenges solved and lessons learned.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all cursor-pointer ${
                activeCategory === category
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "bg-surface dark:bg-zinc-800 text-text-muted dark:text-zinc-300 hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group bg-surface dark:bg-zinc-900 rounded-2xl overflow-hidden border border-border dark:border-zinc-800 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-primary rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer"
                        aria-label="View live"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-primary rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer"
                        aria-label="View source"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.id}`}
                      className="p-3 bg-accent text-white rounded-full hover:bg-accent/80 transition-colors cursor-pointer"
                      aria-label="View details"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
                {/* Featured badge */}
                {project.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <Link to={`/projects/${project.id}`} className="block p-6">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Folder size={16} />
                  <span className="text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold font-heading mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted dark:text-zinc-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack with Logos */}
                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).slice(0, 5).map((techId) => {
                    const tech = TECH_STACK.find(
                      (t) => t.id === techId || t.name === techId,
                    );
                    return tech ? (
                      <div
                        key={techId}
                        className="flex items-center gap-1.5 px-2 py-1 bg-accent/10 rounded-full"
                        title={tech.name}
                      >
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-4 h-4"
                        />
                        <span className="text-xs font-medium text-accent">
                          {tech.name}
                        </span>
                      </div>
                    ) : (
                      <span
                        key={techId}
                        className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                      >
                        {techId}
                      </span>
                    );
                  })}
                  {(project.tech || []).length > 5 && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
