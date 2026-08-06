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
  Check,
} from "lucide-react";

const skills = [
  { name: "Figma", desc: "Design high-fidelity user interfaces and interactive prototypes.", icon: Figma, animation: "figma" },
  { name: "Auto Layout", desc: "Create flexible, responsive layouts that adapt seamlessly.", icon: Layout, animation: "autoLayout" },
  { name: "Components", desc: "Build reusable design elements for consistency.", icon: Component, animation: "components" },
  { name: "Variants", desc: "Manage multiple states of components efficiently.", icon: GitBranch, animation: "variants" },
  { name: "Design Systems", desc: "Establish scalable systems for cohesive design.", icon: Layers, animation: "designSystems" },
  { name: "Wireframing", desc: "Plan user flows and layouts before final design.", icon: Layout, animation: "wireframing" },
  { name: "Interactive Prototyping", desc: "Validate ideas with clickable prototypes in Figma.", icon: MousePointerClick, animation: "prototyping" },
  { name: "User Research", desc: "Understand users through interviews, surveys, and analysis.", icon: Search, animation: "userResearch" },
  { name: "User Flows", desc: "Map journeys to ensure smooth navigation.", icon: Grid, animation: "userFlows" },
  { name: "Information Architecture", desc: "Organize content for clarity and usability.", icon: FileText, animation: "infoArchitecture" },
  { name: "Responsive Design", desc: "Design experiences that adapt across devices.", icon: Smartphone, animation: "responsive" },
  { name: "Accessibility", desc: "Ensure inclusive design for all users.", icon: Accessibility, animation: "accessibility" },
  { name: "Typography", desc: "Craft hierarchy and readability with type.", icon: Type, animation: "typography" },
  { name: "Color Theory", desc: "Use color to guide attention and emotion.", icon: Droplet, animation: "colorTheory" },
  { name: "Interaction Design", desc: "Design micro-interactions that enhance usability.", icon: Hand, animation: "interaction" },
  { name: "Usability Testing", desc: "Test designs with users to refine experiences.", icon: ClipboardCheck, animation: "usabilityTesting" },
];

// Delay (ms) before the in-box animation reveals itself on hover
const HOVER_TRIGGER_DELAY = 1000;

type SkillCardProps = {
  skill: (typeof skills)[number];
  index: number;
  isVisible: boolean;
};

const SkillCard = ({ skill, index, isVisible }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: py * -10, rotateY: px * 10 });
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setHovered(true);
    }, HOVER_TRIGGER_DELAY);
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHovered(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
      {/* Ambient gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-500/10"></div>

      {/* Opaque white cover + animation, sits above the text (z-20) so the
          copy is fully hidden while the demo plays, then fades/unblurs
          back to the copy once the mouse leaves. */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="anim"
            className="absolute inset-0 z-20 bg-white rounded-xl"
            initial={{ opacity: 0, backdropFilter: "blur(6px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <SkillDemo type={skill.animation} />
          </motion.div>
        )}
      </AnimatePresence>

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

        <div className="mt-auto pt-4 text-xs text-indigo-500/60 group-hover:text-indigo-500 transition-colors duration-300 flex items-center gap-1">
          Hover for 1s to see demo →
        </div>
      </div>
    </motion.div>
  );
};

// ============= PER-SKILL DEMO ANIMATIONS =============
// Each demo is intentionally small and scoped to the card's footprint.
// `hovered` is always true here since the wrapper only mounts on hover,
// so animate values are the "active" state directly.

const SkillDemo = ({ type }: { type: string }) => {
  switch (type) {
    // FIGMA — layer rows slide in left-to-right, like a Figma layers panel populating
    case "figma":
      return (
        <div className="flex items-center justify-center w-full h-full px-6">
          <div className="w-full space-y-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.18, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-indigo-500/20 rounded-md border-2 border-indigo-500 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 w-3/4 bg-gray-300 rounded" />
                  <div className="h-2 w-1/2 bg-gray-200 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    // AUTO LAYOUT — a row of chips breathes, spacing itself out evenly like a
    // flex container recalculating gaps
    case "autoLayout":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <motion.div
            animate={{ gap: ["6px", "18px", "6px"] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="flex items-center"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
                className="w-10 h-10 bg-indigo-500/20 rounded-lg border-2 border-indigo-500"
              />
            ))}
          </motion.div>
        </div>
      );

    // COMPONENTS — a solid "master" component spawns two dashed instances
    case "components":
      return (
        <div className="flex items-center justify-center w-full h-full gap-5">
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-12 h-12 bg-indigo-500 rounded-lg"
            />
            <span className="text-[10px] text-gray-500 font-medium">Master</span>
          </div>
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-500/10" />
              <span className="text-[10px] text-gray-500 font-medium">Instance</span>
            </motion.div>
          ))}
        </div>
      );

    // VARIANTS — a single button cycles through its state variants
    case "variants": {
      const states = [
        { label: "Default", bg: "#6366f1", text: "#ffffff" },
        { label: "Hover", bg: "#4f46e5", text: "#ffffff" },
        { label: "Disabled", bg: "#e0e7ff", text: "#818cf8" },
      ];
      return (
        <div className="flex items-center justify-center w-full h-full">
          <motion.button
            animate={{
              backgroundColor: states.map((s) => s.bg),
              color: states.map((s) => s.text),
            }}
            transition={{ duration: 2.7, repeat: Infinity, times: [0, 0.5, 1] }}
            className="px-7 py-2.5 rounded-lg font-semibold text-sm shadow-md"
          >
            Button
          </motion.button>
        </div>
      );
    }

    // DESIGN SYSTEMS — a token grid (colors/spacing) builds itself out
    case "designSystems":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="grid grid-cols-4 gap-2.5">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="w-8 h-8 bg-indigo-500/20 rounded-md border-2 border-indigo-500"
              />
            ))}
          </div>
        </div>
      );

    // WIREFRAMING — a blueprint sketch draws itself stroke-by-stroke
    case "wireframing": {
      const strokeProps = {
        fill: "transparent",
        className: "stroke-indigo-500",
        strokeWidth: 2.5,
        strokeLinecap: "round" as const,
      };
      const draw = (delay: number) => ({
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.7, delay, ease: "easeInOut" },
      });
      return (
        <div className="flex items-center justify-center w-full h-full">
          <svg width="75%" height="75%" viewBox="0 0 200 150">
            <motion.rect x="10" y="10" width="180" height="24" rx="4" {...strokeProps} {...draw(0)} />
            <motion.rect x="10" y="46" width="50" height="94" rx="4" {...strokeProps} {...draw(0.35)} />
            <motion.rect x="70" y="46" width="120" height="42" rx="4" {...strokeProps} {...draw(0.6)} />
            <motion.rect x="70" y="98" width="55" height="42" rx="4" {...strokeProps} {...draw(0.85)} />
            <motion.rect x="135" y="98" width="55" height="42" rx="4" {...strokeProps} {...draw(1.0)} />
          </svg>
        </div>
      );
    }

    // INTERACTIVE PROTOTYPING — a cursor clicks screen one, a connector draws
    // across, and a ripple pulses on the linked screen
    case "prototyping":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <svg width="85%" height="70%" viewBox="0 0 200 120">
            <rect x="10" y="15" width="60" height="90" rx="6" className="fill-none stroke-indigo-500/40" strokeWidth="2" />
            <rect x="130" y="15" width="60" height="90" rx="6" className="fill-none stroke-indigo-500/40" strokeWidth="2" />
            <motion.path
              d="M72 60 L128 60"
              fill="transparent"
              className="stroke-indigo-500"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.circle
              cx="160"
              cy="60"
              r="6"
              className="fill-indigo-500/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3], opacity: [0.6, 0] }}
              transition={{ duration: 0.9, delay: 1.1, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.g
              initial={{ x: 40, y: 40, opacity: 0 }}
              animate={{ x: [40, 40, 155], y: [40, 40, 55], opacity: [0, 1, 1] }}
              transition={{ duration: 1.3, times: [0, 0.25, 1], ease: "easeInOut" }}
            >
              <path d="M0 0 L0 14 L4 10.5 L6.5 16 L9 15 L6.5 9.5 L11 9.5 Z" className="fill-indigo-500" />
            </motion.g>
          </svg>
        </div>
      );

    // USER RESEARCH — a magnifying glass sweeps over data points, lighting
    // each one up as it "discovers" an insight
    case "userResearch": {
      const dots = [
        { x: 40, y: 40 }, { x: 90, y: 28 }, { x: 140, y: 48 },
        { x: 55, y: 82 }, { x: 110, y: 78 }, { x: 160, y: 34 },
        { x: 28, y: 112 }, { x: 150, y: 105 }, { x: 95, y: 120 },
      ];
      return (
        <div className="flex items-center justify-center w-full h-full">
          <svg width="80%" height="80%" viewBox="0 0 200 150">
            {dots.map((d, i) => (
              <motion.circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={4}
                className="fill-indigo-500"
                initial={{ opacity: 0.25 }}
                animate={{ opacity: [0.25, 1, 0.25], r: [4, 6, 4] }}
                transition={{ duration: 0.6, delay: 0.12 * i, repeat: Infinity, repeatDelay: 1.4 }}
              />
            ))}
            <motion.g
              animate={{ x: [10, 130, 50, 120, 10], y: [15, 35, 100, 75, 15] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="0" cy="0" r="14" className="fill-none stroke-indigo-500" strokeWidth="3" />
              <line x1="10" y1="10" x2="21" y2="21" className="stroke-indigo-500" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
          </svg>
        </div>
      );
    }

    // USER FLOWS — numbered steps light up in sequence, connectors filling
    // between them like a journey being traced
    case "userFlows":
      return (
        <div className="flex items-center justify-center w-full h-full gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: ["rgb(229,231,235)", "rgb(99,102,241)", "rgb(229,231,235)"],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
              >
                {i + 1}
              </motion.div>
              {i < 3 && (
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-6 h-1 bg-indigo-500 origin-left rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      );

    // INFORMATION ARCHITECTURE — a root node branches into child nodes,
    // lines drawing outward like a sitemap forming
    case "infoArchitecture":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <svg width="70%" height="75%" viewBox="0 0 160 120">
            <rect x="65" y="8" width="30" height="22" rx="4" className="fill-indigo-500" />
            {[
              { x: 10, cx: 25 },
              { x: 65, cx: 80 },
              { x: 120, cx: 135 },
            ].map((n, i) => (
              <g key={i}>
                <motion.line
                  x1="80"
                  y1="30"
                  x2={n.cx}
                  y2="80"
                  className="stroke-indigo-500/50"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                />
                <motion.rect
                  x={n.x}
                  y="80"
                  width="30"
                  height="22"
                  rx="4"
                  className="fill-indigo-500/20 stroke-indigo-500"
                  strokeWidth="2"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 80 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.2 }}
                />
              </g>
            ))}
          </svg>
        </div>
      );

    // RESPONSIVE DESIGN — a single frame morphs from a narrow mobile width
    // to a wide desktop width, content reflowing as it stretches
    case "responsive":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <motion.div
            animate={{ width: [90, 220, 90] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col gap-2 p-3 bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden"
          >
            <motion.div
              animate={{ flexDirection: ["column", "row", "column"] }}
              transition={{ duration: 3.2, repeat: Infinity }}
              className="flex gap-2"
            >
              <div className="h-6 flex-1 bg-indigo-500/30 rounded" />
              <div className="h-6 flex-1 bg-indigo-500/20 rounded" />
            </motion.div>
            <div className="h-3 bg-indigo-500/15 rounded w-full" />
          </motion.div>
        </div>
      );

    // ACCESSIBILITY — a focus ring hops between elements in keyboard tab
    // order, each pulsing briefly like a screen-reader focus indicator
    case "accessibility":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="space-y-3 w-40">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(99,102,241,0)",
                    "0 0 0 4px rgba(99,102,241,0.35)",
                    "0 0 0 0px rgba(99,102,241,0)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 }}
                className="h-8 bg-gray-100 rounded-md border-2 border-gray-300"
              />
            ))}
          </div>
        </div>
      );

    // TYPOGRAPHY — a headline breathes through weight and tracking changes,
    // with a baseline grid fading in beneath it
    case "typography":
      return (
        <div className="flex items-center justify-center w-full h-full flex-col gap-3">
          <motion.div
            animate={{ letterSpacing: ["0px", "4px", "0px"], fontWeight: [400, 700, 400] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            className="text-2xl text-indigo-500"
            style={{ fontWeight: 400 }}
          >
            Aa
          </motion.div>
          <div className="flex flex-col gap-1 w-28">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className="h-[2px] bg-gray-300 origin-left"
              />
            ))}
          </div>
        </div>
      );

    // COLOR THEORY — three hues swirl and blend into one another, like pigments mixing
    case "colorTheory":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 via-indigo-500 to-blue-500 shadow-lg"
          />
        </div>
      );

    // INTERACTION DESIGN — a button press sends out ripple rings, a classic
    // micro-interaction
    case "interaction":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative w-16 h-16">
            <motion.div
              animate={{ scale: [1, 0.92, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-indigo-500 shadow-md"
            />
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.6 }}
                className="absolute inset-0 rounded-full border-2 border-indigo-500"
              />
            ))}
          </div>
        </div>
      );

    // USABILITY TESTING — a checklist ticks off one item at a time while a
    // score bar fills, like results coming in from a test session
    case "usabilityTesting":
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-40 space-y-3">
            <div className="space-y-1">
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Score</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.25, duration: 0.35 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                  <div className="h-1.5 flex-1 bg-gray-200 rounded" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

// ============= MAIN SKILLS SECTION =============

const SkillsSection = () => {
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
            <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* Tools I Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Tools I Use</h3>
          <div className="flex flex-wrap gap-3">
            {["Figma", "FigJam", "Photoshop", "Illustrator", "Notion"].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;