import React, { useState, useRef, useEffect } from 'react';

const DesktopIcon = ({ icon, label, onClick, position = { x: 0, y: 0 } }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(position);
  const [scale, setScale] = useState(1);
  const iconRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setIsDragging(true);
      setScale(0.95); // Scale down when clicked
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setScale(1); // Reset scale
  };

  // Add and remove event listeners
  useEffect(() => {
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
  }, [isDragging]);

  // Handle hover effect
  const handleMouseEnter = () => {
    if (!isDragging) setScale(1.05);
  };

  const handleMouseLeave = () => {
    if (!isDragging) setScale(1);
  };

  return (
    <div
      ref={iconRef}
      className={`absolute flex flex-col items-center justify-center w-20 h-24 p-2 cursor-pointer group ${isDragging ? 'dragging' : 'draggable'}`}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `scale(${scale})`,
        transition: isDragging ? 'none' : 'transform 0.2s'
      }}
      onClick={!isDragging ? onClick : undefined}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-2 text-white bg-gray-800 rounded-md group-hover:bg-blue-600">
        {icon}
      </div>
      <span className="text-xs font-mono text-center text-white bg-black bg-opacity-50 rounded px-1 py-0.5">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
