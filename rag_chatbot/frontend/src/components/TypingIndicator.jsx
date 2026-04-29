export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-slide-up">
      <div className="bg-rag-surface border border-rag-border rounded-2xl rounded-tl-md px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-rag-primary rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-rag-primary/70 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-rag-primary/40 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
          <span className="text-xs text-rag-muted">
            Retrieving &amp; generating...
          </span>
        </div>
      </div>
    </div>
  );
}
