import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import config from "../config.json";

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Instagram,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const { personal, social } = config;

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, "")}`,
    },
    { icon: MapPin, label: "Location", value: personal.location, href: null },
  ];

  const socialLinks = [
    { name: "GitHub", icon: "Github", href: social.github },
    { name: "LinkedIn", icon: "Linkedin", href: social.linkedin },
    { name: "Twitter", icon: "Twitter", href: social.twitter },
    { name: "Instagram", icon: "Instagram", href: social.instagram },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Let's Connect
          </h1>
          <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hi?
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-slide-in-left">
            <div className="bg-surface dark:bg-zinc-900 rounded-3xl p-8 border border-border dark:border-zinc-800">
              <h2 className="text-2xl font-bold font-heading mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-zinc-800 border border-border dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-zinc-800 border border-border dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background dark:bg-zinc-800 border border-border dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25 cursor-pointer"
                >
                  <Send size={20} />
                  Send Message
                </button>

                {status === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl animate-fade-in">
                    <CheckCircle size={20} />
                    <span>
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl animate-fade-in">
                    <AlertCircle size={20} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-in-right space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 p-5 bg-surface dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 hover:border-accent transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <info.icon size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted dark:text-zinc-400">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-semibold hover:text-accent transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-semibold">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="p-6 bg-surface dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800">
              <h3 className="font-semibold font-heading mb-4">
                Connect on Social
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-background dark:bg-zinc-800 rounded-xl hover:bg-accent hover:text-white transition-all group cursor-pointer"
                    >
                      {IconComponent && <IconComponent size={22} />}
                      <span className="font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            {personal.available && (
              <div className="p-6 bg-linear-to-br from-accent to-blue-700 rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-medium">Currently available</span>
                </div>
                <p className="text-white/80 text-sm">
                  {personal.availableText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
