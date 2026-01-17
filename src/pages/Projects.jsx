import { useState } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import projectsData from "../data/projects.json";

const categories = [
  "All",
  "Fintech",
  "Education",
  "Business",
  "E-Commerce",
  "Research",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { projects } = projectsData;

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
              className="group bg-surface dark:bg-zinc-900 rounded-2xl overflow-hidden border border-border dark:border-zinc-800 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 cursor-pointer"
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
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-primary rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer"
                      aria-label="View live"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-primary rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer"
                      aria-label="View source"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
                {/* Featured badge */}
                {project.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Folder size={16} />
                  <span className="text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold font-heading mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted dark:text-zinc-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
