import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    period: "2023 - Present",
    degree: "B.Tech Information Technology",
    college: "Sri Shakthi Institute of Engineering and Technology, Coimbatore",
    detail: "CGPA: 7.02",
  },
  {
    period: "2019 - 2023",
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
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="pt-[120px] pb-16" ref={ref}>
      <div className="mx-auto max-w-content px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight mb-12"
        >
          Education
        </motion.h2>

        {/* Timeline */}
        <div className="relative">

          {/* Animated Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isVisible ? { height: "100%" } : {}}
            transition={{ duration: 1 }}
            className="absolute left-6 top-0 w-[2px] bg-primary/30 origin-top"
          />

          <div className="space-y-8">
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, x: -40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.2,
                }}
                whileHover={{
                  y: -8,
                }}
                className="relative pl-16"
              >
                {/* Timeline Icon */}
                <div className="absolute left-0 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background shadow-md transition-all duration-300 hover:scale-110 hover:rotate-12 hover:border-primary hover:shadow-lg">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>

                {/* Card */}
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]">

                  {/* Gradient Hover */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

                  {/* Shine */}
                  <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-700"></div>

                  <div className="relative z-10">

                    {/* Date Badge */}
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      {e.period}
                    </span>

                    {/* Degree */}
                    <h3 className="relative mt-4 inline-block text-xl font-semibold">
                      {e.degree}

                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </h3>

                    {/* College */}
                    <p className="mt-3 text-sm text-primary">
                      {e.college}
                    </p>

                    {/* Detail */}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {e.detail}
                    </p>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default EducationSection;