import React, { useState } from "react";

function Projects() {
  const [touchedCard, setTouchedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    {
      title: "NotesApp",
      description:
        "This is the perfect app made to help users easily create, manage, and organize their notes. With a simple interface, users can add notes and tags, then edit or delete them as they wish.",
      image: "/assets/Illustrations/notes.png",
      badges: ["React", "Tailwind", "Python"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-error"],
      demoLink: "https://notes-hub-psi.vercel.app/",
      codeLink: "https://github.com/blyator/noteshub",
    },
    {
      title: "MartianHub",
      description:
        "MartianHub is a web app that showcases images taken by NASA's Mars rovers. It provides a simple way to explore the Red Planet through high-quality photos from Curiosity and Perseverance Rovers.",
      image: "/assets/Illustrations/martian.png",
      badges: ["Javascript", "CSS", "HTML"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-accent"],
      demoLink: "https://martianhub.vercel.app/",
      codeLink: "https://github.com/blyator/martianhub",
    },

    {
      title: "The Beauty",
      description:
        "This is a modern e-commerce platform designed for beauty enthusiasts. Customers are able to explore a range of beauty products and buy them while enjoying a smooth shopping experience.",
      image: "/assets/Illustrations/beauty.png",
      badges: ["Python", "React", "PostgreSQL"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-accent"],
      demoLink: "https://beauty-shop-opal.vercel.app/",
      codeLink: "https://github.com/zacthuku/beauty-shop",
    },
  ];

  const handleCardTouch = (index) => {
    setTouchedCard(touchedCard === index ? null : index);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="projects" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 text-base-content">
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold mb-6 text-secondary">
              Featured Projects
            </h2>
          </div>
          <div className="divider divider-primary max-w-xs mx-auto opacity-60" />
          <p className="text-xl opacity-70 font-light tracking-wide">
            Explore some of my recent work
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card relative group cursor-pointer transition-all duration-700 ease-out ${
                hoveredCard === index ? "z-20" : "z-10"
              }`}
              style={{
                transform:
                  hoveredCard === index
                    ? "translateY(-12px) rotateX(5deg) rotateY(2deg) scale(1.03)"
                    : "translateY(0) rotateX(0) rotateY(0) scale(1)",
                transformStyle: "preserve-3d",
                perspective: "1200px",
              }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              onTouchStart={() => handleCardTouch(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl transition-all duration-700">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/3 to-accent/5 rounded-3xl transition-opacity duration-500 ${
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-[2px] transition-opacity duration-500 ${
                  hoveredCard === index ? "opacity-60" : "opacity-0"
                }`}
              >
                <div className="w-full h-full bg-base-100 rounded-3xl" />
              </div>

              <div className="relative bg-base-100/95 backdrop-blur-lg rounded-3xl shadow-xl border border-base-300/50 overflow-hidden transition-all duration-700">
                <figure className="relative overflow-hidden rounded-t-3xl h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      hoveredCard === index
                        ? "scale-110 brightness-110 contrast-105 saturate-110 blur-sm"
                        : "scale-100 blur-0"
                    }`}
                  />

                  <div
                    className={`absolute inset-0 bg-black/20 transition-all duration-500 flex items-center justify-center ${
                      touchedCard === index || hoveredCard === index
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                    style={{ zIndex: 100 }}
                  >
                    <div
                      className={`flex gap-4 transition-all duration-600 ${
                        touchedCard === index || hoveredCard === index
                          ? "translate-y-0 scale-100"
                          : "translate-y-8 scale-90"
                      }`}
                      style={{ zIndex: 110 }}
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-gradient-to-r from-primary to-primary/80 border-none text-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
                        style={{ zIndex: 120 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="relative z-10">Live Site</span>
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-gradient-to-r from-accent to-accent/80 border-none text-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
                        style={{ zIndex: 120 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="relative z-10">Code</span>
                      </a>
                    </div>
                  </div>
                </figure>

                <div className="p-6 relative">
                  <h3
                    className={`text-xl font-bold mb-3 transition-all duration-300 relative ${
                      hoveredCard === index
                        ? "text-primary"
                        : "text-base-content"
                    }`}
                  >
                    {project.title}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${
                        hoveredCard === index ? "w-full" : "w-0"
                      }`}
                    />
                  </h3>

                  <p className="text-sm leading-relaxed mb-4 text-base-content opacity-90">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.badges.map((badge, i) => (
                      <div
                        key={i}
                        className={`badge ${project.badgeColors[i]} transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm`}
                      >
                        {badge}
                      </div>
                    ))}
                  </div>

                  <div
                    className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ${
                      hoveredCard === index
                        ? "opacity-60 animate-ping"
                        : "opacity-0"
                    }`}
                  />
                  <div
                    className={`absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-700 ${
                      hoveredCard === index
                        ? "opacity-40 animate-pulse"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: "200ms" }}
                  />
                  <div
                    className={`absolute top-1/2 right-8 w-1.5 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-700 ${
                      hoveredCard === index
                        ? "opacity-50 animate-bounce"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              </div>

              {/* Premium Shadow Effect */}
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-700 -z-10 ${
                  hoveredCard === index
                    ? "shadow-2xl shadow-primary/20 blur-sm scale-105"
                    : "shadow-lg"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://github.com/blyator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg bg-primary text-base-content rounded-4xl border-none hover:scale-105 transition-all duration-300 relative overflow-hidden group shadow-xl hover:shadow-2xl"
          >
            <span className="relative z-10 font-semibold">
              View More Projects
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .project-card:hover {
          filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.2));
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Projects;
