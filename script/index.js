const imageContainer = document.querySelector(".img-container");
const socialContainer = document.querySelector(".social-container");
const hoverArea = document.querySelector(".img-info-container");

imageContainer.style.transition = ".5s all cubic-bezier(0,1.19,1,.98)";
socialContainer.style.transition = ".5s all cubic-bezier(0,1.19,1,.98)";
imageContainer.style.padding = "-100px";

let onHover = false;

function hoverEffect() {
  imageContainer.style.padding = "0px 0px 0px 25px";
  socialContainer.style.paddingLeft = "200px";
  socialContainer.style.paddingRight = "30px";
}

function unHoverEffect() {
  imageContainer.style.padding = "0";
  socialContainer.style.paddingLeft = "0";
}

window.addEventListener("load", () => {
  setTimeout(() => {
    hoverArea.addEventListener("mouseover", () => {
      hoverEffect();
      onHover = true;
    });
    hoverArea.addEventListener("mouseout", () => {
      onHover = false;
      setTimeout(() => {
        if (socialContainer.style.paddingLeft === "200px" && !onHover) {
          setTimeout(() => {
            unHoverEffect();
          }, 500);
        }
      }, 100);
    });
  }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector(".skill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsSection.style.animation = "none";
          void skillsSection.offsetWidth;
          skillsSection.style.animation = "slideIn 0.8s ease-out both";
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(skillsSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const projectSection = document.querySelector(".project-container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          projectSection.style.animation = "none";
          void projectSection.offsetWidth;
          projectSection.style.animation = "slideUp 0.8s ease-out both";
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(projectSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const repositoryContainers = document.querySelectorAll(".repository-container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    { threshold: 0.5 }
  );

  repositoryContainers.forEach((container) => {
    observer.observe(container);
  });
});