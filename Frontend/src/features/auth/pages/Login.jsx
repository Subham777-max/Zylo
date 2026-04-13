import LoginLeft from "../components/LoginLeft";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-family)",
      }}
    >
      <LoginLeft />
      <LoginForm />
    </div>
  );
}

export default Login;