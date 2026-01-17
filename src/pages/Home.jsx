import {
  ArrowDown,
  Download,
  Monitor,
  Server,
  Database,
  Palette,
  Wrench,
} from "lucide-react";
import {
  SiReact,
  SiAngular,
  SiRedux,
  SiTailwindcss,
  SiSpring,
  SiDotnet,
  SiNodedotjs,
  SiDjango,
  SiLaravel,
  SiPostgresql,
  SiMongodb,
  SiOracle,
  SiNeo4J,
  SiFigma,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
  SiGithubactions,
} from "react-icons/si";
import { TbDatabase } from "react-icons/tb";
import config from "../config.json";

// Category icon mapping
const categoryIconMap = {
  Monitor,
  Server,
  Database,
  Palette,
  Wrench,
};

// Tech logo mapping from react-icons
const techLogoMap = {
  React: SiReact,
  Angular: SiAngular,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Java Spring Boot": SiSpring,
  "ASP.NET Core": SiDotnet,
  "Node.js": SiNodedotjs,
  "Python Django": SiDjango,
  "PHP Laravel": SiLaravel,
  PostgreSQL: SiPostgresql,
  "SQL Server": TbDatabase,
  MongoDB: SiMongodb,
  Oracle: SiOracle,
  Neo4j: SiNeo4J,
  Figma: SiFigma,
  Git: SiGit,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  "CI/CD": SiGithubactions,
};

export default function Home() {
  const { personal, skills, experiences, education } = config;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-purple-500/5" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in-up">
            {personal.available && (
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                Available for hire
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 animate-fade-in-up delay-100">
            Hi, I'm <span className="text-accent">{personal.name}</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted dark:text-zinc-400 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200">
            {personal.tagline}
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-300">
            <a
              href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 cursor-pointer"
            >
              Get in Touch
            </a>
            <a
              href="/cv"
              className="px-8 py-4 bg-primary dark:bg-zinc-800 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Download size={20} />
              View CV
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown
              size={24}
              className="text-text-muted dark:text-zinc-500"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-surface dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Skills & Expertise
            </h2>
            <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const CategoryIcon = categoryIconMap[skill.icon];
              return (
                <div
                  key={skill.name}
                  className="group p-6 bg-background dark:bg-zinc-800 rounded-2xl border border-border dark:border-zinc-700 hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors">
                      {CategoryIcon && (
                        <CategoryIcon
                          size={24}
                          className="text-accent group-hover:text-white"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold font-heading">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {skill.items.map((item) => {
                      const TechLogo = techLogoMap[item.name];
                      return (
                        <span
                          key={item.name}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 cursor-default ${
                            item.highlight
                              ? "ring-2 ring-offset-2 ring-offset-background dark:ring-offset-zinc-800"
                              : ""
                          }`}
                          style={{
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                            ...(item.highlight && {
                              borderColor: item.color,
                              boxShadow: `0 0 12px ${item.color}40`,
                            }),
                          }}
                        >
                          {TechLogo ? (
                            <TechLogo size={18} style={{ color: item.color }} />
                          ) : (
                            <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                          {item.name}
                          {item.highlight && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded font-bold"
                              style={{ backgroundColor: `${item.color}30` }}
                            >
                              ★
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Experience
            </h2>
            <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
              My professional journey so far.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12 border-l-2 border-border dark:border-zinc-700 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 bg-accent rounded-full ring-4 ring-background dark:ring-dark-background" />

                <span className="text-sm text-accent font-medium">
                  {exp.year}
                </span>
                <h3 className="text-xl font-semibold font-heading mt-1">
                  {exp.title}
                </h3>
                <p className="text-text-muted dark:text-zinc-400 font-medium">
                  {exp.company}
                </p>
                <p className="text-text-muted dark:text-zinc-500 mt-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 bg-surface dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Education
            </h2>
            <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
              Academic background and achievements.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-6 bg-background dark:bg-zinc-800 rounded-2xl border border-border dark:border-zinc-700"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold font-heading">
                      {edu.degree}
                    </h3>
                    {edu.schoolUrl ? (
                      <a
                        href={edu.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent font-medium hover:underline cursor-pointer"
                      >
                        {edu.school} ↗
                      </a>
                    ) : (
                      <p className="text-accent font-medium">{edu.school}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-text-muted dark:text-zinc-400">
                      {edu.year}
                    </span>
                    <p className="text-lg font-bold text-accent">
                      GPA: {edu.gpa}
                    </p>
                  </div>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border dark:border-zinc-700">
                    <p className="text-sm font-medium text-text-muted dark:text-zinc-400 mb-2">
                      Achievements:
                    </p>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-accent mt-1">★</span>
                          <span className="text-text-muted dark:text-zinc-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
