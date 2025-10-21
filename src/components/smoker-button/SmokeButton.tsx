import { CircularProgress } from "../CircularProgress";
import { useHoldSmokeButton } from "./hooks/useHoldSmokeButton";

export const SmokeButton = () => {
  const { isHolding, progress, startHolding, stopHolding } = useHoldSmokeButton(
    { onHoldComplete: () => {} }
  );
  return (
    <div className='relative'>
      <button
        className='w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all relative'
        onMouseDown={startHolding}
        onMouseUp={stopHolding}
        onMouseLeave={stopHolding}
        onTouchStart={startHolding}
        onTouchEnd={stopHolding}
        style={{
          transform: isHolding ? "scale(0.95)" : "scale(1)",
        }}
      >
        {/* Circular Progress SVG */}
        <CircularProgress progress={progress} radius={70} />

        {/* Emoji Icon */}
        <span
          className='text-4xl md:text-5xl lg:text-6xl z-10 transition-transform'
          style={{
            transform: isHolding ? "scale(1.2)" : "scale(1)",
          }}
        >
          {progress === 100 ? "💨" : "🚬"}
        </span>
      </button>
    </div>
  );
};
