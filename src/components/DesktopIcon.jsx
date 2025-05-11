import React, { useState, useRef, useEffect } from 'react';
import ContextMenu from './ContextMenu';
import { FaFolder, FaBriefcase, FaUser, FaEnvelope } from 'react-icons/fa';

// Function to get the appropriate icon component based on icon ID
const getIconComponent = (iconId) => {
  switch(iconId) {
    case 'projects':
      return <FaFolder className="w-10 h-10 text-[#367bf0]" />;
    case 'experience':
      return <FaBriefcase className="w-10 h-10 text-[#9b59b6]" />;
    case 'about':
      return <FaUser className="w-10 h-10 text-[#2ecc71]" />;
    case 'contact':
      return <FaEnvelope className="w-10 h-10 text-[#e74c3c]" />;
    default:
      return <FaFolder className="w-10 h-10 text-[#367bf0]" />;
  }
};

const DesktopIcon = ({ icon, label, onClick, position = { x: 0, y: 0 }, bgColor = "#2c3e50", id, onPositionChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const iconRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const dragThreshold = 5; // Pixels of movement to consider it a drag

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (iconRef.current) {
      // Prevent default to avoid text selection
      e.preventDefault();
      
      const rect = iconRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      // Store the starting position to detect if a drag occurred
      startPosRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      hasDraggedRef.current = false; // Reset drag detection
      setIsDragging(true);
      setScale(0.95); // Scale down when clicked
      
      // Add a class to the body to prevent text selection during drag
      document.body.classList.add('no-select');
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      
      // Calculate distance moved to determine if this is a drag
      const dx = Math.abs(e.clientX - startPosRef.current.x);
      const dy = Math.abs(e.clientY - startPosRef.current.y);
      
      // If moved more than threshold, consider it a drag
      if (dx > dragThreshold || dy > dragThreshold) {
        hasDraggedRef.current = true;
      }
      
      // Calculate new position
      const newPos = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      };
      
      // Update position in parent component directly
      if (onPositionChange) {
        onPositionChange(id, newPos);
      }
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setScale(1); // Reset scale
    
    // Remove the no-select class from body
    document.body.classList.remove('no-select');
  };
  
  // Handle right click to show context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };
  
  // Close context menu
  const closeContextMenu = () => {
    setShowContextMenu(false);
  };
  
  // Define context menu items
  const contextMenuItems = [
    {
      label: 'Open',
      icon: '📂',
      onClick: () => onClick()
    },
    {
      separator: true
    },
    {
      label: 'Move to center',
      icon: '📍',
      onClick: () => {
        // Calculate center position (adjusted for icon size)
        const centerX = Math.max(0, (window.innerWidth / 2) - 40);
        const centerY = Math.max(0, (window.innerHeight / 2) - 40);
        onPositionChange(id, { x: centerX, y: centerY });
      }
    },
    {
      label: 'Reset position',
      icon: '🔄',
      onClick: () => {
        // This will trigger the reset for this specific icon
        // The actual reset logic is handled in the parent component
        onPositionChange(id, null, true);
      }
    },
    {
      separator: true
    },
    {
      label: 'Properties',
      icon: '⚙️',
      onClick: () => {
        console.log(`Properties for ${id}`);
        // Could open a properties dialog in the future
      }
    }
  ];

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
    <>
      <div
        ref={iconRef}
        className={`absolute flex flex-col items-center justify-center w-20 h-24 p-2 cursor-pointer group ${isDragging ? 'dragging' : 'draggable'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${scale})`,
          transition: isDragging ? 'none' : 'all 0.2s',
          userSelect: 'none',
          touchAction: 'none'
        }}
        onClick={(e) => {
          // Only trigger onClick if no significant dragging occurred
          if (!hasDraggedRef.current) {
            onClick(e);
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
      >
      <div 
        className="flex items-center justify-center w-12 h-12 mb-0.5 text-white group-hover:opacity-90"
      >
        {typeof icon === 'string' ? getIconComponent(id) : icon}
      </div>
      <span className="text-xs font-mono text-center text-white px-2 py-0.5 text-shadow">
        {label}
      </span>
      </div>
      
      {/* Context Menu */}
      {showContextMenu && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          onClose={closeContextMenu}
          menuItems={contextMenuItems}
          targetType="Icon"
          targetId={label}
        />
      )}
    </>
  );
};

export default DesktopIcon;
