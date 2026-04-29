import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-border">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Ask a question..."
          className="w-full bg-muted text-foreground border border-border rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
          aria-label="Send message"
        >
          <Send className="w-5 h-5 ml-[-2px] mt-[1px]" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
