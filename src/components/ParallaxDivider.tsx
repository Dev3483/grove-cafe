"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxDivider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      gsap.fromTo(
        ".divider-text",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[55vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={imgRef}
        className="absolute inset-[-15%] bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/exterior.jpg)",
          willChange: "transform",
          filter: "brightness(0.65)",
        }}
      />

      {/* Dark Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,13,11,0.85) 0%, rgba(15,13,11,0.5) 50%, rgba(15,13,11,0.85) 100%)",
        }}
      />

      {/* Quote Container */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p
          className="divider-text text-amber-300/80 font-sans text-[11px] uppercase tracking-[0.35em] font-semibold mb-4"
        >
          Philosophy of Grove
        </p>
        <p
          className="divider-text text-2xl sm:text-3xl md:text-4xl italic font-serif leading-snug text-stone-100"
          style={{ letterSpacing: "-0.01em" }}
        >
          &ldquo;In every roasted bean, an honest dialogue with nature.
          In every gathering, a timeless memory.&rdquo;
        </p>
        <div
          className="divider-text w-16 h-[2px] mx-auto mt-6"
          style={{
            background: "linear-gradient(to right, transparent, var(--color-amber), transparent)",
          }}
        />
      </div>
    </section>
  );
}
