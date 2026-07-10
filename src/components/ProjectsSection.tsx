import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Figma } from "lucide-react";

const projects = [
  {
    title: "YouTube UI/UX Design",
    desc: "Designed a modern YouTube Clone interface in Figma with a focus on clean layouts, responsive design, and an intuitive user experience.",
    tech: ["Figma", "UI/UX", "Prototype"],
    image: "/youtube-ui.png",

    // Paste your Figma link below
    figma: "https://www.figma.com/proto/qVuM5APSJ6wqTg9Ftuxzlc/you-tube?node-id=57-2&starting-point-node-id=57%3A2",

    github: "",
    demo: "",
    role: "UI/UX Designer",
    type: "Personal Project",
  },

  {
    title: "Forge Your Dream",
    desc: "A React-based customizable e-commerce platform where users can personalize products before purchase using a clean and interactive interface.",
    tech: ["React", "JavaScript", "TailwindCSS"],
    image: "/forge.png",

    github: "https://github.com/Purusothaman5767/forge-your-dream",

    figma: "",
    demo: "",
    role: "Full Stack Developer",
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
      {
        threshold: 0.1,
      }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group overflow-hidden rounded-xl border border-border bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{p.title}</h3>

                <p className="text-sm text-muted-foreground leading-7 mb-4">
                  {p.desc}
                </p>

                <p className="text-xs text-primary font-medium mb-4">
                  {p.role} • {p.type}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">

                  {p.figma && (
                    <a
                      href={p.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Figma size={18} />
                      View Design
                    </a>
                  )}

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  )}

                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
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