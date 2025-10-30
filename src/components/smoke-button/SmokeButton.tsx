import type { FC } from "react";
import { CircularProgress } from "../../ui/CircularProgress";
import { useHoldSmokeButton } from "./hooks/useHoldSmokeButton";
import { useTrackSmoke } from "../../hooks";

export const SmokeButton: FC = () => {
  const { trackSmoke } = useTrackSmoke();
  const { isHolding, progress, startHolding, stopHolding } = useHoldSmokeButton(
    { onHoldComplete: trackSmoke }
  );
  return (
    <div className='relative select-none'>
      <button
        className='w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all relative select-none'
        onMouseDown={startHolding}
        onMouseUp={stopHolding}
        onMouseLeave={stopHolding}
        onTouchStart={startHolding}
        onTouchEnd={stopHolding}
        style={{
          transform: isHolding ? "scale(0.95)" : "scale(1)",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {/* Circular Progress SVG */}
        <CircularProgress progress={progress} radius={70} />

        {/* Emoji Icon */}
        <span
          className='text-4xl md:text-5xl lg:text-6xl z-10 transition-transform select-none'
          style={{
            transform: isHolding ? "scale(1.2)" : "scale(1)",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {progress === 100 ? "💨" : "🚬"}
        </span>
      </button>
    </div>
  );
};
