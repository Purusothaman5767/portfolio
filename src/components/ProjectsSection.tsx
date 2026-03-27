import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Voting System",
    desc: "A console-based voting system built using Java and MongoDB. It allows users to cast votes and stores the data securely.",
    tech: ["Java", "MongoDB"],
    image: "/voting.png",
    github: "https://github.com/Purusothaman5767/VotingSystem",
    demo: "",
    role: "Developer",
    type: "Personal Project",
  },
  {
    title: "Forge Your Dream",
    desc: "A React-based web application where users can create and visualize their ideas using a simple and interactive UI.",
    tech: ["JavaScript", "React", "TailwindCSS"],
    image: "/forge.png",
    github: "https://github.com/Purusothaman5767/forge-your-dream",
    demo: "",
    role: "Developer",
    type: "Personal Project",
  },
];

const ProjectsSection = () => {
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
    <section id="projects" className="pt-[120px] pb-16" ref={ref}>
      <div className="mx-auto max-w-content px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight mb-10"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">
                  {p.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">
                  {p.desc}
                </p>

                {/* 🔥 NEW: ROLE + TYPE */}
                <p className="text-xs text-primary mb-3">
                  {p.role} • {p.type}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>

                  {/* 🔥 ONLY SHOW DEMO IF EXISTS */}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;