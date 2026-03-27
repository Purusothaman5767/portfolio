import { motion } from "framer-motion";

const HeroSection = () => {
  const handleViewProjects = () => {
    const el = document.getElementById("projects");
    if (!el) return;
    const start = window.scrollY;
    const end = el.getBoundingClientRect().top + window.scrollY;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + (end - start) * progress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return (
    <section
      className="min-h-screen flex items-center relative"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto max-w-content px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase mb-3"
          >
            Student Developer
          </motion.p>

          {/* ✅ FIXED NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4"
          >
            Purusothaman&nbsp;M
          </motion.h1>

          {/* TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-body text-lg sm:text-xl text-muted-foreground max-w-[520px] leading-relaxed mb-4"
          >
            Building real-world applications using Java, React, and MongoDB with a focus on clean UI and practical solutions.
          </motion.p>

          {/* HIGHLIGHT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-body text-sm text-primary mb-8"
          >
            • 2+ Projects Built • Full-Stack Learner • Exploring Cloud Computing
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4"
          >
            <button
              onClick={handleViewProjects}
              className="font-body text-sm px-6 py-3 bg-primary text-primary-foreground rounded-lg 
              hover:scale-105 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              🚀 View My Work
            </button>

            <a
              href="/resume.pdf"
              download="Purusoth_Resume.pdf"
              className="font-body text-sm px-6 py-3 border border-border text-foreground rounded-lg 
              hover:border-primary hover:text-primary hover:scale-105 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              📄 Download Resume
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center md:justify-end"
        >
          <div
            className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-muted
            border-4 border-border shadow-xl hover:scale-105 transition-transform duration-500 flex items-center justify-center text-muted-foreground font-body text-sm"
          >
            Photo Placeholder
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;