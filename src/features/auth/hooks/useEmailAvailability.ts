import { useState, useCallback, useRef } from "react";
import { authService } from "@/features/auth/services/auth.service";

export function useEmailAvailability() {
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "error">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkEmail = useCallback((email: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!email || !email.includes("@")) {
      setStatus("idle");
      return;
    }

    setStatus("checking");
    timeoutRef.current = setTimeout(async () => {
      try {
        const { available } = await authService.checkEmailAvailability(email);
        setStatus(available ? "available" : "taken");
      } catch {
        setStatus("error");
      }
    }, 500); // debounce 500ms
  }, []);

  const reset = useCallback(() => setStatus("idle"), []);

  return { status, checkEmail, reset };
}