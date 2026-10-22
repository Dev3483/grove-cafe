"use client";

export default function Ticker() {
  const items = [
    "☕  Artisan Coffee Roasted In-House Daily",
    "🌿  100% Locally Sourced Ingredients",
    "🍽️  Seasonal Menu Updated Weekly",
    "✨  Private Dining & Events Available",
    "🌳  Glass Pavilion Surrounded by Nature",
    "☕  Artisan Coffee Roasted In-House Daily",
    "🌿  100% Locally Sourced Ingredients",
    "🍽️  Seasonal Menu Updated Weekly",
    "✨  Private Dining & Events Available",
    "🌳  Glass Pavilion Surrounded by Nature",
  ];

  return (
    <div
      className="overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
        height: "36px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="ticker-track">
        {items.map((text, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#1a1210",
              paddingRight: "80px",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
