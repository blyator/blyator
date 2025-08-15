import React, { useEffect, useRef } from "react";
import { ArrowRight, Phone, Send } from "lucide-react";

const Workflow = ({ onOpenContact }) => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const stepsRefs = useRef([]);

  const services = [
    {
      title: "Landing Pages",
      description:
        "We design high-performance responsive pages that turn visitors into customers, blending strategy, speed, and style.",
      features: [
        "Tailored to your Audience",
        "No distraction Layouts",
        "Mobile design approach",
        "Fast loading speeds",
      ],
    },
    {
      title: "Company Websites",
      description:
        "Professional corporate websites that establish credibility and showcases your brand's story, values and services.",
      features: [
        "Professional design",
        "Content management",
        "SEO optimization",
        "Analytics-Ready",
      ],
    },
    {
      title: "Business Websites",
      description:
        "Custom websites tailored for small to medium businesses, designed to attract customers and grow your online presence.",
      features: [
        "Custom design",
        "Search engine optimized",
        "Performance & Security",
      ],
    },
    {
      title: "Web & Mobile Applications",
      description:
        "Full-stack, feature-rich applications including online stores, analytics dashboards, mobile experiences and custom business tools.",
      features: [
        "Cross-platform development",
        "Testing and QA ",
        "User authentication",
        "Scalable architecture",
      ],
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      duration: "30 min",
      cta: "Book a Call",
      description:
        "We kick things off with a friendly chat to learn about your vision, goals and what you want to create. Then we’ll make a personalized quote that’s tailored just for you.",
      theme: "badge-success",
    },
    {
      number: "02",
      title: "Contract & Onboarding",
      duration: "1-2 days",
      cta: "Sign Contract",
      description:
        "Once we align on the scope and timeline, we’ll make it official and get you onboarded to our Trello workspace. This will make you follow and collaborate on your project easily.",
      theme: "badge-secondary",
    },
    {
      number: "03",
      title: "Project Setup",
      duration: "2-3 days",
      cta: "Share Assets",
      description:
        "You will provide detailed project information, assets and preferences through our centralized Trello system. No more scattered emails.",
      theme: "badge-warning",
    },
    {
      number: "04",
      title: "Research & Planning",
      duration: "3-5 days",
      cta: "Strategy Review",
      description:
        "We gather inspiration, conduct market research and design a compelling copy. Every design decision is strategic and purposeful.",
      theme: "badge-accent",
    },
    {
      number: "05",
      title: "Development",
      duration: "1-3 weeks",
      cta: "Track Progress",
      description:
        "Your project comes to life with regular progress updates via Trello. You'll see exactly what's being built and when.",
      theme: "badge-primary",
    },
    {
      number: "06",
      title: "Review & Refinement",
      duration: "2-4 days",
      cta: "Final Review",
      description:
        "We review everything together, make refinements, and ensure every detail meets your expectations before launch.",
      theme: "badge-error",
    },
    {
      number: "07",
      title: "Launch & Delivery",
      duration: "1 day",
      cta: "Go Live",
      description:
        "Your project goes live! We provide all necessary files, documentation for a smooth handover process.",
      theme: "badge-success",
    },
  ];

  useEffect(() => {
    // Animations and CSS transitions
    const animateOnScroll = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      // Animate hero elements
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll(".animate-on-scroll");
        elements.forEach((el, index) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(50px)";
          el.style.transition = `all 0.8s ease ${index * 0.1}s`;
          observer.observe(el);
        });
      }

      // Animate service cards
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll(".service-card");
        cards.forEach((card, index) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(60px) scale(0.9)";
          card.style.transition = `all 0.8s ease ${index * 0.1}s`;
          observer.observe(card);
        });
      }

      // Animate process steps
      stepsRefs.current.forEach((step, index) => {
        if (step) {
          const stepNumber = step.querySelector(".step-number");
          const stepCard = step.querySelector(".step-card");

          if (stepNumber && stepCard) {
            stepNumber.style.opacity = "0";
            stepNumber.style.transform = "scale(0)";
            stepNumber.style.transition =
              "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

            stepCard.style.opacity = "0";
            stepCard.style.transform =
              index % 2 === 0 ? "translateX(-100px)" : "translateX(100px)";
            stepCard.style.transition = "all 0.8s ease 0.3s";

            const stepObserver = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setTimeout(() => {
                      stepNumber.style.opacity = "1";
                      stepNumber.style.transform = "scale(1)";
                    }, index * 100);

                    //animate card
                    setTimeout(() => {
                      stepCard.style.opacity = "1";
                      stepCard.style.transform = "translateX(0)";
                    }, index * 100 + 200);

                    stepObserver.unobserve(entry.target);
                  }
                });
              },
              { threshold: 0.3 }
            );

            stepObserver.observe(step);
          }
        }
      });
    };

    const timeoutId = setTimeout(animateOnScroll, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full md:max-w-6xl mx-auto md:p-6 md:rounded-lg bg-base-100"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="text-center py-16 px-4">
        <h1 className="animate-on-scroll text-5xl md:text-6xl font-bold mb-6 text-primary">
          Putting Your Brand on the Digital Map
        </h1>
        <p className="animate-on-scroll text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
          From the first idea to the first click, we deliver experiences that
          make brands visible online
        </p>
        <div className="animate-on-scroll mt-8">
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
            What We Build
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your unique needs
          </p>
        </div>
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group card bg-base-200 border-2 border-base-300 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl text-base-content group-hover:text-primary transition-colors mb-4">
                  {service.title}
                </h2>
                <p className="mb-6 text-base-content/80 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/item">
                      <span className="text-primary mr-3 mt-1 font-bold text-lg group-hover/item:scale-110 transition-transform">
                        ✓
                      </span>
                      <span className="group-hover/item:text-primary text-accent transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-16 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-base-content">
            Our Process
          </h2>
          <h3 className="text-2xl text-primary mb-4">
            A Seamless Journey From Concept to Launch
          </h3>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Our proven process ensures transparency, quality and results. You'll
            know exactly what's happening at every step of your project.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRefs.current[index] = el)}
              className="group relative mb-16 last:mb-0"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-16 bg-primary/30 hidden md:block z-0"></div>
              )}

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Circular Number */}
                <div className="step-number flex-shrink-0 w-16 h-16 rounded-full border-4 border-primary bg-base-100 text-primary flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative z-20">
                  {step.number}
                </div>

                {/* Step Card */}
                <div className="step-card flex-1 card bg-base-200 shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-base-300 group-hover:border-primary/50">
                  <div className="card-body">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-base-content group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <div className="badge badge-primary badge-lg mt-2 lg:mt-0">
                        {step.duration}
                      </div>
                    </div>
                    <p className="mb-6 text-base-content/80 leading-relaxed text-lg">
                      {step.description}
                    </p>
                    <div className="mt-4">
                      <span
                        className={`badge ${step.theme} text-lg px-4 py-3 rounded-full shadow-sm`}
                      >
                        {step.cta}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-base-content/70 mb-10 leading-relaxed">
            We can make your idea live as soon as possible
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onOpenContact}
              type="button"
              className="btn btn-primary btn-lg px-10 group hover:scale-105 transition-transform"
            >
              <Send className="mr-2 group-hover:rotate-12 transition-transform" />
              Talk to us
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
      `}</style>
    </div>
  );
};

export default Workflow;
