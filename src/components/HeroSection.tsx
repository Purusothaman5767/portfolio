import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleViewCaseStudies = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Moving Glow */}
      <motion.div
        animate={{ x: mousePosition.x - 150, y: mousePosition.y - 150 }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
        className="pointer-events-none fixed w-[280px] h-[280px] rounded-full bg-purple-300/30 blur-[100px] z-0"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div>
          <motion.h1
            custom={1}
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4 text-gray-900"
          >
            Purusothaman&nbsp;M
          </motion.h1>

          <motion.h2
            custom={2}
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="text-2xl font-semibold text-purple-700 mb-6"
          >
            UI/UX Designer
          </motion.h2>

          <motion.p
            custom={3}
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="text-lg text-gray-600 max-w-[540px] leading-8 mb-10"
          >
            I design intuitive, user-centered digital experiences that solve real
            problems through research, wireframing, prototyping, and clean visual
            design.
          </motion.p>

          <motion.div
            custom={4}
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="flex gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewCaseStudies}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 text-white font-medium shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-500"
            >
              View Case Studies
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download="Purusoth_Resume.pdf"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Profile Photo only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative flex justify-center md:justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-full border-4 border-white shadow-xl"
          >
            <img
              src="/Purusoth.png"
              alt="Purusothaman M"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-gray-500"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;