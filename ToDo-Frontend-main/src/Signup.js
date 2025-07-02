import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");
    setSuccess(false);
    const response = await fetch(
      "https://todolist-backend-5e92.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    setAuthLoading(false);
    if (data.message === "User registered") {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setAuthError(data.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      {/* Profile Image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Default Profile"
        className="auth-profile"
      />

      <h2 className="auth-title">Sign Up</h2>

      {authError && <div className="auth-error">{authError}</div>}
      {success && (
        <div className="auth-success">
          Registration successful! Redirecting to login...
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(username, password);
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
          {authLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
