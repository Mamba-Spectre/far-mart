"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
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
  };
  return (
    <div>
      <h1>Signup Page</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={async () => {
          await handleSignup();
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default SignupPage;
