import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "beancraft",
    image: "/forge.png",
    title: "BeanCraft – Coffee Ordering App",
    category: "UI/UX Design • Mobile App",
    description:
      "Designed a modern coffee ordering mobile application focused on quick ordering, clean navigation, and an enjoyable user experience. The project includes user research, wireframes, high-fidelity UI screens, interactive prototypes, and a complete design system.",
    tools: ["Figma", "FigJam", "Prototyping", "Design System"],
    prototypeLink:
      "https://www.figma.com/proto/qzs9GvQbu0rn4cJs7MtoL2/BeanCraft?node-id=148-2&p=f&viewport=2927%2C1014%2C0.63&t=igKhLK0Cd0PiCMiD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=141%3A4&page-id=0%3A1",
  },
  {
    id: "youtube",
    image: "/youtube-ui.png",
    title: "YouTube UI Redesign",
    category: "UI/UX Design • Web Application",
    description:
      "Redesigned the YouTube desktop experience to improve usability, visual hierarchy, content discovery, and navigation. The project showcases a modern interface with reusable components, responsive layouts, and an improved user experience.",
    tools: ["Figma", "UI Design", "Prototype", "Auto Layout"],
    prototypeLink:
      "https://www.figma.com/proto/qVuM5APSJ6wqTg9Ftuxzlc/you-tube?page-id=0%3A1&node-id=57-2&p=f&viewport=-198%2C1250%2C0.64&t=qLBjvwzLplaADMcM-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=57%3A2",
  },
];

type ProjectCardProps = {
  study: (typeof projects)[number];
  index: number;
  isVisible: boolean;
};

const ProjectCard = ({ study, index, isVisible }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
  >
    {/* Hero Image */}
    <div className="rounded-t-3xl overflow-hidden bg-gray-50">
      <motion.img
        src={study.image}
        alt={study.title}
        className="w-full aspect-video object-cover"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      />
    </div>

    {/* Content */}
    <div className="p-8 flex flex-col flex-1 space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {study.title}
        </h3>
        <p className="text-sm text-gray-500">{study.category}</p>
      </div>

      <p className="text-gray-600 text-sm leading-7 flex-1">
        {study.description}
      </p>

      {/* Tools */}
      <div>
        <h4 className="text-base font-semibold text-gray-800 mb-3">
          Tools & Process
        </h4>
        <div className="flex flex-wrap gap-2">
          {study.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        {/* Case Study Button navigates to dynamic route */}
        <Link to={`/projects/${study.id}`}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center px-5 py-3 rounded-lg bg-primary text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View Case Study →
          </motion.button>
        </Link>

        {/* Prototype Button opens Figma link */}
        <a
          href={study.prototypeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:border-primary hover:text-primary hover:scale-105 transition-all duration-300"
        >
          View Prototype →
        </a>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
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
    <section id="projects" className="pt-[120px] pb-20 bg-gray-50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight mb-4 text-gray-900"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 max-w-2xl mb-12 leading-7"
        >
          Selected design projects that showcase my design process, problem-solving approach, and user-centered thinking.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((study, index) => (
            <ProjectCard
              key={study.title}
              study={study}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
