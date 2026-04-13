import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Field from "../../../components/ui/Field";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  StoreIcon,
} from "../../../components/ui/AuthIcons";
import { useAuth } from "../hooks/useAuth";


function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const { handleRegister,loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Validation
  function validate() {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(form.contact)) {
      newErrors.contact = "Enter a valid contact number.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Minimum 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //Handlers
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    await handleRegister({
      email: form.email,
      password: form.password,
      fullName: form.fullName,
      contact: form.contact,
      isSeller: form.isSeller,
    })
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
        {/* Brand header (mobile shows this; desktop it's on the image) */}
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
            Create your account
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

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
          {/* Full Name */}
          <Field
            id="fullName"
            label="Full Name"
            icon={UserIcon}
            placeholder="John Doe"
            value={form.fullName}
            onChange={(e) =>
              handleChange({ target: { name: "fullName", value: e.target.value } })
            }
            error={errors.fullName}
          />

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

          {/* Contact */}
          <Field
            id="contact"
            label="Contact Number"
            icon={PhoneIcon}
            type="tel"
            placeholder="+91 98765 43210"
            value={form.contact}
            onChange={(e) =>
              handleChange({ target: { name: "contact", value: e.target.value } })
            }
            error={errors.contact}
          />

          {/* Password */}
          <Field
            id="password"
            label="Password"
            icon={LockIcon}
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
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

          {/* isSeller */}
          <div className="mt-1">
            <label
              className="zylo-checkbox-wrapper"
              htmlFor="isSeller"
              style={{ borderRadius: 0 }}
            >
              <input
                type="checkbox"
                id="isSeller"
                name="isSeller"
                className="zylo-checkbox"
                style={{ borderRadius: 0 }}
                checked={form.isSeller}
                onChange={handleChange}
              />
              <div className="flex flex-col" style={{ gap: "2px" }}>
                <span
                  className="flex items-center gap-2"
                  style={{
                    color: "var(--color-on-surface)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                  }}
                >
                  <StoreIcon />
                  Register as a Seller
                </span>
                <span
                  style={{
                    color: "var(--color-on-surface-variant)",
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
                  }}
                >
                  Start selling your designs to a global audience
                </span>
              </div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="register-submit"
            className="zylo-btn-primary mt-2"
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
                Creating Account…
              </span>
            ) : (
              "Create Account"
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--color-primary)", fontWeight: 500 }}
          >
            Sign In
          </Link>
        </p>
      </div>
  )
}

export default RegisterForm