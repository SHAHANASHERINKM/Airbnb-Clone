import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { registerPopup } from '../utils/popupUtils';

const PopupContext = createContext({ showPopup: (msg) => {} });

export const usePopup = () => useContext(PopupContext);

export function PopupProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showPopup = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    // auto-hide after 3 seconds
    setTimeout(() => setVisible(false), 3000);
  }, []);

  // register the function so other modules can call it without context
  useEffect(() => {
    registerPopup(showPopup);
  }, [showPopup]);

 return (
  <PopupContext.Provider value={{ showPopup }}>
    {children}
    {visible && (
      <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto mt-5 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl bg-primary text-white max-w-sm w-11/12">

          {/* Icon */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Message */}
          <p className="flex-1 text-sm font-medium leading-snug">{message}</p>

          {/* Dismiss */}
          <button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 w-7 h-7 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    )}
  </PopupContext.Provider>
);
}
