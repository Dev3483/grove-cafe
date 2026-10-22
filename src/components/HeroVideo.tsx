"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // Parallax zoom and shift on scroll
      gsap.to(videoRef.current, {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Fade content smoothly on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "45% top",
          scrub: true,
        },
      });

      // Darken overlay as user scrolls down
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.6 });

      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 50, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.4"
        )
        .fromTo(
          ".hero-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          ".hero-badges",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/cafe_entering_poster.jpg"
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform" }}
      >
        <source src="/videos/cafe_entering.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Cinematic Gradients */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(15,13,11,0.96) 0%, rgba(15,13,11,0.45) 45%, rgba(15,13,11,0.2) 65%, rgba(15,13,11,0.65) 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 60%, rgba(200,149,108,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-12 md:px-20 lg:px-24"
        style={{ paddingBottom: "10vh", maxWidth: "900px" }}
      >
        {/* Section Tag */}
        <div className="hero-label flex items-center gap-3 mb-4 opacity-0">
          <div
            style={{
              width: 32,
              height: 1.5,
              background: "linear-gradient(to right, var(--color-amber), transparent)",
            }}
          />
          <span
            style={{
              color: "var(--color-amber-light)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            A Sanctuary of Senses
          </span>
        </div>

        {/* Main Headline */}
        <div className="overflow-hidden mb-1">
          <h1
            className="hero-title-line opacity-0"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              color: "var(--color-cream)",
              fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Where Nature
          </h1>
        </div>
        <div className="overflow-hidden mb-4">
          <h1
            className="hero-title-line opacity-0"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              color: "var(--color-cream)",
              fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Meets{" "}
            <span
              style={{
                color: "transparent",
                backgroundImage:
                  "linear-gradient(135deg, #f5f0e8 0%, var(--color-amber-light) 40%, var(--color-gold) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Artisan Craft
            </span>
          </h1>
        </div>

        {/* Gradient Accent Rule */}
        <div
          className="hero-rule"
          style={{
            width: 68,
            height: 2,
            background:
              "linear-gradient(to right, var(--color-amber), rgba(200,149,108,0.2))",
            marginBottom: "1.2rem",
            transformOrigin: "left",
          }}
        />

        {/* Subtitle */}
        <p
          className="hero-subtitle opacity-0"
          style={{
            color: "rgba(245,240,232,0.72)",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
            lineHeight: 1.75,
            maxWidth: "520px",
            marginBottom: "2rem",
            letterSpacing: "0.01em",
          }}
        >
          Specialty coffee roasted in-house, farm-to-table gastronomy, and serene
          architectural warmth sheltered by a glass pavilion surrounded by lush greenery.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap items-center mb-8">
          <a
            href="#reserve"
            className="hero-btn opacity-0 inline-flex items-center justify-center transition-all duration-300"
            style={{
              padding: "16px 36px",
              background:
                "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
              color: "#1a1210",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              borderRadius: "10px",
              boxShadow: "0 8px 30px rgba(200,149,108,0.35)",
              textDecoration: "none",
            }}
          >
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="hero-btn opacity-0 inline-flex items-center justify-center transition-all duration-300"
            style={{
              padding: "16px 36px",
              background: "rgba(245,240,232,0.06)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              color: "var(--color-cream)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              border: "1px solid rgba(200,149,108,0.3)",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Explore Menu
          </a>
        </div>

        {/* Live Badges */}
        <div className="hero-badges flex items-center gap-6 sm:gap-8 flex-wrap opacity-0 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                color: "rgba(245,240,232,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              Open Daily 7:00 AM – 11:00 PM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--color-amber)", fontSize: "12px" }}>★</span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                color: "rgba(245,240,232,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              4.9/5 Rating (850+ reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        className="hero-scroll-indicator absolute bottom-8 right-8 sm:right-16 z-20 flex flex-col items-center gap-2 opacity-0 pointer-events-none"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(200,149,108,0.7)",
            writingMode: "vertical-rl",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 36,
            background:
              "linear-gradient(to bottom, var(--color-amber), transparent)",
            animation: "pulse-glow 2s ease infinite",
          }}
        />
      </div>
    </section>
  );
}
