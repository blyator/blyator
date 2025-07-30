import React, { useState, useRef, useEffect } from "react";
import { Activity, FlaskConical, Database } from "lucide-react";

let gsap, ScrollTrigger;

function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const sectionRef = useRef(null);

  const pages = [
    {
      title: "Frontend Work",
      icon: <Activity className="w-6 h-6 text-white" />,
      content:
        "I make beautiful and responsive user interfaces that are intuitive and also perform smoothly across devices. ",
      img: "/assets/Illustrations/frontend.png",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "The Backend",
      icon: <Database className="w-6 h-6 text-white" />,
      content:
        "I also build robust and scalable backends. From API development to authentication and databases. I ensure reliable performance and minimum server downtimes.",
      img: "/assets/Illustrations/backend.png",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "QA & Testing",
      icon: <FlaskConical className="w-6 h-6 text-white" />,
      content:
        "Good software needs a lot more than just clean code. I test what I build, thoroughly. Catching bugs early ensures better development. Quality matters to me at every step.",
      img: "/assets/Illustrations/bug.png",
      color: "from-orange-500 to-red-600",
    },
  ];

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
          initAnimations();
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    const initAnimations = () => {
      const el = sectionRef.current;
      if (!el || !gsap || !ScrollTrigger) return;

      // Kill any existing ScrollTriggers to avoid memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Set initial state for the entire section
      gsap.set(el, {
        opacity: 0,
        y: 20,
      });

      // Animate the section in when scrolled to
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller: "[data-scroll-container]",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const header = el.querySelector(".about-header");
      if (header) {
        gsap.set(header, { opacity: 0, y: 60, scale: 0.9 });

        gsap.to(header, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: header,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const cards = el.querySelectorAll(".about-card");
      gsap.set(cards, {
        y: 50,
        opacity: 0,
        scale: 0.9,
      });

      cards.forEach((card) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            scroller: "[data-scroll-container]",
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const footer = el.querySelector(".about-footer");
      if (footer) {
        gsap.set(footer, {
          opacity: 0,
          y: 40,
          scale: 0.95,
        });

        gsap.to(footer, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: footer,
            scroller: "[data-scroll-container]",
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none none",
          },
        });
      }
    };

    if (typeof window !== "undefined") {
      initGSAP();
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-base-100 overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="about-header text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">
            My Story
          </h1>
          <p className="text-base-content/70 text-xl max-w-3xl mx-auto">
            I design and build awesome Applications. From dynamic frontend
            interfaces to scalable backend systems using modern technologies and
            clean code principles.
          </p>
        </div>

        <div className="space-y-16">
          {pages.map((page, index) => (
            <div
              key={index}
              className="about-card group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`card bg-base-200/80 backdrop-blur-xl border border-base-300/50 rounded-2xl transition-all duration-300 ease-out relative overflow-hidden ${
                  hoveredCard === index
                    ? "scale-[1.02] -translate-y-2"
                    : "hover:scale-[1.01] hover:-translate-y-1"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-0 group-hover:opacity-3 transition-all duration-300`}
                />

                <div className="card-body p-10 relative z-10">
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-12 lg:gap-16 items-center`}
                  >
                    <div className="flex-shrink-0 relative">
                      <div className="relative overflow-hidden rounded-3xl transform transition-all duration-300 group-hover:scale-105">
                        <img
                          src={page.img}
                          alt={page.title}
                          className="w-[320px] md:w-[400px] lg:w-[450px] h-[380px] md:h-[450px] lg:h-[500px] object-cover rounded-3xl relative z-10 transition-all duration-300 group-hover:brightness-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div
                            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "0s" }}
                          />
                          <div
                            className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "1s" }}
                          />
                          <div
                            className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "2s" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center lg:text-left relative">
                      <div className="mb-6 flex justify-center lg:justify-start">
                        <div
                          className={`p-4 bg-gradient-to-br ${page.color} rounded-2xl transform transition-all duration-300 group-hover:scale-105`}
                        >
                          {page.icon}
                        </div>
                      </div>

                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight transform transition-all duration-300 group-hover:scale-105 relative">
                        {page.title}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                      </h2>

                      <p className="text-base-content/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl transform transition-all duration-300 group-hover:text-base-content/90">
                        {page.content}
                      </p>

                      <div className="flex items-center gap-4 justify-center lg:justify-start transform transition-all duration-300 group-hover:scale-105">
                        <div
                          className={`h-1 bg-gradient-to-r ${page.color} rounded-full transition-all duration-300 group-hover:w-20 w-16`}
                        />
                        <div
                          className={`w-3 h-3 bg-gradient-to-r ${page.color} rounded-full animate-pulse`}
                        />
                        <div
                          className={`h-1 bg-gradient-to-r ${page.color} rounded-full transition-all duration-300 group-hover:w-12 w-8`}
                        />
                      </div>

                      <div
                        className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${page.color} rounded-full opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:animate-bounce flex items-center justify-center text-white font-bold`}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="about-footer text-center pt-16">
          <div className="inline-flex items-center gap-2 text-base-content/60">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="text-sm">
              Ready to build something amazing together?
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
