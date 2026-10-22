"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 85%" },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-20 px-6 sm:px-12 md:px-20 lg:px-24"
      style={{
        background: "#070605",
        borderTop: "1px solid rgba(200,149,108,0.15)",
      }}
    >
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="footer-reveal">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-serif font-black text-lg"
              style={{
                background: "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
                color: "#1a1210",
              }}
            >
              G
            </div>
            <span
              className="font-serif font-bold text-xl tracking-widest text-stone-100"
              style={{ letterSpacing: "0.15em" }}
            >
              GROVE
            </span>
          </div>
          <p
            className="text-xs leading-relaxed text-stone-400 mb-6"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A botanical café and dining sanctuary. Specialty single-estate coffees,
            artisanal pastries, and open kitchen cuisine enclosed in architectural glass.
          </p>
          <div className="flex gap-4">
            {["Instagram", "Twitter / X", "Spotify Radio"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-amber-200/60 hover:text-amber-300 transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Visit & Directions */}
        <div className="footer-reveal">
          <h4
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/90 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Location
          </h4>
          <p
            className="text-xs leading-loose text-stone-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Glass Pavilion, The Botanical Enclave
            <br />
            14th Cross, Green Gardens Road
            <br />
            Bengaluru, Karnataka 560001
          </p>
          <div className="mt-4">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-300/80 underline underline-offset-4 hover:text-amber-200"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="footer-reveal">
          <h4
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/90 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Hours
          </h4>
          <ul
            className="text-xs space-y-2 text-stone-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <li className="flex justify-between">
              <span>Mon – Thu</span>
              <span className="text-stone-400">7:00 AM – 10:30 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Fri – Sat</span>
              <span className="text-stone-400">7:00 AM – 11:30 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday Brunch</span>
              <span className="text-stone-400">8:00 AM – 10:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Inquiries */}
        <div className="footer-reveal">
          <h4
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/90 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Contact & Private Events
          </h4>
          <p
            className="text-xs leading-loose text-stone-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Direct: +91 98765 43210
            <br />
            Concierge: reservations@grove.cafe
            <br />
            Events: gatherings@grove.cafe
          </p>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="footer-reveal max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
        <p>© 2026 GROVE Café & Botanical Pavilion. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Terms of Hospitality</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
