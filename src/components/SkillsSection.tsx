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
  Eye,
  Ear,
  Image as ImageIcon,
  Palette,
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

// Tools I Use — kept to Figma, Canva, Photoshop per request.
const tools = [
  { name: "Figma", desc: "Design & prototype interfaces", icon: Figma, animation: "figma" },
  { name: "Canva", desc: "Create templates & quick graphics", icon: Palette, animation: "canva" },
  { name: "Photoshop", desc: "Edit & retouch photos", icon: ImageIcon, animation: "photoshop" },
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
// (unchanged from the original file)

const SkillDemo = ({ type }: { type: string }) => {
  switch (type) {
    case "figma":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
          <svg width="140" height="100" viewBox="0 0 140 100">
            <rect x="0" y="0" width="140" height="100" rx="6" className="fill-gray-50 stroke-gray-200" strokeWidth="1.5" strokeDasharray="4 3" />
            <motion.rect
              x="25" y="25" height="50"
              className="stroke-indigo-500"
              strokeWidth="2"
              initial={{ width: 0, fill: "rgba(99,102,241,0)" }}
              animate={{ width: 90, fill: ["rgba(99,102,241,0)", "rgba(99,102,241,0)", "rgba(99,102,241,0.85)"] }}
              transition={{ width: { duration: 0.8, ease: "easeOut" }, fill: { duration: 0.4, delay: 1 } }}
            />
            <motion.g
              initial={{ x: 25, y: 25, opacity: 0 }}
              animate={{ x: [25, 115, 115], y: [25, 75, 75], opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, times: [0, 0.6, 1], ease: "easeInOut" }}
            >
              <path d="M0 0 L0 12 L3.5 9 L5.5 14 L7.5 13 L5.5 8 L9.5 8 Z" className="fill-gray-800" />
            </motion.g>
          </svg>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay: 0.2, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 0.6 }}
            className="text-xs text-gray-500 font-medium"
          >
            Draw it, then style it
          </motion.p>
        </div>
      );

    case "autoLayout":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
          <div className="w-36 flex flex-col gap-2 p-2.5 bg-gray-50 rounded-lg border-2 border-gray-200">
            {[0, 1].map((i) => (
              <div key={i} className="h-6 bg-indigo-500/20 border-2 border-indigo-500 rounded" />
            ))}
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: -8 }}
              animate={{ height: 24, opacity: 1, marginTop: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1.4 }}
              className="bg-indigo-500 rounded flex items-center justify-center overflow-hidden"
            >
              <span className="text-white text-[10px] font-bold">+ New item</span>
            </motion.div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Add one → others make room</p>
        </div>
      );

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

    case "variants": {
      const labels = ["Default", "Hover", "Clicked"];
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="relative">
            <motion.button
              animate={{
                backgroundColor: ["#6366f1", "#4f46e5", "#4338ca", "#6366f1"],
                scale: [1, 1, 0.94, 1],
              }}
              transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.4, 0.7, 1] }}
              className="px-7 py-2.5 rounded-lg font-semibold text-sm text-white shadow-md"
            >
              Button
            </motion.button>
            <motion.div
              className="absolute"
              initial={{ x: -40, y: 30, opacity: 0 }}
              animate={{ x: [-40, 10, 10, -40], y: [30, 8, 8, 30], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.35, 0.7, 1] }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M0 0 L0 12 L3.5 9 L5.5 14 L7.5 13 L5.5 8 L9.5 8 Z" className="fill-gray-800" />
              </svg>
            </motion.div>
          </div>
          <div className="relative h-4 w-24 text-center">
            {labels.map((label, i) => (
              <motion.p
                key={label}
                className="absolute inset-0 text-xs text-gray-500 font-medium"
                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  times:
                    i === 0
                      ? [0, 0, 0.02, 0.32, 0.36, 1]
                      : i === 1
                      ? [0, 0.36, 0.4, 0.66, 0.7, 1]
                      : [0, 0.7, 0.74, 0.98, 1, 1],
                }}
              >
                {label}
              </motion.p>
            ))}
          </div>
        </div>
      );
    }

    case "designSystems":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatDelay: 1.6 }}
            className="w-7 h-7 rounded-full ring-2 ring-offset-2 ring-indigo-400"
          >
            <motion.div
              className="w-full h-full rounded-full"
              animate={{ backgroundColor: ["#6366f1", "#22c55e", "#6366f1"] }}
              transition={{ duration: 2.1, repeat: Infinity }}
            />
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.button
              animate={{ backgroundColor: ["#6366f1", "#22c55e", "#6366f1"] }}
              transition={{ duration: 2.1, repeat: Infinity, delay: 0.05 }}
              className="px-4 py-1.5 rounded-md text-white text-xs font-semibold"
            >
              Button
            </motion.button>
            <motion.div
              animate={{ borderColor: ["#6366f1", "#22c55e", "#6366f1"] }}
              transition={{ duration: 2.1, repeat: Infinity, delay: 0.05 }}
              className="w-10 h-10 rounded-md border-[3px] bg-white"
            />
            <motion.span
              animate={{ color: ["#6366f1", "#22c55e", "#6366f1"] }}
              transition={{ duration: 2.1, repeat: Infinity, delay: 0.05 }}
              className="text-xs font-semibold underline"
            >
              Link
            </motion.span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Change once → updates everywhere</p>
        </div>
      );

    case "wireframing": {
      const blocks = [
        { x: 10, y: 10, w: 180, h: 22, label: "Header", delay: 0 },
        { x: 10, y: 42, w: 55, h: 98, label: "Image", delay: 0.35 },
        { x: 73, y: 42, w: 117, h: 40, label: "Text", delay: 0.6 },
        { x: 73, y: 90, w: 117, h: 50, label: "Text", delay: 0.8 },
      ];
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          <svg width="80%" height="auto" viewBox="0 0 200 145" className="max-h-[130px]">
            {blocks.map((b, i) => (
              <g key={i}>
                <motion.rect
                  x={b.x} y={b.y} width={b.w} height={b.h} rx="4"
                  fill="transparent"
                  className="stroke-indigo-500"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: b.delay, ease: "easeInOut" }}
                />
                <motion.text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 3}
                  textAnchor="middle"
                  className="fill-indigo-400 text-[9px] font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: b.delay + 0.4, duration: 0.3 }}
                >
                  {b.label}
                </motion.text>
              </g>
            ))}
          </svg>
          <p className="text-xs text-gray-500 font-medium">The skeleton before the design</p>
        </div>
      );
    }

    case "prototyping":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          <svg width="85%" height="65%" viewBox="0 0 200 120">
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
          <p className="text-xs text-gray-500 font-medium">Click here → jump to next screen</p>
        </div>
      );

    case "userResearch": {
      const dots = [
        { x: 40, y: 40 }, { x: 90, y: 28 }, { x: 140, y: 48 },
        { x: 55, y: 82 }, { x: 110, y: 78 }, { x: 160, y: 34 },
        { x: 28, y: 112 }, { x: 150, y: 105 }, { x: 95, y: 120 },
      ];
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-1">
          <svg width="75%" height="70%" viewBox="0 0 200 150">
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
          <p className="text-xs text-gray-500 font-medium">Finding out what users actually need</p>
        </div>
      );
    }

    case "userFlows":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="flex items-center gap-1.5">
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
          <p className="text-xs text-gray-500 font-medium">Mapping every step of the journey</p>
        </div>
      );

    case "infoArchitecture": {
      const nodes = [
        { x: 8, cx: 23, label: "Home" },
        { x: 65, cx: 80, label: "About" },
        { x: 122, cx: 137, label: "Contact" },
      ];
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-1">
          <svg width="80%" height="auto" viewBox="0 0 165 120" className="max-h-[110px]">
            <rect x="62" y="8" width="40" height="22" rx="4" className="fill-indigo-500" />
            <text x="82" y="23" textAnchor="middle" className="fill-white text-[9px] font-semibold">Site</text>
            {nodes.map((n, i) => (
              <g key={i}>
                <motion.line
                  x1="82" y1="30" x2={n.cx} y2="80"
                  className="stroke-indigo-500/50"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                />
                <motion.rect
                  x={n.x} y="80" width="35" height="22" rx="4"
                  className="fill-indigo-500/15 stroke-indigo-500"
                  strokeWidth="2"
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 80 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.2 }}
                />
                <motion.text
                  x={n.x + 17.5} y="94" textAnchor="middle"
                  className="fill-indigo-500 text-[8px] font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.2 }}
                >
                  {n.label}
                </motion.text>
              </g>
            ))}
          </svg>
          <p className="text-xs text-gray-500 font-medium">Organizing content so it's easy to find</p>
        </div>
      );
    }

    case "responsive":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 p-1.5 bg-gray-100 rounded-lg border-2 border-gray-400 space-y-1">
                <div className="h-3 bg-indigo-500/40 rounded" />
                <div className="h-3 bg-indigo-500/25 rounded" />
                <div className="h-3 bg-indigo-500/25 rounded" />
              </div>
              <span className="text-[10px] text-gray-500 font-medium">Mobile</span>
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-indigo-400 text-lg"
            >
              =
            </motion.div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-24 p-1.5 bg-gray-100 rounded-lg border-2 border-gray-400 flex gap-1">
                <div className="h-8 flex-1 bg-indigo-500/40 rounded" />
                <div className="h-8 flex-1 bg-indigo-500/25 rounded" />
                <div className="h-8 flex-1 bg-indigo-500/25 rounded" />
              </div>
              <span className="text-[10px] text-gray-500 font-medium">Desktop</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Same design, fits every screen</p>
        </div>
      );

    case "accessibility": {
      const needs = [
        { Icon: Eye, label: "Low vision" },
        { Icon: Ear, label: "Hearing loss" },
        { Icon: Hand, label: "Limited motion" },
      ];
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="flex gap-5">
            {needs.map(({ Icon, label }, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5 w-16">
                <div className="relative">
                  <Icon className="w-7 h-7 text-gray-300" />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.5, repeat: Infinity, repeatDelay: 1.1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </motion.div>
                </div>
                <span className="text-[9px] text-gray-500 font-medium text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 font-medium">Designed so everyone can use it</p>
        </div>
      );
    }

    case "typography":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <motion.div
            className="text-gray-800 font-semibold text-center"
            animate={{
              fontSize: ["13px", "17px", "13px"],
              letterSpacing: ["-0.5px", "0.4px", "-0.5px"],
              lineHeight: ["0.9", "1.5", "0.9"],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Good typography
            <br />
            is easy to read
          </motion.div>
          <div className="relative h-4 w-32 text-center">
            <motion.p
              animate={{ opacity: [1, 0, 0, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.65, 1] }}
              className="absolute inset-0 text-xs text-red-400 font-medium"
            >
              hard to read
            </motion.p>
            <motion.p
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.65, 1] }}
              className="absolute inset-0 text-xs text-green-500 font-medium"
            >
              clear & spaced out
            </motion.p>
          </div>
        </div>
      );

    case "colorTheory": {
      const colors = [
        { bg: "#ef4444", label: "Urgent" },
        { bg: "#3b82f6", label: "Trust" },
        { bg: "#22c55e", label: "Success" },
      ];
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
          <div className="flex items-center gap-5">
            {colors.map((c, i) => (
              <motion.div
                key={c.label}
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.25, duration: 0.4 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                  className="w-9 h-9 rounded-full shadow-md"
                  style={{ backgroundColor: c.bg }}
                />
                <span className="text-[10px] text-gray-500 font-semibold">{c.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-gray-500 font-medium">Colors guide how users feel & act</p>
        </div>
      );
    }

    case "interaction":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="relative w-16 h-16">
            <motion.div
              animate={{ scale: [1, 1, 0.85, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, times: [0, 0.55, 0.65, 0.78, 1] }}
              className="absolute inset-0 rounded-full bg-white border-2 border-indigo-500 shadow-md flex items-center justify-center"
            >
              <motion.svg
                width="22" height="22" viewBox="0 0 24 24"
                animate={{
                  fill: ["none", "none", "#6366f1", "#6366f1"],
                }}
                transition={{ duration: 1.8, repeat: Infinity, times: [0, 0.6, 0.68, 1] }}
                stroke="#6366f1"
                strokeWidth="2"
              >
                <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c1.9 0 3.4 1 5.5 3 2.1-2 3.6-3 5.5-3C21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" />
              </motion.svg>
            </motion.div>
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
              className="absolute inset-0 rounded-full border-2 border-indigo-500"
            />
            <motion.g
              initial={{ x: 26, y: -14, opacity: 0 }}
              animate={{ x: [26, 6, 6, 26], y: [-14, -2, -2, -14], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, times: [0, 0.5, 0.75, 1] }}
              className="absolute"
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M0 0 L0 12 L3.5 9 L5.5 14 L7.5 13 L5.5 8 L9.5 8 Z" className="fill-gray-800" />
              </svg>
            </motion.g>
          </div>
          <p className="text-xs text-gray-500 font-medium">Tap → instant feedback</p>
        </div>
      );

    case "usabilityTesting":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  animate={
                    i === 1
                      ? { borderColor: ["#d1d5db", "#f87171", "#22c55e", "#22c55e"], backgroundColor: ["#ffffff", "#fef2f2", "#f0fdf4", "#f0fdf4"] }
                      : { borderColor: ["#d1d5db", "#22c55e", "#22c55e", "#22c55e"] }
                  }
                  transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.4, 0.75, 1] }}
                  className="w-8 h-8 rounded-lg border-2 bg-white"
                />
                {i < 2 && <div className="w-4 h-[2px] bg-gray-300" />}
              </div>
            ))}
          </div>
          <div className="relative h-4 w-36 text-center">
            <motion.p
              animate={{ opacity: [0, 1, 0, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.35, 0.5, 1] }}
              className="absolute inset-0 text-xs text-red-400 font-medium"
            >
              User got confused here
            </motion.p>
            <motion.p
              animate={{ opacity: [0, 0, 0, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.5, 0.7, 0.8, 1] }}
              className="absolute inset-0 text-xs text-green-500 font-medium"
            >
              Fixed after testing
            </motion.p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

// ============================================================
// FULL-SCREEN TOOL ANIMATIONS (click-triggered)
// ------------------------------------------------------------
// These render inside a fixed, viewport-covering layer created in
// SkillsSection below. Everything here is positioned with % values
// so it fills the whole screen rather than a single card.
// ============================================================

const FS_LABEL =
  "absolute text-[11px] md:text-xs font-medium text-gray-500 bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full";

const FigmaFullScreenScene = () => {
  const artboards = [
    { top: "12%", left: "8%", w: "20%", h: "26%", delay: 0 },
    { top: "16%", left: "62%", w: "24%", h: "22%", delay: 0.15 },
    { top: "56%", left: "16%", w: "18%", h: "24%", delay: 0.3 },
    { top: "60%", left: "68%", w: "20%", h: "20%", delay: 0.45 },
  ];
  // connector endpoints, expressed as % of viewport, matched to the
  // artboards above so lines visually plug into their edges.
  const connectors = [
    { d: "M28 25 C 45 25, 45 27, 62 27", delay: 0.6 },
    { d: "M72 42 C 60 50, 45 55, 25 58", delay: 0.85 },
    { d: "M34 75 C 50 78, 55 72, 68 68", delay: 1.1 },
  ];

  return (
    <div className="absolute inset-0">
      {artboards.map((a, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg border-2 border-indigo-400/40 bg-white/40"
          style={{ top: a.top, left: a.left, width: a.w, height: a.h }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [16, 0, -6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: a.delay },
            y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: a.delay },
          }}
        >
          {/* component chips inside each artboard */}
          <motion.div
            className="absolute rounded-sm bg-indigo-400/25"
            style={{ top: "14%", left: "10%", width: "45%", height: "14%" }}
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: a.delay + 0.3 }}
          />
          <motion.div
            className="absolute rounded-sm bg-indigo-400/15"
            style={{ top: "34%", left: "10%", width: "70%", height: "10%" }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: a.delay + 0.5 }}
          />
        </motion.div>
      ))}

      {/* prototype connector lines linking artboards */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connectors.map((c, i) => (
          <motion.path
            key={i}
            d={c.d}
            fill="none"
            stroke="#6366f1"
            strokeWidth="0.35"
            strokeDasharray="1.4 1.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: c.delay }}
          />
        ))}
      </svg>

      {/* pulsing connection nodes */}
      <motion.span className="absolute rounded-full" style={{ top: "25%", left: "27%", width: 9, height: 9, background: "#F24E1E" }}
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
      <motion.span className="absolute rounded-full" style={{ top: "42%", left: "70%", width: 9, height: 9, background: "#A259FF" }}
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }} transition={{ duration: 2.6, repeat: Infinity, delay: 0.4 }} />
      <motion.span className="absolute rounded-full" style={{ top: "68%", left: "30%", width: 9, height: 9, background: "#0ACF83" }}
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }} />

      {/* a cursor gliding between two screens, like a live prototype click-through */}
      <motion.g />
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          left: ["18%", "18%", "64%", "64%"],
          top: ["24%", "24%", "26%", "26%"],
        }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
      >
        <svg width="18" height="18" viewBox="0 0 16 16">
          <path d="M0 0 L0 12 L3.5 9 L5.5 14 L7.5 13 L5.5 8 L9.5 8 Z" fill="#1f2937" />
        </svg>
      </motion.div>

      <div className={FS_LABEL} style={{ bottom: "10%", left: "50%", transform: "translateX(-50%)" }}>
        Prototyping the flow, screen to screen
      </div>
    </div>
  );
};

const CanvaFullScreenScene = () => {
  return (
    <div className="absolute inset-0">
      {/* the canvas itself, centered */}
      <motion.div
        className="absolute rounded-xl border-2 border-dashed border-gray-300 bg-white/50"
        style={{ top: "14%", left: "30%", width: "40%", height: "58%" }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* photo block sliding in */}
        <motion.div
          className="absolute rounded-md overflow-hidden"
          style={{ top: "8%", left: "8%", width: "40%", height: "34%" }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: [0, 1, 1, 1], x: [-40, 0, 0, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.12, 0.5, 1], ease: "easeOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-teal-300/60 to-sky-400/50" />
        </motion.div>

        {/* text lines appearing/typing */}
        <motion.div
          className="absolute h-[10%] rounded-full bg-gray-800/70"
          style={{ top: "10%", right: "8%", width: "0%" }}
          animate={{ width: ["0%", "38%", "38%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.22, 0.55, 0.62], ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-[7%] rounded-full bg-gray-400/60"
          style={{ top: "24%", right: "8%", width: "0%" }}
          animate={{ width: ["0%", "26%", "26%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.28, 0.55, 0.62], ease: "easeInOut" }}
        />

        {/* shape sliding into place */}
        <motion.div
          className="absolute rounded-full bg-orange-400/50"
          style={{ bottom: "10%", left: "10%", width: "14%", height: "14%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, 20] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.62, 0.7], ease: "easeOut" }}
        />
        <motion.div
          className="absolute bg-purple-400/50"
          style={{
            bottom: "12%",
            right: "14%",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "16px solid rgba(168,85,247,0.5)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, 20] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.46, 0.62, 0.7], ease: "easeOut", delay: 0.1 }}
        />

        {/* color palette dots appearing */}
        <div className="absolute flex gap-1.5" style={{ bottom: "4%", left: "8%" }}>
          {["#14b8a6", "#f97316", "#a855f7", "#0ea5e9"].map((c, i) => (
            <motion.span
              key={c}
              className="rounded-full"
              style={{ width: 8, height: 8, background: c }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.55 + i * 0.02, 0.62, 0.66], ease: "easeOut" }}
            />
          ))}
        </div>

        {/* whole design fades and a second layout takes over */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-white"
          animate={{ opacity: [0, 0, 0, 1, 0, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.68, 0.72, 0.8, 0.92, 1] }}
        >
          <motion.div
            className="absolute inset-4 rounded-lg bg-gradient-to-tr from-fuchsia-300/50 to-amber-300/50"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.74, 0.9, 0.98] }}
          />
        </motion.div>
      </motion.div>

      <div className={FS_LABEL} style={{ bottom: "10%", left: "50%", transform: "translateX(-50%)" }}>
        Building a design, piece by piece
      </div>
    </div>
  );
};

const PhotoshopFullScreenScene = () => {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute rounded-lg overflow-hidden border border-gray-300/70 bg-white/40"
        style={{ top: "14%", left: "30%", width: "40%", height: "58%" }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* base photo, tone gradually shifting (before -> after) */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(148,163,184,0.45), rgba(100,116,139,0.35))",
              "linear-gradient(135deg, rgba(148,163,184,0.45), rgba(100,116,139,0.35))",
              "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(99,102,241,0.35))",
              "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(99,102,241,0.35))",
              "linear-gradient(135deg, rgba(148,163,184,0.45), rgba(100,116,139,0.35))",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.2, 0.55, 0.85, 1], ease: "easeInOut" }}
        />

        {/* marching-ants selection around a "subject" */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "18%",
            left: "20%",
            width: "34%",
            height: "40%",
            border: "1.5px dashed rgba(99,102,241,0.85)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 1, 0], rotate: [0, 360], scale: [0.9, 1, 1, 1, 0.9] }}
          transition={{
            opacity: { duration: 7, repeat: Infinity, times: [0, 0.08, 0.3, 0.42, 0.48] },
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, times: [0, 0.08, 0.3, 0.42, 0.48] },
          }}
        />

        {/* crop guides */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.46, 0.5, 0.58, 0.62, 1] }}
        >
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-indigo-400/60" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-indigo-400/60" />
          <div className="absolute top-1/3 left-0 right-0 h-px bg-indigo-400/60" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-indigo-400/60" />
        </motion.div>

        {/* layer strips sliding in from the side */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm border border-blue-400/50 bg-blue-400/10"
            style={{ top: `${10 + i * 6}%`, right: "-40%", width: "34%", height: "20%" }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0], right: ["-40%", "-40%", "4%", "4%", "-40%", "-40%"] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              times: [0, 0.6 + i * 0.02, 0.66 + i * 0.02, 0.78, 0.84, 1],
              ease: "easeOut",
            }}
          />
        ))}

        {/* brush stroke revealing an edit */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M20 78 C 34 66, 48 82, 62 68 S 84 54, 90 46"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 7, repeat: Infinity, times: [0, 0.2, 0.4, 0.46], ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <div className={FS_LABEL} style={{ bottom: "10%", left: "50%", transform: "translateX(-50%)" }}>
        Select, adjust, refine — before to after
      </div>
    </div>
  );
};

const ToolFullScreenScene = ({ type }: { type: string }) => {
  switch (type) {
    case "figma":
      return <FigmaFullScreenScene />;
    case "canva":
      return <CanvaFullScreenScene />;
    case "photoshop":
      return <PhotoshopFullScreenScene />;
    default:
      return null;
  }
};

// ============= TOOL CARD (click to trigger full-screen demo) =============

type ToolCardProps = {
  tool: (typeof tools)[number];
  index: number;
  isActive: boolean;
  onToggle: (animation: string) => void;
};

const ToolCard = ({ tool, index, isActive, onToggle }: ToolCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(tool.animation)}
      aria-pressed={isActive}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden rounded-xl bg-white border shadow-sm px-8 py-8 min-w-[190px] min-h-[150px] flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 hover:shadow-[0_12px_30px_rgba(99,102,241,0.15)] ${
        isActive
          ? "border-indigo-500 ring-2 ring-indigo-500/30 shadow-[0_12px_30px_rgba(99,102,241,0.2)]"
          : "border-gray-200 hover:border-indigo-500/40"
      }`}
    >
      <tool.icon
        className={`w-7 h-7 transition-transform duration-300 group-hover:scale-110 ${
          isActive ? "text-indigo-600" : "text-indigo-500"
        }`}
      />
      <span className="font-semibold text-gray-900">{tool.name}</span>
      <span className="text-xs text-gray-500">{tool.desc}</span>
      <span
        className={`text-[10px] font-medium mt-1 transition-colors ${
          isActive ? "text-indigo-500" : "text-indigo-500/50 group-hover:text-indigo-500"
        }`}
      >
        {isActive ? "Tap to close" : "Tap to see it in action"}
      </span>
    </motion.button>
  );
};

// ============= MAIN SKILLS SECTION =============

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const toolsWrapRef = useRef<HTMLDivElement>(null);

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

  // Click outside the "Tools I Use" row closes the full-screen demo.
  useEffect(() => {
    if (!activeTool) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsWrapRef.current && !toolsWrapRef.current.contains(e.target as Node)) {
        setActiveTool(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTool]);

  // Escape key also closes it.
  useEffect(() => {
    if (!activeTool) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTool(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeTool]);

  const handleToolClick = (animation: string) => {
    setActiveTool((prev) => (prev === animation ? null : animation));
  };

  return (
    // `isolate` scopes the fixed full-screen layer's stacking to this
    // section, so it renders behind this section's own heading/grid/tools
    // without needing to touch any other section of the site.
    <section id="skills" className="relative isolate pt-[120px] pb-20" ref={ref}>
      {/* Section background — fades back when a tool demo is active so the
          full-screen animation layer beneath it becomes visible. */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gray-50"
        animate={{ opacity: activeTool ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Full-screen animated layer. Fixed to the viewport, sits behind
          this section's content (z-10 below), above the section bg. */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            key="tool-fullscreen-layer"
            className="fixed inset-0 z-[999] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-white/70" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <ToolFullScreenScene type={activeTool} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
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
          <div ref={toolsWrapRef} className="flex flex-wrap gap-6">
            {tools.map((tool, i) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                index={i}
                isActive={activeTool === tool.animation}
                onToggle={handleToolClick}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;