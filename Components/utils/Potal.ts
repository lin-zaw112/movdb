"use client";
import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: ReactNode }): ReactNode => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(
        children,
        document.getElementById("LoadingPotal") as HTMLElement,
      )
    : null;
};

export default Portal;
