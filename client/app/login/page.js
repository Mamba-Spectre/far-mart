"use client";
import { useState } from "react";
import { useAccessToken } from "../../hooks/GlobalContext";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setAccessToken } = useAccessToken();

  const handleLogin = async () => {
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
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div className={styles.mainDiv}>
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
            await handleLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
