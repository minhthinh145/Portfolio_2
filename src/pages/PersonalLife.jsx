import { useState } from "react";
import {
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Coffee,
  Plane,
  Heart,
  Sparkles,
  X,
} from "lucide-react";
import config from "../config.json";

const iconMap = {
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Coffee,
  Plane,
};

export default function PersonalLife() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { about, hobbies, gallery } = config;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Beyond the Code
          </h1>
          <p className="text-text-muted dark:text-zinc-400 max-w-xl mx-auto">
            Life isn't just about work. Here's a glimpse into the person behind
            the screen.
          </p>
        </div>

        {/* About Me */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img
                src={about.profileImage}
                alt="Profile"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
            </div>
            <div className="animate-slide-in-right">
              <span className="inline-flex items-center gap-2 text-accent font-medium mb-4">
                <Heart size={18} />
                About Me
              </span>
              <h2 className="text-3xl font-bold font-heading mb-6">
                A curious mind on a continuous journey
              </h2>
              <div className="space-y-4 text-text-muted dark:text-zinc-400">
                {about.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-8 pl-6 border-l-4 border-accent italic text-lg">
                "{about.quote.text}"
                <cite className="block text-sm text-text-muted dark:text-zinc-500 mt-2 not-italic">
                  — {about.quote.author}
                </cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Hobbies */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-medium mb-4">
              <Sparkles size={18} />
              Interests
            </span>
            <h2 className="text-3xl font-bold font-heading">Things I Love</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {hobbies.map((hobby, index) => {
              const IconComponent = iconMap[hobby.icon];
              return (
                <div
                  key={hobby.name}
                  className="group p-6 bg-surface dark:bg-zinc-900 rounded-2xl border border-border dark:border-zinc-800 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 text-center cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-14 h-14 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                    {IconComponent && (
                      <IconComponent
                        size={28}
                        className="text-accent group-hover:text-white"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold font-heading mb-1">
                    {hobby.name}
                  </h3>
                  <p className="text-xs text-text-muted dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {hobby.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Photo Gallery */}
        <section>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-medium mb-4">
              <Camera size={18} />
              Gallery
            </span>
            <h2 className="text-3xl font-bold font-heading">
              Captured Moments
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo)}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h4 className="text-white font-semibold">{photo.title}</h4>
                    <p className="text-white/70 text-sm">{photo.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-white hover:text-accent transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
            <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
            <p className="text-white/70">{selectedImage.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}
