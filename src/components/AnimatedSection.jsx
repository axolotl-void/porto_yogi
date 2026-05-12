import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function AnimatedSection({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
