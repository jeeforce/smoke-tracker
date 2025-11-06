import { useState } from "react";
import { Download } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { IOSInstallModal } from "./IOSInstallModal";

export const PWAInstallButton = () => {
  const { isInstallable, installPWA, isIOS } = usePWAInstall();
  const [showIOSInstallModal, setShowIOSInstallModal] = useState(false);

  if (!isInstallable) return null;

  const handleClick = () => {
    if (isIOS) {
      // Show instructions modal for iOS
      setShowIOSInstallModal(true);
      return;
    }
    installPWA();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base'
        aria-label='Install app'
      >
        <Download className='w-5 h-5' />
        <span className='hidden sm:inline'>Install App</span>
      </button>

      <IOSInstallModal
        isOpen={showIOSInstallModal}
        onClose={() => setShowIOSInstallModal(false)}
      />
    </>
  );
};
