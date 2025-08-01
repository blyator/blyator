import React from "react";

function Footer({ locoScroll }) {
  const handleSmoothScroll = (target) => {
    const element = document.querySelector(target);
    if (!element) return;

    if (locoScroll?.current) {
      locoScroll.current.scrollTo(element, {
        offset: -100,
        duration: 1500,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer
      id="contact"
      className="footer bg-base-100 text-base-content px-6 pt-10 pb-16 border-t border-base-content/10 sm:footer-horizontal"
    >
      <div>
        <span className="footer-title">Billy Yator</span>
        <p>Creative Developer</p>
      </div>

      <div>
        <span className="footer-title">Links</span>
        <button
          className="link link-hover text-left"
          onClick={() => handleSmoothScroll("#home")}
        >
          Home
        </button>
        <button
          className="link link-hover text-left"
          onClick={() => handleSmoothScroll("#about")}
        >
          My story
        </button>
        <button
          className="link link-hover text-left"
          onClick={() => handleSmoothScroll("#skills")}
        >
          Skills & Tech
        </button>
        <button
          className="link link-hover text-left"
          onClick={() => handleSmoothScroll("#projects")}
        >
          Projects
        </button>
      </div>

      <div>
        <span className="footer-title">Social</span>
        <a
          className="link link-hover"
          href="https://github.com/blyator"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="link link-hover"
          href="https://www.linkedin.com/in/billyyator/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="link link-hover"
          href="https://twitter.com/viper_droid"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </div>

      <div>
        <span className="footer-title">Legal</span>
        <a
          className="link link-hover"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("privacy_modal")?.showModal();
          }}
        >
          Privacy Policy
        </a>
        <a
          className="link link-hover"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("terms_modal")?.showModal();
          }}
        >
          Terms of Use
        </a>
      </div>
    </footer>
  );
}

export default Footer;
