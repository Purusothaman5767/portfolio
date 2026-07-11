import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-content px-6" ref={ref}>
      <motion.hr
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isVisible ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-t border-border origin-left"
      />
    </div>
  );
};

export default SectionDivider;