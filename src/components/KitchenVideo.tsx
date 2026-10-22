"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KitchenVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // Smooth content reveal on left column
      gsap.fromTo(
        ".kitchen-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Video showcase card entrance on right column
      gsap.fromTo(
        ".kitchen-video-card",
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section
      id="kitchen"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0f0d0b 0%, #15110e 50%, #0f0d0b 100%)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[500px] pointer-events-none opacity-25 blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--color-amber) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Information & Stats */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Tag */}
          <div className="kitchen-reveal flex items-center gap-3 mb-5 opacity-0">
            <div
              style={{
                width: 32,
                height: 1.5,
                background: "linear-gradient(to right, var(--color-sage-light), transparent)",
              }}
            />
            <span
              style={{
                color: "var(--color-sage-light)",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Open Kitchen & Roastery
            </span>
          </div>

          {/* Title */}
          <h2
            className="kitchen-reveal opacity-0"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              color: "var(--color-cream)",
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: "1.2rem",
            }}
          >
            The Heart of
            <br />
            <span
              style={{
                color: "transparent",
                backgroundImage:
                  "linear-gradient(135deg, var(--color-sage-light) 0%, #d8e5cb 60%, var(--color-gold) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Culinary Art
            </span>
          </h2>

          {/* Accent Line */}
          <div
            className="kitchen-reveal opacity-0"
            style={{
              width: 56,
              height: 2,
              background: "linear-gradient(to right, var(--color-sage), transparent)",
              marginBottom: "1.5rem",
            }}
          />

          {/* Description */}
          <p
            className="kitchen-reveal opacity-0"
            style={{
              color: "rgba(245,240,232,0.72)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              marginBottom: "2.2rem",
            }}
          >
            Watch our master baristas pull single-origin espressos and culinary artists
            prepare plates with precision. We partner directly with organic farms and
            sustainable growers to ensure every dish honors the seasons.
          </p>

          {/* 3 Key Stats Chips */}
          <div className="kitchen-reveal grid grid-cols-3 gap-3 sm:gap-4 mb-8 opacity-0">
            {[
              { value: "100%", label: "Organic Sourcing", sub: "Farm direct" },
              { value: "93°C", label: "Precision Extraction", sub: "Custom roast" },
              { value: "Daily", label: "Seasonal Menus", sub: "Fresh harvest" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-white/5 transition-colors hover:border-amber-400/20"
                style={{ background: "rgba(245,240,232,0.03)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                    fontWeight: 700,
                    color: "var(--color-amber-light)",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "rgba(245,240,232,0.85)",
                    letterSpacing: "0.02em",
                    marginBottom: "2px",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.65rem",
                    color: "rgba(245,240,232,0.45)",
                  }}
                >
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="kitchen-reveal opacity-0">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300"
              style={{
                background: "rgba(122,139,111,0.22)",
                backdropFilter: "blur(10px)",
                color: "var(--color-sage-light)",
                border: "1px solid rgba(122,139,111,0.4)",
                textDecoration: "none",
              }}
            >
              Discover Our Creations →
            </a>
          </div>
        </div>

        {/* Right Column: Featured Video Showcase */}
        <div className="lg:col-span-7">
          <div
            className="kitchen-video-card relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
            style={{
              aspectRatio: "16 / 10",
              minHeight: "420px",
              border: "1px solid rgba(200,149,108,0.25)",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(200,149,108,0.15)",
              background: "#120e0b",
            }}
          >
            {/* The Kitchen Prep Video */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/kitchen_poster.jpg"
              suppressHydrationWarning
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.95) contrast(1.02)" }}
            >
              <source src="/videos/kitchen_prep.mp4" type="video/mp4" />
              <source src="https://raw.githubusercontent.com/Dev3483/grove-cafe/main/public/videos/kitchen_prep.mp4" type="video/mp4" />
            </video>

            {/* Subtle Gradient Vignette at Top and Bottom for Text Contrast */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(15,13,11,0.45) 0%, transparent 30%, transparent 60%, rgba(15,13,11,0.75) 100%)",
              }}
            />

            {/* Top Bar Floating Badges */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(15,13,11,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(200,149,108,0.3)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span
                  className="text-[10px] uppercase font-bold tracking-widest text-amber-200"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Live Prep & Roastery
                </span>
              </div>

              {/* Mute/Audio and Play Toggle Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  style={{
                    background: "rgba(15,13,11,0.75)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "var(--color-cream)",
                  }}
                  title={isPlaying ? "Pause video" : "Play video"}
                >
                  <span className="text-xs">{isPlaying ? "⏸" : "▶"}</span>
                </button>
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  style={{
                    background: "rgba(15,13,11,0.75)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "var(--color-cream)",
                  }}
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  <span className="text-xs">{isMuted ? "🔇" : "🔊"}</span>
                </button>
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-5 inset-x-5 flex items-end justify-between z-20">
              <div>
                <p
                  className="text-[10px] uppercase tracking-wider font-semibold text-amber-300/90 mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Culinary Theater
                </p>
                <p
                  className="text-base sm:text-lg font-bold text-white drop-shadow"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Fresh Extraction & Artisan Assembly
                </p>
              </div>

              <span
                className="hidden sm:inline-block px-3 py-1 rounded-md text-[10px] tracking-wider uppercase font-semibold text-stone-300"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                4K Ultra-HD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
