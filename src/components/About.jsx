import React, { useState, useRef, useEffect } from "react";
import { Activity, FlaskConical, Database } from "lucide-react";

let gsap, ScrollTrigger;

function About() {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const pages = [
    {
      title: "Frontend Work",
      icon: <Activity className="w-6 h-6 text-white" />,
      content:
        "I make beautiful and responsive user interfaces that are intuitive and also perform smoothly across devices.",
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

  // text reveal utility
  const splitTextIntoWords = (element) => {
    if (!element || element.dataset.split) return;

    const text = element.textContent;
    const words = text.split(" ");

    element.innerHTML = words
      .map(
        (word, index) =>
          `<span class="word-reveal" style="display: inline-block;">
          <span class="word-inner" style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}${
            index < words.length - 1 ? "&nbsp;" : ""
          }</span>
        </span>`
      )
      .join("");

    element.dataset.split = "true";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

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
          }, 100);
        }
      } catch (error) {
        console.error("Failed to load GSAP:", error);
        // Show content if GSAP fails
        document.querySelectorAll(".opacity-0").forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "none";
        });
      }
    };

    const initAnimations = () => {
      const el = sectionRef.current;
      if (!el || !gsap || !ScrollTrigger) return;

      // Kill any existing ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && el.contains(trigger.trigger)) {
          trigger.kill();
        }
      });

      // Header Animation
      const header = el.querySelector(".hero-header");
      if (header) {
        const headerTitle = header.querySelector("h1");
        const headerText = header.querySelector("p");

        splitTextIntoWords(headerTitle);
        splitTextIntoWords(headerText);

        const titleWords = headerTitle.querySelectorAll(".word-inner");
        const textWords = headerText.querySelectorAll(".word-inner");

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "bottom 20%",
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
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            textWords,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }

      // Cards Animation
      const cards = el.querySelectorAll(".premium-card");

      cards.forEach((card, index) => {
        const cardImage = card.querySelector(".card-image");
        const cardIcon = card.querySelector(".card-icon");
        const cardTitle = card.querySelector(".card-title");
        const cardText = card.querySelector(".card-text");
        const cardDecorative = card.querySelector(".card-decorative");

        splitTextIntoWords(cardTitle);
        splitTextIntoWords(cardText);

        const titleWords = cardTitle.querySelectorAll(".word-inner");
        const textWords = cardText.querySelectorAll(".word-inner");

        gsap.set(cardImage, {
          opacity: 0,
          scale: 0.95,
        });

        gsap.set(cardIcon, {
          opacity: 0,
          scale: 0.8,
        });

        gsap.set(cardDecorative, {
          opacity: 0,
          x: -20,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "center 40%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveCard(index),
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
          .to(
            cardImage,
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .to(
            cardIcon,
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.2)",
            },
            "-=0.4"
          )
          .to(
            titleWords,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            textWords,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            cardDecorative,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.2"
          );

        gsap.to(cardImage, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: "[data-scroll-container]",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Footer Animation
      const footer = el.querySelector(".text-center.pt-16");
      if (footer) {
        gsap.to(footer, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
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
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-base-100 overflow-hidden font-sans"
      style={{ fontFamily: "var(--font-family, inherit)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="hero-header text-center mb-16 opacity-0 translate-y-10">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4 leading-tight">
            My Story
          </h1>
          <p className="text-base-content/70 text-xl max-w-3xl mx-auto leading-relaxed">
            I design and build awesome Applications. From dynamic frontend
            interfaces to scalable backend systems using modern technologies and
            clean code principles.
          </p>
        </div>

        <div className="space-y-16">
          {pages.map((page, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="premium-card group opacity-0 translate-y-16"
            >
              <div className="relative">
                <div className="card bg-base-200/80 border border-base-300/50 lg:bg-transparent lg:border-none backdrop-blur-xl rounded-4xl transition-all duration-300 ease-out relative overflow-hidden hover:shadow-lg">
                  <div className="card-body p-10 relative z-10">
                    <div
                      className={`flex flex-col ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-12 lg:gap-16 items-center`}
                    >
                      <div className="flex-shrink-0 relative card-image opacity-0 scale-95">
                        <div className="relative overflow-hidden rounded-3xl group-hover:scale-105 transition-transform duration-700 ease-out">
                          <img
                            src={page.img}
                            alt={page.title}
                            className="w-[320px] md:w-[400px] lg:w-[450px] h-[380px] md:h-[450px] lg:h-[500px] object-cover rounded-3xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-4xl" />
                        </div>
                      </div>

                      <div className="flex-1 text-center lg:text-left relative card-content">
                        <div className="card-icon mb-6 flex justify-center lg:justify-start opacity-0 scale-75">
                          <div
                            className={`p-4 bg-gradient-to-br ${page.color} rounded-2xl shadow-lg`}
                          >
                            {page.icon}
                          </div>
                        </div>

                        <h2 className="card-title text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                          {page.title}
                        </h2>

                        <p className="card-text text-base-content/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                          {page.content}
                        </p>

                        <div className="card-decorative flex items-center gap-4 justify-center lg:justify-start opacity-0 -translate-x-5">
                          <div className="h-1 bg-primary rounded-full w-16 group-hover:w-20 transition-all duration-300" />
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                          <div className="h-1 bg-primary rounded-full w-8 group-hover:w-12 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-16 opacity-0 translate-y-5">
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
