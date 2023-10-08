"use client";
import { useState, useContext, createContext, useEffect } from "react";

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      return storedToken ? storedToken : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    }
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
