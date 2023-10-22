"use client";
import { LazyMotion, m, AnimatePresence, domAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const animation = {
  name: "Slide Up",
  variants: {
    initial: {
      opacity: 0,
      top: "100vh",
      scale: 0.4,
    },
    animate: {
      opacity: 1,
      top: "0vh",
      scale: 1,
    },
    exit: {
      opacity: 0,
      top: "100vh",
      scale: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export default function Template({ children }: Props): React.JSX.Element {
  const path = usePathname();
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          layout
          key={path}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animation.variants}
          transition={animation.transition}
          className="relative z-40 flex h-screen w-screen flex-row overflow-hidden"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
