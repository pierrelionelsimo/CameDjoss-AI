import { useEffect, useCallback } from 'react';
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

  /**
   * Depuis l'écran d'accueil :
   * 1. Crée une conversation
   * 2. Envoie le message avec l'ID retourné directement
   * (évite le problème de state asynchrone)
   */
  const handleSendFromWelcome = useCallback(async (text) => {
    const newConv = await startNewConversation();
    if (newConv?.id) {
      await sendUserMessage(text, newConv.id);
    }
  }, [startNewConversation, sendUserMessage]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#1a1a1a' }}>

      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={startNewConversation}
        onSelectConversation={openConversation}
        onDeleteConversation={deleteUserConversation}
      />

      {/* Zone principale */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid #2a2a2a', background: '#1a1a1a' }}
        >
          <span className="text-sm font-medium" style={{ color: '#888' }}>
            {activeConversationId
              ? (conversations.find(c => c.id === activeConversationId)?.title || 'Conversation')
              : 'CameDjoss'
            }
          </span>
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
            style={{ background: '#2a2a2a', color: '#888' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />
            LLaMA 3.3 · Groq
          </div>
        </header>

        {/* Erreur */}
        {error && (
          <div
            className="mx-6 mt-3 px-4 py-2 rounded-lg text-xs"
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
                onClick={startNewConversation}
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