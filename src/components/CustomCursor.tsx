"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.2 });
      gsap.to(dot, { scale: 1.5, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer subtle glow ring */}
      <div
        ref={ringRef}
        className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-amber-400/40 pointer-events-none transition-transform will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      {/* Center pinpoint gold dot */}
      <div
        ref={dotRef}
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-amber-400 pointer-events-none transition-transform will-change-transform shadow-[0_0_8px_rgba(251,191,36,0.8)]"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </div>
  );
}
