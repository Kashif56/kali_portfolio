import React, { useEffect, useRef } from 'react';
import { FaTerminal, FaFolder, FaSync, FaCog, FaDesktop, FaWindowMaximize, FaWindowRestore, FaWindowMinimize, FaTimes, FaExpand, FaCompress, FaCrosshairs, FaClone, FaEye, FaEdit, FaCut, FaCopy, FaPaste, FaTrash, FaLock, FaShieldAlt } from 'react-icons/fa';

// Map icon names to actual icon components
const getIconComponent = (iconName) => {
  switch(iconName) {
    case 'terminal': return <FaTerminal className="text-kali-green" />;
    case 'folder': return <FaFolder className="text-yellow-400" />;
    case 'reset': return <FaSync className="text-blue-400" />;
    case 'settings': return <FaCog className="text-gray-300" />;
    case 'desktop': return <FaDesktop className="text-gray-300" />;
    case 'maximize': return <FaWindowMaximize className="text-gray-300" />;
    case 'restore': return <FaWindowRestore className="text-gray-300" />;
    case 'minimize': return <FaWindowMinimize className="text-gray-300" />;
    case 'close': return <FaTimes className="text-red-500" />;
    case 'expand': return <FaExpand className="text-gray-300" />;
    case 'compress': return <FaCompress className="text-gray-300" />;
    case 'center': return <FaCrosshairs className="text-blue-400" />;
    case 'clone': return <FaClone className="text-purple-400" />;
    case 'view': return <FaEye className="text-gray-300" />;
    case 'edit': return <FaEdit className="text-yellow-400" />;
    case 'cut': return <FaCut className="text-red-400" />;
    case 'copy': return <FaCopy className="text-blue-400" />;
    case 'paste': return <FaPaste className="text-green-400" />;
    case 'delete': return <FaTrash className="text-red-500" />;
    case 'lock': return <FaLock className="text-yellow-500" />;
    case 'security': return <FaShieldAlt className="text-green-500" />;
    default: return null;
  }
};

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
      className="fixed z-50 bg-[#2b2b2b] border border-[#444] rounded shadow-lg py-1 min-w-[200px]"
      style={adjustedPosition()}
    >
      {/* Menu header showing target type and id */}
      <div className="px-3 py-1.5 text-xs font-mono text-gray-300 border-b border-[#444] mb-1 bg-[#222] flex items-center">
        <span className="text-kali-green mr-1">@</span>
        <span>{targetType}:</span>
        <span className="ml-1 text-blue-400">{targetId}</span>
      </div>
      
      {/* Menu items */}
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.separator ? (
            <div className="border-t border-[#444] my-1 mx-2"></div>
          ) : (
            <div 
              className={`px-3 py-1.5 flex items-center hover:bg-[#367bf0] hover:text-white cursor-pointer ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  onClose();
                }
              }}
            >
              <div className="w-5 mr-3 flex justify-center">
                {item.iconName ? (
                  getIconComponent(item.iconName)
                ) : item.icon ? (
                  <span className="text-kali-green">{item.icon}</span>
                ) : null}
              </div>
              <span className="text-sm text-gray-200 font-mono">{item.label}</span>
              {item.shortcut && (
                <span className="ml-auto text-xs text-gray-400 font-mono">{item.shortcut}</span>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;
