import { useRef, useState } from "react";
import {
  ArrowDown,
  Download,
  Monitor,
  Server,
  Database,
  Palette,
  Wrench,
  ExternalLink,
  Briefcase,
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
import globalData from "../data/global.json";
import homeData from "../data/home.json";

// ─── Category icon mapping ─────────────────────────────────────────────────
const categoryIconMap = { Monitor, Server, Database, Palette, Wrench };

// ─── Tech logo mapping ─────────────────────────────────────────────────────
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

// ─── Brand config per company ──────────────────────────────────────────────
// NAB  : logo nền đen sẵn → giữ nguyên, accent đỏ NAB
// BOSCH: logo trắng trên nền đỏ đen, filter để đổi màu logo
const BRAND = {
  "NAB Innovation Centre Vietnam": {
    logoBg: "#050505",
    logoBorderIdle: "rgba(228,32,32,0.18)",
    logoBorderHover: "rgba(228,32,32,0.55)",
    logoShadowHover: "0 0 28px rgba(228,32,32,0.55)",
    accent: { from: "#E42020", to: "#FF4444" },
    timelineColor: "#E42020",
    imgFit: "object-cover",
    imgPadding: "",           // fill full — no padding
    imgFilter: "none",
    imgFilterHover: "none",
  },
  "BOSCH Global Software Vietnam (BGSV)": {
    // trắng đen — logo Bosch có nền trắng sẵn, giữ nguyên đẹp hơn
    logoBg: "#ffffff",
    logoBorderIdle: "rgba(234,0,0,0.22)",
    logoBorderHover: "rgba(234,0,0,0.65)",
    logoShadowHover: "0 0 28px rgba(234,0,0,0.50), inset 0 0 10px rgba(234,0,0,0.08)",
    accent: { from: "#EA0000", to: "#B00000" },
    timelineColor: "#EA0000",
    imgFit: "object-contain",
    imgPadding: "p-2",
    imgFilter: "none",
    imgFilterHover: "none",
  },
  default: {
    logoBg: "linear-gradient(145deg,#111827,#1f2937)",
    logoBorderIdle: "rgba(37,99,235,0.18)",
    logoBorderHover: "rgba(37,99,235,0.5)",
    logoShadowHover: "0 0 24px rgba(37,99,235,0.45)",
    accent: { from: "#2563EB", to: "#7C3AED" },
    timelineColor: "#2563EB",
    imgFit: "object-contain",
    imgPadding: "p-2",
    imgFilter: "none",
    imgFilterHover: "none",
  },
};

function getBrand(name) {
  return BRAND[name] || BRAND.default;
}

// ─── useTilt hook ──────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
  };

  const handleMouseLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── ExperienceCard ────────────────────────────────────────────────────────
function ExperienceCard({ exp, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const [hov, setHov] = useState(false);
  const b = getBrand(exp.company);
  const { from, to } = b.accent;

  return (
    <div className="relative pl-10 pb-9 last:pb-0">

      {/* ── Timeline line ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: `linear-gradient(to bottom, ${b.timelineColor}90 0%, ${b.timelineColor}15 85%, transparent 100%)`,
        }}
      />

      {/* ── Timeline dot ── */}
      <div className="absolute left-0 top-[22px] -translate-x-1/2 z-10">
        <div
          className="w-[15px] h-[15px] rounded-full transition-all duration-300"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${to}, ${from})`,
            boxShadow: hov
              ? `0 0 0 4px ${from}28, 0 0 18px ${from}70`
              : `0 0 0 2px ${from}22, 0 0 8px ${from}50`,
          }}
        />
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ background: from, animationDuration: `${1.6 + index * 0.5}s` }}
        />
      </div>

      {/* ── 3D Card ── */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { handleMouseLeave(); setHov(false); }}
        onMouseEnter={() => setHov(true)}
        className="relative overflow-hidden rounded-2xl cursor-default"
        style={{
          transition: "transform 0.12s ease, box-shadow 0.28s ease, border-color 0.28s ease",
          border: `1px solid ${hov ? from + "50" : "rgba(120,120,150,0.13)"}`,
          boxShadow: hov
            ? `0 24px 72px ${from}1A, 0 0 0 1px ${from}18, inset 0 1px 0 rgba(255,255,255,0.04)`
            : "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* card bg layer (safe dark/light) */}
        <div className="absolute inset-0 -z-10 bg-surface dark:bg-zinc-800/70 rounded-2xl" />

        {/* radial hover wash */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: hov ? 1 : 0,
            background: `radial-gradient(ellipse at 15% 50%, ${from}09, transparent 65%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-all duration-500"
          style={{
            background: hov
              ? `linear-gradient(90deg, transparent 0%, ${from} 30%, ${to} 70%, transparent 100%)`
              : `linear-gradient(90deg, ${from}55, ${to}28)`,
          }}
        />

        {/* Left brand strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
          style={{
            background: `linear-gradient(to bottom, ${from}, ${to})`,
            opacity: hov ? 1 : 0.38,
            boxShadow: hov ? `2px 0 10px ${from}50` : "none",
          }}
        />

        {/* ── Content row ── */}
        <div className="pl-5 pr-5 py-5 flex gap-4 items-start">

          {/* === LOGO BLOCK === */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            {/* Logo container — 76×76, brand-themed */}
            <div
              className="w-[76px] h-[76px] rounded-xl overflow-hidden relative transition-all duration-300 flex items-center justify-center"
              style={{
                background: b.logoBg,
                border: `1.5px solid ${hov ? b.logoBorderHover : b.logoBorderIdle}`,
                boxShadow: hov ? b.logoShadowHover : "0 3px 10px rgba(0,0,0,0.28)",
              }}
            >
              {exp.logo ? (
                <>
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className={`w-full h-full ${b.imgFit} ${b.imgPadding} transition-all duration-300`}
                    style={{
                      filter: hov ? b.imgFilterHover : b.imgFilter,
                      transform: hov ? "scale(1.06)" : "scale(1)",
                    }}
                  />
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      opacity: hov ? 1 : 0,
                      background: `radial-gradient(circle at center, ${from}28, transparent 68%)`,
                    }}
                  />
                </>
              ) : (
                <span
                  className="text-2xl font-black text-white select-none"
                  style={{ textShadow: `0 0 18px ${from}` }}
                >
                  {exp.company.charAt(0)}
                </span>
              )}
            </div>

            {/* Index badge */}
            <span
              className="text-[10px] font-mono font-black tracking-wider px-[7px] py-[2px] rounded-full"
              style={{
                background: `${from}14`,
                color: from,
                border: `1px solid ${from}33`,
              }}
            >
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* === CONTENT BLOCK === */}
          <div className="flex-1 min-w-0 pt-0.5">
            {/* Year pill */}
            <span
              className="inline-block text-[11px] font-black uppercase tracking-[0.12em] mb-2 px-2.5 py-[3px] rounded-full"
              style={{
                background: `${from}12`,
                color: from,
                border: `1px solid ${from}25`,
              }}
            >
              {exp.year}
            </span>

            {/* Role */}
            <h3
              className="text-[17px] font-bold font-heading leading-tight mb-[3px] transition-colors duration-250"
              style={{ color: hov ? from : undefined }}
            >
              {exp.title}
            </h3>

            {/* Company */}
            {exp.companyUrl ? (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold mb-3 group/lnk"
                style={{ color: `${from}bb` }}
                onClick={(e) => e.stopPropagation()}
              >
                {exp.company}
                <ExternalLink
                  size={10}
                  className="opacity-0 group-hover/lnk:opacity-100 transition-opacity -translate-y-px"
                />
              </a>
            ) : (
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: `${from}85` }}
              >
                {exp.company}
              </p>
            )}

            {/* Description */}
            <p className="text-[13px] leading-relaxed text-text-muted dark:text-zinc-400">
              {exp.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home page ─────────────────────────────────────────────────────────────
export default function Home() {
  const { personal } = globalData;
  const { skills, experiences, education } = homeData;

  return (
    <div className="min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-purple-500/5" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 animate-fade-in-up delay-100">
            Hi, I'm <span className="text-accent">{personal.name}</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted dark:text-zinc-400 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200">
            {personal.tagline}
          </p>

          <div className="max-w-3xl mx-auto mb-8 animate-fade-in-up delay-250">
            <div className="inline-flex flex-col gap-2 text-left px-4 py-3 rounded-xl bg-surface/80 dark:bg-zinc-800/70 border border-border dark:border-zinc-700">
              <p className="text-sm md:text-base text-text-muted dark:text-zinc-300">
                I am a third-year Information Technology student at{" "}
                <a href="https://hcmue.edu.vn/vi/" target="_blank" rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline">HCMUE</a>
                , currently pursuing a strong foundation in software engineering and computer science.
              </p>
              <p className="text-sm md:text-base text-text-muted dark:text-zinc-300">
                I am currently a Software Engineer Intern at{" "}
                <a href="https://www.bosch.com.vn/" target="_blank" rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline">
                  BOSCH Global Software Vietnam (BGSV)
                </a>
                , where I contribute to building high-quality, scalable, and production-ready web applications.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-300">
            <a href="/contact"
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 cursor-pointer">
              Get in Touch
            </a>
            <a href="/cv"
              className="px-8 py-4 bg-primary dark:bg-zinc-800 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-2 cursor-pointer">
              <Download size={20} />
              View CV
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown size={24} className="text-text-muted dark:text-zinc-500" />
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-surface dark:bg-zinc-900 relative overflow-hidden">
        {/* dot grid bg */}
        <div
          className="absolute inset-0 opacity-25 dark:opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(37,99,235,0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* corner glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-bold mb-4 tracking-wide">
              <Briefcase size={13} />
              Professional Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Experience</h2>
            <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
              My professional journey so far — building real-world software that scales.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ═══════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Skills &amp; Expertise
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
                        <CategoryIcon size={24} className="text-accent group-hover:text-white" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold font-heading">{skill.name}</h3>
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
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
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

      {/* ══ EDUCATION ════════════════════════════════════════════════════ */}
      <section className="py-24 bg-surface dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Education</h2>
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
                    <h3 className="text-xl font-semibold font-heading">{edu.degree}</h3>
                    {edu.schoolUrl ? (
                      <a href={edu.schoolUrl} target="_blank" rel="noopener noreferrer"
                        className="text-accent font-medium hover:underline cursor-pointer">
                        {edu.school} ↗
                      </a>
                    ) : (
                      <p className="text-accent font-medium">{edu.school}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-text-muted dark:text-zinc-400">{edu.year}</span>
                    <p className="text-lg font-bold text-accent">GPA: {edu.gpa}</p>
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
                          <span className="text-text-muted dark:text-zinc-300">{achievement}</span>
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
