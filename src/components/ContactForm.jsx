import React, { useState, useRef, useEffect } from "react";
import { X, Phone, Mail, ArrowRight } from "lucide-react";

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    service: "",
    budget: "",
  });

  const overlayRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Show overlay
      overlayRef.current.style.display = "flex";
      // Animate overlay opacity
      overlayRef.current.style.opacity = "0";
      setTimeout(() => {
        overlayRef.current.style.opacity = "1";
      }, 10);

      // Animate form sliding in from right
      formRef.current.style.transform = "translateX(100%)";
      setTimeout(() => {
        formRef.current.style.transform = "translateX(0%)";
      }, 10);
    } else {
      // Animate form sliding out to right
      formRef.current.style.transform = "translateX(100%)";
      // Animate overlay fade out
      overlayRef.current.style.opacity = "0";

      // Hide overlay after animation
      setTimeout(() => {
        overlayRef.current.style.display = "none";
      }, 300);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-end p-4"
      style={{
        display: "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        transition: "opacity 0.3s ease",
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={formRef}
        className="bg-base-100 text-base-content w-full max-w-lg max-h-[90vh] shadow-2xl flex flex-col rounded-2xl overflow-hidden"
        style={{
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-base-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Get In Touch</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-base-200 rounded-full transition-colors cursor-pointer"
            >
              <X size={24} className="text-base-content" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Quick Action Buttons */}
          <div className="mb-6 space-y-3">
            <button
              onClick={() =>
                window.open("https://calendly.com/your-link", "_blank")
              }
              className="w-full bg-primary text-primary-content py-3 px-4 rounded-lg font-medium hover:bg-primary-focus transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone size={18} />
              Book a Call
            </button>
            <button
              onClick={() =>
                (window.location.href = "mailto:dmnbilly@gmail.com")
              }
              className="w-full bg-neutral text-neutral-content py-3 px-4 rounded-lg font-medium hover:bg-neutral-focus transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail size={18} />
              Send me an Email
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-base-100 text-base-content">
                or fill out the form
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">
                Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full px-3 py-2.5 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Email <span className="text-error">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Ask anything <span className="text-error">*</span>
              </label>
              <textarea
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                placeholder="Describe your project goals, requirements, and vision..."
                rows={3}
                className="w-full px-3 py-2.5 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-3">
                How can I help you?
              </label>
              <div className="space-y-2">
                {[
                  "Business Website",
                  "Personal Portfolio",
                  "Web App Development",
                ].map((service) => (
                  <label
                    key={service}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      checked={formData.service === service}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 text-primary cursor-pointer"
                    />
                    <span className="text-base-content">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Your Budget</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-base-100"
              >
                <option value="">Select your budget range</option>
                <option value="50k-100k">KSh 50,000 - KSh 100,000</option>
                <option value="100k-160k">KSh 100,000 - KSh 150,000</option>
                <option value="150k-250k">KSh 150,000 - KSh 250,000</option>
                <option value="250k-plus">KSh 250,000+</option>
              </select>
            </div>

            <button
              onClick={() => {
                window.open("#workflow", "_blank");
              }}
              className="w-full bg-accent text-accent-content py-3 rounded-lg font-medium hover:bg-accent-focus transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowRight size={18} />
              View Our Workflow
            </button>

            <button
              onClick={handleSubmit}
              className="w-full bg-neutral text-neutral-content py-3 rounded-lg font-medium hover:bg-neutral-focus transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
