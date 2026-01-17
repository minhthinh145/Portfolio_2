import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import globalData from "../data/global.json";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Life", path: "/life" },
  { name: "CV", path: "/cv" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  const { personal, social } = globalData;

  const socialLinks = [
    { name: "GitHub", icon: Github, href: social.github },
    { name: "LinkedIn", icon: Linkedin, href: social.linkedin },
    { name: "Email", icon: Mail, href: `mailto:${personal.email}` },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary dark:bg-zinc-950 text-white py-16 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold font-heading cursor-pointer"
            >
              Portfolio<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-zinc-400 max-w-xs">
              Crafting digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-zinc-400 hover:text-accent transition-colors cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((socialItem) => (
                <a
                  key={socialItem.name}
                  href={socialItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-zinc-800 hover:bg-accent rounded-lg transition-all hover:scale-105 cursor-pointer"
                  aria-label={socialItem.name}
                >
                  <socialItem.icon size={20} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-zinc-400">
              Let's create something amazing together.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm flex items-center gap-1">
            © 2026 Made with <Heart size={14} className="text-red-500" /> by{" "}
            {personal.name}
          </p>
          <button
            onClick={scrollToTop}
            className="p-3 bg-zinc-800 hover:bg-accent rounded-full transition-all hover:scale-105 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
