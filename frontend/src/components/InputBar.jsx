import { useState, useRef } from 'react';

/**
 * Barre de saisie style Claude AI :
 * centrée, arrondie, fond sombre, bouton flèche discret.
 */
export default function InputBar({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="px-6 pb-6 pt-2 mb-5 " style={{ background: '#1a1a1a' }}>
      <div className="max-w-3xl mx-auto">

        {/* Conteneur input style Claude */}
        <div
          className="flex items-end gap-2 rounded-xl px-6 py-5  transition-all duration-200"
          style={{
            background: '#2f2f2f',
            border: '1px solid #3a3a3a',
          }}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Envoyer un message à CameDjoss..."
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none focus:outline-none disabled:opacity-50 leading-relaxed py-0.5"
            style={{
              color: '#ececec',
              caretColor: '#c96442',
              maxHeight: '160px',
            }}
          />

          {/* Bouton envoyer */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{
              background: canSend ? '#c96442' : '#3a3a3a',
              color: canSend ? '#fff' : '#555',
              transform: canSend ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>

        {/* Note bas de page style Claude */}
        <p className="text-center text-xs mt-2" style={{ color: '#555' }}>
          CameDjoss peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}