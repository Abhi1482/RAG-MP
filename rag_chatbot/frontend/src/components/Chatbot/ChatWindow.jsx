import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { sendChatMessage } from '../../services/api';

const ChatWindow = ({ isOpen, initialPrompt, onPromptHandled }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm the Chandigarh University Assistant. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onPromptHandled) onPromptHandled();
    }
  }, [isOpen, initialPrompt, onPromptHandled]);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Build history payload from current messages
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Call API
      const response = await sendChatMessage(text, history);

      // Add bot message
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.answer,
          sources: response.sources,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "I'm sorry, I encountered an error connecting to the server. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (question) => {
    handleSendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-card border border-border shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
      {/* Header */}
      <div className="bg-primary p-4 text-primary-foreground">
        <h3 className="font-bold text-lg">CU Assistant</h3>
        <p className="text-primary-foreground/80 text-sm">Ask me anything about the university</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 chat-scrollbar bg-card">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isTyping && (
          <div className="mb-6">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction("What are the admission requirements?")}
            className="text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors border border-border"
          >
            Admission Requirements
          </button>
          <button
            onClick={() => handleQuickAction("Tell me about campus housing.")}
            className="text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors border border-border"
          >
            Campus Housing
          </button>
          <button
            onClick={() => handleQuickAction("What courses are offered?")}
            className="text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors border border-border"
          >
            Courses Offered
          </button>
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;
