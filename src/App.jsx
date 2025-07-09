// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Hero from "./components/Hero";
import NekoCat from "./components/NekoCat";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AppLayout>
      <Toaster />
      <NekoCat />
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
      <section data-scroll-section id="contact">
        <Footer />
      </section>
    </AppLayout>
  );
}

export default App;
