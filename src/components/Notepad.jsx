import React, { useState, useEffect } from 'react';

const Notepad = ({ file, onClose }) => {
  if (!file) return null;
  
  // State for window position (for dragging functionality)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // State for maximized window
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousSize, setPreviousSize] = useState({ width: '80%', maxWidth: '4xl', height: '80%' });
  
  // Handle drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  // Handle drag
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };
  
  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add event listeners for drag
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]" style={{ pointerEvents: 'none' }}>
      <div 
        className={`bg-[#1e1e2e] border border-[#313244] rounded shadow-lg flex flex-col ${isMaximized ? 'w-full max-w-none h-full' : 'w-4/5 max-w-4xl h-4/5'}`}
        style={{
          transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'auto',
          pointerEvents: 'auto',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          transition: 'width 0.2s, height 0.2s, max-width 0.2s'
        }}
      >
        {/* Notepad header - draggable */}
        <div 
          className="bg-[#181825] border-b border-[#313244] p-2 flex justify-between items-center cursor-grab"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center">
            <span className="mr-2 text-xl">📄</span>
            <span className="font-medium">{file.name} - Notepad</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 hover:bg-[#313244] rounded">−</button>
            <button 
              className="px-2 py-1 hover:bg-[#313244] rounded"
              onClick={() => {
                setIsMaximized(!isMaximized);
                if (isMaximized) {
                  // Restore previous position and size
                  document.body.style.overflow = 'auto';
                } else {
                  // Save current position and size before maximizing
                  document.body.style.overflow = 'hidden';
                  // Reset position when maximized
                  setPosition({ x: 0, y: 0 });
                }
              }}
            >
              {isMaximized ? '🔽' : '🔸'}
            </button>
            <button 
              className="px-2 py-1 hover:bg-[#f38ba8] hover:text-white rounded"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Notepad menu */}
        <div className="bg-[#181825] border-b border-[#313244] px-2 py-1 flex text-sm">
          <div className="mr-4 hover:bg-[#313244] px-2 rounded cursor-pointer">File</div>
          <div className="mr-4 hover:bg-[#313244] px-2 rounded cursor-pointer">Edit</div>
          <div className="mr-4 hover:bg-[#313244] px-2 rounded cursor-pointer">Format</div>
          <div className="mr-4 hover:bg-[#313244] px-2 rounded cursor-pointer">View</div>
          <div className="mr-4 hover:bg-[#313244] px-2 rounded cursor-pointer">Help</div>
        </div>
        
        {/* Notepad content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="font-mono whitespace-pre-wrap bg-[#1e1e2e] text-[#cdd6f4] p-4 h-full overflow-auto">
            {file.content}
            
            {/* Image Carousel */}
            {file.images && file.images.length > 0 && (
              <ImageCarousel images={file.images} />
            )}
            
            {/* Single Image (for backward compatibility) */}
            {!file.images && file.image && (
              <div className="mt-4 mb-4">
                <img 
                  src={file.image} 
                  alt={file.title} 
                  className="max-w-full h-auto rounded border border-[#313244]"
                />
              </div>
            )}
            
            {file.technologies && (
              <div className="mt-6 border-t border-[#313244] pt-4">
                <div className="font-bold text-[#cba6f7] mb-2">Technologies:</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {file.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-[#313244] text-[#cdd6f4] px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {file.link && (
              <div className="mt-2">
                <div className="font-bold text-[#cba6f7] mb-2">Project Link:</div>
                <a 
                  href={file.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#89b4fa] hover:underline"
                >
                  {file.link}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Notepad status bar */}
        <div className="bg-[#181825] border-t border-[#313244] px-4 py-1 text-xs text-gray-400 flex justify-between">
          <div>
            {file.size} | {file.modified || 'Unknown date'}
          </div>
          <div>
            Ln 1, Col 1
          </div>
        </div>
      </div>
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  const goToPrevious = (e) => {
    if (e) e.stopPropagation(); // Prevent triggering parent click events
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = (e) => {
    if (e) e.stopPropagation(); // Prevent triggering parent click events
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };
  
  if (!images || images.length === 0) return null;
  
  return (
    <>
      <div className="mt-4 mb-4 relative">
        <div 
          className="relative h-[400px] w-full overflow-hidden rounded border border-[#313244] cursor-pointer"
          onClick={toggleFullscreen}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {/* Fullscreen hint */}
          <div className="absolute top-2 right-2 bg-[#181825] text-white px-2 py-1 rounded text-xs opacity-70">
            Click to enlarge
          </div>
          
          {/* Left Arrow */}
          <div 
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#181825] text-white p-2 rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-10"
            onClick={(e) => goToPrevious(e)}
          >
            ◀
          </div>
          
          {/* Right Arrow */}
          <div 
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#181825] text-white p-2 rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-10"
            onClick={(e) => goToNext(e)}
          >
            ▶
          </div>
        </div>
        
        {/* Dots/Indicators */}
        <div className="flex justify-center mt-2">
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`mx-1 h-2 w-2 rounded-full cursor-pointer transition-colors ${currentIndex === slideIndex ? 'bg-[#cba6f7]' : 'bg-[#313244]'}`}
            ></div>
          ))}
        </div>
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-[#181825] text-white px-2 py-1 rounded text-xs opacity-70">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[10000] cursor-zoom-out"
          onClick={toggleFullscreen}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img 
              src={images[currentIndex]} 
              alt={`Fullscreen ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {/* Close button */}
            <button 
              className="absolute top-2 right-2 bg-[#181825] text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              onClick={toggleFullscreen}
            >
              ✕
            </button>
            
            {/* Left Arrow */}
            <div 
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#181825] text-white p-3 rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious(e);
              }}
            >
              ◀
            </div>
            
            {/* Right Arrow */}
            <div 
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#181825] text-white p-3 rounded-full cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                goToNext(e);
              }}
            >
              ▶
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#181825] text-white px-3 py-1 rounded text-sm opacity-70">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notepad;
