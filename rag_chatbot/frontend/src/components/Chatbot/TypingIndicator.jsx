import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1.5 p-4 bg-muted max-w-[100px] rounded-2xl rounded-bl-sm border border-border">
      <div className="w-2 h-2 rounded-full bg-primary/60 animate-[bounce_1s_infinite_0ms]"></div>
      <div className="w-2 h-2 rounded-full bg-primary/60 animate-[bounce_1s_infinite_200ms]"></div>
      <div className="w-2 h-2 rounded-full bg-primary/60 animate-[bounce_1s_infinite_400ms]"></div>
    </div>
  );
};

export default TypingIndicator;
