"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let tickerHandler: ((time: number) => void) | null = null;

    import("lenis").then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerHandler = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerHandler);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (tickerHandler) {
        gsap.ticker.remove(tickerHandler);
      }
      lenis?.destroy();
    };
  }, []);

  return <div ref={containerRef} className="smooth-scroll-wrapper">{children}</div>;
}
