"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmbientGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // Reveal heading
      gsap.fromTo(
        ".gallery-heading",
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

      // Stagger reveal gallery items
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: grid, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const galleryItems = [
    {
      img: "/images/exterior.jpg",
      title: "The Glass Pavilion",
      subtitle: "Main Exterior",
      className: "md:col-span-2 md:row-span-2 h-[340px] md:h-[500px]",
    },
    {
      img: "/images/interior.jpg",
      title: "The Copper Bar",
      subtitle: "Barista Counter",
      className: "md:col-span-1 h-[240px]",
    },
    {
      img: "/images/exterior.jpg",
      title: "Botanical Canopy",
      subtitle: "Outdoor Garden",
      className: "md:col-span-1 h-[240px]",
    },
    {
      img: "/images/interior.jpg",
      title: "Sunlit Atrium",
      subtitle: "Dining Hall",
      className: "md:col-span-1 h-[260px]",
    },
    {
      img: "/images/exterior.jpg",
      title: "Twilight Reflections",
      subtitle: "Golden Hour",
      className: "md:col-span-1 h-[260px]",
    },
    {
      img: "/images/interior.jpg",
      title: "The Reading Nook",
      subtitle: "Intimate Seating",
      className: "md:col-span-1 h-[260px]",
    },
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-12 md:px-20 lg:px-24"
      style={{ background: "#0a0806" }}
    >
      {/* Header */}
      <div className="gallery-heading flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
              Spaces & Architecture
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
            Light, Glass &
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
              Living Greenery
            </span>
          </h2>
        </div>

        <p
          style={{
            color: "rgba(245,240,232,0.55)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            maxWidth: "420px",
          }}
        >
          Designed to dissolve the boundary between indoors and outdoors. Floor-to-ceiling
          architectural glass framed with rich walnut timber and curated tropical foliage.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
      >
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={`gallery-item group relative rounded-2xl overflow-hidden cursor-pointer ${item.className}`}
            style={{
              border: "1px solid rgba(200,149,108,0.15)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
            }}
          >
            {/* Background Image with Hover Zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${item.img})`,
              }}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,13,11,0.92) 0%, rgba(15,13,11,0.2) 50%, transparent 100%)",
              }}
            />

            {/* Subtle amber shimmer on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "rgba(200,149,108,0.06)",
              }}
            />

            {/* Floating Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className="px-2.5 py-1 rounded-md text-[9px] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "rgba(15,13,11,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(200,149,108,0.3)",
                  color: "var(--color-amber-light)",
                }}
              >
                {item.subtitle}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
              <div>
                <p
                  className="text-[10px] uppercase font-semibold tracking-widest mb-1"
                  style={{
                    color: "var(--color-amber-light)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.subtitle}
                </p>
                <h3
                  className="text-lg md:text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-cream)",
                  }}
                >
                  {item.title}
                </h3>
              </div>

              <div
                className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                style={{
                  background: "var(--color-amber)",
                  color: "#1a1210",
                }}
              >
                <span className="text-xs font-bold">↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
