import { useEffect } from 'react';

const ModalWindow = ({ isOpen, onClose, children, handleClick }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <form onSubmit={handleClick} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-2xl animate-fade-in">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </form>
  );
};

export default ModalWindow;