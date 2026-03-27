import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const education = [
  {
    period: "2023 — Present",
    degree: "B.Tech Information Technology",
    college: "Sri Shakthi Institute of Engineering and Technology, Coimbatore",
    detail: "CGPA: 6.9",
  },
  {
    period: "2019 — 2023",
    degree: "Higher Secondary (Computer Maths)",
    college: "South Indian Matriculation Higher Secondary School, Salem",
    detail: "Studied Computer Science and Mathematics",
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="pt-[120px] pb-16" ref={ref}>
      <div className="mx-auto max-w-content px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight mb-10"
        >
          Education
        </motion.h2>

        <div className="space-y-6">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 rounded-lg border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-xs text-muted-foreground uppercase mb-1">
                {e.period}
              </p>

              <h3 className="text-lg font-medium mb-1">
                {e.degree}
              </h3>

              <p className="text-sm text-primary mb-1">
                {e.college}
              </p>

              <p className="text-sm text-muted-foreground">
                {e.detail}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EducationSection;