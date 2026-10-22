"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    tag: "Artisan Pour-Over",
    title: "Single-Origin\nMastery",
    desc: "Ethically harvested micro-lot beans extracted at precise temperatures to celebrate citrus, floral, and cacao undertones.",
    img: "/images/interior.jpg",
    price: "₹320",
    badge: "House Roastery",
  },
  {
    tag: "Culinary Garden",
    title: "Seasonal Harvest\nBrunch",
    desc: "Heirloom produce, sourdoughs baked at dawn, and organic eggs prepared in our open theater kitchen.",
    img: "/images/exterior.jpg",
    price: "₹650",
    badge: "Chef Curated",
  },
  {
    tag: "Pavilion Terrace",
    title: "Al Fresco Under\nthe Canopy",
    desc: "Sip beneath botanical shade while natural light filters through towering glass panels in an idyllic garden haven.",
    img: "/images/exterior.jpg",
    price: "Complimentary",
    badge: "Garden Setting",
  },
  {
    tag: "Private Salon",
    title: "Exclusive Evening\nSoirées",
    desc: "Candlelit gatherings, tailored multi-course tasting menus, and bespoke coffee-infused mixology for special occasions.",
    img: "/images/interior.jpg",
    price: "From ₹12,000",
    badge: "Reservation Only",
  },
];

export default function ExperienceCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".experience-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Staggered cards reveal
      gsap.fromTo(
        ".experience-card-item",
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-12 md:px-20 lg:px-24"
      style={{
        background: "linear-gradient(to bottom, #0f0d0b 0%, #171311 50%, #0f0d0b 100%)",
        overflow: "hidden",
      }}
    >
      {/* Decorative ambient backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--color-amber) 0%, transparent 70%)",
        }}
      />

      {/* Section Header */}
      <div className="experience-header relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div
              style={{
                width: 28,
                height: 1.5,
                background: "var(--color-amber)",
              }}
            />
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
              The Experience
            </span>
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
            Crafted for Moments
            <br />
            <span
              style={{
                color: "transparent",
                backgroundImage: "linear-gradient(135deg, #f5f0e8 0%, var(--color-amber-light) 60%, var(--color-gold) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              That Linger
            </span>
          </h2>
        </div>

        <p
          style={{
            color: "rgba(245,240,232,0.55)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            maxWidth: "380px",
          }}
        >
          Each corner of Grove is thoughtfully orchestrated — from the fragrance of
          roasting beans to the interplay of light and greenery.
        </p>
      </div>

      {/* Grid of 4 Luxurious Experience Cards */}
      <div
        ref={containerRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {EXPERIENCES.map((card, i) => (
          <ExperienceCard key={i} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({
  card,
  index,
}: {
  card: (typeof EXPERIENCES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -12;
    const ry = (x - 0.5) * 12;

    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.35,
      ease: "power2.out",
    });

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.08,
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.6,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="experience-card-item group relative h-[480px] rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
        border: "1px solid rgba(200,149,108,0.15)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Background Image */}
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url(${card.img})`,
          filter: "brightness(0.85)",
        }}
      />

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(15,13,11,0.95) 0%, rgba(15,13,11,0.5) 45%, rgba(15,13,11,0.2) 75%)",
        }}
      />

      {/* Top Badges */}
      <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10">
        <span
          className="px-3 py-1.5 rounded-full text-[10px] uppercase font-semibold tracking-wider"
          style={{
            background: "rgba(15,13,11,0.65)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(200,149,108,0.3)",
            color: "var(--color-amber-light)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {card.badge}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            background: "rgba(245,240,232,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(245,240,232,0.2)",
            color: "var(--color-cream)",
          }}
        >
          <span className="text-sm">↗</span>
        </div>
      </div>

      {/* Content at Bottom */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
          style={{
            color: "var(--color-amber-light)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {card.tag}
        </span>

        <h3
          className="text-xl sm:text-2xl font-bold leading-tight mb-3 whitespace-pre-line"
          style={{
            color: "var(--color-cream)",
            fontFamily: "var(--font-serif)",
            letterSpacing: "-0.01em",
          }}
        >
          {card.title}
        </h3>

        <p
          className="text-xs leading-relaxed mb-4 line-clamp-3"
          style={{
            color: "rgba(245,240,232,0.65)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {card.desc}
        </p>

        {/* Pricing / Details Line */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span
            className="text-base font-bold"
            style={{
              color: "var(--color-gold)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {card.price}
          </span>
          <span
            className="text-[10px] tracking-wider uppercase"
            style={{
              color: "rgba(245,240,232,0.45)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Discover More
          </span>
        </div>
      </div>
    </div>
  );
}
