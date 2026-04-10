import { useState, useCallback } from 'react';
import { createConversation, sendMessage, getConversations, deleteConversation } from '../services/api';

export function useChat() {
  const [conversations, setConversations]   = useState([]);
  const [messages, setMessages]             = useState([]);
  const [activeConversationId, setActiveId] = useState(null);
  const [isLoading, setIsLoading]           = useState(false);
  const [error, setError]                   = useState(null);

const loadConversations = useCallback(async () => {
  try {
    const data = await getConversations();
    // Sécurise contre toute réponse qui n'est pas un tableau
    setConversations(Array.isArray(data) ? data : []);
  } catch {
    // Si Render est en veille ou erreur réseau — on met juste une liste vide
    setConversations([]);
  }
}, []);

  /** Ouvre une conversation et affiche ses messages */
  const openConversation = useCallback((conv) => {
    setActiveId(conv.id);
    setMessages(conv.messages || []);
    setError(null);
  }, []);

  /** Crée une nouvelle conversation vide */
  const startNewConversation = useCallback(async () => {
    try {
      const newConv = await createConversation();
      setActiveId(newConv.id);
      setMessages([]);
      setConversations(prev => [newConv, ...prev]);
      setError(null);
      // Retourne la conversation pour pouvoir l'utiliser immédiatement
      return newConv;
    } catch {
      setError('Impossible de créer une conversation');
    }
  }, []);

  /**
   * Supprime une conversation.
   * Accepte soit un Event soit juste l'ID.
   */
  const deleteUserConversation = useCallback(async (conversationId, e) => {
    // Stoppe la propagation si un event est passé
    if (e && e.stopPropagation) e.stopPropagation();

    try {
      await deleteConversation(conversationId);

      // Retire de la liste locale immédiatement
      setConversations(prev => prev.filter(c => c.id !== conversationId));

      // Si c'était la conversation active, réinitialise
      if (conversationId === activeConversationId) {
        setActiveId(null);
        setMessages([]);
      }
    } catch {
      setError('Impossible de supprimer la conversation');
    }
  }, [activeConversationId]);

  /** Envoie un message et reçoit la réponse IA */
  const sendUserMessage = useCallback(async (userMessage, overrideConvId = null) => {
    const convId = overrideConvId || activeConversationId;
    if (!userMessage.trim() || !convId || isLoading) return;

    // Affiche le message immédiatement (optimistic UI)
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    }]);
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(convId, userMessage);

      // Ajoute la réponse de l'IA
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        created_at: new Date().toISOString(),
      }]);

      // Met à jour le titre dans la sidebar
      setConversations(prev =>
        prev.map(c => c.id === convId ? { ...c, title: data.title } : c)
      );
    } catch {
      setError("Erreur lors de l'envoi du message");
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId, isLoading]);

  return {
    conversations, messages, activeConversationId,
    isLoading, error,
    loadConversations, openConversation,
    startNewConversation, sendUserMessage,
    deleteUserConversation,
  };
}