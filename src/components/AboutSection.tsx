import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Layout, Palette, MousePointerClick } from "lucide-react";

const highlights = [
  {
    title: "User Research",
    description:
      "Understand users through research, competitor analysis, and identifying pain points.",
    icon: Search,
    animation: "bubbles",
  },
  {
    title: "Wireframing",
    description:
      "Plan user flows and layouts before designing high-fidelity screens.",
    icon: Layout,
    animation: "gridSlide",
  },
  {
    title: "Visual Design",
    description:
      "Create clean, modern interfaces with proper typography, spacing, hierarchy, and color.",
    icon: Palette,
    animation: "solidColor",
  },
  {
    title: "Interactive Prototyping",
    description:
      "Build interactive Figma prototypes to validate ideas before development.",
    icon: MousePointerClick,
    animation: "snakeWire",
  },
];

type HighlightCardProps = {
  item: (typeof highlights)[number];
  index: number;
  isVisible: boolean;
};

const HighlightCard = ({ item, index, isVisible }: HighlightCardProps) => {
  const [hovered, setHovered] = useState(false);

  const renderAnimation = () => {
    switch (item.animation) {
      case "bubbles":
        return (
          <div className="absolute inset-0 bg-white flex justify-center items-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-primary/40 rounded-full mx-1"
                initial={{ y: 0, opacity: 0 }}
                animate={
                  hovered
                    ? { y: [-10, 10, -10], opacity: [0, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  repeat: hovered ? Infinity : 0,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );
      case "gridSlide":
        return (
          <div className="absolute inset-0 bg-white grid grid-cols-3 gap-2 p-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-primary/20 rounded"
                initial={{ x: -30, opacity: 0 }}
                animate={
                  hovered ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: i * 0.15 }}
              />
            ))}
          </div>
        );
      case "solidColor":
        return (
          <motion.div
            className="absolute inset-0 bg-white rounded"
            animate={
              hovered
                ? { backgroundColor: ["#f43f5e", "#3b82f6", "#22c55e"] }
                : { backgroundColor: "#ffffff" }
            }
            transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
          />
        );
      case "snakeWire":
        return (
          <div className="absolute inset-0 bg-white flex justify-center items-center">
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              className="text-primary"
            >
              <motion.path
                d="M10 100 Q 50 50, 100 100 T 190 100"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={hovered ? { pathLength: [0, 1] } : { pathLength: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: hovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 min-h-[220px] transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(99,102,241,0.15)]"
    >
      {/* Hover animation inside box */}
      {renderAnimation()}

      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          className="inline-block mb-4"
        >
          <item.icon className="w-7 h-7 text-primary transition-all duration-300 group-hover:scale-125 group-hover:rotate-6" />
        </motion.div>

        <h3 className="text-lg font-semibold mb-3 text-gray-900 relative inline-block">
          {item.title}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </h3>

        <p className="text-sm text-gray-600 leading-7">{item.description}</p>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="about" className="pt-[120px] pb-16 bg-gray-50" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative inline-block text-3xl font-semibold tracking-tight mb-6 text-gray-900"
        >
          About Me
          <motion.span
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 -bottom-1 h-[3px] bg-primary rounded-full"
          />
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-gray-600 leading-8 mb-10"
        >
          My design philosophy centers on empathy, clarity, and functionality.
          I believe great design begins with understanding users deeply,
          then translating those insights into intuitive flows, clean visuals,
          and interactive prototypes. Every decision—from typography to spacing—
          is made to enhance usability and create digital experiences that feel effortless.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <HighlightCard
              key={item.title}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;