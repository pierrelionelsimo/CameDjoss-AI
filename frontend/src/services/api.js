import axios from 'axios';

// Instance axios pointant vers le backend via le proxy Vite
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

/** Récupère toutes les conversations */
export const getConversations = async () => {
  const res = await api.get('/conversations/');
  return res.data;
};

/** Crée une nouvelle conversation vide */
export const createConversation = async () => {
  const res = await api.post('/conversations/');
  return res.data;
};

/** Envoie un message et reçoit la réponse IA */
export const sendMessage = async (conversationId, message) => {
  const res = await api.post(`/conversations/${conversationId}/chat/`, { message });
  return res.data;
};

/** Supprime une conversation par son ID */
export const deleteConversation = async (conversationId) => {
  // On n'essaie pas de lire res.data car le backend retourne une réponse vide
  await api.delete(`/conversations/${conversationId}/`);
};