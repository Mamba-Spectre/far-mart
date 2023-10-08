"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import "./signup.css";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
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
          <img src={user_icon} />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <img src={password_icon} />
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
        {/* <div className="submit">Sign Up</div> */}
        <button
          disabled={!email || !password || !name || loading}
          className="submit"
          onClick={async () => {
            await handleSignup();
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
