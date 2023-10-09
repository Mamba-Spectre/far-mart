"use client";
import { useState } from "react";
import { useAccessToken } from "../../hooks/GlobalContext";
import { useRouter } from "next/navigation";
import email_icon from "../assets/email1.png";
import password_icon from "../assets/password1.png";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const router = useRouter();

  const { setAccessToken } = useAccessToken();
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }
    setloading(true);
    try {
      const response = await fetch(
        "https://farmart-be.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      if (response.ok) {
        const { token } = await response.json();
        setAccessToken(token);
        router.push("/home");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while trying to log in.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon.src} />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <img src={password_icon.src} />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="error-text">{Error}</div>
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="submit-container">
        {!loading ? (
          <button
            // disabled={!email || !password}
            className="submit"
            onClick={async () => {
              await handleLogin();
            }}
          >
            Login
          </button>
        ) : (
          <button
            disabled
            className="submit-faded"
            onClick={async () => {
              await handleLogin();
            }}
          >
            Login
          </button>
        )}
        <button
          className="submit"
          onClick={async () => {
            router.push("/signup");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
