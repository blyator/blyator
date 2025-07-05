import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [subPage, setSubPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const wheelTimeoutRef = useRef();

  const pages = [
    {
      title: "My Journey",
      content:
        "I started with basic HTML & CSS 5 years ago. Now a full-stack developer with a passion for design & performance.",
      img: "https://picsum.photos/500/600?random=1",
    },
    {
      title: "Philosophy",
      content:
        "Code is more than logic — it's a medium of user experience. Every component should speak intuitively to the user.",
      img: "https://picsum.photos/500/600?random=2",
    },
    {
      title: "Expertise",
      content:
        "React, Node, TypeScript, Tailwind, Docker, MongoDB, Firebase, and modern tooling to build high-impact projects.",
      img: "https://picsum.photos/500/600?random=3",
    },
    {
      title: "Vision",
      content:
        "Future-focused: Web3, AI-assisted UI, and generative UX flows. I'm building not just websites, but digital futures.",
      img: "https://picsum.photos/500/600?random=4",
    },
  ];

  const animateSubPageChange = (nextPage) => {
    if (!contentRef.current || animating) return;

    setAnimating(true);

    const imageEl = contentRef.current.querySelector(".subpage-image");
    const textEl = contentRef.current.querySelector(".subpage-text");

    gsap.to([imageEl, textEl], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSubPage(nextPage);

        gsap.set([imageEl, textEl], { y: -20 });
        gsap.to([imageEl, textEl], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            setAnimating(false);
          },
        });
      },
    });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (!sectionRef.current || animating) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.5;

      if (!inView) return;

      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Throttle wheel events
      wheelTimeoutRef.current = setTimeout(() => {
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextPage = subPage + direction;

        if (nextPage >= 0 && nextPage < pages.length) {
          e.preventDefault();
          animateSubPageChange(nextPage);
        }
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [subPage, animating, pages.length]);

  const page = pages[subPage];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen sticky top-0 flex items-center justify-center bg-base-100 px-6"
    >
      <div ref={contentRef} className="max-w-6xl w-full mx-auto">
        <div className="bg-base-200 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Image Section */}
            <div className="flex-shrink-0 relative subpage-image">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={page.img}
                  alt={page.title}
                  className="w-[280px] md:w-[350px] lg:w-[400px] h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>

              {/* Progress indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      index === subPage
                        ? "bg-primary scale-125 shadow-lg"
                        : "bg-base-content/30 hover:bg-base-content/50"
                    }`}
                    onClick={() => !animating && animateSubPageChange(index)}
                  />
                ))}
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center lg:text-left subpage-text">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                {page.title}
              </h2>
              <p className="text-base-content text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                {page.content}
              </p>

              <div className="flex items-center gap-6 justify-center lg:justify-start flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-base-content/60">
                    {subPage + 1} of {pages.length}
                  </span>

                  {/* Navigation arrows */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() =>
                        subPage > 0 &&
                        !animating &&
                        animateSubPageChange(subPage - 1)
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        subPage === 0 || animating
                          ? "bg-base-content/10 text-base-content/30 "
                          : "bg-primary/20 text-primary hover:bg-primary/30 hover:scale-110"
                      }`}
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        subPage < pages.length - 1 &&
                        !animating &&
                        animateSubPageChange(subPage + 1)
                      }
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        subPage === pages.length - 1 || animating
                          ? "bg-base-content/10 text-base-content/30 "
                          : "bg-primary/20 text-primary hover:bg-primary/30 hover:scale-110"
                      }`}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
