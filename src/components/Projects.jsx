// Projects.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);

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
  ];

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
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-base-200">
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
              className="card bg-base-100 shadow-md hover:shadow-2xl transition duration-300 group"
            >
              <figure className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href={project.demoLink}
                      target="blank"
                      className="btn btn-sm btn-primary hover:scale-105 transition"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.codeLink}
                      target="blank"
                      className="btn btn-sm btn-badge-accent hover:scale-105 transition"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </figure>

              <div className="card-body text-base-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="text-sm opacity-80">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.badges.map((badge, i) => (
                    <div className={`badge ${project.badgeColors[i]}`}>
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/blyator"
            target="blank"
            className="btn btn-primary btn-lg hover:scale-105 transition"
          >
            View more Projects
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
