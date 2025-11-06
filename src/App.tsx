import { SmokeDetail } from "./components/smoke-detail/SmokeDetail";
import { SmokeButton } from "./components/smoke-button/SmokeButton";
import { MainSection } from "./ui/MainSection";
import { PWAInstallButton } from "./components/PWAInstallButton";
import { GitHubButton } from "./components/GitHubButton";

export const App = () => {
  return (
    <div className='h-dvh w-screen bg-gray-300 overflow-hidden flex flex-col'>
      <header className='flex items-center justify-between px-4 md:px-6 py-3 md:py-4 h-16 md:h-20 shrink-0'>
        <div className='flex items-center gap-2 md:gap-3'>
          <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>
            Smoker Tracker
          </h1>
          <GitHubButton url='https://github.com/jeeforce/smoke-tracker' />
        </div>
        <PWAInstallButton />
      </header>

      <MainSection className='shrink-0 '>
        <div className='flex flex-col items-center'>
          <SmokeButton />
          <p className='text-center text-gray-700 text-xs md:text-sm font-medium mt-4 tracking-wide uppercase opacity-70'>
            Hold to track
          </p>
        </div>
      </MainSection>
      <MainSection className='flex-1 flex flex-col min-h-0'>
        <SmokeDetail />
      </MainSection>
    </div>
  );
};
