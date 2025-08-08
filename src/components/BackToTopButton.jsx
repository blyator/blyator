import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { CornerRightUp } from "lucide-react";

const BackToTopButton = ({ locoScroll, isContactFormOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const eventListenerSet = useRef(false);

  useEffect(() => {
    eventListenerSet.current = false;

    const setupScrollListener = () => {
      if (eventListenerSet.current) return;

      if (locoScroll?.current) {
        const handleScroll = ({ scroll }) => {
          setIsVisible(scroll.y > 400);
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
        const handleScroll = () => {
          setIsVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        eventListenerSet.current = true;

        return () => {
          window.removeEventListener("scroll", handleScroll);
          eventListenerSet.current = false;
        };
      }
    };

    if (locoScroll?.current) {
      return setupScrollListener();
    }

    const checkInterval = setInterval(() => {
      if (locoScroll?.current && !eventListenerSet.current) {
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
  }, [locoScroll]);

  const scrollToTop = () => {
    if (locoScroll?.current) {
      locoScroll.current.scrollTo(0, {
        duration: 1000,
        easing: [0.25, 0.0, 0.35, 1.0],
        disableLerp: false,
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible || isContactFormOpen) return null;

  return (
    <StyledWrapper className="md:fixed bottom-30 right-20 z-[9999]">
      <button
        className="btn btn-circle btn-primary hover:btn-secondary group"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <CornerRightUp
          className="group-hover:opacity-0 transition-all duration-300"
          size={16}
        />
        <span className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300">
          Back to Top
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    width: 45px;
    height: 45px;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
    transition: all 0.3s ease;

    &:hover {
      width: 140px;
      border-radius: 9999px;
    }
  }
`;

export default BackToTopButton;
