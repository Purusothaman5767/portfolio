import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Boxes, Database, Figma } from "lucide-react";

const skills = [
  {
    name: "Java",
    desc: "I build simple console-based applications using Java.",
    icon: Code2,
  },
  {
    name: "JavaScript",
    desc: "I use JavaScript to add logic and interactivity.",
    icon: Code2,
  },
  {
    name: "React",
    desc: "I build basic UI using components in React.",
    icon: Boxes,
  },
  {
    name: "HTML",
    desc: "I use HTML to structure web pages.",
    icon: Code2,
  },
  {
    name: "CSS",
    desc: "I design simple layouts using CSS and TailwindCSS.",
    icon: Code2,
  },
  {
    name: "MongoDB",
    desc: "I use MongoDB to store project data.",
    icon: Database,
  },
  {
    name: "UI/UX",
    desc: "I try to design simple and user-friendly interfaces.",
    icon: Figma,
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
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight mb-10"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-card border border-border rounded-lg p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <s.icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />

              <h3 className="text-sm font-medium mb-1">
                {s.name}
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;