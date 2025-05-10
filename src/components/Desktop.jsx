import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import Terminal from './Terminal';
import ContentRenderer from './ContentRenderer';
import TopBar from './TopBar';

// Custom icon components with colors
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    <path d="M5 9h14v10H5z" fill="white" fillOpacity="0.3" />
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    <path d="M5 7h14v12H5z" fill="white" fillOpacity="0.3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <circle cx="12" cy="7" r="3" fill="white" fillOpacity="0.3" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <path d="M5 8h14v10H5z" fill="white" fillOpacity="0.3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <path d="M5 9h14v10H5z" fill="white" fillOpacity="0.3" />
  </svg>
);

const Desktop = () => {
  // Replace single activeContent with array of open windows
  const [openWindows, setOpenWindows] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState({});
  
  // Window positions for dragging (including terminal)
  const [windowPositions, setWindowPositions] = useState({ terminal: { x: 100, y: 100 } });
  
  // Window sizes for resizing (including terminal)
  const [windowSizes, setWindowSizes] = useState({ 
    terminal: { width: 600, height: 400 },
    // Default sizes for content windows will be set when opened
  });
  
  // Window focus management (z-index ordering)
  const [focusOrder, setFocusOrder] = useState([]);
  
  // Window color mapping for unique top bar colors
  const [windowColors, setWindowColors] = useState({});
  
  // Predefined colors for window top bars (darker shades)
  const topBarColors = [
    '#1a4971', // Dark Blue
    '#5e3370', // Dark Purple
    '#1a6840', // Dark Green
    '#922b21', // Dark Red
    '#9a5f0b', // Dark Orange
    '#117864', // Dark Teal
    '#873600', // Dark Pumpkin
    '#512e5f', // Dark Wisteria
    '#0e6251', // Dark Green Sea
    '#7b241c', // Dark Pomegranate
  ];
  
  // References for drag and resize handling
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0 });
  const resizeStartPositionRef = useRef({ x: 0, y: 0 });
  const resizeStartMouseRef = useRef({ x: 0, y: 0 });
  const resizeTypeRef = useRef(null); // 'se', 'sw', 'ne', 'nw', 'n', 's', 'e', 'w'
  
  // Set up event listeners for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Handle window dragging
      if (dragRef.current) {
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
      }
      
      // Handle window resizing
      if (resizeRef.current && resizeTypeRef.current) {
        const windowId = resizeRef.current;
        const resizeType = resizeTypeRef.current;
        const startSize = resizeStartRef.current;
        const startPosition = resizeStartPositionRef.current;
        
        // Calculate mouse movement deltas
        const deltaX = e.clientX - resizeStartMouseRef.current.x;
        const deltaY = e.clientY - resizeStartMouseRef.current.y;
        
        // Initialize new dimensions and position
        let newWidth = startSize.width;
        let newHeight = startSize.height;
        let newX = startPosition.x;
        let newY = startPosition.y;
        
        // Apply resize based on handle type
        switch (resizeType) {
          case 'se': // bottom-right
            newWidth = Math.max(200, startSize.width + deltaX);
            newHeight = Math.max(200, startSize.height + deltaY);
            break;
            
          case 'sw': // bottom-left
            newWidth = Math.max(200, startSize.width - deltaX);
            newX = startPosition.x + startSize.width - newWidth;
            newHeight = Math.max(200, startSize.height + deltaY);
            break;
            
          case 'ne': // top-right
            newWidth = Math.max(200, startSize.width + deltaX);
            newHeight = Math.max(200, startSize.height - deltaY);
            newY = startPosition.y + startSize.height - newHeight;
            break;
            
          case 'nw': // top-left
            newWidth = Math.max(200, startSize.width - deltaX);
            newHeight = Math.max(200, startSize.height - deltaY);
            newX = startPosition.x + startSize.width - newWidth;
            newY = startPosition.y + startSize.height - newHeight;
            break;
            
          case 'n': // top
            newHeight = Math.max(200, startSize.height - deltaY);
            newY = startPosition.y + startSize.height - newHeight;
            break;
            
          case 's': // bottom
            newHeight = Math.max(200, startSize.height + deltaY);
            break;
            
          case 'e': // right
            newWidth = Math.max(200, startSize.width + deltaX);
            break;
            
          case 'w': // left
            newWidth = Math.max(200, startSize.width - deltaX);
            newX = startPosition.x + startSize.width - newWidth;
            break;
            
          default:
            break;
        }
        
        // Update window size
        setWindowSizes(prev => ({
          ...prev,
          [windowId]: { width: newWidth, height: newHeight }
        }));
        
        // Update position if needed (for resizing from left or top)
        if (newX !== position.x || newY !== position.y) {
          setWindowPositions(prev => ({
            ...prev,
            [windowId]: { x: newX, y: newY }
          }));
        }
      }
    };
    
    const handleMouseUp = () => {
      dragRef.current = null;
      resizeRef.current = null;
      resizeTypeRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
    
    if (dragRef.current || resizeRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [dragRef.current, resizeRef.current, windowPositions]);
  
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
    
    // Get window position
    const position = windowPositions[windowId] || { x: 0, y: 0 };
    
    // Set drag offset
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    
    // Set active drag reference
    dragRef.current = windowId;
    document.body.style.cursor = 'grabbing';
  };
  
  // Start resizing a window
  const handleStartResize = (e, windowId, resizeType) => {
    // Prevent default behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Bring window to front
    bringToFront(windowId);
    
    // Get current window size and position
    const size = windowSizes[windowId] || { width: 600, height: 400 };
    const position = windowPositions[windowId] || { x: 0, y: 0 };
    
    // Store initial values
    resizeStartRef.current = {
      width: size.width,
      height: size.height
    };
    
    resizeStartPositionRef.current = {
      x: position.x,
      y: position.y
    };
    
    // Store initial mouse position
    resizeStartMouseRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    
    // Set active resize references
    resizeRef.current = windowId;
    resizeTypeRef.current = resizeType;
    
    // Set cursor based on resize type
    switch (resizeType) {
      case 'se': case 'nw':
        document.body.style.cursor = 'nwse-resize';
        break;
      case 'sw': case 'ne':
        document.body.style.cursor = 'nesw-resize';
        break;
      case 'n': case 's':
        document.body.style.cursor = 'ns-resize';
        break;
      case 'e': case 'w':
        document.body.style.cursor = 'ew-resize';
        break;
      default:
        document.body.style.cursor = 'default';
    }
  };

  // Calculate window position and size
  const centerWindow = () => {
    // Base size is 80% of screen
    const baseWidth = window.innerWidth * 0.8;
    const baseHeight = window.innerHeight * 0.8;
    
    // Calculate size reduction factor based on number of open windows
    // Each new window will be 5% smaller than the previous one
    const sizeReductionFactor = Math.max(0.7, 1 - (openWindows.length * 0.05));
    
    // Apply size reduction
    const windowWidth = baseWidth * sizeReductionFactor;
    const windowHeight = baseHeight * sizeReductionFactor;
    
    // Calculate center position
    const centerX = (window.innerWidth - windowWidth) / 2;
    const centerY = (window.innerHeight - windowHeight) / 2;
    
    // Add a slight offset based on the number of open windows
    const offsetX = openWindows.length * 20;
    const offsetY = openWindows.length * 20;
    
    return {
      position: { x: centerX + offsetX, y: centerY + offsetY },
      size: { width: windowWidth, height: windowHeight }
    };
  };

  // Handle icon click
  const handleIconClick = (content) => {
    // If terminal icon
    if (content === 'terminal') {
      // If terminal is already open, toggle minimize state
      if (showTerminal) {
        setTerminalMinimized(!terminalMinimized);
      } else {
        // Show terminal
        setShowTerminal(true);
        setTerminalMinimized(false);
        
        // Center the terminal window
        const { position, size } = centerWindow();
        setWindowPositions(prev => ({
          ...prev,
          terminal: position
        }));
        setWindowSizes(prev => ({
          ...prev,
          terminal: size
        }));
      }
      
      // Bring terminal to front
      bringToFront('terminal');
    } 
    // If content window
    else {
      // Check if window is already open
      if (openWindows.includes(content)) {
        // If minimized, restore it
        if (minimizedWindows[content]) {
          setMinimizedWindows(prev => ({
            ...prev,
            [content]: false
          }));
        }
        
        // Bring to front
        bringToFront(content);
      } else {
        // Open new window
        setOpenWindows(prev => [...prev, content]);
        
        // Center the window
        const { position, size } = centerWindow();
        setWindowPositions(prev => ({
          ...prev,
          [content]: position
        }));
        
        // Set window size to 80% of screen
        setWindowSizes(prev => ({
          ...prev,
          [content]: size
        }));
        
        // Assign a unique color to the window
        const colorIndex = openWindows.length % topBarColors.length;
        setWindowColors(prev => ({
          ...prev,
          [content]: topBarColors[colorIndex]
        }));
        
        // Add to focus order
        setFocusOrder(prev => [...prev, content]);
      }
    }
  };

  // Handle command execution from terminal
  const handleCommandExecute = (command) => {
    // Check if window is already open
    if (!openWindows.includes(command)) {
      // Add window to open windows list
      setOpenWindows(prev => [...prev, command]);
      
      // Add to focus order (bring to front)
      setFocusOrder(prev => [...prev, command]);
      
      // Get window position and size with automatic scaling
      const { position, size } = centerWindow();
      
      // Set position and size
      setWindowPositions(prev => ({
        ...prev,
        [command]: position
      }));
      
      // Set size
      setWindowSizes(prev => ({
        ...prev,
        [command]: size
      }));
      
      // Assign a unique color to the window
      const colorIndex = openWindows.length % topBarColors.length;
      setWindowColors(prev => ({
        ...prev,
        [command]: topBarColors[colorIndex]
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
      [content]: true
    }));
  };

  // Handle restore window from minimized state
  const handleRestoreWindow = (content) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [content]: false
    }));
    bringToFront(content);
  };

  // Desktop icons configuration
  const desktopIcons = [
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: <FolderIcon />, 
      position: { x: 20, y: 20 },
      bgColor: '#3498db' // Blue
    },
    { 
      id: 'experience', 
      label: 'Experience', 
      icon: <BriefcaseIcon />, 
      position: { x: 20, y: 120 },
      bgColor: '#9b59b6' // Purple
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: <UserIcon />, 
      position: { x: 20, y: 220 },
      bgColor: '#2ecc71' // Green
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: <EnvelopeIcon />, 
      position: { x: 20, y: 320 },
      bgColor: '#e74c3c' // Red
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-kali-wallpaper">
      {/* Top Bar */}
      <TopBar onTerminalClick={() => handleIconClick('terminal')} />
      {/* Desktop Icons - positioned with absolute positioning instead of grid */}
      {desktopIcons.map((icon, index) => {
        // Calculate position with offset to avoid the top bar
        const position = {
          x: icon.position.x,
          y: icon.position.y + 50 // Add extra space to avoid the top bar
        };
        
        return (
          <DesktopIcon 
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={position}
            bgColor={icon.bgColor}
            onClick={() => handleIconClick(icon.id)}
          />
        );
      })}
      
      {/* Minimized Windows Stack */}
      <div className="fixed bottom-0 right-0 flex flex-col-reverse items-end space-y-reverse space-y-1 p-2 z-50">
        {/* Minimized Terminal */}
        {showTerminal && terminalMinimized && (
          <div 
            className="w-64 h-10 bg-[#1e1e2e] border border-[#30363d] rounded-t-md shadow-lg flex items-center cursor-pointer hover:bg-[#2d2d3a] transition-colors"
            onClick={() => {
              setTerminalMinimized(false);
              bringToFront('terminal');
            }}
          >
            <div className="flex space-x-2 mx-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-sm font-mono text-[#00ff00]">
              Terminal
            </div>
          </div>
        )}
        
        {/* Minimized Content Windows */}
        {Object.entries(minimizedWindows)
          .filter(([content, isMinimized]) => isMinimized && openWindows.includes(content))
          .map(([content]) => (
            <div 
              key={`minimized-${content}`}
              className="w-64 h-10 bg-[#1e1e2e] border border-[#30363d] rounded-t-md shadow-lg flex items-center cursor-pointer hover:bg-[#2d2d3a] transition-colors"
              onClick={() => handleRestoreWindow(content)}
            >
              <div className="flex space-x-2 mx-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-sm font-mono text-[#00ff00]">
                {content.charAt(0).toUpperCase() + content.slice(1)}
              </div>
            </div>
          ))
        }
      </div>

      {/* Terminal Window */}
      {showTerminal && !terminalMinimized && (
        <div 
          className="absolute rounded-md overflow-hidden shadow-2xl"
          style={{
            top: `${windowPositions.terminal?.y || (window.innerHeight * 0.1)}px`,
            left: `${windowPositions.terminal?.x || (window.innerWidth * 0.1)}px`,
            width: `${windowSizes.terminal?.width || (window.innerWidth * 0.8)}px`,
            height: `${windowSizes.terminal?.height || (window.innerHeight * 0.8)}px`,
            zIndex: focusOrder.indexOf('terminal') + 100
          }}
          onClick={() => bringToFront('terminal')}
        >
          <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-md overflow-hidden shadow-2xl border border-[#30363d] relative">
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
            
            {/* Resize handles (only visible when not minimized) */}
            {!terminalMinimized && (
              <>
                {/* Corner resize handles */}
                <div 
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'se')}
                />
                <div 
                  className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'sw')}
                />
                <div 
                  className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'ne')}
                />
                <div 
                  className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'nw')}
                />
                
                {/* Edge resize handles */}
                <div 
                  className="absolute top-0 left-4 right-4 h-1 cursor-ns-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'n')}
                />
                <div 
                  className="absolute bottom-0 left-4 right-4 h-1 cursor-ns-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 's')}
                />
                <div 
                  className="absolute left-0 top-4 bottom-4 w-1 cursor-ew-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'w')}
                />
                <div 
                  className="absolute right-0 top-4 bottom-4 w-1 cursor-ew-resize z-10"
                  onMouseDown={(e) => handleStartResize(e, 'terminal', 'e')}
                />
              </>
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
        
        // Skip rendering here if minimized - will be rendered in the minimized stack
        if (isMinimized) return null;
        
        return (
          <div 
            key={windowContent}
            className="absolute rounded-md overflow-hidden shadow-2xl"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
              width: `${windowSizes[windowContent]?.width || (window.innerWidth * 0.8)}px`,
              height: `${windowSizes[windowContent]?.height || (window.innerHeight * 0.8)}px`,
              zIndex: zIndex
            }}
            onClick={() => bringToFront(windowContent)}
          >
            <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-md overflow-hidden shadow-2xl border border-[#30363d] relative">
              {/* Content header with controls */}
              {/* Window title bar */}
              <div 
                className="flex items-center h-8 border-b border-[#30363d] px-2 cursor-move" 
                style={{ backgroundColor: windowColors[windowContent] || '#1e1e2e' }}
                onMouseDown={(e) => handleStartDrag(e, windowContent)}
              >
                {/* Window controls */}
                <div className="flex space-x-2">
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
                <div className="flex-1 text-center text-sm font-mono text-white font-bold">
                  {windowContent.charAt(0).toUpperCase() + windowContent.slice(1)}
                </div>
              </div>
              
              {/* Content body */}
              {!isMinimized && (
                <div className="flex-1 p-8 overflow-y-auto">
                  <ContentRenderer activeContent={windowContent} />
                </div>
              )}
              
              {/* Resize handles (only visible when not minimized) */}
              {!isMinimized && (
                <>
                  {/* Corner resize handles */}
                  <div 
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'se')}
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'sw')}
                  />
                  <div 
                    className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'ne')}
                  />
                  <div 
                    className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'nw')}
                  />
                  
                  {/* Edge resize handles */}
                  <div 
                    className="absolute top-0 left-4 right-4 h-1 cursor-ns-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'n')}
                  />
                  <div 
                    className="absolute bottom-0 left-4 right-4 h-1 cursor-ns-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 's')}
                  />
                  <div 
                    className="absolute left-0 top-4 bottom-4 w-1 cursor-ew-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'w')}
                  />
                  <div 
                    className="absolute right-0 top-4 bottom-4 w-1 cursor-ew-resize z-10"
                    onMouseDown={(e) => handleStartResize(e, windowContent, 'e')}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Desktop;