import React from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatbotButton = ({ isOpen, toggleChat }) => {
  return (
    <button
      onClick={toggleChat}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center ${
        isOpen 
          ? 'bg-secondary text-secondary-foreground rotate-90' 
          : 'bg-primary text-primary-foreground hover:bg-blue-600'
      }`}
      aria-label="Toggle Chat"
    >
      {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
    </button>
  );
};

export default ChatbotButton;
