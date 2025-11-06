import { X, Share, Plus, Check } from "lucide-react";
import type { FC } from "react";
import { createPortal } from "react-dom";

type IOSInstallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: FC<IOSInstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50' onClick={onClose} />

      {/* Modal */}
      <div className='relative bg-white rounded-t-2xl sm:rounded-2xl p-6 max-w-md w-full mx-4 mb-0 sm:mb-4'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
          aria-label='Close'
        >
          <X className='w-6 h-6' />
        </button>

        <div className='text-center mb-6'>
          <div className='text-5xl mb-4'>📱</div>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>
            Install Smoker Tracker
          </h2>
          <p className='text-sm text-gray-600'>
            Add this app to your home screen for quick access
          </p>
        </div>

        <div className='space-y-4'>
          <div className='flex items-start gap-3'>
            <div className='bg-blue-100 rounded-full p-2 shrink-0'>
              <Share className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='font-medium text-gray-900'>
                1. Tap the Share button
              </p>
              <p className='text-sm text-gray-600'>
                Look for the square with an arrow pointing up at the bottom of
                Safari
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <div className='bg-blue-100 rounded-full p-2 shrink-0'>
              <Plus className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='font-medium text-gray-900'>
                2. Select "Add to Home Screen"
              </p>
              <p className='text-sm text-gray-600'>
                Scroll down in the menu and tap this option
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <div className='bg-blue-100 rounded-full p-2 shrink-0'>
              <Check className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='font-medium text-gray-900'>3. Tap "Add"</p>
              <p className='text-sm text-gray-600'>
                Confirm to add the app to your home screen
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className='w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors'
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export const IOSInstallModal: FC<IOSInstallModalProps> = (props) =>
  createPortal(<Modal {...props} />, document.body);
