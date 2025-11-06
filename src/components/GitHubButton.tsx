import { Code2 } from "lucide-react";
import { useState } from "react";

type GitHubButtonProps = {
  url: string;
};

const clickTooltipMessages = [
  "Source?",
  "Maybe click again?",
  "Click again and you shall see!",
];

export const GitHubButton = ({ url }: GitHubButtonProps) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    setClicks((prev) => prev + 1);

    if (clicks >= 2) {
      // After 3 clicks, open GitHub
      return;
    }
    e.preventDefault();
  };

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      onClick={handleClick}
      tabIndex={0}
      className='relative inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 group focus:outline-none'
      aria-label='View source on GitHub'
    >
      <Code2 className='w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover:rotate-180 group-hover:text-blue-600 group-focus:rotate-180 group-focus:text-blue-600 transition-all duration-300' />
      <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 transition-all duration-300 pointer-events-none'>
        {clickTooltipMessages[clicks] || "Enjoy the code!"}
      </div>
    </a>
  );
};
