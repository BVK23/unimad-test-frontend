"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

const InitializeUserStore = ({ userData }) => {
  const { setUserData } = useUserStore();

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  return null; // This component doesn't render anything
};

export default InitializeUserStore;
