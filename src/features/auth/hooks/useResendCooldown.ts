import { useState, useEffect, useCallback, useRef } from "react";

const COOLDOWN_SECONDS = 42;

export function useResendCooldown() {
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = useCallback(() => {
    setSecondsLeft(COOLDOWN_SECONDS);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [secondsLeft]);

  return { secondsLeft, canResend: secondsLeft <= 0, startCooldown };
}