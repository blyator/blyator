import { useState } from "react";
import { Layers3, Zap, Activity, FlaskConical, Database } from "lucide-react";

function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const pages = [
    {
      title: "Frontend Work",
      icon: <Activity className="w-6 h-6 text-primary" />,
      content:
        "I make beautiful and responsive user interfaces that are intuative and also perform smoothly across devices. ",
      img: "/assets/Illustrations/frontend.png",
    },

    {
      title: "The Backend",
      icon: <Database className="w-6 h-6 text-primary" />,
      content:
        "I also build robust and scalable backends. From API development to authentication and databases. I ensure reliable performance and minimun server downtimes.",
      img: "/assets/Illustrations/backend.png",
    },
    {
      title: "QA & Testing",
      icon: <FlaskConical className="w-6 h-6 text-primary" />,
      content:
        "Good software needs a lot more than just clean code. I test what I build, thoroughly. Catching bugs early ensures better development. Quality matters to me at every step.",
      img: "/assets/Illustrations/bug.png",
    },
  ];

  return (
    <div className="bg-base-100 py-30">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">
            My Story
          </h1>
          <p className="text-base-content/70 text-xl max-w-3xl mx-auto">
            I design and build awesome Applications. From dynamic frontend
            interfaces to scalable backend systems using modern technologies and
            clean code principles.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-12">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`card bg-base-200 shadow transition-all duration-500 ${
                hoveredCard === index ? "scale-105 shadow-3xl" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-body p-8">
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="flex-shrink-0 relative">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={page.img}
                        alt={page.title}
                        className="w-[280px] md:w-[350px] lg:w-[400px] h-[350px] md:h-[400px] lg:h-[450px] object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4 flex justify-center lg:justify-start">
                      <div className="p-2 bg-base-300 rounded-full shadow">
                        {page.icon}
                      </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                      {page.title}
                    </h2>

                    <p className="text-base-content/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                      {page.content}
                    </p>

                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <div className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent"></div>
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
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-sm">
              Ready to build something amazing together?
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
