"use client";
import { useState, useContext, createContext, useEffect } from "react";

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const storedToken = localStorage.getItem("accessToken");
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
