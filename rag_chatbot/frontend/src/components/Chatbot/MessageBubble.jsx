import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 flex items-end ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary border border-border text-foreground'
          }`}>
            {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
          </div>
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary text-primary-foreground rounded-br-sm' 
              : 'bg-muted text-foreground rounded-bl-sm border border-border shadow-sm'
          }`}>
            {isUser ? (
              <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Sources (for bot only) */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-1">
              <span className="font-semibold mr-1">Sources:</span>
              {message.sources.map((source, idx) => (
                <span key={idx} className="bg-secondary px-2 py-0.5 rounded-full border border-border">
                  {source.source.replace('.txt', '')} ({(source.score * 100).toFixed(1)}%)
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
