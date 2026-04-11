import { useState } from 'react';

export default function Sidebar({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onClose,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div
      className="flex flex-col h-full w-64 flex-shrink-0"
      style={{ background: '#171717', borderRight: '1px solid #2a2a2a' }}
    >
      {/* Logo + bouton fermer sur mobile */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #c96442, #e8855d)', color: '#fff' }}
            >
              C
            </div>
            <span className="font-semibold text-sm" style={{ color: '#ececec' }}>
              CameDjoss
            </span>
          </div>

          {/* Bouton ✕ — visible uniquement sur mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg transition-colors"
            style={{ color: '#666' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ececec'}
            onMouseLeave={e => e.currentTarget.style.color = '#666'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Bouton nouvelle conversation */}
        <button
          onClick={onNewConversation}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150"
          style={{ color: '#ececec' }}
          onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Nouvelle conversation
        </button>
      </div>

      <div style={{ borderTop: '1px solid #2a2a2a', margin: '0 16px' }} />

      {/* Liste conversations */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        {conversations.length === 0 ? (
          <p className="text-xs px-3 py-2" style={{ color: '#666' }}>
            Aucune conversation
          </p>
        ) : (
          <>
            <p className="text-xs px-3 mb-2 font-medium uppercase tracking-wider" style={{ color: '#555' }}>
              Récent
            </p>
            {conversations.map((conv) => {
              const isActive  = conv.id === activeConversationId;
              const isHovered = hoveredId === conv.id;

              return (
                <div
                  key={conv.id}
                  className="relative flex items-center rounded-lg mb-0.5 transition-all duration-150"
                  style={{
                    background: isActive ? '#2a2a2a' : isHovered ? '#222' : 'transparent'
                  }}
                  onMouseEnter={() => setHoveredId(conv.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    onClick={() => onSelectConversation(conv)}
                    className="flex-1 text-left px-3 py-2 text-sm truncate"
                    style={{
                      color: isActive ? '#ececec' : '#aaa',
                      paddingRight: isHovered ? '2rem' : '0.75rem',
                    }}
                  >
                    {conv.title || 'Nouvelle conversation'}
                  </button>

                  {isHovered && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conv.id, e);
                      }}
                      className="absolute right-2 p-1 rounded transition-all duration-150"
                      style={{ color: '#666' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#f87171';
                        e.currentTarget.style.background = '#3a1a1a';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.background = 'transparent';
                      }}
                      title="Supprimer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3 text-xs"
        style={{ borderTop: '1px solid #2a2a2a', color: '#555' }}
      >
        CameDjoss · Propulsé par LLaMA 3.3
      </div>
    </div>
  );
}
