import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages, isLoading, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestions = [
    { icon: '💡', text: "Explique-moi le machine learning simplement" },
    { icon: '✍️', text: "Aide-moi à rédiger un email professionnel" },
    { icon: '🔍', text: "Quelles sont les tendances tech en 2026 ?" },
    { icon: '💬', text: "Donne-moi des conseils pour un entretien tech" },
  ];

  // Sécurise l'appel — crée une conversation si besoin puis envoie
  const handleSuggestion = (text) => {
    if (typeof onSend === 'function') {
      onSend(text);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: '#1a1a1a' }}>
      <div className="max-w-3xl mx-auto px-6 py-8">

        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[55vh] text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #c96442, #e8855d)',
                color: '#fff',
                boxShadow: '0 0 40px rgba(201,100,66,0.2)',
              }}
            >
              C
            </div>

            <h1 className="text-3xl font-semibold mb-3" style={{ color: '#ececec' }}>
              Bonjour, je suis CameDjoss
            </h1>
            <p className="text-base mb-10" style={{ color: '#888' }}>
              Comment puis-je vous aider aujourd'hui ?
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              {suggestions.map(({ icon, text }) => (
                <button
                  key={text}
                  onClick={() => handleSuggestion(text)}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all duration-150 cursor-pointer"
                  style={{ background: '#2a2a2a', color: '#aaa', border: '1px solid #333' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.color = '#ececec';
                    e.currentTarget.style.borderColor = '#c96442';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#2a2a2a';
                    e.currentTarget.style.color = '#aaa';
                    e.currentTarget.style.borderColor = '#333';
                  }}
                >
                  <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                  <span className="leading-relaxed">{text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>

        {isLoading && (
          <div className="mt-6">
            <TypingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}