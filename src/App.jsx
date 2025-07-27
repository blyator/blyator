// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import NekoCat from "./components/NekoCat";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import useLocoScroll from "./hooks/useLocoScroll";

function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useLocoScroll(scrollRef, !loading);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Toaster />
      <NekoCat />

      <div
        ref={scrollRef}
        data-scroll-container
        className="min-h-screen bg-base-200 dark:bg-base-100"
      >
        <div className="w-full md:max-w-7xl mx-auto md:p-6 md:rounded-lg md:shadow-2xl md:card bg-base-100 text-base-content dark:text-base-100 pb-24">
          <Navbar />

          <main>
            <section data-scroll-section>
              <Hero />
            </section>

            <section data-scroll-section>
              <About />
            </section>

            <section data-scroll-section>
              <TechStack />
            </section>

            <section data-scroll-section>
              <Projects />
            </section>
          </main>

          <section data-scroll-section>
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
