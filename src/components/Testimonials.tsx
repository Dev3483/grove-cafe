"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Grove isn't merely a café — it is a sanctuary for the senses. The glass pavilion allows natural sunlight to wash over you, while the single-origin espresso is roasted to perfection.",
    author: "Aarav Singhania",
    title: "Architectural Critic, Design Review",
    rating: 5,
  },
  {
    quote: "The single best flat white in the city. The tranquil harmony of lush botanical gardens and warm walnut timber creates an inspiring atmosphere I visit every week.",
    author: "Maya Sen",
    title: "Author & Creative Director",
    rating: 5,
  },
  {
    quote: "We hosted an intimate dinner party in the garden pavilion. The culinary execution, wine pairings, and warm hospitality were extraordinary from start to finish.",
    author: "Devang Patel",
    title: "Founder & Gastronomy Enthusiast",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-heading",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cards, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-12 md:px-20 lg:px-24"
      style={{
        background: "linear-gradient(to bottom, #0a0806 0%, #14100e 50%, #0a0806 100%)",
      }}
    >
      {/* Header */}
      <div className="testimonial-heading text-center max-w-2xl mx-auto mb-20">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div style={{ width: 24, height: 1.5, background: "var(--color-amber)" }} />
          <span
            style={{
              color: "var(--color-amber)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Guest Impressions
          </span>
          <div style={{ width: 24, height: 1.5, background: "var(--color-amber)" }} />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            color: "var(--color-cream)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Cherished by
          <br />
          <span
            style={{
              color: "transparent",
              backgroundImage:
                "linear-gradient(135deg, #f5f0e8 0%, var(--color-amber-light) 60%, var(--color-gold) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            Our Community
          </span>
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="testimonial-card relative p-8 rounded-2xl flex flex-col justify-between transition-all duration-300"
            style={{
              background: "rgba(245,240,232,0.03)",
              border: "1px solid rgba(200,149,108,0.14)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,149,108,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,149,108,0.14)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div>
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span
                    key={si}
                    style={{ color: "var(--color-amber)", fontSize: "14px" }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "rgba(245,240,232,0.85)",
                  fontStyle: "italic",
                  marginBottom: "28px",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
                  color: "#1a1210",
                  fontFamily: "var(--font-serif)",
                }}
              >
                {t.author.charAt(0)}
              </div>
              <div>
                <p
                  className="font-bold text-sm"
                  style={{
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {t.author}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(200,149,108,0.7)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {t.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
