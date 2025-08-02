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

  // Premium mouse tracking
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
          initAnimations();
        }
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    const initAnimations = () => {
      const el = sectionRef.current;
      if (!el || !gsap || !ScrollTrigger) return;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Header entrance
      const header = el.querySelector(".hero-header");
      if (header) {
        const headerTitle = header.querySelector("h1");
        const headerText = header.querySelector("p");

        gsap.set([headerTitle, headerText], {
          opacity: 0,
          y: 60,
        });

        gsap.to(headerTitle, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(headerText, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Premium cards reveal system
      const cards = el.querySelectorAll(".premium-card");

      cards.forEach((card, index) => {
        const cardContent = card.querySelector(".card-content");
        const cardImage = card.querySelector(".card-image");
        const cardIcon = card.querySelector(".card-icon");
        const cardTitle = card.querySelector(".card-title");
        const cardText = card.querySelector(".card-text");
        const cardDecorative = card.querySelector(".card-decorative");

        // Initial state - cards come from different directions
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.set(card, {
          opacity: 0,
          x: direction,
          y: 50,
          scale: 0.9,
          rotationY: index % 2 === 0 ? -15 : 15,
        });

        gsap.set(cardImage, {
          scale: 1.2,
          opacity: 0,
          filter: "blur(10px)",
        });

        gsap.set([cardIcon, cardTitle, cardText, cardDecorative], {
          opacity: 0,
          y: 60,
          x: direction * 0.3,
        });

        // Entrance animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "center 40%",
            scrub: 1.5,
            onEnter: () => setActiveCard(index),
          },
        });

        tl.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "power3.out",
        })
          .to(
            cardImage,
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power2.out",
            },
            "-=1"
          )
          .to(
            cardIcon,
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.8"
          )
          .to(
            cardTitle,
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          .to(
            cardText,
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            cardDecorative,
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.2"
          );

        // Continuous parallax while in view
        gsap.to(cardImage, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scroller: "[data-scroll-container]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
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
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Clean Header */}
        <div className="hero-header text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">
            My Story
          </h1>
          <p className="text-base-content/70 text-xl max-w-3xl mx-auto">
            I design and build awesome Applications. From dynamic frontend
            interfaces to scalable backend systems using modern technologies and
            clean code principles.
          </p>
        </div>

        {/* Premium Cards */}
        <div className="space-y-16">
          {pages.map((page, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="premium-card group"
            >
              <div className="relative">
                {/* Main card */}
                <div className="card bg-base-200/80 backdrop-blur-xl border border-base-300/50 rounded-2xl transition-all duration-300 ease-out relative overflow-hidden hover:shadow-xl">
                  <div className="card-body p-10 relative z-10">
                    <div
                      className={`flex flex-col ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-12 lg:gap-16 items-center`}
                    >
                      {/* Image Section */}
                      <div className="flex-shrink-0 relative card-image">
                        <div className="relative overflow-hidden rounded-3xl group-hover:scale-105 transition-transform duration-700 ease-out">
                          <img
                            src={page.img}
                            alt={page.title}
                            className="w-[320px] md:w-[400px] lg:w-[450px] h-[380px] md:h-[450px] lg:h-[500px] object-cover rounded-3xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 text-center lg:text-left relative card-content">
                        {/* Icon */}
                        <div className="card-icon mb-6 flex justify-center lg:justify-start">
                          <div
                            className={`p-4 bg-gradient-to-br ${page.color} rounded-2xl shadow-lg`}
                          >
                            {page.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="card-title text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                          {page.title}
                        </h2>

                        {/* Description */}
                        <p className="card-text text-base-content/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                          {page.content}
                        </p>

                        {/* Decorative elements */}
                        <div className="card-decorative flex items-center gap-4 justify-center lg:justify-start">
                          <div
                            className={`h-1 bg-gradient-to-r ${page.color} rounded-full w-16 group-hover:w-20 transition-all duration-300`}
                          />
                          <div
                            className={`w-3 h-3 bg-gradient-to-r ${page.color} rounded-full animate-pulse`}
                          />
                          <div
                            className={`h-1 bg-gradient-to-r ${page.color} rounded-full w-8 group-hover:w-12 transition-all duration-300`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-16">
          <div className="inline-flex items-center gap-2 text-base-content/60">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="text-sm">
              Ready to build something amazing together?
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default About;
