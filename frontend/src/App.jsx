import { useEffect, useCallback, useState } from 'react';
import { useChat } from './hooks/useChat';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

export default function App() {
  const {
    conversations, messages, activeConversationId,
    isLoading, error,
    loadConversations, openConversation,
    startNewConversation, sendUserMessage,
    deleteUserConversation,
  } = useChat();

  // Contrôle l'ouverture/fermeture de la sidebar sur mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSendFromWelcome = useCallback(async (text) => {
    const newConv = await startNewConversation();
    if (newConv?.id) {
      await sendUserMessage(text, newConv.id);
    }
  }, [startNewConversation, sendUserMessage]);

  // Ferme la sidebar automatiquement quand on sélectionne une conversation
  const handleSelectConversation = useCallback((conv) => {
    openConversation(conv);
    setSidebarOpen(false); // Ferme sur mobile après sélection
  }, [openConversation]);

  // Ferme la sidebar après création d'une nouvelle conversation
  const handleNewConversation = useCallback(async () => {
    await startNewConversation();
    setSidebarOpen(false);
  }, [startNewConversation]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#1a1a1a' }}>

      {/* ── Overlay sombre derrière la sidebar sur mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      {/* Sur desktop : toujours visible
          Sur mobile : cachée par défaut, visible si sidebarOpen */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={deleteUserConversation}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* ── Zone principale ── */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">

        {/* Header */}
        <header
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid #2a2a2a', background: '#1a1a1a' }}
        >
          <div className="flex items-center gap-3">
            {/* Bouton hamburger — visible uniquement sur mobile */}
            <button
              className="md:hidden flex flex-col gap-1 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="w-5 h-0.5 rounded" style={{ background: '#888' }} />
              <span className="w-5 h-0.5 rounded" style={{ background: '#888' }} />
              <span className="w-5 h-0.5 rounded" style={{ background: '#888' }} />
            </button>

            <span className="text-sm font-medium truncate" style={{ color: '#888' }}>
              {activeConversationId
                ? (conversations.find(c => c.id === activeConversationId)?.title || 'Conversation')
                : 'CameDjoss'
              }
            </span>
          </div>

          {/* Badge modèle */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs flex-shrink-0"
            style={{ background: '#2a2a2a', color: '#888' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />
            <span className="hidden sm:inline">LLaMA 3.3 · Groq</span>
            <span className="sm:hidden">LLaMA</span>
          </div>
        </header>

        {/* Erreur */}
        {error && (
          <div
            className="mx-4 mt-3 px-4 py-2 rounded-lg text-xs"
            style={{ background: '#3a1a1a', border: '1px solid #6a2a2a', color: '#f87171' }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Zone messages */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSend={activeConversationId ? sendUserMessage : handleSendFromWelcome}
        />

        {/* Barre de saisie */}
        {activeConversationId ? (
          <InputBar onSend={sendUserMessage} isLoading={isLoading} />
        ) : (
          <div className="px-4 pb-6 pt-2" style={{ background: '#1a1a1a' }}>
            <div className="max-w-3xl mx-auto">
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-3 cursor-text"
                style={{ background: '#2f2f2f', border: '1px solid #3a3a3a' }}
                onClick={handleNewConversation}
              >
                <span className="text-sm" style={{ color: '#555' }}>
                  Envoyer un message à CameDjoss...
                </span>
              </div>
              <p className="text-center text-xs mt-2" style={{ color: '#555' }}>
                CameDjoss peut faire des erreurs. Vérifiez les informations importantes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
