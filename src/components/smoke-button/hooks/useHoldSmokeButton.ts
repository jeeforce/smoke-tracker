import { useEffect, useRef, useState } from "react";

type Props = {
  onHoldComplete: () => void;
  holdDuration?: number;
  holdInterval?: number;
};

const HOLD_DURATION_DEFAULT = 2000; // 2 seconds
const HOLD_INTERVAL_DEFAULT = 16; // ~60 FPS
const COMPLETION_DISPLAY_DURATION = 3000; // 3 seconds

export const useHoldSmokeButton = ({
  onHoldComplete,
  holdDuration = HOLD_DURATION_DEFAULT,
  holdInterval = HOLD_INTERVAL_DEFAULT,
}: Props) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);
  const resetTimeoutRef = useRef<number | null>(null);

  const startHolding = () => {
    if (isHolding || hasCompletedRef.current) return; // Also check if in completion state

    setIsHolding(true);
    setProgress(0);
    hasCompletedRef.current = false;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (holdInterval / holdDuration) * 100;
        if (newProgress >= 100) {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            completeAction();
          }
          return 100;
        }
        return newProgress;
      });
    }, holdInterval);
  };

  const stopHolding = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (!hasCompletedRef.current) {
      setIsHolding(false);
      setProgress(0);
    }
  };

  const completeAction = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    console.info("Tracked cigarette");
    onHoldComplete();

    // Keep the completed state for visual feedback
    resetTimeoutRef.current = window.setTimeout(() => {
      setIsHolding(false);
      setProgress(0);
      hasCompletedRef.current = false;
      resetTimeoutRef.current = null;
    }, COMPLETION_DISPLAY_DURATION); // Show completion for 3 seconds
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    isHolding,
    progress,
    startHolding,
    stopHolding,
  };
};
