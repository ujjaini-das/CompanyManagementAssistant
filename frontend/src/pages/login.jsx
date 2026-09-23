
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend login
    // Later we will replace this with backend authentication
    navigate("/dashboard");
  };

  return (
    <div className="meme-login-page">

      {/* Background decoration */}
      <div className="ai-shape shape-one"></div>
      <div className="ai-shape shape-two"></div>
      <div className="ai-shape shape-three"></div>

      <div className="ai-ring ring-one"></div>
      <div className="ai-ring ring-two"></div>

      {/* Navbar */}
      <header className="meme-navbar">

        <div className="meme-logo">
          <div className="logo-symbol">M</div>
          <span>MEME AI</span>
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>

          <a href="/login" className="nav-login">
            Login
          </a>
        </nav>

      </header>

      {/* Main Login */}
      <main className="login-wrapper">

        <div className="login-card">

          <div className="login-heading">
            <h1>Welcome back</h1>
            <p>Sign in to your AI workspace</p>
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>Email</label>

              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />

                <span className="input-icon">
                  ✉
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />

                <span className="input-icon">
                  ●
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="/forgot-password">
                Forgot password?
              </a>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="meme-login-btn"
            >
              <span>Login</span>
              <span className="arrow">→</span>
            </button>

          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>or continue with</span>
          </div>

          {/* Google */}
          <button
            type="button"
            className="google-btn"
          >
            <span className="google-icon">
              G
            </span>

            Continue with Google
          </button>

          {/* Register */}
          <div className="register-text">
            Don't have an account?

            <a href="/register">
              Create account
            </a>
          </div>

        </div>

      </main>

      {/* Bottom text */}
      <div className="bottom-brand">
        Powered by <strong>MEME AI</strong>
      </div>

    </div>
  );
}
