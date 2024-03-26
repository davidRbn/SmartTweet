import React, { FC } from "react";

type PropsModal = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<PropsModal> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            <div className="bg-white rounded-lg p-8 mx-4 max-w-md w-full text-center shadow-lg z-20">
              <p>Votre crédit est épuisé.</p>
              <button
                onClick={onClose}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
