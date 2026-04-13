import React from 'react'

function LoginLeft() {
  return (
    <div style={{borderRight:"1px solid var(--color-outline-variant)"}} className="relative hidden lg:flex flex-col flex-1 overflow-hidden">
        {/* Model image fills the panel */}
        <img
          src="/login_model.png"
          alt="Zylo fashion"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "top center" }}
        />

        {/* Gradient overlay — darkens toward edges for seamless blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(28,27,27,0) 0%, rgba(28,27,27,0.3) 60%, rgba(28,27,27,1) 100%), " +
              "linear-gradient(to top, rgba(28,27,27,0.95) 0%, transparent 50%)",
          }}
        />

        {/* Brand story — bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-10">
          {/* Logo */}
          <p
            className="font-bold tracking-widest mb-3"
            style={{
              color: "var(--color-primary-container)",
              fontSize: "1.5rem",
              letterSpacing: "0.25em",
            }}
          >
            ZYLO
          </p>

          {/* Tagline */}
          <h2
            className="font-semibold mb-3 leading-tight"
            style={{
              color: "var(--color-on-surface)",
              fontSize: "1.6rem",
              letterSpacing: "var(--letter-spacing-tight)",
              maxWidth: "340px",
            }}
          >
            Welcome back to your <span style={{ color: "var(--color-primary)" }}>edition</span>.
          </h2>

          {/* Description */}
          <p
            className="leading-relaxed"
            style={{
              color: "var(--color-on-surface-variant)",
              fontSize: "0.8rem",
              maxWidth: "320px",
              lineHeight: "1.65",
            }}
          >
            Log in to continue exploring curated fashion, track your orders, and
            manage your designer shop.
          </p>

          {/* Subtle divider + stats */}
          <div className="flex gap-8 mt-6">
            {[
              { value: "Daily", label: "New Drops" },
              { value: "Secure", label: "Transactions" },
              { value: "24/7", label: "Support" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-primary)", fontSize: "1rem" }}
                >
                  {value}
                </p>
                <p
                  style={{
                    color: "var(--color-on-surface-variant)",
                    fontSize: "0.7rem",
                    letterSpacing: "var(--letter-spacing-label)",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default LoginLeft;
