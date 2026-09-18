import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <div>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
      />

      <input
        type="password"
        placeholder="Password"
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <button onClick={handleRegister}>
        Create Account
      </button>

    </div>
  );
}

export default Login;