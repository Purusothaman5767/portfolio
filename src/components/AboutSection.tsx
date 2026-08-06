import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Layout, Palette, MousePointerClick } from "lucide-react";

const highlights = [
  {
    title: "User Research",
    description:
      "Understand users through research, competitor analysis, and identifying pain points.",
    icon: Search,
    animation: "scanInsights",
  },
  {
    title: "Wireframing",
    description:
      "Plan user flows and layouts before designing high-fidelity screens.",
    icon: Layout,
    animation: "blueprintDraw",
  },
  {
    title: "Visual Design",
    description:
      "Create clean, modern interfaces with proper typography, spacing, hierarchy, and color.",
    icon: Palette,
    animation: "paletteBrush",
  },
  {
    title: "Interactive Prototyping",
    description:
      "Build interactive Figma prototypes to validate ideas before development.",
    icon: MousePointerClick,
    animation: "clickFlow",
  },
];

type HighlightCardProps = {
  item: (typeof highlights)[number];
  index: number;
  isVisible: boolean;
};

// Delay (ms) before the in-box animation reveals itself on hover
const HOVER_TRIGGER_DELAY = 1000;

const HighlightCard = ({ item, index, isVisible }: HighlightCardProps) => {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setHovered(true);
    }, HOVER_TRIGGER_DELAY);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHovered(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const renderAnimation = () => {
    switch (item.animation) {
      // 1. USER RESEARCH — a magnifying glass sweeps over a field of user
      // data-points, "discovering" and lighting up insights as it passes.
      case "scanInsights": {
        const dots = [
          { x: 40, y: 50 }, { x: 90, y: 35 }, { x: 140, y: 60 },
          { x: 60, y: 100 }, { x: 115, y: 95 }, { x: 165, y: 40 },
          { x: 30, y: 140 }, { x: 150, y: 130 }, { x: 100, y: 150 },
        ];
        return (
          <div className="absolute inset-0 bg-white overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 200 180">
              {dots.map((d, i) => (
                <motion.circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r={4}
                  className="fill-primary"
                  initial={{ opacity: 0.25 }}
                  animate={
                    hovered
                      ? { opacity: [0.25, 1, 0.25], r: [4, 6, 4] }
                      : { opacity: 0.25, r: 4 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.15 * i,
                    repeat: hovered ? Infinity : 0,
                    repeatDelay: 1.6,
                  }}
                />
              ))}
              <motion.g
                animate={
                  hovered
                    ? {
                        x: [10, 150, 60, 130, 10],
                        y: [20, 40, 120, 90, 20],
                      }
                    : { x: 10, y: 20 }
                }
                transition={{
                  duration: 4,
                  repeat: hovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <circle cx="0" cy="0" r="16" className="fill-none stroke-primary" strokeWidth="3" />
                <line x1="11" y1="11" x2="24" y2="24" className="stroke-primary" strokeWidth="3" strokeLinecap="round" />
              </motion.g>
            </svg>
          </div>
        );
      }

      // 2. WIREFRAMING — a blueprint sketch draws itself stroke-by-stroke,
      // like a designer laying out a page: header, sidebar, content blocks.
      case "blueprintDraw": {
        const strokeProps = {
          fill: "transparent",
          className: "stroke-primary",
          strokeWidth: 2.5,
          strokeLinecap: "round" as const,
        };
        const draw = (delay: number) => ({
          initial: { pathLength: 0, opacity: 0 },
          animate: hovered
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 },
          transition: { duration: 0.7, delay, ease: "easeInOut" },
        });
        return (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <svg width="80%" height="80%" viewBox="0 0 200 150">
              <motion.rect x="10" y="10" width="180" height="24" rx="4" {...strokeProps} {...draw(0)} />
              <motion.rect x="10" y="46" width="50" height="94" rx="4" {...strokeProps} {...draw(0.35)} />
              <motion.rect x="70" y="46" width="120" height="42" rx="4" {...strokeProps} {...draw(0.6)} />
              <motion.rect x="70" y="98" width="55" height="42" rx="4" {...strokeProps} {...draw(0.85)} />
              <motion.rect x="135" y="98" width="55" height="42" rx="4" {...strokeProps} {...draw(1.0)} />
            </svg>
          </div>
        );
      }

      // 3. VISUAL DESIGN — a brush stroke sweeps across, leaving a gradient
      // trail, then a small palette of color swatches pops in.
      case "paletteBrush": {
        const swatches = ["#f43f5e", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6"];
        return (
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-4">
            <motion.div
              className="h-3 w-3/4 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#f43f5e,#f59e0b,#22c55e,#3b82f6,#8b5cf6)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <div className="flex gap-2">
              {swatches.map((c, i) => (
                <motion.span
                  key={c}
                  className="w-5 h-5 rounded-full shadow-sm"
                  style={{ backgroundColor: c }}
                  initial={{ scale: 0, y: 8, opacity: 0 }}
                  animate={
                    hovered
                      ? { scale: [0, 1.3, 1], y: 0, opacity: 1 }
                      : { scale: 0, y: 8, opacity: 0 }
                  }
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                />
              ))}
            </div>
          </div>
        );
      }

      // 4. INTERACTIVE PROTOTYPING — a cursor "clicks" one screen, a
      // connector line draws across, and a ripple pulses on the linked
      // screen, mimicking a Figma prototype link firing.
      case "clickFlow": {
        return (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <svg width="80%" height="70%" viewBox="0 0 200 120">
              <rect x="10" y="15" width="60" height="90" rx="6" className="fill-none stroke-primary/40" strokeWidth="2" />
              <rect x="130" y="15" width="60" height="90" rx="6" className="fill-none stroke-primary/40" strokeWidth="2" />

              <motion.path
                d="M72 60 L128 60"
                fill="transparent"
                className="stroke-primary"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  hovered
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
              />

              {/* ripple on target screen */}
              <motion.circle
                cx="160"
                cy="60"
                r="6"
                className="fill-primary/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  hovered
                    ? { scale: [0, 3], opacity: [0.6, 0] }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.9,
                  delay: 1.1,
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: 0.8,
                }}
              />

              {/* clicking cursor */}
              <motion.g
                initial={{ x: 40, y: 40, opacity: 0 }}
                animate={
                  hovered
                    ? { x: [40, 40, 155], y: [40, 40, 55], opacity: [0, 1, 1] }
                    : { x: 40, y: 40, opacity: 0 }
                }
                transition={{ duration: 1.3, times: [0, 0.25, 1], ease: "easeInOut" }}
              >
                <path
                  d="M0 0 L0 14 L4 10.5 L6.5 16 L9 15 L6.5 9.5 L11 9.5 Z"
                  className="fill-primary"
                />
              </motion.g>
            </svg>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 min-h-[220px] transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(99,102,241,0.15)]"
    >
      {/* Opaque white cover + animation. Sits ABOVE the text (z-20 > z-10)
          so the copy is fully hidden while the animation plays, instead of
          bleeding through it. Fades/"unblurs" in and out smoothly. */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="anim"
            className="absolute inset-0 z-20 bg-white"
            initial={{ opacity: 0, backdropFilter: "blur(6px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {renderAnimation()}
          </motion.div>
        )}
      </AnimatePresence>

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