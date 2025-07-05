import React from "react";

function TechStack() {
  return (
    <div>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-base-100">
        <div className="text-center mb-16 text-base-content">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="divider divider-primary max-w-xs mx-auto"></div>
            <p className="text-xl opacity-70">
              Technologies I use to build robust applications
            </p>
          </div>

          {/* Frontend Technologies */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content">
              Frontend Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {[
                {
                  icon: "https://cdn.simpleicons.org/html5",
                  title: "HTML",
                  color: "primary",
                },
                {
                  icon: "https://cdn.simpleicons.org/css3",
                  title: "CSS",
                  color: "secondary",
                },
                {
                  icon: "https://cdn.simpleicons.org/sass",
                  title: "Sass",
                  color: "accent",
                },
                {
                  icon: "https://cdn.simpleicons.org/tailwindcss",
                  title: "TailwindCSS",
                  color: "info",
                },
                {
                  icon: "https://cdn.simpleicons.org/javascript",
                  title: "JavaScript",
                  color: "success",
                },
                {
                  icon: "https://cdn.simpleicons.org/nuxtdotjs",
                  title: "Nuxt",
                  color: "warning",
                },
                {
                  icon: "https://cdn.simpleicons.org/greensock",
                  title: "GSAP",
                  color: "error",
                },
                {
                  icon: "https://cdn.simpleicons.org/flutter",
                  title: "Flutter",
                  color: "neutral",
                },
                {
                  icon: "https://cdn.simpleicons.org/pinia",
                  title: "Pinia",
                  color: "primary",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className={`tooltip group flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_5px_var(--color-${skill.color})]`}
                  data-tip={skill.title}
                >
                  <img
                    src={skill.icon}
                    alt={skill.title}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2"
                  />
                  <span className="text-sm font-semibold opacity-70 group-hover:opacity-100">
                    {skill.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Technologies */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content">
              Backend Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {[
                {
                  icon: "https://cdn.simpleicons.org/nodedotjs",
                  title: "Node.js",
                  color: "primary",
                },
                {
                  icon: "https://cdn.simpleicons.org/nestjs",
                  title: "NestJS",
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
                  icon: "https://cdn.simpleicons.org/mongoose",
                  title: "Mongoose",
                  color: "warning",
                },
                {
                  icon: "https://cdn.simpleicons.org/prisma",
                  title: "Prisma",
                  color: "error",
                },
                {
                  icon: "https://cdn.simpleicons.org/typescript",
                  title: "TypeScript",
                  color: "neutral",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className={`tooltip group flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_5px_var(--color-${skill.color})]`}
                  data-tip={skill.title}
                >
                  <img
                    src={skill.icon}
                    alt={skill.title}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2"
                  />
                  <span className="text-sm font-semibold opacity-70 group-hover:opacity-100">
                    {skill.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Technologies */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-base-content">
              Other Tools & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {[
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
                  icon: "https://cdn.simpleicons.org/redis",
                  title: "Redis",
                  color: "info",
                },
                {
                  icon: "https://cdn.simpleicons.org/docker",
                  title: "Docker",
                  color: "success",
                },
                {
                  icon: "https://cdn.simpleicons.org/amazonaws",
                  title: "AWS",
                  color: "warning",
                },
                {
                  icon: "https://cdn.simpleicons.org/prometheus",
                  title: "Prometheus",
                  color: "error",
                },
                {
                  icon: "https://cdn.simpleicons.org/circleci",
                  title: "CircleCI",
                  color: "neutral",
                },
                {
                  icon: "https://cdn.simpleicons.org/netlify",
                  title: "Netlify",
                  color: "primary",
                },
                {
                  icon: "https://cdn.simpleicons.org/heroku",
                  title: "Heroku",
                  color: "secondary",
                },
                {
                  icon: "https://cdn.simpleicons.org/digitalocean",
                  title: "DigitalOcean",
                  color: "accent",
                },
                {
                  icon: "https://cdn.simpleicons.org/puppeteer",
                  title: "Puppeteer",
                  color: "info",
                },
                {
                  icon: "https://cdn.simpleicons.org/storyblok",
                  title: "Storyblok",
                  color: "success",
                },
                {
                  icon: "https://cdn.simpleicons.org/webpack",
                  title: "Webpack",
                  color: "warning",
                },
                {
                  icon: "https://cdn.simpleicons.org/postman",
                  title: "Postman",
                  color: "error",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className={`tooltip group flex flex-col items-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_5px_var(--color-${skill.color})]`}
                  data-tip={skill.title}
                >
                  <img
                    src={skill.icon}
                    alt={skill.title}
                    className="w-10 h-10 md:w-12 md:h-12 mb-2"
                  />
                  <span className="text-sm font-semibold opacity-70 group-hover:opacity-100">
                    {skill.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TechStack;
