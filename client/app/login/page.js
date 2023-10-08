"use client";
import { useState } from "react";
import { useAccessToken } from "../../hooks/GlobalContext";
import { useRouter } from "next/navigation";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setAccessToken } = useAccessToken();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }
    setloading(!loading);
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
    if (response?.ok) {
      const { token } = await response.json();
      setAccessToken(token);
      router.push("/home");
    } else {
      const data = await response.json();
      setError(data.error); // Set error message from response
    }
    setloading(!loading);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <img src={password} />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="submit-container">
        <button
          disabled={!email || !password}
          className="submit"
          onClick={async () => {
            await handleLogin();
          }}
        >
          Login
        </button>
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
