"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
      );
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Kitchen", href: "#kitchen" },
    { label: "Spaces", href: "#gallery" },
    { label: "Menu", href: "#menu" },
    { label: "Reservations", href: "#reserve" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 md:px-16 py-4 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(15,13,11,0.92)"
            : "rgba(15,13,11,0.45)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(200,149,108,0.18)"
            : "1px solid rgba(255,255,255,0.05)",
          opacity: 0,
        }}
      >
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 text-decoration-none">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-serif font-black text-lg shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
              color: "#1a1210",
            }}
          >
            G
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span
                className="font-serif font-bold text-lg tracking-widest text-stone-100"
                style={{ letterSpacing: "0.15em" }}
              >
                GROVE
              </span>
              <span
                className="text-[9px] uppercase tracking-widest font-semibold"
                style={{ color: "var(--color-amber-light)" }}
              >
                Pavilion
              </span>
            </div>
            <p className="text-[9px] text-stone-400 font-sans tracking-wider hidden sm:block">
              Café & Botanical Dining
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200"
                style={{
                  color: "rgba(245,240,232,0.7)",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-amber-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)";
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Reserve CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#reserve"
            className="px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
              color: "#1a1210",
              fontFamily: "var(--font-sans)",
              boxShadow: "0 4px 20px rgba(200,149,108,0.3)",
              textDecoration: "none",
            }}
          >
            Reserve Table
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg text-amber-200 flex flex-col gap-1.5 justify-center items-center cursor-pointer"
          aria-label="Toggle navigation"
        >
          <span
            className="w-6 h-[2px] transition-transform duration-300"
            style={{
              background: "var(--color-amber)",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            className="w-6 h-[2px] transition-opacity duration-300"
            style={{
              background: "var(--color-amber)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="w-6 h-[2px] transition-transform duration-300"
            style={{
              background: "var(--color-amber)",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 lg:hidden"
          style={{
            background: "rgba(15,13,11,0.98)",
            backdropFilter: "blur(24px)",
          }}
        >
          {navLinks.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif font-bold text-stone-200 tracking-wider hover:text-amber-300 transition-colors"
              style={{
                animation: `fadeUp 0.4s ease ${i * 0.08}s forwards`,
                opacity: 0,
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#reserve"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-stone-950"
            style={{
              background: "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
            }}
          >
            Book Table
          </a>
        </div>
      )}
    </>
  );
}
