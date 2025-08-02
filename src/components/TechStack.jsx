import React, { useRef, useEffect } from "react";

let gsap, ScrollTrigger;

function TechStack() {
  const sectionRef = useRef(null);
  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const toolsRef = useRef(null);

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

      const header = el.querySelector(".section-header");
      if (header) {
        const title = header.querySelector("h2");
        const divider = header.querySelector(".divider");
        const subtitle = header.querySelector("p");

        gsap.set([title, divider, subtitle], {
          opacity: 0,
          y: 50,
        });

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            scroller: "[data-scroll-container]",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        headerTl
          .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          })
          .to(
            divider,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            subtitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }

      const animateSkillSection = (sectionEl, delay = 0) => {
        if (!sectionEl) return;

        const title = sectionEl.querySelector("h3");
        const skills = sectionEl.querySelectorAll(".skill-item");

        gsap.set(title, {
          opacity: 0,
          y: 30,
        });

        gsap.set(skills, {
          opacity: 0,
          scale: 0,
          rotation: 180,
          y: 50,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            scroller: "[data-scroll-container]",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: delay,
        });

        const skillsArray = Array.from(skills);
        const randomOrder = skillsArray
          .map((skill, index) => ({ skill, index, random: Math.random() }))
          .sort((a, b) => a.random - b.random);

        randomOrder.forEach(({ skill }, i) => {
          tl.to(
            skill,
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            `-=${0.4 - i * 0.1}`
          );
        });

        skills.forEach((skill) => {
          const img = skill.querySelector("img");
          const text = skill.querySelector("span");

          skill.addEventListener("mouseenter", () => {
            gsap.to(skill, {
              scale: 1.15,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(img, {
              rotation: -5,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(text, {
              y: -2,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          skill.addEventListener("mouseleave", () => {
            gsap.to(skill, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(img, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(text, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      };

      animateSkillSection(frontendRef.current, 0);
      animateSkillSection(backendRef.current, 0.2);
      animateSkillSection(toolsRef.current, 0.4);
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

  const frontendSkills = [
    {
      icon: "https://cdn.simpleicons.org/html5",
      title: "HTML",
      color: "primary",
    },
    {
      icon: "https://cdn.simpleicons.org/react",
      title: "React",
      color: "secondary",
    },
    {
      icon: "https://cdn.simpleicons.org/css",
      title: "CSS",
      color: "info",
    },
    {
      icon: "https://cdn.simpleicons.org/javascript",
      title: "JavaScript",
      color: "success",
    },
    {
      icon: "https://cdn.simpleicons.org/tailwindcss",
      title: "Tailwind",
      color: "warning",
    },
    {
      icon: "https://cdn.simpleicons.org/greensock",
      title: "GSAP",
      color: "error",
    },
    {
      icon: "https://cdn.simpleicons.org/Nextdotjs",
      title: "Next.js",
      color: "neutral",
    },
    {
      icon: "https://cdn.simpleicons.org/daisyui",
      title: "DaisyUi",
      color: "primary",
    },
  ];

  const backendSkills = [
    {
      icon: "https://cdn.simpleicons.org/nodedotjs",
      title: "Node.js",
      color: "primary",
    },
    {
      icon: "https://cdn.simpleicons.org/flask",
      title: "Flask",
      color: "secondary",
    },
    {
      icon: "https://cdn.simpleicons.org/express",
      title: "Express",
      color: "accent",
    },
    {
      icon: "https://cdn.simpleicons.org/mongodb",
      title: "MongoDB",
      color: "info",
    },
    {
      icon: "https://cdn.simpleicons.org/postgresql",
      title: "PostgreSQL",
      color: "success",
    },
    {
      icon: "https://cdn.simpleicons.org/mysql",
      title: "MySql",
      color: "warning",
    },
    {
      icon: "https://cdn.simpleicons.org/python",
      title: "Python",
      color: "error",
    },
    {
      icon: "https://jwt.io/img/pic_logo.svg",
      title: "JWT",
      color: "neutral",
    },
  ];

  const toolsSkills = [
    {
      icon: "https://cdn.simpleicons.org/npm",
      title: "npm",
      color: "primary",
    },
    {
      icon: "https://cdn.simpleicons.org/git",
      title: "Git",
      color: "secondary",
    },
    {
      icon: "https://cdn.simpleicons.org/github",
      title: "GitHub",
      color: "accent",
    },
    {
      icon: "https://cdn.simpleicons.org/jira",
      title: "Jira",
      color: "info",
    },
    {
      icon: "https://cdn.simpleicons.org/cypress",
      title: "Cypress",
      color: "success",
    },
    {
      icon: "https://cdn.simpleicons.org/selenium",
      title: "Selenium",
      color: "success",
    },
    {
      icon: "https://cdn.simpleicons.org/docker",
      title: "Docker",
      color: "success",
    },
    {
      icon: "https://cdn.simpleicons.org/netlify",
      title: "Netlify",
      color: "primary",
    },
    {
      icon: "https://cdn.simpleicons.org/vercel",
      title: "Vercel",
      color: "secondary",
    },
    {
      icon: "https://cdn.simpleicons.org/digitalocean",
      title: "DigitalOcean",
      color: "accent",
    },
    {
      icon: "https://cdn.simpleicons.org/Figma",
      title: "Figma",
      color: "info",
    },
    {
      icon: "https://cdn.simpleicons.org/vite",
      title: "Vite",
      color: "warning",
    },
    {
      icon: "https://cdn.simpleicons.org/postman",
      title: "Postman",
      color: "error",
    },
  ];

  const SkillSection = ({ title, skills, sectionRef }) => (
    <div className="mb-12" ref={sectionRef}>
      <h3 className="text-2xl font-semibold mb-6 text-center text-base-content">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`skill-item tooltip group flex flex-col items-center transition-all duration-300 cursor-pointer`}
            data-tip={skill.title}
          >
            <img
              src={skill.icon}
              alt={skill.title}
              className="w-10 h-10 md:w-12 md:h-12 mb-2 transition-all duration-300"
            />
            <span className="text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {skill.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-base-100" ref={sectionRef}>
        <div className="text-center mb-16 text-base-content">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="divider divider-primary max-w-xs mx-auto"></div>
            <p className="text-xl opacity-70">
              Technologies I use to build robust applications
            </p>
          </div>

          {/* Frontend Technologies */}
          <SkillSection
            title="Frontend Technologies"
            skills={frontendSkills}
            sectionRef={frontendRef}
          />

          {/* Backend Technologies */}
          <SkillSection
            title="Backend Technologies"
            skills={backendSkills}
            sectionRef={backendRef}
          />

          {/* Other Technologies */}
          <SkillSection
            title="Other Tools & Technologies"
            skills={toolsSkills}
            sectionRef={toolsRef}
          />
        </div>
      </section>
    </div>
  );
}

export default TechStack;
