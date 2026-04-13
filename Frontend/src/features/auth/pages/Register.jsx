import RegisterLeft from "../components/RegisterLeft";
import RegisterForm from "../components/RegisterForm";


function Register() {

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-family)" }}
    >
      <RegisterLeft />
      <RegisterForm />
    </div>
  );
}

export default Register;