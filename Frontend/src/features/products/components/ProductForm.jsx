const CURRENCIES = [
  { value: "INR", label: "₹ INR — Indian Rupee" },
  { value: "USD", label: "$ USD — US Dollar" },
  { value: "EUR", label: "€ EUR — Euro" },
  { value: "GBP", label: "£ GBP — British Pound" },
  { value: "JPY", label: "¥ JPY — Japanese Yen" },
];

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
const focusStyle  = (e) => {
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

      {/* Price + Currency row */}
      <div className="flex gap-3">
        <Field label="Price" error={errors.price}>
          <input
            id="product-price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.price}
            onChange={handle}
            onFocus={focusStyle}
            onBlur={blurStyle}
            style={{ ...inputBase, width: "100%" }}
          />
        </Field>

        <Field label="Currency" error={errors.currency}>
          <select
            id="product-currency"
            name="currency"
            value={form.currency}
            onChange={handle}
            onFocus={focusStyle}
            onBlur={blurStyle}
            style={{ ...inputBase, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239b8f7a'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.85rem center" }}
          >
            {CURRENCIES.map(({ value, label }) => (
              <option key={value} value={value} style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

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
            Publishing…
          </>
        ) : (
          "Publish Listing"
        )}
      </button>
    </form>
  );
}
