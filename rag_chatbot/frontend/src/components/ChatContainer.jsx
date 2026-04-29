import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatContainer({ messages, loading }) {
  const bottomRef = useRef(null);

  /* Auto-scroll to the latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="h-full overflow-y-auto px-4 py-6">
      <div className="max-w-[900px] mx-auto space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
