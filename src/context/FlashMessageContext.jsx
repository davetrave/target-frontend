import React, { createContext, useState, useContext } from 'react';

const FlashMessageContext = createContext();

export const useFlashMessage = () => useContext(FlashMessageContext);

const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const showMessage = (message, type = 'success') => {
    setFlashMessage({ message, type });
    
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000); // The message will disappear after 3 seconds
  };

  return (
    <FlashMessageContext.Provider value={showMessage}>
      {children}
      {flashMessage && <FlashMessage message={flashMessage.message} type={flashMessage.type} />}
    </FlashMessageContext.Provider>
  );
};

export default FlashMessageProvider;

const FlashMessage = ({ message, type }) => {
  return (
    <div className={`flash-message ${type}`}>
      <div className="flash-content">
        <span>{type === 'success' ? '✔️' : '❌'}</span>
        <p>{message}</p>
      </div>
      <div className="flash-bar"></div>
    </div>
  );
};
