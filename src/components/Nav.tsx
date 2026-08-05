import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = ["About", "Skills", "Projects", "Education", "Contact"];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll-shrink header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active-link tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find(
              (s) => s.toLowerCase() === entry.target.id
            );
            if (match) setActiveSection(match);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      animate={{
        paddingTop: scrolled ? 10 : 16,
        paddingBottom: scrolled ? 10 : 16,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-colors duration-300 ${
        scrolled ? "border-gray-200 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <motion.span
          animate={{ fontSize: scrolled ? "1rem" : "1.125rem" }}
          transition={{ duration: 0.3 }}
          className="font-heading font-semibold tracking-tight"
        >
          Portfolio
        </motion.span>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-6 relative">
          {sections.map((s) => {
            const isActive = activeSection === s;
            return (
              <button
                key={s}
                onClick={() => handleClick(s)}
                className={`relative text-sm font-body transition-colors pb-1 ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {s}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="sm:hidden p-2 text-gray-900"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden overflow-hidden border-t border-gray-200"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {sections.map((s, index) => (
                <motion.button
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  onClick={() => handleClick(s)}
                  className={`text-left text-sm font-body transition-colors ${
                    activeSection === s
                      ? "text-primary font-medium"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;
