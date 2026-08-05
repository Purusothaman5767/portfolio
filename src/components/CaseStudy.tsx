import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const projects = {
  beancraft: {
    cover: "/forge.png",
    title: "BeanCraft – Coffee Ordering App",
    subtitle: "UI/UX Design • Mobile App",
    role: "UI/UX Designer",
    duration: "3 Months",
    tools: ["Figma", "FigJam", "Prototyping", "Design System"],
    designSystem: {
      colors: [
        "#8B5E3C", "#F8F5F0", "#D9CFC3", "#FFFFFF",
        "#1E1E1E", "#303030", "#E5DED5",
      ],
      typography: ["Poppins (H1–H3, Body, Caption, Small Text)"],
      components: ["Cards (16px radius, 16px padding)", "Buttons", "Navigation"],
    },
    // ✅ Match actual filenames in your public folder
    gallery: ["/Home.png", "/Product details.png", "/Checkout.png"],
    prototypeLink:
      "https://www.figma.com/proto/qzs9GvQbu0rn4cJs7MtoL2/BeanCraft?node-id=148-2&p=f&viewport=2927%2C1014%2C0.63&t=igKhLK0Cd0PiCMiD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=141%3A4&page-id=0%3A1",
    prev: null,
    next: "youtube",
  },
  youtube: {
    cover: "/youtube-ui.png",
    title: "YouTube UI Redesign",
    subtitle: "UI/UX Design • Web Application",
    role: "UI/UX Designer",
    duration: "2 Months",
    tools: ["Figma", "UI Design", "Prototype", "Auto Layout"],
    designSystem: {
      colors: [
        "#FF0000", "#212121", "#3F3F3F", "#FFFFFF",
        "#1E1E1E", "#6B6B6B", "#303030",
      ],
      typography: ["Roboto (H1–H3, Body, Caption, Small Text)"],
      components: ["Cards (12px radius, 8px padding)", "Video Cards", "Sidebar", "Navigation"],
    },
    gallery: ["/YThome.png", "/Channel.png", "/Shorts.png"],
    prototypeLink:
      "https://www.figma.com/proto/qVuM5APSJ6wqTg9Ftuxzlc/you-tube?page-id=0%3A1&node-id=57-2&p=f&viewport=-198%2C1250%2C0.64&t=qLBjvwzLplaADMcM-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=57%3A2",
    prev: "beancraft",
    next: null,
  },
};

const CaseStudy = () => {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];

  if (!project) return <p className="text-center mt-20">Project not found.</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-12"
    >
      {/* Hero Section */}
      <div className="mb-12">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full rounded-xl shadow-lg mb-6"
        />
        <h1 className="text-4xl font-heading mb-2">{project.title}</h1>
        <p className="text-gray-600">{project.subtitle}</p>
        <p className="text-sm text-gray-500 mt-2">
          Role: {project.role} • Duration: {project.duration}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 bg-gray-100 rounded-full text-xs"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Design System */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Design System</h2>
        <p className="mb-2">Colors:</p>
        <div className="flex gap-2 mb-4">
          {project.designSystem.colors.map((color) => (
            <div
              key={color}
              className="w-10 h-10 rounded"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="mb-2">
          Typography: {project.designSystem.typography.join(", ")}
        </p>
        <p>Components: {project.designSystem.components.join(", ")}</p>
      </section>

      {/* UI Screens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">UI Screens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.gallery.map((img) => (
            <img
              key={img}
              src={img}
              alt="UI screen"
              className="rounded-lg shadow-md"
            />
          ))}
        </div>
      </section>

      {/* Prototype Button */}
      <div className="mb-12">
        <a
          href={project.prototypeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:scale-105 transition"
        >
          View Prototype →
        </a>
      </div>

      {/* Navigation */}
      <div className="flex mt-12">
        {project.prev && (
          <Link
            to={`/projects/${project.prev}`}
            className="text-primary hover:underline"
          >
            ← Previous Project
          </Link>
        )}
        {project.next && (
          <Link
            to={`/projects/${project.next}`}
            className="text-primary hover:underline ml-auto"
          >
            Next Project →
          </Link>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Portfolio
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudy;
