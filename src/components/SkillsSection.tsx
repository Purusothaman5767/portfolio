import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Figma,
  Palette,
  Layout,
  MousePointerClick,
  FileCode,
  Braces,
  Boxes,
  Coffee,
  Database,
  Rocket,
} from "lucide-react";

const skills = [
  {
    name: "Figma",
    desc: "Design high-fidelity user interfaces and interactive prototypes.",
    icon: Figma,
  },
  {
    name: "UI Design",
    desc: "Create clean, modern, and visually appealing user interfaces.",
    icon: Palette,
  },
  {
    name: "Wireframing",
    desc: "Plan layouts and user flows before creating final designs.",
    icon: Layout,
  },
  {
    name: "Prototyping",
    desc: "Build interactive prototypes to test user experiences.",
    icon: MousePointerClick,
  },
  {
    name: "HTML5",
    desc: "Build semantic and accessible web page structures.",
    icon: FileCode,
  },
  {
    name: "CSS3 & JavaScript",
    desc: "Build responsive layouts and add dynamic interactivity to web applications.",
    icon: Braces,
  },
  {
    name: "React",
    desc: "Build reusable component-based user interfaces.",
    icon: Boxes,
  },
  {
    name: "Java",
    desc: "Develop object-oriented applications and backend logic.",
    icon: Coffee,
  },
  {
    name: "MongoDB",
    desc: "Store and manage application data efficiently.",
    icon: Database,
  },
  {
    name: "Vercel",
    desc: "Deploy full-stack and frontend applications with seamless GitHub integration.",
    icon: Rocket,
  },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="pt-[120px] pb-16" ref={ref}>
      <div className="mx-auto max-w-content px-6">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight mb-10"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 min-h-[240px] flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]"
            >
              {/* Gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

              {/* Shine */}
              <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-700"></div>

              <div className="relative z-10 flex flex-col h-full">

                <skill.icon
                  className="w-7 h-7 text-primary mb-4 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-1 group-hover:rotate-6"
                />

                <h3 className="relative inline-block text-base font-semibold mb-3">
                  {skill.name}

                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </h3>

                <p className="text-sm text-muted-foreground leading-7">
                  {skill.desc}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;