import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  ChevronRight,
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

// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONFIG
// Mỗi company có:
//   logoBg        : background của ô logo
//   accentFrom/To : màu gradient accent (timeline, strip, hover text...)
//   lifeId        : id trong Supabase categories → dùng navigate("/life/:id")
//   clickable     : có route trong Life section không?
// ─────────────────────────────────────────────────────────────────────────────
const BRAND = {
  "NAB Innovation Centre Vietnam": {
    // NAB: logo trắng/đỏ trên nền đen rất đậm
    // gradient nền: đen sang #1a0000 để hơi hơi đỏ tối — khớp với đỏ NAB
    logoBg: "linear-gradient(145deg, #0a0000 0%, #1a0000 100%)",
    logoBorderIdle: "rgba(228,32,32,0.20)",
    logoBorderHover: "rgba(228,32,32,0.70)",
    logoShadowHover: "0 0 32px rgba(228,32,32,0.60), 0 0 8px rgba(228,32,32,0.30)",
    accentFrom: "#E42020",
    accentTo:   "#FF5555",
    imgFit:     "object-cover",
    imgPadding: "",
    imgFilter:  "none",
    imgFilterHover: "brightness(1.05) saturate(1.1)",
    lifeId:    "life-at-nab",
    clickable: true,
  },

  "BOSCH Global Software Vietnam (BGSV)": {
    // BOSCH: logo nền trắng gốc (đỏ + xám)
    // gradient nền: trắng sang nhạt xám nhẹ — chuẩn Bosch brand
    // border + glow đỏ Bosch #EA0000
    logoBg: "linear-gradient(145deg, #ffffff 0%, #f5f0f0 100%)",
    logoBorderIdle: "rgba(234,0,0,0.22)",
    logoBorderHover: "rgba(234,0,0,0.72)",
    logoShadowHover: "0 0 32px rgba(234,0,0,0.55), 0 0 10px rgba(234,0,0,0.28)",
    accentFrom: "#EA0000",
    accentTo:   "#C50000",
    imgFit:     "object-contain",
    imgPadding: "p-[10px]",
    imgFilter:  "none",
    imgFilterHover: "none",
    lifeId:    "life-at-bosch",
    clickable: true,
  },

  default: {
    logoBg: "linear-gradient(145deg, #111827, #1f2937)",
    logoBorderIdle: "rgba(37,99,235,0.18)",
    logoBorderHover: "rgba(37,99,235,0.55)",
    logoShadowHover: "0 0 24px rgba(37,99,235,0.45)",
    accentFrom: "#2563EB",
    accentTo:   "#7C3AED",
    imgFit:     "object-contain",
    imgPadding: "p-2",
    imgFilter:  "none",
    imgFilterHover: "none",
    lifeId:    null,
    clickable: false,
  },
};

function getBrand(name) {
  return BRAND[name] || BRAND.default;
}

// ─── 3D Page Transition Component ─────────────────────────────────────────
function PageTransitionOverlay({ brand, logoSrc, companyName, onDone }) {
  const [exiting, setExiting] = useState(false);

  // After panel slides in → hold 600ms → exit → navigate
  const handlePanelIn = useCallback(() => {
    setTimeout(() => {
      setExiting(true);
    }, 520);
  }, []);

  const handlePanelOut = useCallback(() => {
    onDone();
  }, [onDone]);

  return (
    <div className="page-transition-overlay">
      {/* Full-screen brand panel */}
      <div
        className={`page-transition-panel ${exiting ? "exit" : ""}`}
        style={{
          background: `linear-gradient(135deg, ${brand.accentFrom}ef 0%, ${brand.accentTo}d8 55%, #080808 100%)`,
        }}
        onAnimationEnd={exiting ? handlePanelOut : handlePanelIn}
      />

      {/* Center content: logo + label */}
      <div className="page-transition-logo flex flex-col items-center gap-5 text-white select-none">
        {/* Company logo */}
        <div
          className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background: brand.logoBg,
            border: `2px solid rgba(255,255,255,0.20)`,
            boxShadow: `0 0 50px rgba(0,0,0,0.7), 0 0 28px ${brand.accentFrom}55`,
          }}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={companyName}
              className={`w-full h-full ${brand.imgFit} ${brand.imgPadding}`}
              style={{ filter: brand.imgFilter }}
            />
          ) : (
            <span className="text-3xl font-black text-white">
              {companyName?.charAt(0)}
            </span>
          )}
        </div>

        <div className="text-center">
          <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-1.5">
            Taking you to
          </p>
          <p className="text-xl font-bold">{companyName}</p>
        </div>

        {/* Animated progress bar */}
        <div className="w-28 h-[2px] bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${brand.accentFrom}, ${brand.accentTo})`,
              animation: "progressBar 0.9s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── useTilt hook ──────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -12;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── ExperienceCard ────────────────────────────────────────────────────────
function ExperienceCard({ exp, index, onNavigate }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const [hov, setHov] = useState(false);
  const b = getBrand(exp.company);
  const { accentFrom: from, accentTo: to } = b;

  const handleClick = () => {
    if (b.clickable && b.lifeId) {
      onNavigate(b, b.lifeId, exp.logo, exp.company);
    }
  };

  return (
    <div className="relative pl-10 pb-8 last:pb-0">

      {/* ── Timeline line ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: `linear-gradient(to bottom, ${from}90 0%, ${from}15 85%, transparent 100%)`,
        }}
      />

      {/* ── Timeline dot ── */}
      <div className="absolute left-0 top-[22px] -translate-x-1/2 z-10">
        <div
          className="w-[15px] h-[15px] rounded-full transition-all duration-300"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${to}, ${from})`,
            boxShadow: hov
              ? `0 0 0 4px ${from}30, 0 0 20px ${from}70`
              : `0 0 0 2px ${from}25, 0 0 10px ${from}55`,
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
        onClick={handleClick}
        className="relative overflow-hidden rounded-2xl"
        style={{
          transition: "transform 0.12s ease, box-shadow 0.28s ease, border-color 0.28s ease",
          cursor: b.clickable ? "pointer" : "default",
          border: `1px solid ${hov ? from + "55" : "rgba(120,120,150,0.13)"}`,
          boxShadow: hov
            ? `0 24px 72px ${from}20, 0 0 0 1px ${from}18, inset 0 1px 0 rgba(255,255,255,0.04)`
            : "0 2px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* bg layer */}
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
              ? `linear-gradient(90deg, transparent, ${from}, ${to}, ${from}, transparent)`
              : `linear-gradient(90deg, ${from}55, ${to}28)`,
          }}
        />

        {/* Left brand strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
          style={{
            background: `linear-gradient(to bottom, ${from}, ${to})`,
            opacity: hov ? 1 : 0.38,
            boxShadow: hov ? `3px 0 12px ${from}45` : "none",
          }}
        />

        {/* ── Content row ── */}
        <div className="pl-5 pr-5 py-5 flex gap-4 items-start">

          {/* === LOGO BLOCK === */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            {/* Logo box — brand-gradient bg */}
            <div
              className="w-[76px] h-[76px] rounded-xl overflow-hidden relative transition-all duration-300 flex items-center justify-center"
              style={{
                background: b.logoBg,
                border: `1.5px solid ${hov ? b.logoBorderHover : b.logoBorderIdle}`,
                boxShadow: hov ? b.logoShadowHover : "0 3px 12px rgba(0,0,0,0.28)",
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
                  {/* Inner brand glow */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      opacity: hov ? 1 : 0,
                      background: `radial-gradient(circle at center, ${from}22, transparent 68%)`,
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
              className="text-[17px] font-bold font-heading leading-tight mb-[3px] transition-colors duration-200"
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
                onClick={(e) => { e.stopPropagation(); }}
              >
                {exp.company}
                <ExternalLink size={10} className="opacity-0 group-hover/lnk:opacity-100 transition-opacity" />
              </a>
            ) : (
              <p className="text-sm font-semibold mb-3" style={{ color: `${from}85` }}>
                {exp.company}
              </p>
            )}

            {/* Description */}
            <p className="text-[13px] leading-relaxed text-text-muted dark:text-zinc-400">
              {exp.description}
            </p>

            {/* "View my journey" CTA — only for clickable cards */}
            {b.clickable && (
              <div
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  color: hov ? from : `${from}60`,
                  transform: hov ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <ChevronRight size={13} />
                View my journey
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const getAdjustedColor = (hex, isDark) => {
  if (isDark) return hex;
  const overrides = {
    "#61DAFB": "#087EA4", // React (darker blue)
    "#06B6D4": "#0369A1", // Tailwind (darker cyan)
    "#339933": "#166534", // Node.js (darker green)
    "#6DB33F": "#4D832F", // Spring Boot (darker green)
    "#44B78B": "#0F766E", // Django (darker teal)
    "#FF9900": "#B45309", // AWS (darker orange)
    "#47A248": "#15803D", // MongoDB (darker green)
  };
  return overrides[hex.toUpperCase()] || hex;
};

// ─── Home page ─────────────────────────────────────────────────────────────
export default function Home() {
  const { personal } = globalData;
  const { skills, experiences, education } = homeData;
  const navigate = useNavigate();

  // Dark mode reactive state
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("theme-change", handleThemeChange);
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (!localStorage.getItem("portfolio-theme")) {
        setIsDark(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    
    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  // Transition state
  const [transition, setTransition] = useState(null); // null | { brand, lifeId }

  const handleNavigate = useCallback((brand, lifeId, logoSrc, companyName) => {
    setTransition({ brand, lifeId, logoSrc, companyName });
  }, []);

  const handleTransitionDone = useCallback(() => {
    if (!transition) return;
    const { lifeId } = transition;
    setTransition(null);
    navigate(`/life/${lifeId}`);
  }, [transition, navigate]);

  return (
    <div className="min-h-screen">

      {/* 3D Transition Overlay */}
      {transition && (
        <PageTransitionOverlay
          brand={transition.brand}
          logoSrc={transition.logoSrc}
          companyName={transition.companyName}
          onDone={handleTransitionDone}
        />
      )}

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-purple-500/5" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 animate-fade-in-up">
            Hi, I'm <span className="text-accent">{personal.name}</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted dark:text-zinc-400 max-w-2xl mx-auto mb-8 animate-fade-in-up">
            {personal.tagline}
          </p>

          <div className="max-w-3xl mx-auto mb-8 animate-fade-in-up">
            <div className="inline-flex flex-col gap-2 text-left px-4 py-3 rounded-xl bg-surface/80 dark:bg-zinc-800/70 border border-border dark:border-zinc-700">
              <p className="text-sm md:text-base text-text-muted dark:text-zinc-300">
                I am a third-year Information Technology student at{" "}
                <a href="https://hcmue.edu.vn/vi/" target="_blank" rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline">HCMUE</a>
                , currently pursuing a strong foundation in software engineering and computer science.
              </p>
              <p className="text-sm md:text-base text-text-muted dark:text-zinc-300">
                I am an <span className="font-semibold text-primary dark:text-white">Ex-BOSCH</span> Software Engineer Intern and currently a <span className="font-semibold text-primary dark:text-white">Software Engineer</span> at{" "}
                <a href="https://www.nab.com.au/about-us/careers/nabvietnam" target="_blank" rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline">
                  NAB Innovation Centre Vietnam
                </a>
                , with nearly 1 year of experience building high-quality, scalable web applications.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
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
          className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.25) 1px, transparent 1px)",
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
              My professional journey so far — click a card to see life behind the work.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
                onNavigate={handleNavigate}
              />
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
                      const adjustedColor = getAdjustedColor(item.color, isDark);
                      return (
                        <span
                          key={item.name}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 cursor-default ${
                            item.highlight ? "ring-2 ring-offset-2 ring-offset-background dark:ring-offset-zinc-800" : ""
                          }`}
                          style={{
                            backgroundColor: `${adjustedColor}15`,
                            color: adjustedColor,
                            ...(item.highlight && { boxShadow: `0 0 12px ${adjustedColor}30` }),
                          }}
                        >
                          {TechLogo ? (
                            <TechLogo size={18} style={{ color: adjustedColor }} />
                          ) : (
                            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: adjustedColor }} />
                          )}
                          {item.name}
                          {item.highlight && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                              style={{ backgroundColor: `${adjustedColor}25` }}>★</span>
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
                    <p className="text-sm font-medium text-text-muted dark:text-zinc-400 mb-2">Achievements:</p>
                    <ul className="space-y-2">
                      {edu.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-accent mt-1">★</span>
                          <span className="text-text-muted dark:text-zinc-300">{a}</span>
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
