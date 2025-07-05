import React from "react";

function Footer() {
  return (
    <footer className="footer bg-base-100 text-base-content px-6 pt-10 pb-16 border-t border-base-content/10 sm:footer-horizontal">
      <div>
        <span className="footer-title">Sarah Johnson</span>
        <p>Creative Developer & Designer</p>
      </div>
      <div>
        <span className="footer-title">Links</span>
        <a className="link link-hover" href="#home">
          Home
        </a>
        <a className="link link-hover" href="#about">
          About
        </a>
        <a className="link link-hover" href="#skills">
          Skills
        </a>
        <a className="link link-hover" href="#projects">
          Projects
        </a>
        <a className="link link-hover" href="#contact">
          Contact
        </a>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <a className="link link-hover" href="#">
          GitHub
        </a>
        <a className="link link-hover" href="#">
          LinkedIn
        </a>
        <a className="link link-hover" href="#">
          Twitter
        </a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover" href="#">
          Privacy Policy
        </a>
        <a className="link link-hover" href="#">
          Terms of Use
        </a>
      </div>
    </footer>
  );
}

export default Footer;
