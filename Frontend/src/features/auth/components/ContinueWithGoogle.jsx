import { GoogleIcon } from '../../../components/ui/AuthIcons'

function ContinueWithGoogle() {
  return (
    <a
        href="/api/auth/google"
        className="flex items-center justify-center gap-2 w-full transition-colors mt-1"
        style={{
            border: "1px solid var(--color-outline)",
            padding: "0.7rem",
            borderRadius: 0,
            color: "var(--color-on-surface)",
            fontSize: "0.72rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            textDecoration: "none"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-container-high)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
        <GoogleIcon />
        Continue with Google
    </a>
  )
}

export default ContinueWithGoogle