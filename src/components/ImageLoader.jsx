import React, { useState, useEffect } from 'react';

const ImageLoader = ({ src, alt, className, style, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#11111b] z-10">
          <div className="flex flex-col items-center">
            <div className="terminal-loader">
              <div className="terminal-header">
                <div className="terminal-title">kali@linux: ~/loading</div>
                <div className="terminal-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
              </div>
              <div className="terminal-body">
                <div className="terminal-content">
                  <div className="loading-text">
                    <span className="text-[#00ff00]">$</span> <span className="command">loading image</span>
                    <span className="dots">
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#00ff00] mt-2 text-sm font-mono">Loading image...</div>
          </div>
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#11111b] text-[#f38ba8]">
          <div className="text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-mono">Error loading image</div>
          </div>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt || 'Image'} 
          className={className} 
          style={{...style, display: isLoading ? 'none' : 'block'}} 
          onLoad={handleLoad} 
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageLoader;
