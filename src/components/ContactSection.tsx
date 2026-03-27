import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="pt-[120px] pb-24">
      <div className="mx-auto max-w-content px-6">

        <motion.h2
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl font-semibold tracking-tight mb-8"
        >
          Contact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg"
        >
          {/* ✅ UPDATED TEXT ONLY */}
          <p className="font-body text-sm text-muted-foreground mb-6">
            I'm open to internships and entry-level developer opportunities. Feel free to reach out.
          </p>

          {/* ✅ IMPROVED BUTTON (style only) */}
          <a
            href="/resume.pdf"
            download="Purusoth_Resume.pdf"
            className="inline-flex items-center gap-2 font-body text-sm px-6 py-3 bg-foreground text-background rounded-md 
            hover:bg-primary hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out mb-10"
          >
            📄 Download Resume
          </a>

          {/* 🔥 YOUR ORIGINAL SOCIAL LINKS (UNCHANGED UI) */}
          <div className="space-y-4">

            {/* GitHub */}
            <a
              href="https://github.com/Purusothaman5767"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="relative">
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
              </span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                →
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/purusothaman-m-a173553b6"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="relative">
                LinkedIn
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
              </span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                →
              </span>
            </a>

            {/* Email */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=purusothaman5767@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="relative">
                purusothaman5767@gmail.com
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
              </span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                →
              </span>
            </a>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;