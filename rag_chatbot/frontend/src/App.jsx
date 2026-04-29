import { useState, useCallback } from 'react';
import ChatContainer from './components/ChatContainer';
import InputBar from './components/InputBar';

const SUGGESTED_QUERIES = [
  'What are the components of a RAG pipeline?',
  'What are the benefits of RAG?',
  'When do the final exams begin?',
  'Explain document loading in RAG',
];

/* ── Sparkle Icon (reused in header + empty state) ─────── */
function SparkleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

/* ── Welcome / Empty State ─────────────────────────────── */
function EmptyState({ onQuerySelect }) {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center justify-center px-4 pb-24">
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-rag-primary to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rag-primary/25">
        <SparkleIcon className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-rag-text mb-2 text-center">
        RAG Academic Chatbot
      </h2>
      <p className="text-rag-muted text-sm text-center max-w-lg mb-1">
        Research-Grade RAG-Based Academic Chatbot System
      </p>
      <p className="text-rag-muted/60 text-xs text-center max-w-md mb-10 leading-relaxed">
        Ask questions about your indexed documents. The system retrieves relevant
        context and generates grounded, hallucination-controlled answers using Gemini.
      </p>

      {/* Suggested queries */}
      <div className="w-full max-w-lg">
        <p className="text-[11px] text-rag-muted/70 mb-3 text-center uppercase tracking-widest font-medium">
          Try asking
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {SUGGESTED_QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={() => onQuerySelect(q)}
              className="px-4 py-2.5 bg-rag-surface border border-rag-border rounded-xl text-sm text-rag-text/80 hover:text-rag-text hover:bg-rag-primary/10 hover:border-rag-primary/30 transition-all duration-200 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main App ──────────────────────────────────────────── */
export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = useCallback(async (query) => {
    if (!query.trim() || loading) return;

    // Add user message
    const userMsg = { type: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.detail || `Server error (${res.status})`);
      }

      const data = await res.json();

      const botMsg = {
        type: 'bot',
        text: data.answer || 'No response was generated.',
        sources: data.retrieved_docs || [],
        scores: data.scores || [],
        latency: data.latency_ms != null ? (data.latency_ms / 1000).toFixed(2) : null,
        model: data.model || 'unknown',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        type: 'bot',
        text: err.message || 'An unexpected error occurred.',
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="h-screen bg-rag-bg flex flex-col font-sans overflow-hidden">
      {/* ── Header ── */}
      <header className="shrink-0 border-b border-rag-border bg-rag-bg/80 backdrop-blur-xl z-50">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-rag-primary to-purple-500 rounded-lg flex items-center justify-center shadow-md shadow-rag-primary/20">
              <SparkleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-rag-text font-semibold text-sm leading-tight">
                RAG Academic Chatbot
              </h1>
              <p className="text-rag-muted text-xs">Research-Grade Retrieval System</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-rag-secondary/10 text-rag-secondary text-xs rounded-full font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-rag-secondary rounded-full animate-pulse" />
            Online
          </span>
        </div>
      </header>

      {/* ── Chat Area ── */}
      <main className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <EmptyState onQuerySelect={handleSend} />
        ) : (
          <ChatContainer messages={messages} loading={loading} />
        )}
      </main>

      {/* ── Input Bar ── */}
      <InputBar onSend={handleSend} loading={loading} />
    </div>
  );
}
