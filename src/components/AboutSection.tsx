import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Figma,
  MonitorSmartphone,
  Cloud,
} from "lucide-react";

const highlights = [
  {
    title: "B.Tech IT Student",
    description:
      "Final-year Information Technology student with a passion for technology and digital product development.",
    icon: GraduationCap,
  },
  {
    title: "UI/UX Designer",
    description:
      "Designing intuitive user interfaces, wireframes, and interactive prototypes using Figma.",
    icon: Figma,
  },
  {
    title: "Frontend Developer",
    description:
      "Building responsive web applications using React, JavaScript, HTML, CSS, and Tailwind CSS.",
    icon: MonitorSmartphone,
  },
  {
    title: "Cloud Computing",
    description:
      "Learning cloud technologies and exploring modern software development practices.",
    icon: Cloud,
  },
];

// NEW: individual card with mouse-follow spotlight
const HighlightCard = ({
  item,
  index,
  isVisible,
}: {
  item: (typeof highlights)[number];
  index: number;
  isVisible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

      {/* NEW: Mouse-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(180px circle at ${spotlight.x}% ${spotlight.y}%, rgba(99,102,241,0.15), transparent 70%)`,
        }}
      />

      {/* Shine Effect */}
      <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-700"></div>

      <div className="relative z-10">
        {/* NEW: idle pulse wrapper around icon, hover still rotates/scales */}
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
          <item.icon className="w-7 h-7 text-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
        </motion.div>

        <h3 className="relative inline-block text-lg font-semibold mb-3">
          {item.title}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </h3>

        <p className="text-sm text-muted-foreground leading-7">
          {item.description}
        </p>
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
    <section id="about" className="pt-[120px] pb-16" ref={ref}>
      <div className="mx-auto max-w-content px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative inline-block text-3xl font-semibold tracking-tight mb-6"
        >
          About Me
          {/* NEW: animated underline reveal */}
          <motion.span
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 -bottom-1 h-[3px] bg-primary rounded-full"
          />
        </motion.h2>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-muted-foreground leading-8 mb-10"
        >
          I'm a{" "}
          <span className="font-semibold text-foreground">
            final-year Information Technology student
          </span>{" "}
          passionate about creating intuitive digital experiences through{" "}
          <span className="font-semibold text-foreground">UI/UX Design</span>{" "}
          and developing responsive web applications using{" "}
          <span className="font-semibold text-foreground">React</span> and
          modern web technologies. I enjoy transforming ideas into clean,
          user-friendly interfaces that combine creativity with functionality.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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