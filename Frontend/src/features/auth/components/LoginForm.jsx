import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../../components/ui/Field";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../../../components/ui/AuthIcons";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { handleLogin, loading, error: authError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  function validate() {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    
    await handleLogin({
      email: form.email,
      password: form.password,
    });
    navigate("/");
  }

  return (
    <div
      className="flex flex-col justify-center w-full lg:w-auto lg:min-w-131.25 lg:max-w-156.25 overflow-y-auto"
      style={{
        backgroundColor: "var(--color-surface-container-low)",
        padding: "2.5rem 2.25rem",
      }}
    >
      {/* Brand header */}
      <div className="mb-6">
        <h1
          className="font-bold mb-1"
          style={{
            color: "var(--color-primary-container)",
            fontSize: "1.75rem",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-family)",
          }}
        >
          ZYLO
        </h1>
        <p
          style={{
            color: "var(--color-on-surface-variant)",
            fontSize: "0.72rem",
            letterSpacing: "var(--letter-spacing-label)",
            textTransform: "uppercase",
          }}
        >
          Welcome Back
        </p>
        {/* Gold thin rule */}
        <div
          className="mt-3"
          style={{
            height: "1px",
            width: "32px",
            backgroundColor: "var(--color-primary-container)",
          }}
        />
      </div>

      {authError && (
        <div style={{ color: "var(--color-error)", fontSize: "0.8rem", marginBottom: "1rem" }}>
          {authError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        {/* Email */}
        <Field
          id="email"
          label="Email Address"
          icon={MailIcon}
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) =>
            handleChange({ target: { name: "email", value: e.target.value } })
          }
          error={errors.email}
        />

        {/* Password */}
        <Field
          id="password"
          label="Password"
          icon={LockIcon}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) =>
            handleChange({ target: { name: "password", value: e.target.value } })
          }
          error={errors.password}
        >
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            style={{
              color: "var(--color-outline)",
              background: "none",
              border: "none",
              padding: "0 2px",
              cursor: "pointer",
              transition: "color var(--transition-base)",
              marginLeft: "auto",
              flexShrink: 0,
              lineHeight: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary-container)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-outline)")
            }
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </Field>

        {/* Submit */}
        <button
          type="submit"
          id="login-submit"
          className="zylo-btn-primary mt-4"
          disabled={loading}
          style={{ borderRadius: 0 }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="30 70"
                  strokeLinecap="round"
                />
              </svg>
              Signing In…
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Footer link */}
      <p
        className="text-center mt-5"
        style={{
          color: "var(--color-on-surface-variant)",
          fontSize: "0.78rem",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{ color: "var(--color-primary)", fontWeight: 500 }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
