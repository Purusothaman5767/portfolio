import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="pt-[120px] pb-16" ref={ref}>
      <div className="mx-auto max-w-content px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold tracking-tight mb-8"
        >
          About
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[640px] space-y-3 text-muted-foreground"
        >
          <p>• I am an Information Technology student</p>

          <p>• I build simple projects using Java and React</p>

          <p>• I have used MongoDB for storing project data</p>

          <p>• I am learning full-stack development step by step</p>

          <p>• I am interested in cloud computing</p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;