import React, { useEffect, useState } from 'react';

const ImagePreloader = ({ images }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState({});
  
  useEffect(() => {
    if (!images || !images.length) return;
    
    // Set the total count of images to load
    setTotalCount(images.length);
    
    // Initialize loading status for each image
    const initialStatus = {};
    images.forEach((src, index) => {
      if (src) {
        initialStatus[index] = 'loading';
      }
    });
    setLoadingStatus(initialStatus);
    
    // Preload all images
    images.forEach((src, index) => {
      if (!src) return;
      
      const img = new Image();
      img.onload = () => {
        setLoadedCount(prev => prev + 1);
        setLoadingStatus(prev => ({
          ...prev,
          [index]: 'loaded'
        }));
      };
      img.onerror = () => {
        // Count errors as loaded to avoid getting stuck
        setLoadedCount(prev => prev + 1);
        setLoadingStatus(prev => ({
          ...prev,
          [index]: 'error'
        }));
        console.error(`Failed to load image: ${src}`);
      };
      img.src = src;
    });
  }, [images]);
  
  // Calculate loading progress percentage
  const progress = totalCount ? Math.round((loadedCount / totalCount) * 100) : 0;
  
  // Check if the last image (background) is loaded
  // We assume the background image is the last one in the array
  const isBackgroundLoaded = images && images.length > 0 && 
    loadingStatus[images.length - 1] === 'loaded';
  
  return (
    <div className="hidden">
      {/* Hidden div to preload images */}
      {progress < 100 && (
        <div className="fixed bottom-4 right-4 bg-[#1e1e2e] text-[#00ff00] p-2 rounded-md border border-[#313244] z-50 font-mono text-xs">
          Loading assets: {progress}%
          {!isBackgroundLoaded && images && images.length > 0 && 
            <div className="mt-1 text-yellow-400">
              Waiting for background...
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ImagePreloader;
