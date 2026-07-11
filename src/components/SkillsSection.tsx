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

// NEW: individual card with 3D tilt-on-hover
const SkillCard = ({
  skill,
  index,
  isVisible,
}: {
  skill: (typeof skills)[number];
  index: number;
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: py * -10, rotateY: px * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      whileHover={{ y: -10, scale: 1.03 }}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 600,
      }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 min-h-[240px] flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]"
    >
      {/* Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

      {/* Shine */}
      <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* NEW: idle floating wrapper, hover scale/rotate still applies to the icon itself */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
          className="inline-block mb-4"
        >
          <skill.icon className="w-7 h-7 text-primary transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-1 group-hover:rotate-6" />
        </motion.div>

        <h3 className="relative inline-block text-base font-semibold mb-3">
          {skill.name}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </h3>

        <p className="text-sm text-muted-foreground leading-7">
          {skill.desc}
        </p>
      </div>
    </motion.div>
  );
};

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
          className="relative inline-block text-3xl font-semibold tracking-tight mb-10"
        >
          Skills
          {/* NEW: animated underline reveal */}
          <motion.span
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 -bottom-1 h-[3px] bg-primary rounded-full"
          />
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;