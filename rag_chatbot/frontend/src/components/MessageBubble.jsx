import SourcePanel from './SourcePanel';

export default function MessageBubble({ message }) {
  /* ── User Message ── */
  if (message.type === 'user') {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-[75%] bg-rag-primary text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-lg shadow-rag-primary/10">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  /* ── Bot Message ── */
  const isError = message.isError;

  return (
    <div className="flex justify-start animate-slide-up">
      <div
        className={`max-w-[85%] rounded-2xl rounded-tl-md overflow-hidden shadow-lg ${
          isError
            ? 'bg-rag-error/5 border border-rag-error/20'
            : 'bg-rag-surface border border-rag-border'
        }`}
      >
        {/* Header row: label + badges */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isError
                  ? 'bg-rag-error/20 text-rag-error'
                  : 'bg-rag-primary/20 text-rag-primary'
              }`}
            >
              {isError ? '!' : '✦'}
            </div>
            <span
              className={`text-xs font-medium ${
                isError ? 'text-rag-error' : 'text-rag-muted'
              }`}
            >
              {isError ? 'Error' : 'RAG Assistant'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {message.model && !isError && (
              <span className="px-2 py-0.5 bg-rag-bg/60 text-rag-muted text-[10px] rounded-full font-mono">
                {message.model}
              </span>
            )}
            {message.latency && (
              <span className="px-2 py-0.5 bg-rag-secondary/10 text-rag-secondary text-[10px] rounded-full font-medium">
                {message.latency}s
              </span>
            )}
          </div>
        </div>

        {/* Answer body */}
        <div className="px-4 pb-3">
          <p
            className={`text-sm leading-relaxed whitespace-pre-line ${
              isError ? 'text-rag-error/80' : 'text-rag-text'
            }`}
          >
            {message.text}
          </p>
        </div>

        {/* Collapsible sources */}
        {message.sources?.length > 0 && (
          <SourcePanel sources={message.sources} scores={message.scores} />
        )}
      </div>
    </div>
  );
}
