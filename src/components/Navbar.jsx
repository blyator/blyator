import React, { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import BouncyLink from "./BouncyLink";

function Navbar({ locoScroll }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark");

  useEffect(() => {
    themeChange(false);
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setActiveTheme(savedTheme);
  }, []);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
  };

  const handleSmoothScroll = (target) => {
    const element = document.querySelector(target);
    if (!element) return;

    if (locoScroll && locoScroll.current) {
      locoScroll.current.scrollTo(element, {
        offset: -100,
        duration: 1500,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setIsOpen(false);
  };

  return (
    <div className="navbar bg-base-100/80 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      <div className="navbar-start">
        <div className="text-3xl text-primary text-bold font-poppins">
          <BouncyLink text="blyator" href="/" />
        </div>
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
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <BouncyLink
              text="My &nbsp; Story"
              href="#about"
              onClick={() => handleSmoothScroll("#about")}
            />
          </li>
          <li>
            <BouncyLink
              text="Tech &nbsp; Stack"
              href="#skills"
              onClick={() => handleSmoothScroll("#skills")}
            />
          </li>
          <li>
            <BouncyLink
              text="Creations"
              href="#projects"
              onClick={() => handleSmoothScroll("#projects")}
            />
          </li>
          <li>
            <BouncyLink
              text="Say &nbsp; Hi"
              href="#contact"
              onClick={() => handleSmoothScroll("#contact")}
            />
          </li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex flex-col items-end gap-1">
        <span className="mr-4 text-sm text-primary">Themes</span>
        <div className="flex gap-2 items-center">
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
      </div>
    </div>
  );
}

export default Navbar;
