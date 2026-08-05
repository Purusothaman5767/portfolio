import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import emailjs from "@emailjs/browser";

const contacts = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/purusothaman5767",
    href: "https://linkedin.com/in/purusothaman5767",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/Purusothaman5767",
    href: "https://github.com/Purusothaman5767",
    icon: Github,
  },
];

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if keys are missing
    if (!serviceId || !templateId || !publicKey) {
      alert(
        "EmailJS keys missing!\n\nPlease check your .env file and restart the server."
      );
      return;
    }

    setIsSubmitting(true);

    emailjs
      .sendForm(serviceId, templateId, form, publicKey)
      .then(
        () => {
          alert("Message sent successfully!");
          form.reset();
        },
        (error: any) => {
          console.error("EmailJS Error:", error);
          alert(
            "Failed to send message:\n" +
              (error?.text || error?.message || JSON.stringify(error) || "Unknown error")
          );
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="pt-[120px] pb-24 bg-gray-50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold tracking-tight mb-4 text-gray-900"
          >
            Let’s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 max-w-xl mb-10 leading-7"
          >
            I’m passionate about designing intuitive digital experiences and
            always open to UI/UX internships, freelance opportunities, and
            collaborations. If you have a project or opportunity, I’d love to
            hear from you.
          </motion.p>

          {/* Direct Message Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 mb-10"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Write your message..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {contacts.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium text-gray-500">
                    {item.label}
                  </span>
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 font-semibold text-sm hover:text-primary transition-colors break-all"
                >
                  {item.value}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/20 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </motion.div>
      </div>

      {/* Footer Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-sm text-gray-500 mt-16"
      >
        Thank you for visiting my portfolio. Let’s create meaningful digital
        experiences together.
      </motion.p>
    </section>
  );
};

export default ContactSection;