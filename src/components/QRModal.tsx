import React from 'react';
import { X, Smartphone, Copy, Check, ExternalLink, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-5aga45xqbfsvnxxfuedj2o-757988679085.us-east1.run.app';

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
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          «La app se prueba en un celular real, no solo en el emulador ni en la computadora. Escaneá este código con la cámara de tu teléfono.»
        </p>

        {/* QR Code Container - Código QR 100% Real y Escaneable */}
        <div className="p-3 bg-white rounded-2xl inline-block shadow-2xl mb-4 border-4 border-cyan-500/30">
          <QRCodeSVG
            value={currentUrl}
            size={200}
            level="H"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#020617"
          />
        </div>

        {/* Botón para abrir directamente o descargar imagen */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir en otra pestaña</span>
          </a>
          <a
            href="/qr.png"
            download="qr-mi-portafolio.png"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Descargar imagen QR</span>
          </a>
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
