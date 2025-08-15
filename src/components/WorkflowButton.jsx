import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const WorkflowButton = ({ locoScroll, isContactFormOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const eventListenerSet = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Reset when route changes
  useEffect(() => {
    setIsVisible(false);
    eventListenerSet.current = false;
  }, [location.pathname]);

  useEffect(() => {
    const setupScrollListener = () => {
      if (eventListenerSet.current) return;

      // Always use regular scroll on mobile
      const isMobile = window.innerWidth <= 768;

      if (locoScroll?.current && !isMobile) {
        const handleScroll = ({ scroll, limit }) => {
          const scrollPercentage = (scroll.y / limit.y) * 100;
          setIsVisible(scrollPercentage > 60); // Show after 60% scrolling
        };

        locoScroll.current.on("scroll", handleScroll);
        eventListenerSet.current = true;

        return () => {
          if (locoScroll.current) {
            locoScroll.current.off("scroll", handleScroll);
          }
          eventListenerSet.current = false;
        };
      } else {
        // Use regular scroll listener for mobile
        const handleScroll = () => {
          const scrollPercentage =
            (window.scrollY /
              (document.body.scrollHeight - window.innerHeight)) *
            100;
          setIsVisible(scrollPercentage > 60);
        };

        window.addEventListener("scroll", handleScroll);
        eventListenerSet.current = true;

        return () => {
          window.removeEventListener("scroll", handleScroll);
          eventListenerSet.current = false;
        };
      }
    };

    // delay for locomotive be ready after route change
    const timeoutId = setTimeout(() => {
      if (locoScroll?.current && window.innerWidth > 768) {
        setupScrollListener();
      } else {
        const checkInterval = setInterval(() => {
          if (
            locoScroll?.current &&
            !eventListenerSet.current &&
            window.innerWidth > 768
          ) {
            clearInterval(checkInterval);
            setupScrollListener();
          }
        }, 100);

        const timeout = setTimeout(() => {
          clearInterval(checkInterval);
          if (!eventListenerSet.current) {
            setupScrollListener();
          }
        }, 2000);

        return () => {
          clearInterval(checkInterval);
          clearTimeout(timeout);
        };
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [locoScroll, location.pathname]);

  const handleWorkflowClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (locoScroll?.current && window.innerWidth > 768) {
      locoScroll.current.scrollTo(0, {
        duration: 800,
        disableLerp: false,
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Navigate after 1sec
    setTimeout(() => {
      navigate("/workflow");
      setIsLoading(false);
      setIsVisible(false);
    }, 1200);
  };

  if (isLoading) return <Loader />;

  if (!isVisible || isContactFormOpen) return null;

  return (
    <div className="fixed bottom-10 right-5 z-[988]">
      <button
        onClick={handleWorkflowClick}
        className="btn btn-circle btn-primary hover:btn-secondary flex items-center justify-center gap-2 hover:transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        style={buttonStyles}
        aria-label="View workflow"
        disabled={isLoading}
      >
        <ArrowRight size={14} />
        <span className="sm:inline">View Workflow</span>
      </button>
    </div>
  );
};

// CSS styles for button
const buttonStyles = {
  width: "auto",
  padding: "0 20px",
  height: "40px",
  boxShadow: "0px 0px 0px 3px rgba(180, 160, 255, 0.253)",
  borderRadius: "9999px",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

export default WorkflowButton;
