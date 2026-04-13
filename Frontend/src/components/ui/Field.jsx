// ─── Reusable Form Field Component ───────────────────────────────────────────
// Used by Register, Login, and any form requiring icon + label + error state.

function Field({ id, label, icon: Icon, type = "text", placeholder, value, onChange, error, children }) {
  return (
    <div className="flex flex-col" style={{ gap: "5px" }}>
      {/* Label */}
      <label htmlFor={id} className="zylo-label">
        {label}
      </label>

      {/* Input wrapper */}
      <div className={`zylo-input-group ${error ? "zylo-input-error" : ""}`}>
        <span className="zylo-input-icon">
          <Icon />
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          spellCheck={false}
        />
        {/* Optional: trailing element (e.g. show/hide toggle) */}
        {children}
      </div>

      {/* Inline error */}
      {error && (
        <p
          style={{
            color: "var(--color-error)",
            fontSize: "var(--font-size-xs)",
            marginTop: "2px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
