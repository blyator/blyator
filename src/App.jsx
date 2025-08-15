import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import NekoCat from "./components/NekoCat";
import Loader from "./components/Loader";
import useLocoScroll from "./hooks/useLocoScroll";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Scroller from "./components/Scroller";
import BackToTopButton from "./components/BackToTopButton";
import ContactForm from "./components/ContactForm";
import Workflow from "./components/Workflow";
import WorkflowButton from "./components/WorkflowButton";

function App() {
  const [loading, setLoading] = useState(true);
  const [navigationLoading, setNavigationLoading] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);
  const scrollRef = useRef(null);
  const locoScroll = useLocoScroll(scrollRef, !loading);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollReady) return;

    const interval = setInterval(() => {
      if (locoScroll?.current) {
        setScrollReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [locoScroll, scrollReady]);

  // Update locomotive when route changes
  //enables scrolling in /workflow
  useEffect(() => {
    if (locoScroll?.current) {
      setTimeout(() => {
        locoScroll.current.update();
        locoScroll.current.scrollTo(0, { duration: 0, disableLerp: true });
      }, 100);
    }
  }, [location.pathname, locoScroll]);

  if (loading || navigationLoading) return <Loader />;

  return (
    <>
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
      {locoScroll && locoScroll.current && (
        <Scroller numberOfDots={60} locoScroll={locoScroll} />
      )}

      <NekoCat />
      <Privacy />
      <BackToTopButton
        locoScroll={locoScroll}
        isContactFormOpen={isContactFormOpen}
        onOpenContact={() => setIsContactFormOpen(true)}
      />

      {location.pathname !== "/workflow" && (
        <WorkflowButton
          locoScroll={locoScroll}
          isContactFormOpen={isContactFormOpen}
        />
      )}

      <div
        ref={scrollRef}
        data-scroll-container
        className="min-h-screen bg-base-200 dark:bg-base-100"
      >
        <div className="w-full md:max-w-6xl mx-auto md:p-6 md:rounded-lg md:shadow-2xl md:card bg-base-100 text-base-content dark:text-base-100 pb-24">
          <Navbar
            locoScroll={locoScroll}
            setNavigationLoading={setNavigationLoading}
          />

          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <section id="home" data-scroll-section>
                    <Hero
                      locoScroll={locoScroll}
                      onOpenContact={() => setIsContactFormOpen(true)}
                    />
                  </section>
                  <section id="about" data-scroll-section>
                    <About />
                  </section>
                  <section id="skills" data-scroll-section>
                    <TechStack />
                  </section>
                  <section id="projects" data-scroll-section>
                    <Projects />
                  </section>
                </main>
              }
            />

            <Route
              path="/workflow"
              element={
                <section id="workflow" data-scroll-section>
                  <Workflow onOpenContact={() => setIsContactFormOpen(true)} />
                </section>
              }
            />
          </Routes>

          <section id="contact" data-scroll-section>
            <Footer
              locoScroll={locoScroll}
              onOpenContact={() => setIsContactFormOpen(true)}
            />
            <Privacy />
            <Terms />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
