import { useLayoutEffect, useRef } from "react";
import { gsap, Back, Elastic, Expo, Power3 } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import talkButton from "../assets/talkButton.png";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const heroRef = useRef();
  const talkRef = useRef(null);
  const talkPulseRef = useRef(null);
  const desRef = useRef(null);
  const msgRef = useRef(null);
  const calloutRef = useRef(null);
  const jokeRef = useRef(null);
  const cursorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".letter", { fontSize: 0 });
      gsap.set(desRef.current, { opacity: 0, y: 70 });
      gsap.set(".msg-line", { opacity: 0, y: 30 });
      gsap.set(".talk-wrapper", { opacity: 0 });
      gsap.set(calloutRef.current, { scale: 0, opacity: 0 });
      gsap.set(jokeRef.current, { opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(calloutRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: Back.easeOut.config(1.7),
      })
        .to(
          ".letter",
          {
            fontSize: "3rem",
            duration: 0.15,
            stagger: 0.12,
          },
          "+=0.2"
        )
        .to(
          desRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: Back.easeOut.config(1.7) },
          "+=0.3"
        )
        .to(
          ".msg-line",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: Power3.easeOut,
            stagger: 0.3,
          },
          "+=0.2"
        )

        .to(jokeRef.current, { opacity: 1, duration: 0.5 }, "+=0.2")
        .to(cursorRef.current, { opacity: 1, duration: 0.1 }, "-=0.5")

        .to(jokeRef.current, {
          duration: 2.5,
          text: "sudo rm -rf / ..",
          ease: "none",
        })
        .to({}, { duration: 1 })

        .to(jokeRef.current, {
          duration: 0.5,
          text: "sudo rm -rf /",
          ease: "none",
        })
        .to(jokeRef.current, {
          duration: 0.5,
          text: "sudo rm",
          ease: "none",
        })
        .to(jokeRef.current, {
          duration: 0.5,
          text: "sudo",
          ease: "none",
        })
        .to(jokeRef.current, {
          duration: 0.5,
          text: "",
          ease: "none",
        })

        .to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
        .to(".talk-wrapper", { opacity: 1, duration: 0.5 }, "+=0.5")
        .to(
          talkRef.current,
          {
            duration: 0.4,
            scale: 0.95,
            rotation: 5,
            ease: Back.easeOut.config(1.7),
          },
          ">"
        )
        .to(
          talkPulseRef.current,
          {
            duration: 0.5,
            scale: 0.9,
            opacity: 1,
          },
          "-=0.4"
        )
        .to(
          talkRef.current,
          {
            duration: 1.2,
            scale: 1,
            rotation: 0,
            ease: Elastic.easeOut.config(2.5, 0.5),
          },
          ">"
        )
        .to(
          talkPulseRef.current,
          {
            duration: 1.1,
            scale: 2.5,
            opacity: 0,
            ease: Expo.easeOut,
          },
          "-=1.0"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={heroRef}
      className="lg:mt-30 mt-20 mb-34 md:flex items-start gap-10 px-6 md:px-16"
    >
      {/* Left content */}
      <div className="md:flex-1 text-center md:text-left">
        <div
          ref={calloutRef}
          className="callout bg-secondary shadow rounded-full px-6 py-2 font-bold inline-block relative mb-4 mx-auto md:ml-8 md:mx-0"
        >
          It's me
        </div>

        <h1 className="mb-6 text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent leading-tight text-center md:text-left">
          <span className="block lg:inline">
            {"Billy".split("").map((char, i) => (
              <span key={`b${i}`} className="letter inline-block">
                {char}
              </span>
            ))}
          </span>
          <span className="block lg:inline lg:ml-6">
            {"Yator".split("").map((char, i) => (
              <span key={`y${i}`} className="letter inline-block">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={desRef}
          className="uppercase font-bold mb-4 text-lg text-accent"
        >
          Full-stack Developer
        </p>

        <div
          ref={msgRef}
          className="text-lg mt-6 mb-8 max-w-xs text-base-content mx-auto md:mx-0 leading-relaxed"
        >
          <div className="msg-line mb-2">
            Software Developer from Nairobi, Kenya
          </div>
          <div className="msg-line mb-2">
            with solid experience building modern
          </div>
          <div className="msg-line">
            web apps using clean code and powerful tools.
          </div>
          <div className="relative">
            <div
              ref={jokeRef}
              className="msg-line text-accent italic mt-2 font-mono inline-block"
            ></div>
            <span
              ref={cursorRef}
              className="ml-1 h-5 w-2 bg-primary inline-block align-middle"
            ></span>
          </div>
        </div>

        <div className="talk-wrapper mt-10 relative flex justify-center md:justify-start md:ml-10">
          <a
            href="mailto:dmnbilly@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <div
              ref={talkRef}
              className="relative z-10 flex items-center justify-center rounded-full border border-white bg-[#f3877e] h-[100px] w-[100px]"
            >
              <img src={talkButton} alt="talk button" className="h-[70%]" />
              <div
                ref={talkPulseRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#e45447] rounded-full h-[120px] w-[120px] opacity-0 scale-0 z-0"
              ></div>
            </div>
          </a>
        </div>
      </div>

      {/* Right image */}
      <div className="md:flex-1 mt-10 md:mt-0">
        <img
          className="w-11/12 max-w-xs mx-auto md:max-w-md md:w-96 -scale-x-100"
          src="/hero.png"
          alt="Bill photo"
        />
      </div>
    </header>
  );
}
