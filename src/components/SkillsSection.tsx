import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Figma,
  Layout,
  MousePointerClick,
  Search,
  Layers,
  Component,
  GitBranch,
  Grid,
  Smartphone,
  Accessibility,
  Type,
  Droplet,
  Hand,
  ClipboardCheck,
  FileText,
} from "lucide-react";

const skills = [
  { name: "Figma", desc: "Design high-fidelity user interfaces and interactive prototypes.", icon: Figma },
  { name: "Auto Layout", desc: "Create flexible, responsive layouts that adapt seamlessly.", icon: Layout },
  { name: "Components", desc: "Build reusable design elements for consistency.", icon: Component },
  { name: "Variants", desc: "Manage multiple states of components efficiently.", icon: GitBranch },
  { name: "Design Systems", desc: "Establish scalable systems for cohesive design.", icon: Layers },
  { name: "Wireframing", desc: "Plan user flows and layouts before final design.", icon: Layout },
  { name: "Interactive Prototyping", desc: "Validate ideas with clickable prototypes in Figma.", icon: MousePointerClick },
  { name: "User Research", desc: "Understand users through interviews, surveys, and analysis.", icon: Search },
  { name: "User Flows", desc: "Map journeys to ensure smooth navigation.", icon: Grid },
  { name: "Information Architecture", desc: "Organize content for clarity and usability.", icon: FileText },
  { name: "Responsive Design", desc: "Design experiences that adapt across devices.", icon: Smartphone },
  { name: "Accessibility", desc: "Ensure inclusive design for all users.", icon: Accessibility },
  { name: "Typography", desc: "Craft hierarchy and readability with type.", icon: Type },
  { name: "Color Theory", desc: "Use color to guide attention and emotion.", icon: Droplet },
  { name: "Interaction Design", desc: "Design micro-interactions that enhance usability.", icon: Hand },
  { name: "Usability Testing", desc: "Test designs with users to refine experiences.", icon: ClipboardCheck },
];

// ============= ANIMATION DEMO COMPONENTS =============

const WireframingDemo = () => {
  const boxes = [
    { x: 20, y: 20, w: 60, h: 30 },
    { x: 20, y: 60, w: 28, h: 20 },
    { x: 54, y: 60, w: 26, h: 20 },
    { x: 20, y: 85, w: 60, h: 10 },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-80 h-48 bg-gray-100 rounded-lg relative overflow-hidden border-2 border-gray-300">
        {boxes.map((box, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="absolute border-2 border-indigo-500 bg-indigo-500/10"
            style={{
              left: `${box.x}px`,
              top: `${box.y}px`,
              width: `${box.w}px`,
              height: `${box.h}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ResponsiveDesignDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full gap-8">
      {/* Mobile */}
      <motion.div
        animate={{ width: [150, 150, 150] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="flex flex-col gap-3 p-3 bg-gray-100 rounded-xl border-2 border-gray-300"
      >
        <div className="h-6 bg-indigo-500/30 rounded" />
        <div className="h-4 bg-indigo-500/20 rounded" />
        <div className="h-4 bg-indigo-500/20 rounded" />
      </motion.div>

      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-2xl text-indigo-500"
      >
        →
      </motion.div>

      {/* Desktop */}
      <motion.div
        animate={{ width: [300, 300, 300] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="flex gap-3 p-4 bg-gray-100 rounded-xl border-2 border-gray-300"
      >
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-indigo-500/30 rounded" />
          <div className="h-4 bg-indigo-500/20 rounded" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-indigo-500/30 rounded" />
          <div className="h-4 bg-indigo-500/20 rounded" />
        </div>
      </motion.div>
    </div>
  );
};

const ColorTheoryDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="w-48 h-48 rounded-2xl bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 shadow-2xl"
      />
    </div>
  );
};

const TypographyDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full flex-col gap-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Letter Spacing</p>
        <motion.div
          animate={{ letterSpacing: ["0px", "8px", "0px"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl font-bold text-indigo-500"
        >
          DESIGN
        </motion.div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">Font Weight</p>
        <motion.div
          animate={{ fontWeight: [400, 700, 400] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl text-indigo-500"
        >
          Typography
        </motion.div>
      </div>
    </div>
  );
};

const InteractionDesignDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-24 h-24">
        {/* Center button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute inset-0 w-full h-full rounded-full bg-indigo-500 text-white font-bold text-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          Click
        </motion.button>

        {/* Ripple effect */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
            className="absolute inset-0 rounded-full border-2 border-indigo-500"
          />
        ))}
      </div>
    </div>
  );
};

const PrototypingDemo = () => {
  const screens = [
    { id: 1, label: "Screen 1", x: 0 },
    { id: 2, label: "Screen 2", x: 120 },
    { id: 3, label: "Screen 3", x: 240 },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full gap-4">
      {screens.map((screen) => (
        <motion.div
          key={screen.id}
          animate={{ y: [0, -10, 0] }}
          transition={{ delay: screen.x / 120 * 0.3, duration: 2, repeat: Infinity }}
          className="w-20 h-32 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 rounded-lg border-2 border-indigo-500/50 flex items-center justify-center cursor-pointer hover:border-indigo-500"
        >
          <span className="text-xs text-indigo-500 font-semibold">{screen.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

const ComponentsDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full gap-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            className="w-16 h-16 bg-indigo-500/20 rounded-lg border-2 border-indigo-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.1 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-semibold whitespace-nowrap"
          >
            Component
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const AccessibilityDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full flex-col gap-8">
      <div className="space-y-4 w-64">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ boxShadow: ["0 0 0 0px rgba(99, 102, 241, 0.5)", "0 0 0 8px rgba(99, 102, 241, 0)"] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
            className="h-12 bg-gray-100 rounded-lg border-2 border-indigo-500 p-3"
          >
            <div className="text-sm text-gray-700">Interactive Element</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FigmaDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg border-2 border-indigo-500" />
            <div className="space-y-1">
              <div className="w-24 h-3 bg-gray-300 rounded" />
              <div className="w-16 h-2 bg-gray-200 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AutoLayoutDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        animate={{ gap: ["8px", "24px", "8px"] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="flex items-center justify-center gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            className="w-16 h-16 bg-indigo-500/30 rounded-lg border-2 border-indigo-500"
          />
        ))}
      </motion.div>
    </div>
  );
};

const VariantsDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full gap-6">
      <motion.button
        animate={{ backgroundColor: ["rgb(99, 102, 241)", "rgb(139, 92, 246)", "rgb(99, 102, 241)"] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="px-8 py-3 rounded-lg text-white font-semibold shadow-lg"
      >
        Default
      </motion.button>

      <motion.button
        animate={{ backgroundColor: ["rgb(199, 210, 254)", "rgb(219, 234, 254)", "rgb(199, 210, 254)"] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="px-8 py-3 rounded-lg text-indigo-500 font-semibold border-2 border-indigo-500"
      >
        Secondary
      </motion.button>
    </div>
  );
};

const DesignSystemsDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="w-12 h-12 bg-indigo-500/20 rounded-lg border-2 border-indigo-500"
          />
        ))}
      </motion.div>
    </div>
  );
};

const UserFlowsDemo = () => {
  const steps = [0, 1, 2, 3];
  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      {steps.map((i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1], backgroundColor: ["rgb(229, 231, 235)", "rgb(99, 102, 241)", "rgb(229, 231, 235)"] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
          >
            {i + 1}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              className="w-8 h-1 bg-indigo-500 origin-left"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const UserResearchDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div className="space-y-3 w-48">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: i * 0.3, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="h-3 bg-indigo-500/40 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
};

const InformationArchitectureDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div className="space-y-4">
        <motion.div className="flex justify-center">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-lg border-2 border-indigo-500" />
        </motion.div>
        <div className="flex gap-8 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
              <div className="w-10 h-10 bg-indigo-500/15 rounded border-2 border-indigo-500/60 mx-auto mb-2" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const UsabilityTestingDemo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="space-y-6 w-48">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-700">Testability Score</div>
          <motion.div
            animate={{ width: ["0%", "85%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-3 bg-indigo-500 rounded-full"
          />
        </div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="w-3 h-3 bg-indigo-500/50 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Map skill names to demo components
const demoMap = {
  "Wireframing": WireframingDemo,
  "Responsive Design": ResponsiveDesignDemo,
  "Color Theory": ColorTheoryDemo,
  "Typography": TypographyDemo,
  "Interaction Design": InteractionDesignDemo,
  "Interactive Prototyping": PrototypingDemo,
  "Components": ComponentsDemo,
  "Accessibility": AccessibilityDemo,
  "Figma": FigmaDemo,
  "Auto Layout": AutoLayoutDemo,
  "Variants": VariantsDemo,
  "Design Systems": DesignSystemsDemo,
  "User Flows": UserFlowsDemo,
  "User Research": UserResearchDemo,
  "Information Architecture": InformationArchitectureDemo,
  "Usability Testing": UsabilityTestingDemo,
};

// ============= OVERLAY COMPONENT =============

const SkillOverlay = ({ skill }) => {
  const DemoComponent = demoMap[skill.name] || null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        {/* Floating White Screen */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Fake Browser Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-white">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>

              <div className="flex-1 flex justify-center">
                <span className="text-sm font-medium text-gray-500">
                  {skill.name}
                </span>
              </div>
            </div>

            {/* Demo Area */}
            <div className="h-96 bg-gray-50 flex items-center justify-center rounded-b-2xl p-6">
              {DemoComponent ? (
                <DemoComponent />
              ) : (
                <p className="text-gray-500">Demo</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============= SKILL CARD COMPONENT =============

type SkillCardProps = {
  skill: (typeof skills)[number];
  index: number;
  isVisible: boolean;
  onOpen: (skill: typeof skills[0]) => void;
};

const SkillCard = ({ skill, index, isVisible, onOpen }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: py * -10, rotateY: px * 10 });
  };

  const handleMouseEnter = () => {
    // Cancel any pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Set new timeout to open overlay after 1.5 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      onOpen(skill);
    }, 1500);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    // Clear timeout if mouse leaves before overlay opens
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Close overlay after 0.5 seconds
    closeTimeoutRef.current = setTimeout(() => {
      onOpen(null);
    }, 500);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.03 }}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 600,
      }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 min-h-[220px] flex flex-col transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_12px_30px_rgba(99,102,241,0.15)]"
    >
      {/* Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-500/10"></div>

      <div className="relative z-10 flex flex-col h-full">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          className="inline-block mb-4"
        >
          <skill.icon className="w-7 h-7 text-indigo-500 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-1 group-hover:rotate-6" />
        </motion.div>

        <h3 className="relative inline-block text-base font-semibold mb-3 text-gray-900">
          {skill.name}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
        </h3>

        <p className="text-sm text-gray-600 leading-7">{skill.desc}</p>

        {/* Hover indicator */}
        <div className="mt-auto pt-4 text-xs text-indigo-500/60 group-hover:text-indigo-500 transition-colors duration-300 flex items-center gap-1">
          Hover for 1.5s to see demo →
        </div>
      </div>
    </motion.div>
  );
};

// ============= MAIN SKILLS SECTION =============

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
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
    <section id="skills" className="pt-[120px] pb-20 bg-gray-50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative inline-block text-3xl font-semibold tracking-tight mb-10 text-gray-900"
        >
          Skills
          <motion.span
            initial={{ width: 0 }}
            animate={isVisible ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 -bottom-1 h-[3px] bg-indigo-500 rounded-full"
          />
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
              onOpen={setSelectedSkill}
            />
          ))}
        </div>

        {/* Tools I Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Tools I Use
          </h3>
          <div className="flex flex-wrap gap-3">
            {["Figma", "FigJam", "Photoshop", "Illustrator", "Notion"].map(
              (tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300"
                >
                  {tool}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Overlay */}
      {selectedSkill && (
        <SkillOverlay skill={selectedSkill} />
      )}
    </section>
  );
};

export default SkillsSection;