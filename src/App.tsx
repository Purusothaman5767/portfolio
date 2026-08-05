import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import CaseStudy from "./components/CaseStudy"; // ✅ use the correct file name

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // ✅ valid prop
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen"
    >
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Index />} />

        {/* Dynamic Case Study Page */}
        <Route path="/projects/:id" element={<CaseStudy />} />
      </Routes>
    </motion.div>
  );
};

export default App;
