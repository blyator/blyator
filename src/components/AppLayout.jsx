import { useRef } from "react";
import useLocoScroll from "../hooks/useLocoScroll";

export default function AppLayout({ children }) {
  const scrollRef = useRef(null);
  useLocoScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="min-h-screen bg-base-200 dark:bg-base-100"
    >
      {/* Card layout on medium + screens */}
      <div className="w-full md:max-w-7xl mx-auto md:p-6 md:rounded-lg md:shadow-2xl md:card bg-base-100 text-base-content dark:text-base-100 pb-24">
        {children}
      </div>
    </div>
  );
}
