/**
 * Animation de frappe style Claude :
 * avatar + 3 points qui clignotent
 */
export default function TypingIndicator() {
  return (
    <div className="flex gap-4 mb-8 msg-in">
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
        style={{ background: 'linear-gradient(135deg, #c96442, #e8855d)', color: '#fff' }}
      >
        C
      </div>

      <div className="flex-1">
        <p className="text-xs font-semibold mb-3" style={{ color: '#888' }}>
          CameDjoss
        </p>
        {/* Points animés */}
        <div className="flex gap-1.5 items-center h-5">
          <span className="w-2 h-2 rounded-full dot" style={{ background: '#c96442' }} />
          <span className="w-2 h-2 rounded-full dot" style={{ background: '#c96442' }} />
          <span className="w-2 h-2 rounded-full dot" style={{ background: '#c96442' }} />
        </div>
      </div>
    </div>
  );
}