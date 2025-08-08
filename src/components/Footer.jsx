import React from "react";

function Footer({ locoScroll, onOpenContact }) {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-100 text-base-content border-t border-base-content/10 mb-10">
      <div
        id="contact"
        className="footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 pt-10 pb-10"
      >
        <div>
          <span className="footer-title">Billy Yator</span>
          <p>Creative Developer</p>
          <p>Got a question, proposal or project? </p>
          <button
            onClick={onOpenContact}
            className="underline text-primary cursor-pointer"
          >
            GET IN TOUCH
          </button>
        </div>

        <div>
          <span className="footer-title">Quick Links</span>
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
      </div>

      <div className="border-t border-base-content/10 py-4 px-6 text-sm text-base-content/60 flex justify-between items-center">
        <p>© {currentYear}</p>
        <p>
          Designed and developed by{" "}
          <a
            href="https://github.com/blyator"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-base-content"
          >
            Billy Yator
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
