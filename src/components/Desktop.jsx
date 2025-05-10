import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import Terminal from './Terminal';
import ContentRenderer from './ContentRenderer';

// Custom icon components
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Desktop = () => {
  // Replace single activeContent with array of open windows
  const [openWindows, setOpenWindows] = useState([]);
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState({});
  
  // Window positions for dragging (including terminal)
  const [windowPositions, setWindowPositions] = useState({ terminal: { x: 100, y: 100 } });
  
  // Window focus management (z-index ordering)
  const [focusOrder, setFocusOrder] = useState(['terminal']);
  
  // References for drag handling
  const dragRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  
  // Set up event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragRef.current) return;
      
      // Calculate new position
      const newPosition = {
        x: e.clientX - dragOffsetRef.current.x,
        y: e.clientY - dragOffsetRef.current.y
      };
      
      // Update position
      setWindowPositions(prev => ({
        ...prev,
        [dragRef.current]: newPosition
      }));
    };
    
    const handleMouseUp = () => {
      dragRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    if (dragRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragRef.current]);
  
  // Handle window focus
  const bringToFront = (windowId) => {
    setFocusOrder(prev => {
      // Remove the window from the current order
      const newOrder = prev.filter(id => id !== windowId);
      // Add it to the end (highest z-index)
      return [...newOrder, windowId];
    });
  };

  // Start dragging a window
  const handleStartDrag = (e, windowId) => {
    // Prevent default behavior
    e.preventDefault();
    
    // Bring window to front
    bringToFront(windowId);
    
    // Calculate offset between mouse position and window position
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    // Set dragging state
    dragRef.current = windowId;
  };
  
  // Handle icon click
  const handleIconClick = (content) => {
    if (content === 'terminal') {
      setShowTerminal(true);
      setTerminalMinimized(false);
      bringToFront('terminal');
    } else {
      // Check if window is already open
      if (!openWindows.includes(content)) {
        setOpenWindows(prev => [...prev, content]);
        // Add to focus order (bring to front)
        setFocusOrder(prev => [...prev, content]);
        // Set initial position with slight offset based on number of windows
        const offset = openWindows.length * 20;
        setWindowPositions(prev => ({
          ...prev,
          [content]: { x: 50 + offset, y: 50 + offset }
        }));
      } else {
        // If already open, just bring to front
        bringToFront(content);
      }
      // Ensure it's not minimized
      setMinimizedWindows(prev => ({
        ...prev,
        [content]: false
      }));
    }
  };

  // Handle command execution from terminal
  const handleCommandExecute = (command) => {
    // Check if window is already open
    if (!openWindows.includes(command)) {
      setOpenWindows(prev => [...prev, command]);
      // Add to focus order (bring to front)
      setFocusOrder(prev => [...prev, command]);
      // Set initial position with slight offset based on number of windows
      const offset = openWindows.length * 20;
      setWindowPositions(prev => ({
        ...prev,
        [command]: { x: 50 + offset, y: 50 + offset }
      }));
    } else {
      // If already open, just bring to front
      bringToFront(command);
    }
    // Ensure it's not minimized
    setMinimizedWindows(prev => ({
      ...prev,
      [command]: false
    }));
  };
  
  // Handle close window
  const handleCloseWindow = (content) => {
    setOpenWindows(prev => prev.filter(window => window !== content));
    
    // Remove from focus order
    setFocusOrder(prev => prev.filter(id => id !== content));
  };
  
  // Handle minimize window
  const handleMinimizeWindow = (content) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [content]: !prev[content]
    }));
  };

  // Desktop icons configuration
  const desktopIcons = [
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: <FolderIcon />, 
      position: { x: 20, y: 20 } 
    },
    { 
      id: 'experience', 
      label: 'Experience', 
      icon: <BriefcaseIcon />, 
      position: { x: 20, y: 120 } 
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: <UserIcon />, 
      position: { x: 20, y: 220 } 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: <EnvelopeIcon />, 
      position: { x: 20, y: 320 } 
    },
    { 
      id: 'terminal', 
      label: 'Terminal', 
      icon: <TerminalIcon />, 
      position: { x: 20, y: 420 } 
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 bg-kali-wallpaper bg-cover bg-center">
      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          position={icon.position}
          onClick={() => handleIconClick(icon.id)}
        />
      ))}

      {/* Terminal Window */}
      {showTerminal && (
        <div 
          className={`absolute ${dragRef.current === 'terminal' ? 'cursor-grabbing' : 'cursor-grab'} ${
            terminalMinimized 
              ? 'w-64 h-10 bottom-0 left-0' 
              : 'rounded-md overflow-hidden shadow-2xl'
          }`}
          style={{
            top: terminalMinimized ? 'auto' : `${windowPositions.terminal?.y || 100}px`,
            left: terminalMinimized ? '0' : `${windowPositions.terminal?.x || 100}px`,
            width: terminalMinimized ? '16rem' : '80%',
            height: terminalMinimized ? '2.5rem' : '80%',
            maxWidth: '1200px',
            maxHeight: '800px',
            zIndex: focusOrder.indexOf('terminal') + 100
          }}
          onClick={() => bringToFront('terminal')}
        >
          <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-md overflow-hidden shadow-2xl border border-[#30363d]">
            {/* Terminal header with controls */}
            <div 
              className="flex items-center px-4 py-2 bg-[#0d1117] border-b border-[#30363d] cursor-move"
              onMouseDown={(e) => handleStartDrag(e, 'terminal')}
            >
              <div className="flex space-x-3">
                <div 
                  className="w-5 h-5 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 flex items-center justify-center group relative"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    setShowTerminal(false);
                  }}
                >
                  <span className="text-black font-bold text-xs">×</span>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Close Terminal</span>
                </div>
                <div 
                  className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 flex items-center justify-center group relative"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    setTerminalMinimized(!terminalMinimized);
                  }}
                >
                  <span className="text-black font-bold text-xs">_</span>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Minimize Terminal</span>
                </div>
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-sm font-mono text-[#00ff00]">
                Terminal - root@kali
              </div>
            </div>
            
            {/* Terminal body */}
            {!terminalMinimized && (
              <div className="flex-1">
                <Terminal onCommandExecute={handleCommandExecute} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Windows - Multiple windows can be open */}
      {openWindows.map((windowContent) => {
        const isMinimized = minimizedWindows[windowContent];
        // Get position from state or use default
        const position = windowPositions[windowContent] || { x: 50, y: 50 };
        // Calculate z-index based on focus order
        const zIndex = focusOrder.indexOf(windowContent) + 100;
        
        return (
          <div 
            key={windowContent}
            className={`absolute ${dragRef.current === windowContent ? 'cursor-grabbing' : 'cursor-grab'} ${
              isMinimized 
                ? 'w-64 h-10 bottom-0 right-0' 
                : 'rounded-md overflow-hidden shadow-2xl'
            }`}
            style={{
              top: isMinimized ? 'auto' : `${position.y}px`,
              left: isMinimized ? 'auto' : `${position.x}px`,
              width: isMinimized ? '16rem' : '80%',
              height: isMinimized ? '2.5rem' : '80%',
              maxWidth: '1200px',
              maxHeight: '800px',
              zIndex: zIndex
            }}
            onClick={() => bringToFront(windowContent)}
          >
            <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-md overflow-hidden shadow-2xl border border-[#30363d]">
              {/* Content header with controls */}
              <div 
                className="flex items-center px-4 py-2 bg-[#0d1117] border-b border-[#30363d] cursor-move"
                onMouseDown={(e) => handleStartDrag(e, windowContent)}
              >
                <div className="flex space-x-3">
                  {/* Close button with X symbol always visible */}
                  <div 
                    className="w-5 h-5 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 flex items-center justify-center group relative"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dragging when clicking button
                      handleCloseWindow(windowContent);
                    }}
                  >
                    <span className="text-black font-bold text-xs">×</span>
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Close Window</span>
                  </div>
                  {/* Minimize button with _ symbol always visible */}
                  <div 
                    className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 flex items-center justify-center group relative"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dragging when clicking button
                      handleMinimizeWindow(windowContent);
                    }}
                  >
                    <span className="text-black font-bold text-xs">_</span>
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Minimize Window</span>
                  </div>
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-sm font-mono text-[#00ff00]">
                  {windowContent.charAt(0).toUpperCase() + windowContent.slice(1)}
                </div>
              </div>
              
              {/* Content body */}
              {!isMinimized && (
                <div className="flex-1 p-8 overflow-y-auto">
                  <ContentRenderer activeContent={windowContent} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Desktop;