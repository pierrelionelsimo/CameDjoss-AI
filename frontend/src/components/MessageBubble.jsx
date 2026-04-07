/**
 * Style Claude AI :
 * - Message IA : pas de bulle, texte direct avec avatar logo
 * - Message utilisateur : fond subtil arrondi à droite
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-8 msg-in">
        <div
          className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={{
            background: '#2f2f2f',
            color: '#ececec',
            borderBottomRightRadius: '4px',
          }}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  // Message IA — style Claude : avatar + texte sans bulle
  return (
    <div className="flex gap-4 mb-8 msg-in">
      {/* Avatar CameDjoss */}
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
        style={{ background: 'linear-gradient(135deg, #c96442, #e8855d)', color: '#fff' }}
      >
        C
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        {/* Nom du bot */}
        <p className="text-xs font-semibold mb-2" style={{ color: '#888' }}>
          CameDjoss
        </p>
        {/* Texte de la réponse */}
        
        <div
          className="text-sm leading-8 whitespace-pre-wrap break-words"
          style={{ color: '#d4d4d4' }}
        >
          {message.content}
        </div>
        {/* Heure */}
        <p className="text-xs mt-2" style={{ color: '#555' }}>
          {new Date(message.created_at).toLocaleTimeString('fr-FR', {
            hour: '2-digit', minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
}