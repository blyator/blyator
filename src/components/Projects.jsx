// Projects.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and an admin dashboard.",
      image: "https://picsum.photos/400/250?random=3",
      badges: ["React", "Node.js", "MongoDB"],
      badgeColors: ["primary", "secondary", "accent"],
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop features, and team collaboration tools.",
      image: "https://picsum.photos/400/250?random=4",
      badges: ["React", "Socket.io", "PostgreSQL"],
      badgeColors: ["primary", "secondary", "accent"],
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts, interactive maps, and data visualization.",
      image: "https://picsum.photos/400/250?random=5",
      badges: ["Vue.js", "D3.js", "Weather API"],
      badgeColors: ["primary", "secondary", "accent"],
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
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="btn btn-sm btn-primary hover:scale-105 transition"
                    >
                      Live Demo
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline hover:scale-105 transition"
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
                    <div
                      key={i}
                      className={`badge badge-${project.badgeColors[i]} badge-outline`}
                    >
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
            href="#"
            className="btn btn-primary btn-lg hover:scale-105 transition"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
