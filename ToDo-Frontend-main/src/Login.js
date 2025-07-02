import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login({ setToken }) {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await fetch(
        "https://todolist-backend-5e92.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      setAuthLoading(false);

      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setAuthError(data.message || "Login failed");
      }
    } catch (err) {
      setAuthLoading(false);
      setAuthError("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      {/* Default profile image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Default Profile"
        className="auth-profile"
      />

      <h2 className="auth-title">Login</h2>

      {authError && <div className="auth-error">{authError}</div>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          placeholder="Password"
        />
        <button type="submit" className="auth-button" disabled={authLoading}>
          {authLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account?{" "}
        <Link to="/signup" className="auth-link">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
