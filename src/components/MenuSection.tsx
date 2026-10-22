"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_CATEGORIES = [
  {
    id: "signatures",
    name: "Artisan Coffee & Signatures",
    items: [
      {
        name: "Grove Smoked Flat White",
        price: "₹340",
        desc: "Double ristretto over velvety microfoam infused with lightly torched oak wood aromatics.",
        tag: "Signature",
      },
      {
        name: "Kyoto Cold Drip & Tonic",
        price: "₹380",
        desc: "14-hour slow extraction, Fever-Tree Indian tonic, candied orange peel, rosemary sprig.",
        tag: "Craft",
      },
      {
        name: "Uji Ceremonial Matcha Latte",
        price: "₹420",
        desc: "First-harvest ceremonial matcha whisked with artisanal oat milk and subtle Madagascar vanilla.",
        tag: "Organic",
      },
      {
        name: "Wildflower Honey & Lavender Cortado",
        price: "₹360",
        desc: "Equal parts espresso and warm textured milk infused with Himalayan lavender and organic honey.",
        tag: "Floral",
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen & Savory Gastronomy",
    items: [
      {
        name: "Brioche Tartine & Heirloom Avocado",
        price: "₹540",
        desc: "Artisan sourdough, whipped Hass avocado, pickled shallots, Persian feta, free-range poached egg.",
        tag: "Breakfast",
      },
      {
        name: "Wild Morel & Black Truffle Risotto",
        price: "₹880",
        desc: "Carnaroli rice, slow-simmered mushroom stock, 24-month Parmigiano-Reggiano, shaved winter truffle.",
        tag: "Chef Special",
      },
      {
        name: "Pan-Seared Salmon & Yuzu Quinoa",
        price: "₹940",
        desc: "Crisp-skin Norwegian salmon, warm herb quinoa, tenderstem broccoli, citrus glaze.",
        tag: "Seafood",
      },
      {
        name: "Burrata Pugliese & Charred Peach",
        price: "₹620",
        desc: "Fresh cream burrata, flame-roasted peaches, wild arugula, 12-year aged Modena balsamic glaze.",
        tag: "Appetizer",
      },
    ],
  },
  {
    id: "pastry",
    name: "Boulangerie & Desserts",
    items: [
      {
        name: "Pistachio & Rose Water Croissant",
        price: "₹380",
        desc: "Twice-baked French butter croissant, roasted Iranian pistachio frangipane, dried rose petals.",
        tag: "Fresh Baked",
      },
      {
        name: "Dark Chocolate & Sea Salt Fondant",
        price: "₹480",
        desc: "72% single-estate Madagascar cacao molten cake, hand-churned bourbon vanilla bean gelato.",
        tag: "Decadent",
      },
      {
        name: "Yuzu & Kaffir Lime Tart",
        price: "₹420",
        desc: "Crisp sablé breton shell, velvety yuzu curd, torched Swiss meringue crown.",
        tag: "Citrus",
      },
      {
        name: "Grove Tiramisu Tradizionale",
        price: "₹460",
        desc: "Savoiardi soaked in house espresso and amaretto, layered with mascarpone sabayon.",
        tag: "House Classic",
      },
    ],
  },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".menu-title-block",
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

      // Stagger items
      gsap.fromTo(
        ".menu-card-element",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".menu-content-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-12 md:px-20 lg:px-24"
      style={{
        background: "linear-gradient(to bottom, #110e0c 0%, #1a1411 50%, #110e0c 100%)",
      }}
    >
      {/* Header */}
      <div className="menu-title-block flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-7xl mx-auto">
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
              Culinary Selections
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
            Curated With
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
              Pure Intention
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
          All dairy is organically sourced from ethical valley dairies. Gluten-free
          and vegan adaptations gladly made upon request.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-3">
        {MENU_CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(i)}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer"
            style={{
              background:
                activeTab === i
                  ? "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))"
                  : "rgba(245,240,232,0.05)",
              color: activeTab === i ? "#1a1210" : "rgba(245,240,232,0.7)",
              border: activeTab === i ? "none" : "1px solid rgba(200,149,108,0.2)",
              fontFamily: "var(--font-sans)",
              boxShadow: activeTab === i ? "0 4px 20px rgba(200,149,108,0.3)" : "none",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-content-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {MENU_CATEGORIES[activeTab].items.map((item, idx) => (
          <div
            key={idx}
            className="menu-card-element group p-6 rounded-2xl transition-all duration-300"
            style={{
              background: "rgba(245,240,232,0.03)",
              border: "1px solid rgba(200,149,108,0.12)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(245,240,232,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(200,149,108,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(245,240,232,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(200,149,108,0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <h4
                  className="text-lg font-bold"
                  style={{
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {item.name}
                </h4>
                <span
                  className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold"
                  style={{
                    background: "rgba(200,149,108,0.15)",
                    color: "var(--color-amber-light)",
                    border: "1px solid rgba(200,149,108,0.25)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <span
                className="text-lg font-bold"
                style={{
                  color: "var(--color-gold)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.price}
              </span>
            </div>

            <p
              className="text-xs leading-relaxed"
              style={{
                color: "rgba(245,240,232,0.55)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="mt-16 text-center">
        <a
          href="#reserve"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
            color: "#1a1210",
            fontFamily: "var(--font-sans)",
            boxShadow: "0 8px 30px rgba(200,149,108,0.25)",
            textDecoration: "none",
          }}
        >
          Book a Table for Tasting
        </a>
      </div>
    </section>
  );
}
