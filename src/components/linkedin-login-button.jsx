"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

export const LinkedInLoginButton = ({ type }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Failed to check auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleClick = () => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      router.push("/uniboard/home");
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/linkedin-login/`;
    }
  };

  const buttonText = isAuthenticated
    ? "Uniboard"
    : type === "Navbar"
      ? "Sign in"
      : "Sign in with LinkedIn";

  return (
    <Button
      className={`${type !== "Navbar" ? "mt-5 transition-shadow hover:shadow-[0_0_16px_0_rgba(52,109,224,0.60)]" : "hover:shadow-lg hover:bg-primary/95"}`}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
};
