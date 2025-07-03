import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-200 dark:bg-base-100 py-10">
      {/* ✅ Desktop and Tablet: Use card */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto p-6 sm:rounded-lg shadow-2xl card bg-base-100 text-base-content dark:text-base-100">
          {children}
        </div>
      </div>

      {/* ✅ Mobile: Render raw without any wrappers */}
      <div className="block md:hidden">{children}</div>
    </div>
  );
}
