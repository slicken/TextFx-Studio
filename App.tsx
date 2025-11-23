
import React, { useState, useCallback } from 'react';
import { TextConfig, TextStyle, TextEffect, GeneratedImage } from './types';
import { STYLE_OPTIONS, EFFECT_OPTIONS, BACKGROUND_OPTIONS } from './constants';
import { generateTextImage } from './services/geminiService';
import Loader from './components/Loader';
import ResultModal from './components/ResultModal';

const App: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  
  // Style State
  const [selectedStyle, setSelectedStyle] = useState<TextStyle | 'custom'>(TextStyle.TYPE_3D_GLOSSY);
  const [customStyle, setCustomStyle] = useState('');
  
  // Effect State
  const [selectedEffects, setSelectedEffects] = useState<TextEffect[]>([]);
  const [isCustomEffectActive, setIsCustomEffectActive] = useState(false);
  const [customEffect, setCustomEffect] = useState('');

  // Background State
  const [backgroundMode, setBackgroundMode] = useState<string>('dark');
  const [customBackground, setCustomBackground] = useState('');
  const [isCustomBackgroundActive, setIsCustomBackgroundActive] = useState(false);

  // Settings
  const [creativityLevel, setCreativityLevel] = useState<number>(3); // 1 to 5
  
  // App State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const toggleEffect = (effect: TextEffect) => {
    setSelectedEffects(prev => 
      prev.includes(effect) 
        ? prev.filter(e => e !== effect)
        : [...prev, effect]
    );
  };

  const handleRandomize = () => {
    const randomStyle = STYLE_OPTIONS[Math.floor(Math.random() * STYLE_OPTIONS.length)].value;
    const randomBg = BACKGROUND_OPTIONS[Math.floor(Math.random() * BACKGROUND_OPTIONS.length)].value;
    
    // Pick 0-2 random effects
    const numEffects = Math.floor(Math.random() * 3);
    const randomEffects: TextEffect[] = [];
    for(let i=0; i<numEffects; i++) {
        const eff = EFFECT_OPTIONS[Math.floor(Math.random() * EFFECT_OPTIONS.length)].value;
        if(!randomEffects.includes(eff)) randomEffects.push(eff);
    }
    
    setSelectedStyle(randomStyle);
    setBackgroundMode(randomBg);
    setSelectedEffects(randomEffects);
    
    // Reset customs
    setCustomStyle('');
    setIsCustomEffectActive(false);
    setCustomEffect('');
    setIsCustomBackgroundActive(false);
    setCustomBackground('');
  };

  const handleGenerate = useCallback(async () => {
    if (!textInput.trim()) {
      setError("Please enter some text first!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsGenerating(true);
    setError(null);

    const config: TextConfig = {
      text: textInput,
      style: selectedStyle,
      customStyle: selectedStyle === 'custom' ? customStyle : '',
      effects: selectedEffects,
      customEffect: isCustomEffectActive ? customEffect : '',
      backgroundMode: backgroundMode as any,
      customBackground: isCustomBackgroundActive ? customBackground : '',
      creativityLevel
    };

    try {
      const imageUrl = await generateTextImage(config);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: config.text,
        timestamp: Date.now()
      };
      
      setGeneratedImage(newImage);
      setHistory(prev => [newImage, ...prev]);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [textInput, selectedStyle, customStyle, selectedEffects, isCustomEffectActive, customEffect, backgroundMode, isCustomBackgroundActive, customBackground, creativityLevel]);

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-blue-600 selection:text-white font-sans">
      
      {/* Header */}
      <header className="border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
              Tx
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              TextFx Studio
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setShowHistory(true)}
              className="text-xs font-medium px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-1 border border-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>
             <button 
              onClick={handleRandomize}
              className="text-xs font-medium px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-1 border border-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              Randomize
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        
        {/* Hero / Input Section */}
        <section className="mb-12 text-center space-y-6">
           <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Forge Text into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Masterpieces</span>
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto">
            Type your text, customize every detail, and let AI generate professional typography in seconds.
          </p>
          
          <div className="max-w-2xl mx-auto relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter your text here..."
              maxLength={30}
              className="relative w-full bg-neutral-900 border border-neutral-800 text-white text-center text-2xl md:text-3xl font-bold py-6 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-neutral-700 shadow-2xl transition-all"
            />
            <div className="absolute right-4 bottom-4 text-xs text-neutral-600">
              {textInput.length}/30
            </div>
          </div>
           {error && (
            <div className="text-blue-300 bg-blue-950/50 border border-blue-900/50 py-2 px-4 rounded-lg inline-block animate-bounce">
              {error}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Style Selection - Main Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Styles Grid */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                1. Choose Style
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStyle(option.value)}
                    className={`relative p-3 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] h-28 flex flex-col justify-between ${
                      selectedStyle === option.value
                        ? 'bg-blue-900/20 border-blue-600 ring-1 ring-blue-600/50 shadow-lg shadow-blue-900/10'
                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="text-2xl grayscale group-hover:grayscale-0">{option.icon}</div>
                    <div>
                        <div className={`font-bold text-sm leading-tight ${selectedStyle === option.value ? 'text-white' : 'text-neutral-400'}`}>
                        {option.label}
                        </div>
                        <div className="text-[10px] text-neutral-600 leading-tight mt-1 line-clamp-2">
                        {option.description}
                        </div>
                    </div>
                  </button>
                ))}
                
                {/* Custom Style Card - Discrete & Growing */}
                <div 
                  onClick={() => setSelectedStyle('custom')}
                  className={`relative rounded-xl border transition-all h-28 flex flex-col cursor-pointer overflow-hidden ${
                    selectedStyle === 'custom' 
                    ? 'col-span-2 bg-blue-900/10 border-blue-500 ring-1 ring-blue-500/50' 
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 flex items-center justify-center gap-2'
                  }`}
                >
                    {selectedStyle === 'custom' ? (
                        <div className="p-3 w-full h-full flex flex-col">
                             <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                                <span>✏️ Custom Style</span>
                             </div>
                             <textarea 
                                autoFocus
                                value={customStyle}
                                onChange={(e) => setCustomStyle(e.target.value)}
                                placeholder="Describe your style (e.g. 'Made of cheese', 'Cloud text')..."
                                className="w-full h-full bg-transparent resize-none focus:outline-none text-sm text-white placeholder-neutral-600"
                             />
                        </div>
                    ) : (
                        <>
                            <span className="text-xl">✏️</span>
                            <span className="font-semibold text-neutral-400 text-sm">Custom</span>
                        </>
                    )}
                </div>

              </div>
            </div>

            {/* Effects Chips */}
             <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                2. Add Effects
              </h3>
              <div className="flex flex-wrap gap-2">
                {EFFECT_OPTIONS.map((effect) => (
                  <button
                    key={effect.value}
                    onClick={() => toggleEffect(effect.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedEffects.includes(effect.value)
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'
                    }`}
                  >
                    {effect.label}
                  </button>
                ))}
                
                {/* Custom Effect Chip - Growing */}
                <div 
                    onClick={() => !isCustomEffectActive && setIsCustomEffectActive(true)}
                    className={`rounded-full border transition-all flex items-center overflow-hidden ${
                        isCustomEffectActive 
                        ? 'bg-neutral-800 border-cyan-500 w-48' 
                        : 'bg-neutral-900 border-neutral-800 w-20 justify-center hover:border-neutral-700 cursor-pointer'
                    }`}
                >
                    {isCustomEffectActive ? (
                        <div className="flex items-center w-full px-3 py-1.5">
                            <input 
                                autoFocus
                                type="text"
                                value={customEffect}
                                onChange={(e) => setCustomEffect(e.target.value)}
                                onBlur={(e) => !e.target.value && setIsCustomEffectActive(false)}
                                placeholder="Type effect..."
                                className="bg-transparent border-none focus:outline-none text-xs text-white placeholder-neutral-600 w-full"
                            />
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsCustomEffectActive(false); setCustomEffect(''); }} 
                                className="text-neutral-500 hover:text-white ml-1"
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <span className="text-xs font-medium text-neutral-500 py-1.5">+ Custom</span>
                    )}
                </div>

              </div>
            </div>

          </div>

          {/* Settings - Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 h-full">
            
            {/* Background Mode */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3">
                3. Background
              </h3>
              <div className="space-y-2">
                {BACKGROUND_OPTIONS.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => {
                      setBackgroundMode(bg.value);
                      setIsCustomBackgroundActive(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                      backgroundMode === bg.value && !isCustomBackgroundActive
                        ? 'bg-neutral-800 border-neutral-600 text-white'
                        : 'bg-transparent border-neutral-800 text-neutral-500 hover:bg-neutral-800/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border border-neutral-700 ${bg.color}`}></div>
                    <span className="text-sm font-medium">{bg.label}</span>
                    {backgroundMode === bg.value && !isCustomBackgroundActive && (
                      <svg className="w-4 h-4 ml-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
                
                {/* Custom Background List Item - Growing */}
                <div 
                    onClick={() => {
                        setIsCustomBackgroundActive(true);
                        setBackgroundMode('custom');
                    }}
                    className={`w-full rounded-lg border transition-all overflow-hidden ${
                        isCustomBackgroundActive
                        ? 'bg-neutral-800 border-blue-500 p-2' 
                        : 'bg-transparent border-neutral-800 p-2.5 cursor-pointer hover:bg-neutral-800/50'
                    }`}
                >
                     {isCustomBackgroundActive ? (
                         <div className="flex items-center gap-2">
                             <span className="text-lg">🎨</span>
                             <input 
                                autoFocus
                                type="text"
                                value={customBackground}
                                onChange={(e) => setCustomBackground(e.target.value)}
                                placeholder="Describe background..."
                                className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-neutral-600 w-full"
                             />
                         </div>
                     ) : (
                         <div className="flex items-center gap-3 text-neutral-500">
                             <div className="w-5 h-5 rounded-full border border-neutral-700 bg-transparent flex items-center justify-center text-[10px]">?</div>
                             <span className="text-sm font-medium">Custom...</span>
                         </div>
                     )}
                </div>

              </div>
            </div>

            {/* Creativity Slider */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3 flex justify-between">
                <span>AI Creativity</span>
                <span className="text-blue-500">{creativityLevel}/5</span>
              </h3>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={creativityLevel}
                onChange={(e) => setCreativityLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-neutral-600 mt-2">
                <span>Strict</span>
                <span>Wild</span>
              </div>
            </div>

            </div>
          </div>
        </div>
      </main>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-neutral-900 p-4 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block text-sm text-neutral-500">
            <span className="text-white font-bold">
                {selectedStyle === 'custom' ? 'Custom Style' : STYLE_OPTIONS.find(s => s.value === selectedStyle)?.label}
            </span>
            {(selectedEffects.length > 0 || customEffect) && (
              <span> + {selectedEffects.length + (customEffect ? 1 : 0)} effects</span>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full sm:w-auto sm:px-12 py-4 rounded-xl font-bold text-lg tracking-wide shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
              isGenerating 
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 text-white shadow-blue-900/20'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Forging Art...
              </>
            ) : (
              <>
                Generate
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* History Drawer/Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-neutral-900 h-full border-l border-neutral-800 shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">History</h3>
                    <button onClick={() => setShowHistory(false)} className="text-neutral-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {history.length === 0 ? (
                        <div className="text-center text-neutral-500 mt-20">
                            <p>No creations yet.</p>
                            <p className="text-xs mt-2">Start forging some art!</p>
                        </div>
                    ) : (
                        history.map(img => (
                            <div key={img.id} onClick={() => { setGeneratedImage(img); setShowModal(true); }} className="group relative aspect-square bg-black rounded-lg overflow-hidden border border-neutral-800 cursor-pointer hover:border-blue-500 transition-all">
                                <img src={img.url} alt={img.prompt} className="w-full h-full object-contain" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                    <p className="text-white text-xs font-medium truncate w-full">{img.prompt}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Loading Modal */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      {/* Result Modal */}
      <ResultModal 
        isOpen={showModal} 
        image={generatedImage} 
        onClose={() => setShowModal(false)} 
      />

    </div>
  );
};

export default App;
