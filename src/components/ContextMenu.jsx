import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ x, y, onClose, menuItems, targetType, targetId }) => {
  const menuRef = useRef(null);

  // Close the context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to keep menu within viewport
  const adjustedPosition = () => {
    if (!menuRef.current) return { top: y, left: x };
    
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let adjustedX = x;
    let adjustedY = y;
    
    // Adjust X if menu would go off right edge
    if (x + menuRect.width > viewportWidth) {
      adjustedX = viewportWidth - menuRect.width - 5;
    }
    
    // Adjust Y if menu would go off bottom edge
    if (y + menuRect.height > viewportHeight) {
      adjustedY = viewportHeight - menuRect.height - 5;
    }
    
    return { top: adjustedY, left: adjustedX };
  };

  return (
    <div 
      ref={menuRef}
      className="fixed z-50 bg-[#1a1a1a] border border-[#444] rounded shadow-lg py-1 min-w-[180px]"
      style={adjustedPosition()}
    >
      {/* Menu header showing target type and id */}
      <div className="px-3 py-1 text-xs text-gray-400 border-b border-[#444] mb-1">
        {targetType}: {targetId}
      </div>
      
      {/* Menu items */}
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.separator ? (
            <div className="border-t border-[#444] my-1"></div>
          ) : (
            <div 
              className={`px-3 py-1.5 flex items-center hover:bg-[#333] cursor-pointer ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  onClose();
                }
              }}
            >
              {item.icon && (
                <span className="mr-2 text-kali-green">{item.icon}</span>
              )}
              <span className="text-sm text-white">{item.label}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;
