import React, { useState, useCallback } from 'react';
import { TextConfig, TextStyle, TextEffect, GeneratedImage } from './types';
import { STYLE_OPTIONS, EFFECT_OPTIONS, BACKGROUND_OPTIONS } from './constants';
import { generateTextImage } from './services/geminiService';
import Loader from './components/Loader';
import ResultModal from './components/ResultModal';

const App: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<TextStyle>(TextStyle.TYPE_3D_GLOSSY);
  const [customStyle, setCustomStyle] = useState('');
  
  const [selectedEffects, setSelectedEffects] = useState<TextEffect[]>([]);
  const [customEffect, setCustomEffect] = useState('');

  const [backgroundMode, setBackgroundMode] = useState<'dark' | 'light' | 'abstract'>('dark');
  const [customBackground, setCustomBackground] = useState('');

  const [creativityLevel, setCreativityLevel] = useState<number>(3); // 1 to 5
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    const randomEffect = EFFECT_OPTIONS[Math.floor(Math.random() * EFFECT_OPTIONS.length)].value;
    
    setSelectedStyle(randomStyle);
    setBackgroundMode(randomBg as any);
    setSelectedEffects([randomEffect]);
    setCustomStyle('');
    setCustomEffect('');
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
      customStyle: customStyle,
      effects: selectedEffects,
      customEffect: customEffect,
      backgroundMode,
      customBackground: customBackground,
      creativityLevel
    };

    try {
      const imageUrl = await generateTextImage(config);
      setGeneratedImage({
        url: imageUrl,
        prompt: config.text,
        timestamp: Date.now()
      });
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [textInput, selectedStyle, customStyle, selectedEffects, customEffect, backgroundMode, customBackground, creativityLevel]);

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/20">
              Tx
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              TextFx Studio
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={handleRandomize}
              className="text-xs font-medium px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              Randomize
            </button>
            <div className="text-xs font-medium px-3 py-1 bg-neutral-900 rounded-full text-red-500 border border-neutral-800">
              v2.5
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-32">
        
        {/* Hero / Input Section */}
        <section className="mb-12 text-center space-y-6">
           <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Forge Text into <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Masterpieces</span>
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto">
            Type your text, customize every detail, and let AI generate professional typography in seconds.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-700 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter your text here..."
              maxLength={30}
              className="relative w-full bg-neutral-900 border border-neutral-800 text-white text-center text-2xl md:text-3xl font-bold py-6 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-neutral-700 shadow-2xl transition-all"
            />
            <div className="absolute right-4 bottom-4 text-xs text-neutral-600">
              {textInput.length}/30
            </div>
          </div>
           {error && (
            <div className="text-red-300 bg-red-950/50 border border-red-900/50 py-2 px-4 rounded-lg inline-block animate-bounce">
              {error}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Style Selection - Left Col */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Styles Grid */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                1. Choose Style
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStyle(option.value)}
                    className={`relative p-4 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      selectedStyle === option.value && !customStyle
                        ? 'bg-red-900/20 border-red-600 ring-1 ring-red-600/50 shadow-lg shadow-red-900/10'
                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="text-2xl mb-2 grayscale group-hover:grayscale-0">{option.icon}</div>
                    <div className={`font-semibold text-sm ${selectedStyle === option.value && !customStyle ? 'text-white' : 'text-neutral-400'}`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-neutral-600 leading-tight mt-1">
                      {option.description}
                    </div>
                    {selectedStyle === option.value && !customStyle && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Custom Style Input */}
              <div className="relative">
                 <input 
                  type="text" 
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder="Or describe a custom style manually..."
                  className={`w-full bg-neutral-900 border text-sm py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all ${customStyle ? 'border-red-600 text-white' : 'border-neutral-800 text-neutral-400'}`}
                 />
                 {customStyle && (
                   <span className="absolute right-3 top-3 text-xs text-red-500 font-bold">Custom Active</span>
                 )}
              </div>
            </div>

            {/* Effects Chips */}
             <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                2. Add Effects
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {EFFECT_OPTIONS.map((effect) => (
                  <button
                    key={effect.value}
                    onClick={() => toggleEffect(effect.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedEffects.includes(effect.value)
                        ? 'bg-orange-500/10 border-orange-500 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.1)]'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'
                    }`}
                  >
                    {effect.label}
                  </button>
                ))}
              </div>

              {/* Custom Effect Input */}
              <div className="relative">
                 <input 
                  type="text" 
                  value={customEffect}
                  onChange={(e) => setCustomEffect(e.target.value)}
                  placeholder="Add specific custom effects..."
                  className="w-full bg-neutral-900 border border-neutral-800 text-sm py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-300 placeholder-neutral-600 transition-all"
                 />
              </div>
            </div>

          </div>

          {/* Settings - Right Col */}
          <div className="space-y-8 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 h-fit">
            
            {/* Background Mode */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3">
                3. Background
              </h3>
              <div className="space-y-2 mb-4">
                {BACKGROUND_OPTIONS.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => {
                      setBackgroundMode(bg.value as any);
                      setCustomBackground('');
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      backgroundMode === bg.value && !customBackground
                        ? 'bg-neutral-800 border-neutral-600 text-white'
                        : 'bg-transparent border-neutral-800 text-neutral-500 hover:bg-neutral-800/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border border-neutral-700 ${bg.color}`}></div>
                    <span className="text-sm font-medium">{bg.label}</span>
                    {backgroundMode === bg.value && !customBackground && (
                      <svg className="w-4 h-4 ml-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
               <input 
                  type="text" 
                  value={customBackground}
                  onChange={(e) => setCustomBackground(e.target.value)}
                  placeholder="Custom background..."
                  className={`w-full bg-neutral-950 border text-xs py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-500 transition-all ${customBackground ? 'border-neutral-500 text-white' : 'border-neutral-800 text-neutral-500'}`}
               />
            </div>

            {/* Creativity Slider */}
            <div>
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-3 flex justify-between">
                <span>AI Creativity</span>
                <span className="text-red-500">{creativityLevel}/5</span>
              </h3>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={creativityLevel}
                onChange={(e) => setCreativityLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-neutral-600 mt-2">
                <span>Strict</span>
                <span>Wild</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Sticky Action Bar for Mobile/Desktop */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-neutral-900 p-4 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block text-sm text-neutral-500">
            <span className="text-white font-bold">{customStyle || selectedStyle}</span>
            {(selectedEffects.length > 0 || customEffect) && (
              <span> + effects</span>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full sm:w-auto sm:px-12 py-4 rounded-xl font-bold text-lg tracking-wide shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
              isGenerating 
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-700 to-orange-600 hover:from-red-600 hover:to-orange-500 text-white shadow-red-900/20'
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

      {/* Modals */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <Loader />
        </div>
      )}

      <ResultModal 
        isOpen={showModal} 
        image={generatedImage} 
        onClose={() => setShowModal(false)} 
      />

    </div>
  );
};

export default App;