import React, { useState, useEffect, useRef } from "react";
import { themeChange } from "theme-change";
import gsap from "gsap";
import BouncyLink from "./BouncyLink";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark");
  const menuRef = useRef(null);
  const tl = useRef();

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

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true }).fromTo(
      menuRef.current,
      { y: -20, opacity: 0, display: "none" },
      {
        y: 0,
        opacity: 1,
        display: "block",
        duration: 0.3,
        ease: "power2.out",
      }
    );
    return () => tl.current.kill();
  }, []);

  useEffect(() => {
    if (isOpen) {
      menuRef.current.style.display = "block";
      tl.current.play();
    } else {
      tl.current.reverse().then(() => {
        if (!isOpen) menuRef.current.style.display = "none";
      });
    }
  }, [isOpen]);

  return (
    <div className="navbar bg-base-100/80 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      {/* Portfolio moved left */}
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-2xl text-primary">
          Portfolio
        </a>
      </div>

      <div className="navbar-end lg:hidden flex items-center gap-3">
        <div className="flex gap-2">
          <button
            className={`btn btn-circle w-6 h-6 bg-primary ${
              activeTheme === "retro"
                ? "ring-1 ring-primary ring-offset-1"
                : "hover:bg-primary-focus"
            }`}
            onClick={() => changeTheme("retro")}
            title="Retro Theme"
          />
          <button
            className={`btn btn-circle w-6 h-6 bg-secondary ${
              activeTheme === "forest"
                ? "ring-1 ring-secondary ring-offset-1"
                : "hover:bg-secondary-focus"
            }`}
            onClick={() => changeTheme("forest")}
            title="Forest Theme"
          />
          <button
            className={`btn btn-circle w-6 h-6 bg-accent ${
              activeTheme === "dark"
                ? "ring-1 ring-accent ring-offset-1"
                : "hover:bg-accent-focus"
            }`}
            onClick={() => changeTheme("dark")}
            title="Dark Theme"
          />
        </div>

        <div className="dropdown dropdown-end">
          <button
            className="btn btn-ghost btn-circle text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
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
            ref={menuRef}
            className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow-lg space-y-3 text-lg right-0"
            style={{ display: "none" }}
          >
            <li>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="py-2 text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                My Story
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={() => setIsOpen(false)}
                className="py-2 text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Tech Stack
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="py-2 text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Creations
              </a>
            </li>

            <li>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="py-2 text-primary hover:text-primary-focus active:text-primary-content transition-all duration-300 hover:scale-105"
              >
                Say Hi 💬
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <BouncyLink text="My &nbsp; Story" href="#about" />
          </li>
          <li>
            <BouncyLink text="Tech &nbsp; Stack" href="#skills" />
          </li>
          <li>
            <BouncyLink text="Creations" href="#projects" />
          </li>
          <li>
            <BouncyLink text="Say &nbsp; Hi" href="#contact" />
          </li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex flex-col items-end gap-1">
        <span className="text-sm text-base-content">Themes</span>
        <div className="flex gap-2 items-center">
          <button
            className={`btn btn-circle w-4 h-4 bg-primary ${
              activeTheme === "retro"
                ? "ring-1 ring-primary ring-offset-1"
                : "hover:bg-primary-focus"
            }`}
            onClick={() => changeTheme("retro")}
            title="Retro Theme"
          />
          <button
            className={`btn btn-circle w-4 h-4 bg-secondary ${
              activeTheme === "forest"
                ? "ring-1 ring-secondary ring-offset-1"
                : "hover:bg-secondary-focus"
            }`}
            onClick={() => changeTheme("forest")}
            title="Forest Theme"
          />
          <button
            className={`btn btn-circle w-4 h-4 bg-accent ${
              activeTheme === "dark"
                ? "ring-1 ring-accent ring-offset-1"
                : "hover:bg-accent-focus"
            }`}
            onClick={() => changeTheme("dark")}
            title="Dark Theme"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
