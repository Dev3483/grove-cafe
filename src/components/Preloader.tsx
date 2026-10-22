"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 700);
      return () => clearTimeout(hideTimer);
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "#0f0d0b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Radial warm glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,149,108,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top rule */}
      <div
        style={{
          width: "48px",
          height: "1.5px",
          background: "linear-gradient(to right, transparent, rgba(200,149,108,0.4), transparent)",
          marginBottom: "28px",
        }}
      />

      {/* GROVE wordmark */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "transparent",
            backgroundImage:
              "linear-gradient(135deg, #f5f0e8 0%, rgba(200,149,108,0.95) 45%, #f5f0e8 70%, rgba(200,149,108,0.8) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            margin: 0,
            lineHeight: 1,
          }}
        >
          GROVE
        </p>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "rgba(200,149,108,0.65)",
          marginBottom: "36px",
        }}
      >
        Café & Botanical Dining
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: "160px",
          height: "2px",
          background: "rgba(200,149,108,0.12)",
          position: "relative",
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, var(--color-amber), var(--color-amber-light))",
            transformOrigin: "left",
            animation: "preloader-bar 1.5s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        />
      </div>

      {/* Loading label */}
      <p
        style={{
          marginTop: "16px",
          fontFamily: "var(--font-sans)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(200,149,108,0.4)",
        }}
      >
        Curating Ambiance
      </p>
    </div>
  );
}
