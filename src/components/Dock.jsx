import React from 'react';

const Dock = ({ 
  openWindows, 
  showTerminal, 
  activeWindow, 
  onItemClick, 
  onTerminalClick,
  minimizedWindows
}) => {
  // Default dock items (always present)
  const defaultItems = [
    { id: 'terminal', label: 'Terminal', icon: 'terminal' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'about', label: 'About', icon: 'user' },
    { id: 'contact', label: 'Contact', icon: 'envelope' }
  ];

  // Get icon component based on type
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'terminal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'folder':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'envelope':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  // Handle item click
  const handleItemClick = (id) => {
    if (id === 'terminal') {
      onTerminalClick();
    } else {
      onItemClick(id);
    }
  };

  // Check if an item is active
  const isItemActive = (id) => {
    if (id === 'terminal') {
      return showTerminal && !minimizedWindows['terminal'];
    } else {
      return openWindows.includes(id) && !minimizedWindows[id];
    }
  };

  // Check if an item is open but minimized
  const isItemMinimized = (id) => {
    if (id === 'terminal') {
      return showTerminal && minimizedWindows['terminal'];
    } else {
      return openWindows.includes(id) && minimizedWindows[id];
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 kali-dock flex justify-center items-center">
      <div className="flex space-x-2 py-1">
        {defaultItems.map((item) => (
          <div
            key={item.id}
            className={`kali-dock-item relative p-2 text-white cursor-pointer ${isItemActive(item.id) ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
            title={item.label}
          >
            {getIcon(item.icon)}
            
            {/* Activity indicator */}
            {(isItemActive(item.id) || isItemMinimized(item.id)) && (
              <div className="kali-dock-item-indicator"></div>
            )}
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;
