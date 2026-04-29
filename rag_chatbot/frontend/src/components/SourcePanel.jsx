import { useState } from 'react';

/**
 * Color-code the L2 distance score:
 *   < 1.0  → green  (very relevant)
 *   < 1.5  → yellow (relevant)
 *   >= 1.5 → orange (less relevant)
 */
function getScoreColor(score) {
  if (score < 1.0) return 'text-emerald-400 bg-emerald-400/10';
  if (score < 1.5) return 'text-yellow-400 bg-yellow-400/10';
  return 'text-orange-400 bg-orange-400/10';
}

export default function SourcePanel({ sources, scores }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="border-t border-rag-border/50">
      {/* Toggle button */}
      <button
        id="toggle-sources"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center gap-2 text-xs text-rag-muted hover:text-rag-text transition-colors group"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
        <span>View Retrieved Sources</span>
        <span className="px-1.5 py-0.5 bg-rag-primary/10 text-rag-primary rounded text-[10px] font-medium">
          {sources.length}
        </span>
      </button>

      {/* Source cards */}
      {isOpen && (
        <div className="px-4 pb-3 space-y-2 animate-fade-in">
          {sources.map((source, i) => (
            <div
              key={i}
              className="bg-rag-bg/50 rounded-lg p-3 border border-rag-border/30"
            >
              {/* Source header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-rag-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-rag-primary">
                    {source.source}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-medium ${getScoreColor(
                    scores[i]
                  )}`}
                >
                  L2: {scores[i]?.toFixed(4)}
                </span>
              </div>

              {/* Chunk text */}
              <p className="text-xs text-rag-muted/80 leading-relaxed line-clamp-4">
                {source.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
