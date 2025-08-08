import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    service: "",
    budget: "",
  });

  const [submissionState, setSubmissionState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null,
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

  // Reset submission state when form opens
  useEffect(() => {
    if (isOpen) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: null,
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.project) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: "Please fill in all required fields.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: "Please enter a valid email address.",
      });
      return;
    }

    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      const response = await fetch("https://formspree.io/f/xnnzozaz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.project,
          service: formData.service,
          budget: formData.budget,
          _subject: `New contact form submission from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmissionState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });

        // Reset form data
        setFormData({
          name: "",
          email: "",
          project: "",
          service: "",
          budget: "",
        });

        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error(
          `Form submission failed with status: ${response.status}`
        );
      }
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: `Failed to send message: ${error.message}. Please try again or use the email button above.`,
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-end p-10"
      style={{
        display: "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        transition: "opacity 0.3s ease",
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={formRef}
        className="bg-base-100 text-base-content w-full max-w-lg max-h-[95vh] shadow-2xl flex flex-col rounded-2xl overflow-hidden"
        style={{
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-base-200 relative">
          <div className="bg-neutral rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-neutral-content text-sm font-medium uppercase tracking-wide">
                QUICK RESPONSE
              </span>
            </div>
            <p className="text-neutral-content text-sm">
              We respond within 2-4 hours during business hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-red-500 rounded-full btn btn-error w-9 h-9 transition-colors cursor-pointer"
          >
            <X size={24} className="text-base-content" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Success Message */}
          {submissionState.isSuccess && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle size={20} />
                <span className="font-medium">Message sent successfully!</span>
              </div>
              <p className="text-sm mt-1 text-success/80">
                Thank you for reaching out. We'll get back to you soon!
              </p>
            </div>
          )}

          {/* Error Message */}
          {submissionState.error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center gap-2 text-error">
                <AlertCircle size={20} />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm mt-1 text-error/80">
                {submissionState.error}
              </p>
            </div>
          )}

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
                or fill out this form
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
                required
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
                required
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
                required
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
              type="button"
              className="w-full bg-accent text-accent-content py-3 rounded-lg font-medium hover:bg-accent-focus transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowRight size={18} />
              View Our Workflow
            </button>

            <button
              onClick={handleSubmit}
              disabled={submissionState.isSubmitting}
              className="w-full bg-neutral text-neutral-content py-3 rounded-lg font-medium hover:bg-neutral-focus transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submissionState.isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
