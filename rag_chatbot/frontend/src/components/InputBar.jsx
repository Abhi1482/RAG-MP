import { useState, useRef } from 'react';

export default function InputBar({ onSend, loading }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="shrink-0 border-t border-rag-border bg-rag-bg/80 backdrop-blur-xl">
      <form
        onSubmit={handleSubmit}
        className="max-w-[900px] mx-auto px-4 py-3"
      >
        <div className="flex gap-3 items-end">
          {/* Text input */}
          <div className="flex-1">
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your documents..."
              disabled={loading}
              autoComplete="off"
              className="w-full bg-rag-surface border border-rag-border rounded-xl px-4 py-3 text-sm text-rag-text placeholder:text-rag-muted/50 focus:outline-none focus:border-rag-primary/50 focus:ring-2 focus:ring-rag-primary/10 disabled:opacity-50 transition-all duration-200"
            />
          </div>

          {/* Send button */}
          <button
            id="send-button"
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-rag-primary hover:bg-rag-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-rag-primary/20 hover:shadow-rag-primary/30"
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            )}
          </button>
        </div>

        <p className="text-[10px] text-rag-muted/40 mt-2 text-center select-none">
          Powered by FAISS · SentenceTransformers · Gemini
        </p>
      </form>
    </div>
  );
}
