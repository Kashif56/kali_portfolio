import React, { useEffect, useState } from 'react';

const ImagePreloader = ({ images }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  
  useEffect(() => {
    if (!images || !images.length) return;
    
    // Set the total count of images to load
    setTotalCount(images.length);
    
    // Preload all images
    images.forEach((src) => {
      if (!src) return;
      
      const img = new Image();
      img.onload = () => {
        setLoadedCount(prev => prev + 1);
      };
      img.onerror = () => {
        // Count errors as loaded to avoid getting stuck
        setLoadedCount(prev => prev + 1);
      };
      img.src = src;
    });
  }, [images]);
  
  // Calculate loading progress percentage
  const progress = totalCount ? Math.round((loadedCount / totalCount) * 100) : 0;
  
  return (
    <div className="hidden">
      {/* Hidden div to preload images */}
      {progress < 100 && (
        <div className="fixed bottom-4 right-4 bg-[#1e1e2e] text-[#00ff00] p-2 rounded-md border border-[#313244] z-50 font-mono text-xs">
          Loading images: {progress}%
        </div>
      )}
    </div>
  );
};

export default ImagePreloader;
