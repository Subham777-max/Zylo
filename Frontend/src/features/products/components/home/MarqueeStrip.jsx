const ITEMS = [
  "New In · Season 2026",
  "Nocturnal Atelier",
  "Exclusive Pieces",
  "Free Shipping Above ₹5,000",
  "Curated Collections",
  "Handpicked Designers",
  "Premium Fashion",
  "Luxury Redefined",
];

export default function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden py-3 border-y relative"
      style={{
        backgroundColor: "var(--color-primary-container)",
        borderColor: "rgba(212,160,23,0.3)",
      }}
    >
      <div
        className="flex gap-10 w-max"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 shrink-0"
            style={{
              color: "var(--color-on-primary-container)",
              fontSize: "0.58rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
            }}
          >
            {item}
            <span style={{ opacity: 0.4, fontSize: "0.45rem" }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
