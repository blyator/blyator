import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const [touchedCard, setTouchedCard] = useState(null);

  const projects = [
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
      title: "NotesApp",
      description:
        "This is an app made to help users easily create, manage, and organize their notes. With a simple interface, users can add notes and tags, then edit or delete them as they wish.",
      image: "/assets/Illustrations/notes.png",
      badges: ["React", "Tailwind", "Python"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-error"],
      demoLink: "https://notes-hub-psi.vercel.app/login",
      codeLink: "https://github.com/blyator/noteshub",
    },
    {
      title: "My Portfolio",
      description:
        "This portfolio tells the story of my journey in tech from learning the basics to building full-stack apps.",
      image: "/assets/Illustrations/portfolio.png",
      badges: ["DaisyUI", "React", "Tailwind"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-accent"],
      demoLink: "https://blyator.github.io/blyator/",
      codeLink: "https://github.com/blyator/blyator",
    },
    {
      title: "The Beauty",
      description:
        "A modern e-commerce platform designed for beauty enthusiasts. Users can explore a range of beauty products enjoying a smooth shopping experience.",
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

  const handleOutsideTouch = () => {
    setTouchedCard(null);
  };

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const cards = el.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      {
        y: 80,
        opacity: 0,
        rotateX: 15,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const handleDocumentTouch = (e) => {
      if (!el.contains(e.target)) {
        setTouchedCard(null);
      }
    };

    document.addEventListener("touchstart", handleDocumentTouch);

    return () => {
      document.removeEventListener("touchstart", handleDocumentTouch);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 bg-base-200 rounded-4xl"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 text-base-content">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="divider divider-primary max-w-xs mx-auto" />
          <p className="text-xl opacity-80">Explore some of my recent work</p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden transform-gpu hover:-translate-y-3 hover:rotate-1 hover:scale-[1.02] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              onTouchStart={() => handleCardTouch(index)}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10" />

              <figure className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105 transition-all duration-700 ease-out"
                />

                {/* Enhanced overlay with blur backdrop */}
                <div
                  className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
                    touchedCard === index
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div
                    className={`flex gap-4 transition-transform duration-500 delay-100 ${
                      touchedCard === index
                        ? "translate-y-0"
                        : "translate-y-8 group-hover:translate-y-0"
                    }`}
                  >
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse hover:animate-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10">Live Demo</span>
                      <div className="absolute inset-0 bg-primary/20 rounded-md blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </a>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-accent hover:scale-110 hover:-rotate-3 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse hover:animate-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10">Code</span>
                      <div className="absolute inset-0 bg-accent/20 rounded-md blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </figure>

              <div className="card-body text-base-content relative z-10">
                <h3 className="card-title group-hover:text-primary transition-colors duration-300 relative">
                  {project.title}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                </h3>
                <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.badges.map((badge, i) => (
                    <div
                      key={i}
                      className={`badge ${project.badgeColors[i]} group-hover:scale-105 group-hover:animate-bounce transition-all duration-300 hover:shadow-md cursor-pointer`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>

                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300" />
                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300 delay-200" />
                <div className="absolute top-1/2 right-8 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-bounce transition-opacity duration-300 delay-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/blyator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg hover:scale-105 hover:rotate-1 transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-2xl"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              View More Projects
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 transform skew-x-12" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .project-card:hover {
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15));
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .project-card:hover .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Projects;
