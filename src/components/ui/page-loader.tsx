"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function PageLoader({ duration = 2500 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (exit) document.documentElement.style.overflow = "";
  }, [exit]);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(1 - Math.pow(1 - pct, 3)); // ease-out cubic
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setExit(true), 350);
      }
    };
    requestAnimationFrame(tick);
  }, [duration]);

  const percent = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center h-dvh overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center gap-8 z-10">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                KOLab AI
              </span>
            </motion.div>

            {/* Orbiting ring + center icon */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* SVG progress ring */}
              <svg width="140" height="140" viewBox="0 0 140 140" className="absolute">
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - progress)}
                  transform="rotate(-90 70 70)"
                  style={{ transition: "stroke-dashoffset 0.05s linear" }}
                />
              </svg>

              {/* Orbiting dot */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
                transformTemplate={(_, t) => `${t} translate(0px, -60px)`}
              />

              {/* Center spinning diamond */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12"
              >
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <path
                    d="M24 4 L44 24 L24 44 L4 24 Z"
                    fill="rgba(255,255,255,0.9)"
                  />
                  <path
                    d="M24 4 L4 24 L24 24 Z"
                    fill="rgba(255,255,255,0.4)"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Percent counter */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className="font-black tabular-nums leading-none text-white"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  textShadow:
                    "0 2px 10px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)",
                }}
              >
                {percent}
                <span className="text-white/50 text-2xl">%</span>
              </span>
              <span className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.25em]">
                {done ? "Ready" : "Initializing AI Engine"}
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-56 h-[3px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.25 }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(to right, rgba(255,255,255,0.8), #fff)",
                  width: `${percent}%`,
                  transition: "width 0.05s linear",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
