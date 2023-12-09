import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./framer.css";

export default function Framer() {
  const [isVisible, setIsVisible] = React.useState(true);
  return (
    <>
      <button
        className="example-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        Show/Hide
      </button>
      {/* 14:40 : Framer motion crash course */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              rotate: "0deg",
              scale: 0,
            }}
            animate={{
              rotate: "180deg",
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "backInOut",
            }}
            exit={{
              rotate: "0deg",
              scale: 0,
            }}
            style={{
              width: 150,
              height: 150,
              background: "black",
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
