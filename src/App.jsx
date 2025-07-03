import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import Hero from "./components/Hero";
import AppLayout from "./components/AppLayout";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col">
        <Toaster />

        <Navbar />
        <main className="flex-grow">
          <Hero />
        </main>
        <Footer />
      </div>
    </AppLayout>
  );
}

export default App;
