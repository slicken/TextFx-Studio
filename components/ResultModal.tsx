
import React from 'react';
import { GeneratedImage } from '../types';

interface ResultModalProps {
  image: GeneratedImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `textfx-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-900 rounded-2xl shadow-2xl shadow-blue-900/20 max-w-lg w-full border border-neutral-800 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-neutral-800 bg-neutral-950/50">
          <h3 className="text-lg font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Here is your masterpiece
          </h3>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Area */}
        <div className="relative bg-black flex items-center justify-center aspect-square w-full group">
           <img 
            src={image.url} 
            alt={image.prompt} 
            className="w-full h-full object-contain"
           />
        </div>

        {/* Actions */}
        <div className="p-6 flex gap-3 flex-col sm:flex-row">
          <button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m3 3l3-3m-3 3V3" />
            </svg>
            Save Image
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 px-4 rounded-xl transition-all border border-neutral-700"
          >
            Close
          </button>
        </div>
        
        <div className="px-6 pb-6 text-xs text-neutral-500 text-center">
          AI Generated content can vary. Use wisely.
        </div>

      </div>
    </div>
  );
};

export default ResultModal;
