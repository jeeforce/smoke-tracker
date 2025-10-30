interface CircularProgressProps {
  progress: number;
  radius?: number;
}

export const CircularProgress = ({
  progress,
  radius = 70,
}: CircularProgressProps) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className='absolute inset-0 w-full h-full -rotate-90'
      style={{ pointerEvents: "none" }}
    >
      <circle
        cx='50%'
        cy='50%'
        r={radius}
        fill='none'
        stroke='#e5e7eb'
        strokeWidth='4'
      />
      <circle
        cx='50%'
        cy='50%'
        r={radius}
        fill='none'
        stroke={progress === 100 ? "#10b981" : "#3b82f6"}
        strokeWidth='6'
        strokeLinecap='round'
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: progress === 0 ? "none" : "stroke 0.3s ease",
        }}
      />
    </svg>
  );
};
