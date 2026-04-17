import { useEffect } from "react";

// ── Icon components ───────────────────────────────────────────────────────────
const DestructiveIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const InfoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ── ConfirmModal ──────────────────────────────────────────────────────────────
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}) {
  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const accentColor = isDestructive ? "rgba(239,68,68,0.8)" : "var(--color-primary)";
  const accentBg    = isDestructive ? "rgba(239,68,68,0.06)" : "rgba(212,160,23,0.06)";

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(13,13,13,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* ── Panel ── */}
      <div
        className="relative w-full max-w-105 flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface-container-low)",
          border: "1px solid rgba(212,160,23,0.12)",
          fontFamily: "var(--font-family)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,160,23,0.04)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent stripe */}
        <div
          className="w-full"
          style={{ height: "2px", backgroundColor: accentColor, opacity: 0.9 }}
        />

        {/* Content */}
        <div className="p-8 flex flex-col gap-7">

          {/* ── Header row ── */}
          <div className="flex items-start gap-5">
            {/* Icon box */}
            <div
              className="shrink-0 w-11 h-11 flex items-center justify-center"
              style={{
                backgroundColor: accentBg,
                border: `1px solid ${isDestructive ? "rgba(239,68,68,0.2)" : "rgba(212,160,23,0.2)"}`,
                color: accentColor,
              }}
            >
              {isDestructive ? <DestructiveIcon /> : <InfoIcon />}
            </div>

            {/* Title + label */}
            <div className="flex flex-col gap-1.5 pt-0.5">
              <span
                className="text-[0.52rem] font-bold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                {isDestructive ? "Destructive Action" : "Confirmation Required"}
              </span>
              <h3
                className="text-[1.05rem] font-bold uppercase tracking-[0.06em] leading-tight"
                style={{ color: "var(--color-on-surface)" }}
              >
                {title}
              </h3>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: "1px", backgroundColor: "rgba(212,160,23,0.08)" }} />

          {/* ── Message ── */}
          <p
            className="text-[0.8rem] leading-loose"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {message}
          </p>

          {/* ── Actions ── */}
          <div className="flex items-center gap-3 pt-1">
            {/* Cancel */}
            <button
              onClick={onClose}
              className="flex-1 py-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-all duration-200"
              style={{
                border: "1px solid rgba(212,160,23,0.18)",
                color: "var(--color-on-surface-variant)",
                backgroundColor: "transparent",
                borderRadius: 0,
                cursor: "pointer",
                fontFamily: "var(--font-family)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,160,23,0.18)";
                e.currentTarget.style.color = "var(--color-on-surface-variant)";
              }}
            >
              {cancelText}
            </button>

            {/* Confirm */}
            <button
              onClick={onConfirm}
              className="flex-1 py-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-all duration-200"
              style={{
                backgroundColor: isDestructive ? "rgba(239,68,68,0.12)" : "var(--color-primary-container)",
                color: isDestructive ? "rgba(239,100,100,0.95)" : "var(--color-on-primary-container)",
                border: isDestructive ? "1px solid rgba(239,68,68,0.3)" : "none",
                borderRadius: 0,
                cursor: "pointer",
                fontFamily: "var(--font-family)",
              }}
              onMouseEnter={(e) => {
                if (isDestructive) {
                  e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.22)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.55)";
                  e.currentTarget.style.color = "rgba(239,120,120,1)";
                } else {
                  e.currentTarget.style.filter = "brightness(1.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (isDestructive) {
                  e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.12)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                  e.currentTarget.style.color = "rgba(239,100,100,0.95)";
                } else {
                  e.currentTarget.style.filter = "none";
                }
              }}
            >
              {confirmText}
            </button>
          </div>

          {/* ── ESC tip ── */}
          <p
            className="text-center text-[0.5rem] uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            Press <span style={{ color: "rgba(255,255,255,0.3)" }}>ESC</span> to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}
