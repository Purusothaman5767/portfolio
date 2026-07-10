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
          className="text-3xl font-semibold tracking-tight mb-6"
        >
          About Me
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
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
              }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

              {/* Shine Effect */}
              <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[150%] transition-all duration-700"></div>

              <div className="relative z-10">

                <item.icon
                  className="w-7 h-7 text-primary mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300"
                />

                <h3 className="relative inline-block text-lg font-semibold mb-3">
                  {item.title}

                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </h3>

                <p className="text-sm text-muted-foreground leading-7">
                  {item.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;