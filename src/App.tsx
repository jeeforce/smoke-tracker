import { HistoryGraph } from "./components/HistoryGraph";
import { SmokeButton } from "./components/smoker-button/SmokeButton";
import { Card, StatCard, Button, PageWrapper } from "./components/ui";
import HistoryIconSvg from "./assets/history-icon.svg";

export const App = () => {
  return (
    <div className='h-screen w-screen bg-gray-300 overflow-hidden'>
      <header className='flex items-center justify-between px-4 md:px-6 py-3 md:py-4 h-16 md:h-20 shrink-0'>
        <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>
          Smoker Tracker
        </h1>
      </header>

      <div className='h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full px-4 md:px-6 py-4'>
        <div className='grid grid-cols-1 gap-4 md:gap-6 h-full w-full'>
          <div className='lg:col-span-2 h-full overflow-y-auto'>
            <PageWrapper>
              <div className='flex flex-col items-center mb-8 md:mb-10'>
                <SmokeButton />
                <p className='text-center text-gray-700 text-xs md:text-sm font-medium mt-4 tracking-wide uppercase opacity-70'>
                  Hold to track
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10 shrink-0'>
                <StatCard value={7} label='Cigarettes Today' />
                <StatCard value={1} label='Quit Progress' />
              </div>

              <Card className='grow flex flex-col min-h-0'>
                <div className='shrink-0'>
                  <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6'>
                    Stats
                  </h2>

                  <Button className='mb-4 md:mb-6'>Track</Button>
                  <div className='text-4xl md:text-5xl font-bold text-gray-900 mb-1'>
                    7
                  </div>
                  <div className='text-sm md:text-base text-gray-700 mb-6 md:mb-8'>
                    Cigarettes Smoked This Week
                  </div>

                  <div className='flex items-center justify-between flex-wrap gap-4 mb-6'>
                    <Button>History</Button>
                    <Button
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      <img
                        src={HistoryIconSvg}
                        alt=''
                        className='w-4 h-4 md:w-5 md:h-5'
                      />
                      View Past
                    </Button>
                  </div>
                </div>
                <div className='grow min-h-0 overflow-hidden'>
                  <HistoryGraph />
                </div>
              </Card>
            </PageWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
