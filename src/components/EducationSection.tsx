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

const EducationSection = () => {
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
    <section id="education" className="pt-[120px] pb-20 bg-gray-50" ref={ref}>
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
          className="text-gray-600 max-w-2xl mb-12 leading-7"
        >
          My academic journey that built my foundation in technology, design thinking, and user-centered problem solving.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-8 flex flex-col"
            >
              {/* Icon + Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <item.icon className="w-7 h-7 text-primary" />
                  <span className="text-sm font-medium text-gray-500">{item.period}</span>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {item.badge}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.degree}
              </h3>
              <p className="text-sm text-gray-700 mb-1">{item.specialization}</p>
              <p className="text-sm text-gray-500 mb-4">{item.institution}</p>

              <p className="text-sm text-gray-600 leading-7 flex-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
