import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "UI/UX Designer",
  "Full Stack Developer",
];

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 90);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{ x: mousePosition.x - 150, y: mousePosition.y - 150 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="pointer-events-none fixed w-[300px] h-[300px] rounded-full bg-primary/10 blur-[110px] z-0"
      />

      {/* Floating Blob 2 (purple only) */}
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-content px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3"
          >
            Student Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-2"
          >
            Purusothaman&nbsp;M
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-primary mb-6 h-8"
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-[540px] leading-8 mb-8"
          >
            Passionate about designing intuitive user experiences and building
            responsive web applications using React and modern web technologies.
            I enjoy transforming ideas into clean, user-friendly digital
            products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              onClick={handleViewProjects}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              🚀 View My Work
            </button>
            <a
              href="/resume.pdf"
              download="Purusoth_Resume.pdf"
              className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:text-primary hover:scale-105 transition-all duration-300"
            >
              📄 Download Resume
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Glow Behind Image */}
          <div className="absolute w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center md:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -5 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-black/5 blur-2xl scale-105"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <img
                  src="/Purusoth.png"
                  alt="Purusothaman M"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
