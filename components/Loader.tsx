import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-red-600/30 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-red-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-red-400 font-medium animate-pulse tracking-wider">Forging your text...</p>
    </div>
  );
};

export default Loader;