import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ── Icons ──────────────────────────────────────────────────────────────────────

const DashboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ProductsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ── Nav items config ───────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard",   to: "/seller/dashboard",  Icon: DashboardIcon  },
  { label: "My Products", to: "/seller/products",   Icon: ProductsIcon   },
  { label: "Orders",      to: "/seller/orders",     Icon: OrdersIcon     },
  { label: "Analytics",   to: "/seller/analytics",  Icon: AnalyticsIcon  },
  { label: "Settings",    to: "/seller/settings",   Icon: SettingsIcon   },
];

// ── SellerSidebar ──────────────────────────────────────────────────────────────

export default function SellerSidebar() {
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth?.user ?? null);

  return (
    <aside
      className="flex flex-col h-full w-full"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        borderRight: "1px solid rgba(212, 160, 23, 0.08)",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="px-6 pt-7 pb-5">
        <p
          className="uppercase tracking-[0.2em] mb-1"
          style={{ fontSize: "0.52rem", color: "var(--color-outline)", fontWeight: 600 }}
        >
          Seller Studio
        </p>
        <p
          className="font-semibold truncate"
          style={{ fontSize: "0.85rem", color: "var(--color-on-surface)" }}
        >
          {user?.fullName ?? user?.name ?? "My Shop"}
        </p>
      </div>

      {/* Gold divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.1)", margin: "0 0" }} />

      {/* ── Nav items ───────────────────────────────────────────────────── */}
      <nav className="flex flex-col mt-2 flex-1">
        {NAV_ITEMS.map(({ label, to, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/seller/dashboard"}
            className="flex items-center gap-3 px-6 transition-all duration-200"
            style={({ isActive }) => ({
              height: "48px",
              fontSize: "0.62rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              textDecoration: "none",
              color: isActive ? "var(--color-primary)" : "var(--color-outline)",
              borderLeft: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
              backgroundColor: "transparent",
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.color = "var(--color-on-surface)";
              }
            }}
            onMouseLeave={(e) => {
              const isActive = e.currentTarget.getAttribute("aria-current") === "page";
              e.currentTarget.style.color = isActive ? "var(--color-primary)" : "var(--color-outline)";
            }}
          >
            {({ isActive }) => (
              <>
                <span style={{ color: isActive ? "var(--color-primary)" : "inherit", lineHeight: 0 }}>
                  <Icon />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom: New Listing CTA ──────────────────────────────────────── */}
      <div className="p-5">
        {/* Thin divider above */}
        <div
          className="mb-4"
          style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.08)" }}
        />
        <button
          onClick={() => navigate("/seller/products", { state: { openCreateModal: true } })}
          className="flex items-center justify-center gap-2 w-full transition-all duration-300"
          style={{
            border: "1px solid var(--color-primary-container)",
            color: "var(--color-primary-container)",
            backgroundColor: "transparent",
            padding: "0.65rem",
            fontSize: "0.62rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.13em",
            borderRadius: 0,
            cursor: "pointer",
            fontFamily: "var(--font-family)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary-container)";
            e.currentTarget.style.color = "var(--color-on-primary-container)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-primary-container)";
          }}
        >
          <PlusIcon />
          New Listing
        </button>
      </div>
    </aside>
  );
}
