import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink, Github, ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "../lib/supabase";
import { TECH_STACK } from "../data/techStack";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (error) {
        console.error("Error:", error);
      } else {
        setProject(data);

        // Fetch related posts if any
        if (data?.related_posts?.length > 0) {
          const { data: posts } = await supabase
            .from("posts")
            .select("*")
            .in("id", data.related_posts);
          setRelatedPosts(posts || []);
        }
      }
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-accent hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-text-muted dark:text-zinc-400 hover:text-accent mb-8"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          {project.featured && (
            <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full mb-4">
              ⭐ Featured Project
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-text-muted dark:text-zinc-400 mb-4">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Github size={18} />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Image */}
        {project.image && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Tech Stack */}
        {project.tech?.length > 0 && (
          <div className="mb-8 p-6 bg-surface dark:bg-zinc-900 rounded-2xl">
            <h2 className="text-lg font-bold mb-4">🛠️ Tech Stack</h2>
            <div className="flex gap-4 flex-wrap">
              {project.tech.map((techId) => {
                const tech = TECH_STACK.find(
                  (t) => t.id === techId || t.name === techId,
                );
                return tech ? (
                  <div
                    key={techId}
                    className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg"
                  >
                    <img src={tech.logo} alt={tech.name} className="w-6 h-6" />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ) : (
                  <span
                    key={techId}
                    className="px-3 py-2 bg-accent/10 text-sm rounded-lg"
                  >
                    {techId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Detail Content */}
        {project.detail && (
          <div className="mb-8 prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-lg font-bold mb-4">📝 About This Project</h2>
            <div className="whitespace-pre-wrap text-text-muted dark:text-zinc-300 leading-relaxed">
              {project.detail}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-8 p-6 bg-surface dark:bg-zinc-900 rounded-2xl">
            <h2 className="text-lg font-bold mb-4">🔗 Related Stories</h2>
            <div className="grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/life/${post.category_id}`}
                  className="flex items-center gap-4 p-4 bg-background dark:bg-zinc-800 rounded-xl hover:ring-2 hover:ring-accent transition-all"
                >
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-text-muted dark:text-zinc-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
