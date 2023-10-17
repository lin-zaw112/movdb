import React, {
  type FC,
  useRef,
  useEffect,
  type MutableRefObject,
  useCallback,
} from "react";
import { motion, useAnimation } from "framer-motion";
interface VC_TickerProps {
  children: React.ReactNode;
}

const Ticker: FC<VC_TickerProps> = ({ children }) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const speed = 80;
  const loop = useCallback(
    (control: any, othersRef: MutableRefObject<HTMLDivElement>): void => {
      if (othersRef.current !== null) {
        const { left, width } = othersRef.current.getBoundingClientRect();
        const start = left - width - 80;
        control.set({ x: start });
        const duration = (window.innerWidth - start) / speed;
        control
          .start({
            x: window.innerWidth,
            transition: { duration, ease: "linear" },
          })
          .then(() => {
            loop(control, othersRef);
          });
      }
    },
    [],
  );
  const startLoop = useCallback((): void => {
    if (ref1.current != null && ref2.current != null) {
      const width = ref1.current.offsetWidth;

      const start1 = 0;
      const start2 = start1 - width - 0;
      controls1.set({ x: start1 });
      controls2.set({ x: start2 });

      const duration1 = (window.innerWidth - start1) / speed;
      const duration2 = (window.innerWidth - start2) / speed;
      void controls1
        .start({
          x: window.innerWidth,
          transition: { duration: duration1, ease: "linear" },
        })
        .then(() => {
          loop(controls1, ref2 as MutableRefObject<HTMLDivElement>);
        });
      void controls2
        .start({
          x: window.innerWidth,
          transition: { duration: duration2, ease: "linear" },
        })
        .then(() => {
          loop(controls2, ref1 as MutableRefObject<HTMLDivElement>);
        });
    }
  }, [controls1, controls2, loop]);
  useEffect(() => {
    startLoop();
  }, [startLoop]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        style={{ position: "absolute" }}
        ref={ref1}
        animate={controls1}
      >
        <div className="flex flex-row">{children}</div>
      </motion.div>
      <motion.div
        ref={ref2}
        style={{ position: "absolute" }}
        animate={controls2}
      >
        <div className="flex flex-row">{children}</div>
      </motion.div>
    </div>
  );
};

export default Ticker;
