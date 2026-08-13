import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const education = [
  {
    badge: "Final Year",
    period: "2023 – Present",
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Information Technology",
    institution: "Sri Shakthi Institute of Engineering and Technology, Coimbatore",
    description:
      "Building strong foundations in software engineering, human-computer interaction, problem solving, and digital product development while specializing in UI/UX Design.",
    icon: GraduationCap,
  },
  {
    badge: "Completed",
    period: "2019 – 2023",
    degree: "Higher Secondary Education",
    specialization: "Computer Mathematics",
    institution: "South Indian Matriculation Higher Secondary School, Salem",
    description:
      "Developed analytical thinking, logical reasoning, mathematics, and computer science fundamentals that support my design and technology journey.",
    icon: BookOpen,
  },
];

const NODE_SIZE = 56; // px, matches w-14/h-14

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section id="education" className="pt-[120px] pb-20 bg-gray-50" ref={ref}>
      {/* ⬇ WIDTH FIX: max-w-4xl → max-w-6xl to match your other sections */}
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight mb-4 text-gray-900"
        >
          Education
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 max-w-2xl mb-16 leading-7"
        >
          My academic journey that built my foundation in technology, design thinking, and user-centered problem solving.
        </motion.p>

        {/* Vertical timeline */}
        <div className="relative">
          {/* ⬇ THE LINE — track (faint, full height) */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-gray-200 z-0"
            style={{ left: NODE_SIZE / 2 }}
          />
          {/* ⬇ THE LINE — animated progress line (draws downward on scroll) */}
          <motion.div
            className="absolute top-0 w-[2px] bg-primary origin-top z-0"
            style={{ left: NODE_SIZE / 2, bottom: 0 }}
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
          />

          <div className="space-y-12">
            {education.map((item, index) => {
              const Icon = item.icon;
              const nodeDelay = 0.3 + index * 0.55;
              const cardDelay = nodeDelay + 0.15;
              const isHovered = hoveredIndex === index;

              return (
                <div key={item.degree} className="relative flex gap-6 items-start">
                  {/* Node — sits on top of the line, centered on it */}
                  <motion.div
                    className="relative z-20 flex-shrink-0 rounded-full bg-white border-2 border-primary shadow-md flex items-center justify-center"
                    style={{ width: NODE_SIZE, height: NODE_SIZE }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isVisible
                        ? { scale: isHovered ? 1.12 : 1, opacity: 1 }
                        : {}
                    }
                    transition={
                      isVisible && hoveredIndex !== null
                        ? { duration: 0.25, ease: "easeOut" }
                        : { duration: 0.45, delay: nodeDelay, ease: "backOut" }
                    }
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    <motion.div
                      className="relative z-10"
                      animate={isHovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={
                      isVisible
                        ? { opacity: 1, x: 0, y: isHovered ? -6 : 0 }
                        : {}
                    }
                    transition={
                      isVisible && hoveredIndex !== null
                        ? { duration: 0.25, ease: "easeOut" }
                        : { duration: 0.55, delay: cardDelay }
                    }
                    className={`flex-1 rounded-2xl bg-white border p-8 transition-shadow duration-300 ${
                      isHovered
                        ? "border-primary/50 shadow-xl"
                        : "border-gray-200 shadow-sm"
                    }`}
                    style={{ marginTop: (NODE_SIZE - 24) / 2 - 24 }}
                  >
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                      <span className="text-sm font-medium text-gray-500">
                        {item.period}
                      </span>
                      <motion.span
                        animate={{ scale: isHovered ? 1.06 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {item.badge}
                      </motion.span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.degree}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">{item.specialization}</p>
                    <p className="text-sm text-gray-500 mb-4">{item.institution}</p>

                    <p className="text-sm text-gray-600 leading-7">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;