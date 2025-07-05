import React, { useState, useEffect } from "react";
import { themeChange } from "theme-change";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark");

  useEffect(() => {
    themeChange(false);
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", savedTheme);
    setActiveTheme(savedTheme || "light");
  }, []);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 glass-effect">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <ul
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow ${
              isOpen ? "block" : "hidden"
            } lg:hidden`}
          >
            <li>
              <a
                href="#home"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-2xl text-primary">
          Portfolio
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              href="#home"
              className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105 hover:underline"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105 hover:underline"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105 hover:underline"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105 hover:underline"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105 hover:underline"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105 hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex flex-col items-end gap-1">
        <span className="text-sm text-base-content hidden lg:block">
          Themes
        </span>
        <div className="flex gap-2 items-center">
          <button
            className={`btn btn-circle w-4 h-4 bg-primary ${
              activeTheme === "retro"
                ? "ring-1 ring-primary ring-offset-1"
                : "hover:bg-primary-focus"
            } transition-all duration-300 hover:scale-110`}
            onClick={() => changeTheme("retro")}
            title="Retro Theme"
          ></button>
          <button
            className={`btn btn-circle w-4 h-4 bg-secondary ${
              activeTheme === "dracula"
                ? "ring-1 ring-secondary ring-offset-1"
                : "hover:bg-secondary-focus"
            } transition-all duration-300 hover:scale-110`}
            onClick={() => changeTheme("forest")}
            title="Dracula Theme"
          ></button>
          <button
            className={`btn btn-circle w-4 h-4 bg-accent ${
              activeTheme === "dark"
                ? "ring-1 ring-accent ring-offset-1"
                : "hover:bg-accent-focus"
            } transition-all duration-300 hover:scale-110`}
            onClick={() => changeTheme("dark")}
            title="Dark Theme"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
