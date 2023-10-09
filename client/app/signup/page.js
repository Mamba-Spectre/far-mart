"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import user_icon from "../assets/person1.png";
import email_icon from "../assets/email1.png";
import password_icon from "../assets/password1.png";
import "./signup.css";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(null);
  const router = useRouter();

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
  const handleSignup = async () => {
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }
    setloading(!loading);
    const response = await fetch(
      "https://farmart-be.onrender.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    if (response?.ok) {
      router.push("/login");
    }
    setloading(!loading);
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon.src} />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={email_icon.src} />
          <input
            type="text"
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
      <div className="submit-container">
        {/* <div className="submit">Sign Up</div> */}
        {!loading ? (
          <button
            // disabled={!email || !password || !name || loading}
            className="submit"
            onClick={async () => {
              await handleSignup();
            }}
          >
            Signup
          </button>
        ) : (
          <button
            disabled={!email || !password || !name || loading}
            className="submit-faded"
            onClick={async () => {
              await handleSignup();
            }}
          >
            Signup
          </button>
        )}
        <button
          className="submit"
          onClick={async () => {
            router.push("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
