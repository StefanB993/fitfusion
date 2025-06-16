import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";

export default function useAutoLogout() {
  const { signOut } = useAuth();

  const [timeRemaining, setTimeRemaining] = useState(1000 * 60 * 5); // 1 minute

  useEffect(() => {
    const timeout = setTimeout(() => {
      signOut();
    }, 1000 * 60 * 5);
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1000);
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(interval);
    };
  }, [signOut]);

  return { timeRemaining };
}
