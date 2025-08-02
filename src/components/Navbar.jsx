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

  const themes = [
    { name: "Retro", value: "retro" },
    { name: "Forest", value: "forest" },
    { name: "Dracual", value: "dracula" },
    { name: "Dark", value: "sunset" },
  ];

  const getThemeDotColor = (theme) => {
    const colorMap = {
      retro: "bg-amber-300",
      forest: "bg-emerald-600",
      sunset: "bg-yellow-600",
      dracula: "bg-rose-300",
    };
    return colorMap[theme] || "bg-primary";
  };

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
          {themes.map((theme) => (
            <button
              key={theme.value}
              className={`btn btn-circle w-5 h-5 ${getThemeDotColor(
                theme.value
              )} ${
                activeTheme === theme.value
                  ? "ring-1 ring-offset-1"
                  : "hover:opacity-80"
              }`}
              onClick={() => changeTheme(theme.value)}
              title={`${theme.name}`}
            />
          ))}
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
        <span className="mr-9 text-sm text-primary">Themes</span>
        <div className="flex gap-2 items-center">
          {themes.map((theme) => (
            <button
              key={theme.value}
              className={`btn btn-circle w-6 h-6 ${getThemeDotColor(
                theme.value
              )} ${
                activeTheme === theme.value
                  ? "ring-1 ring-offset-1"
                  : "hover:opacity-80"
              }`}
              onClick={() => changeTheme(theme.value)}
              title={`${theme.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
