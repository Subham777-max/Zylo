// Shared label style
const labelStyle = {
  color: "var(--color-outline)",
  fontSize: "0.6rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 600,
  display: "block",
  marginBottom: "0.4rem",
};

// Shared input base style
const inputBase = {
  width: "100%",
  backgroundColor: "var(--color-surface-container)",
  border: "1px solid transparent",
  borderBottom: "1px solid var(--color-outline-variant)",
  color: "var(--color-on-surface)",
  fontFamily: "var(--font-family)",
  fontSize: "0.82rem",
  padding: "0.65rem 0.85rem",
  outline: "none",
  borderRadius: 0,
  transition: "border-color 300ms ease-in-out, box-shadow 300ms ease-in-out",
};

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <span style={{ color: "var(--color-error)", fontSize: "0.62rem", letterSpacing: "0.05em" }}>
          {error}
        </span>
      )}
    </div>
  );
}

// Focus / blur handlers
const focusStyle = (e) => {
  e.target.style.borderColor = "var(--color-primary-container)";
  e.target.style.boxShadow = "0 2px 12px rgba(212,160,23,0.12)";
};
const blurStyle = (e) => {
  e.target.style.borderColor = "transparent";
  e.target.style.borderBottomColor = "var(--color-outline-variant)";
  e.target.style.boxShadow = "none";
};

export default function ProductForm({ form, onChange, errors, onSubmit, isSubmitting }) {
  function handle(e) {
    const { name, value } = e.target;
    onChange(name, value);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 flex-1">

      {/* Title */}
      <Field label="Product Title" error={errors.title}>
        <input
          id="product-title"
          name="title"
          type="text"
          placeholder="e.g. Noir Trench Coat — SS25"
          value={form.title}
          onChange={handle}
          onFocus={focusStyle}
          onBlur={blurStyle}
          style={inputBase}
          autoComplete="off"
        />
      </Field>

      {/* Description */}
      <Field label="Description" error={errors.description}>
        <textarea
          id="product-description"
          name="description"
          placeholder="Describe the garment — fabric, fit, sizing notes…"
          value={form.description}
          onChange={handle}
          onFocus={focusStyle}
          onBlur={blurStyle}
          rows={4}
          style={{ ...inputBase, resize: "vertical", lineHeight: 1.6 }}
        />
      </Field>

      {/* Info note — variants next */}
      <p
        className="text-[0.58rem] uppercase tracking-widest"
        style={{ color: "var(--color-outline)" }}
      >
        Pricing, images &amp; stock are set per variant in the next step.
      </p>

      {/* Submit */}
      <button
        type="submit"
        id="create-product-submit"
        disabled={isSubmitting}
        className="mt-auto w-full flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.14em] transition-all duration-300"
        style={{
          backgroundColor: isSubmitting ? "var(--color-secondary-container)" : "var(--color-primary-container)",
          color: "var(--color-on-primary-container)",
          border: "none",
          padding: "0.85rem",
          fontSize: "0.72rem",
          borderRadius: 0,
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.filter = "brightness(1.1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
            </svg>
            Creating…
          </>
        ) : (
          <>
            Continue
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
