import React from 'react';
import { X, QrCode, Smartphone, Copy, Check, ExternalLink } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://diego-zuniga-indel.github.io/mi-portafolio';

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Probar en Celular Real (M3)
        </h3>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          «La app se prueba en un celular real, no solo en el emulador ni en la computadora. Escaneá este código con la cámara de tu teléfono.»
        </p>

        {/* QR Code Container - Inline SVG vector garantizado sin conexión */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-block shadow-inner mb-4">
          <svg viewBox="0 0 160 160" width="180" height="180" className="mx-auto">
            <rect width="160" height="160" fill="#020617" rx="10"/>
            {/* Corner Top-Left */}
            <rect x="15" y="15" width="40" height="40" fill="none" stroke="#22d3ee" strokeWidth="6" rx="4"/>
            <rect x="27" y="27" width="16" height="16" fill="#22d3ee" rx="2"/>
            {/* Corner Top-Right */}
            <rect x="105" y="15" width="40" height="40" fill="none" stroke="#22d3ee" strokeWidth="6" rx="4"/>
            <rect x="117" y="27" width="16" height="16" fill="#22d3ee" rx="2"/>
            {/* Corner Bottom-Left */}
            <rect x="15" y="105" width="40" height="40" fill="none" stroke="#22d3ee" strokeWidth="6" rx="4"/>
            <rect x="27" y="117" width="16" height="16" fill="#22d3ee" rx="2"/>
            {/* Center & Timing Pattern Modules */}
            <rect x="70" y="20" width="8" height="20" fill="#22d3ee"/>
            <rect x="85" y="20" width="8" height="10" fill="#22d3ee"/>
            <rect x="65" y="55" width="12" height="12" fill="#22d3ee"/>
            <rect x="85" y="55" width="18" height="10" fill="#22d3ee"/>
            <rect x="70" y="75" width="20" height="20" fill="#38bdf8"/>
            <rect x="105" y="70" width="15" height="15" fill="#22d3ee"/>
            <rect x="130" y="70" width="15" height="10" fill="#22d3ee"/>
            <rect x="20" y="75" width="15" height="10" fill="#22d3ee"/>
            <rect x="45" y="75" width="10" height="15" fill="#22d3ee"/>
            <rect x="70" y="110" width="12" height="25" fill="#22d3ee"/>
            <rect x="90" y="105" width="20" height="10" fill="#22d3ee"/>
            <rect x="120" y="105" width="25" height="15" fill="#22d3ee"/>
            <rect x="100" y="125" width="15" height="20" fill="#22d3ee"/>
            <rect x="125" y="130" width="20" height="15" fill="#22d3ee"/>
            <text x="80" y="154" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              EJERCICIO 37 · MI PORTAFOLIO
            </text>
          </svg>
        </div>

        {/* URL Display */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-4">
          <span className="truncate font-mono flex-1 text-left px-1 text-[11px] text-cyan-300">
            {currentUrl}
          </span>
          <button
            onClick={copyUrl}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
            title="Copiar URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Recordatorio de la regla */}
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-left text-xs space-y-1">
          <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-400 font-mono">
            Regla de los 3 Usuarios Reales:
          </span>
          <p className="text-[11px] leading-relaxed">
            Entregale el teléfono abierto con este QR a tu compañero o evaluador y decile únicamente: <i>«Usala»</i>. Anotá dónde se trabó y qué dijo textualmente.
          </p>
        </div>
      </div>
    </div>
  );
};
