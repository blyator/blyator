import React, { useState, useRef, useEffect } from "react";

let gsap, ScrollTrigger;

function Projects() {
  const [touchedCard, setTouchedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
    {
      title: "Pi-hole Ad-block",
      description:
        "A network-wide ad-blocking and infrastructure monitoring system. It uses Pi-hole for DNS sinkholing, Prometheus for metrics and Grafana for  visualization of network health and system performance.",
      image: "/assets/Illustrations/pihole.png",
      badges: ["Grafana", "Prometheus", "Nginx"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-accent"],
      demoLink: "https://serverdashboard.qzz.io",
      codeLink: "https://github.com/blyator",
    },
    {
      title: "NotesApp",
      description:
        "This is the perfect app made to help users quickly create, manage and organize their notes. It comes with a simple interface, users can add notes and tags, then edit or delete them as they wish.",
      image: "/assets/Illustrations/notes.png",
      badges: ["React", "Tailwind", "Python"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-error"],
      demoLink: "https://notes-hub-psi.vercel.app/",
      codeLink: "https://github.com/blyator/noteshub",
    },
    {
      title: "The Beauty",
      description:
        "This is a modern e-commerce platform designed for beauty enthusiasts. Customers are able to explore a vast range of beauty products and buy them while enjoying a smooth shopping experience.",
      image: "/assets/Illustrations/beauty.png",
      badges: ["Python", "React", "PostgreSQL"],
      badgeColors: ["badge-primary", "badge-secondary", "badge-accent"],
      demoLink: "https://beauty-shop-opal.vercel.app/",
      codeLink: "https://github.com/zacthuku/beauty-shop",
    },
  ];

  // text reveal utility
  const splitTextIntoWords = (element) => {
    if (!element || element.dataset.split) return;

    const text = element.textContent;
    const words = text.split(" ");

    element.innerHTML = words
      .map(
        (word, index) =>
          `<span class="word-reveal" style="display: inline-block;">
          <span class="word-inner" style="display: inline-block; opacity: 0; transform: translateY(10px);">${word}${
            index < words.length - 1 ? "&nbsp;" : ""
          }</span>
        </span>`
      )
      .join("");

    element.dataset.split = "true";
  };

  const handleCardTouch = (index) => {
    setTouchedCard(touchedCard === index ? null : index);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap");
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");

        gsap = gsapModule.gsap || gsapModule.default;
        ScrollTrigger =
          ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;

        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          setTimeout(() => {
            initAnimations();
          }, 200);
        }
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    const initAnimations = () => {
      const el = sectionRef.current;
      if (!el || !gsap || !ScrollTrigger) return;

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && el.contains(trigger.trigger)) {
          trigger.kill();
        }
      });

      // Header Animation with text splitting
      const header = el.querySelector(".hero-header");
      if (header) {
        const headerTitle = header.querySelector("h2");
        const headerText = header.querySelector("p");
        const divider = header.querySelector(".divider");

        splitTextIntoWords(headerTitle);
        splitTextIntoWords(headerText);

        const titleWords = headerTitle.querySelectorAll(".word-inner");
        const textWords = headerText.querySelectorAll(".word-inner");

        gsap.set(header, { opacity: 0, y: 20 });
        gsap.set(divider, { scaleX: 0, opacity: 0 });

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        headerTl
          .to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
          .to(
            titleWords,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            divider,
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            textWords,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.out",
            },
            "-=0.2"
          );
      }

      //  Cards Animation
      const cards = el.querySelectorAll(".project-card");

      cards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 30,
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            scroller: "[data-scroll-container]",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      //CTA button
      const ctaButton = el.querySelector(".cta-button");
      if (ctaButton) {
        gsap.set(ctaButton, { opacity: 0, y: 20 });

        gsap.to(ctaButton, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaButton,
            scroller: "[data-scroll-container]",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    };

    if (typeof window !== "undefined") {
      initGSAP();
    }

    return () => {
      if (ScrollTrigger && sectionRef.current) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger && sectionRef.current.contains(trigger.trigger)) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="py-20 bg-base-100 relative"
      >
        <div className="container mx-auto px-4 relative">
          <div className="hero-header text-center mb-20 text-base-content">
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
                ref={(el) => (cardsRef.current[index] = el)}
                className={`project-card relative group cursor-pointer transition-all duration-300 ease-out ${
                  hoveredCard === index ? "z-20" : "z-10"
                }`}
                style={{
                  transform:
                    hoveredCard === index
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0) scale(1)",
                }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                onTouchStart={() => handleCardTouch(index)}
              >
                {/*  background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl transition-all duration-300">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/3 to-accent/5 rounded-3xl transition-opacity duration-300 ${
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                <div className="relative bg-base-100/95 backdrop-blur-lg rounded-3xl shadow-xl border border-base-300/50 overflow-hidden transition-all duration-300">
                  <figure className="relative overflow-hidden rounded-t-3xl h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-300 ease-out ${
                        hoveredCard === index
                          ? "scale-105 brightness-110"
                          : "scale-100"
                      }`}
                    />

                    <div
                      className={`card-buttons absolute inset-0 bg-black/20 transition-all duration-300 flex items-center justify-center ${
                        touchedCard === index || hoveredCard === index
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex gap-4">
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm bg-gradient-to-r from-primary to-primary/80 border-none text-white hover:scale-105 transition-all duration-200 shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Site
                        </a>
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm bg-gradient-to-r from-accent to-accent/80 border-none text-white hover:scale-105 transition-all duration-200 shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Code
                        </a>
                      </div>
                    </div>
                  </figure>

                  <div className="p-6 relative">
                    <h3
                      className={`card-title text-xl font-bold mb-3 transition-all duration-300 relative ${
                        hoveredCard === index
                          ? "text-primary"
                          : "text-base-content"
                      }`}
                    >
                      {project.title}
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                          hoveredCard === index ? "w-full" : "w-0"
                        }`}
                      />
                    </h3>

                    <p className="card-description text-sm leading-relaxed mb-4 text-base-content opacity-90">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.badges.map((badge, i) => (
                        <div
                          key={i}
                          className={`badge ${project.badgeColors[i]} transition-all duration-200 hover:scale-105 cursor-pointer shadow-sm`}
                        >
                          {badge}
                        </div>
                      ))}
                    </div>

                    {/* decorative elements */}
                    <div
                      className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ${
                        hoveredCard === index ? "opacity-60" : "opacity-0"
                      }`}
                    />
                  </div>
                </div>

                {/* shadow */}
                <div
                  className={`absolute inset-0 rounded-3xl transition-all duration-300 -z-10 ${
                    hoveredCard === index
                      ? "shadow-2xl shadow-primary/20"
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
              className="cta-button btn btn-lg bg-success rounded-4xl border-none hover:scale-105 transition-all duration-300 relative overflow-hidden group shadow-xl hover:shadow-2xl"
            >
              <span className="relative text-base-100/80 z-10 font-semibold">
                View More Projects
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
