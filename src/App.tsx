import { motion } from "framer-motion";
import Index from "./pages/Index.tsx";

const App = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <Index />
  </motion.div>
);

export default App;