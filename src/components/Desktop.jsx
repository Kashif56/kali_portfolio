import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import Terminal from './Terminal';
import ContentRenderer from './ContentRenderer';
import TopBar from './TopBar';
import ContextMenu from './ContextMenu';
import Dock from './Dock';
import { FaWindowMinimize, FaWindowMaximize, FaWindowRestore, FaTimes } from 'react-icons/fa';

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
  
  // Context menu state
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [contextMenuTarget, setContextMenuTarget] = useState({ type: '', id: '' });
  
  // State for mouse position (for window interactions)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Window positions for dragging (including terminal)
  const [windowPositions, setWindowPositions] = useState({ terminal: { x: 100, y: 100 } });
  
  // Window sizes for resizing (including terminal)
  const [windowSizes, setWindowSizes] = useState({ 
    terminal: { width: 600, height: 400 },
    // Default sizes for content windows will be set when opened
  });
  
  // Track maximized windows
  const [maximizedWindows, setMaximizedWindows] = useState({});
  
  // Window focus management (z-index ordering)
  const [focusOrder, setFocusOrder] = useState([]);
  
  // Track active window for styling purposes
  const [activeWindow, setActiveWindow] = useState(null);
  
  // Track window snapping state
  const [snappedWindows, setSnappedWindows] = useState({});

  
  // References for drag and resize handling
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0 });
  const resizeStartPositionRef = useRef({ x: 0, y: 0 });
  const resizeStartMouseRef = useRef({ x: 0, y: 0 });
  const resizeTypeRef = useRef(null); // 'se', 'sw', 'ne', 'nw', 'n', 's', 'e', 'w'
  
  // Mouse movement handler for window dragging and resizing
  const handleMouseMove = (e) => {
    // Update mouse position for hover effects
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Handle window dragging
    if (dragRef.current) {
      const deltaX = e.clientX - dragOffsetRef.current.x;
      const deltaY = e.clientY - dragOffsetRef.current.y;
      
      // Check for window snapping during drag
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const snapThreshold = 20; // pixels from edge to trigger snap
      let snapPosition = null;
      
      // Detect proximity to screen edges for snapping
      if (e.clientX < snapThreshold) {
        // Left edge snap
        if (e.clientY < snapThreshold) {
          snapPosition = 'top-left';
        } else if (e.clientY > viewportHeight - snapThreshold) {
          snapPosition = 'bottom-left';
        } else {
          snapPosition = 'left';
        }
      } else if (e.clientX > viewportWidth - snapThreshold) {
        // Right edge snap
        if (e.clientY < snapThreshold) {
          snapPosition = 'top-right';
        } else if (e.clientY > viewportHeight - snapThreshold) {
          snapPosition = 'bottom-right';
        } else {
          snapPosition = 'right';
        }
      } else if (e.clientY < snapThreshold) {
        // Top edge snap
        snapPosition = 'top';
      } else if (e.clientY > viewportHeight - snapThreshold) {
        // Bottom edge snap
        snapPosition = 'bottom';
      }
      
      if (snapPosition) {
        // Visual indicator for snap zones (could be implemented with a highlight effect)
        // For now, we'll just apply the snap when mouse is released
        // We'll store the snap position for use in mouseUp handler
        dragRef.current = { windowId: dragRef.current, snapPosition };
      }
      
      // Update window position
      setWindowPositions(prev => ({
        ...prev,
        [dragRef.current.windowId || dragRef.current]: { 
          x: deltaX, 
          y: deltaY 
        }
      }));
    }// Handle window resizing
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
      if (newX !== startPosition.x || newY !== startPosition.y) {
        setWindowPositions(prev => ({
          ...prev,
          [windowId]: { x: newX, y: newY }
        }));
      }
    }
  };
  
  // Handle mouse up event
  const handleMouseUp = () => {
    // Apply window snap if applicable
    if (dragRef.current && dragRef.current.snapPosition) {
      handleWindowSnap(dragRef.current.windowId, dragRef.current.snapPosition);
    }
    
    // Clear drag reference
    dragRef.current = null;
    
    // Clear resize reference
    resizeRef.current = null;
    
    // Reset cursor style
    document.body.style.cursor = 'default';
  };
  
  // Set up event listeners for dragging and resizing
  useEffect(() => {
    if (dragRef.current || resizeRef.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
      };
    }
  }, [dragRef.current, resizeRef.current]);
  
  // Handle window focus
  const bringToFront = (windowId) => {
    // Set as active window for styling
    setActiveWindow(windowId);
    
    // Update focus order for z-index
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
        
        // Set as active window
        setActiveWindow(content);
        
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
      
      // Set as active window
      setActiveWindow(command);
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
  
  // Handle close window with animation
  const handleCloseWindow = (content) => {
    // Get the window element
    const windowElement = document.querySelector(`[data-window-id="${content}"]`);
    
    if (windowElement) {
      // Add close animation class
      windowElement.classList.add('window-close');
      
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setOpenWindows(prev => prev.filter(window => window !== content));
        // Remove from focus order
        setFocusOrder(prev => prev.filter(id => id !== content));
      }, 200); // Match animation duration
    } else {
      // Fallback if element not found
      setOpenWindows(prev => prev.filter(window => window !== content));
      // Remove from focus order
      setFocusOrder(prev => prev.filter(id => id !== content));
    }
  };
  
  // Handle minimize window with animation
  const handleMinimizeWindow = (content) => {
    // Get the window element
    const windowElement = document.querySelector(`[data-window-id="${content}"]`);
    
    if (windowElement) {
      // Add minimize animation class
      windowElement.classList.add('window-minimize');
      
      // Wait for animation to complete before actually minimizing
      setTimeout(() => {
        setMinimizedWindows(prev => ({
          ...prev,
          [content]: true
        }));
      }, 200); // Match animation duration
    } else {
      // Fallback if element not found
      setMinimizedWindows(prev => ({
        ...prev,
        [content]: true
      }));
    }
  };

  // Handle restore window from minimized state with animation
  const handleRestoreWindow = (content) => {
    // First update the state to show the window
    setMinimizedWindows(prev => ({
      ...prev,
      [content]: false
    }));
    
    // Bring window to front
    bringToFront(content);
    
    // Add restore animation class after a short delay to ensure the element exists
    setTimeout(() => {
      const windowElement = document.querySelector(`[data-window-id="${content}"]`);
      if (windowElement) {
        windowElement.classList.add('window-restore');
        
        // Remove the animation class after it completes
        setTimeout(() => {
          windowElement.classList.remove('window-restore');
        }, 200);
      }
    }, 10);
  };
  
  // Handle maximize/restore window
  const handleMaximizeWindow = (windowId) => {
    // Clear any snapped state when maximizing/restoring
    setSnappedWindows(prev => ({
      ...prev,
      [windowId]: null
    }));
    
    setMaximizedWindows(prev => ({
      ...prev,
      [windowId]: !prev[windowId]
    }));
  };
  
  // Handle window snapping
  const handleWindowSnap = (windowId, position) => {
    // Calculate window dimensions based on snap position
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let newPosition = { x: 0, y: 0 };
    let newSize = { width: 0, height: 0 };
    
    switch(position) {
      case 'left':
        newPosition = { x: 0, y: 0 };
        newSize = { width: viewportWidth / 2, height: viewportHeight };
        break;
      case 'right':
        newPosition = { x: viewportWidth / 2, y: 0 };
        newSize = { width: viewportWidth / 2, height: viewportHeight };
        break;
      case 'top':
        newPosition = { x: 0, y: 0 };
        newSize = { width: viewportWidth, height: viewportHeight / 2 };
        break;
      case 'bottom':
        newPosition = { x: 0, y: viewportHeight / 2 };
        newSize = { width: viewportWidth, height: viewportHeight / 2 };
        break;
      case 'top-left':
        newPosition = { x: 0, y: 0 };
        newSize = { width: viewportWidth / 2, height: viewportHeight / 2 };
        break;
      case 'top-right':
        newPosition = { x: viewportWidth / 2, y: 0 };
        newSize = { width: viewportWidth / 2, height: viewportHeight / 2 };
        break;
      case 'bottom-left':
        newPosition = { x: 0, y: viewportHeight / 2 };
        newSize = { width: viewportWidth / 2, height: viewportHeight / 2 };
        break;
      case 'bottom-right':
        newPosition = { x: viewportWidth / 2, y: viewportHeight / 2 };
        newSize = { width: viewportWidth / 2, height: viewportHeight / 2 };
        break;
      default:
        return;
    }
    
    // Set window position and size
    setWindowPositions(prev => ({
      ...prev,
      [windowId]: newPosition
    }));
    
    setWindowSizes(prev => ({
      ...prev,
      [windowId]: newSize
    }));
    
    // Update snapped state
    setSnappedWindows(prev => ({
      ...prev,
      [windowId]: position
    }));
    
    // Clear maximized state
    setMaximizedWindows(prev => ({
      ...prev,
      [windowId]: false
    }));
    
    // Bring window to front when snapped
    bringToFront(windowId);
  };

  // Desktop icons configuration - default positions
  const defaultIconPositions = {
    'projects': { x: 20, y: 20 },
    'experience': { x: 20, y: 120 },
    'about': { x: 20, y: 220 },
    'contact': { x: 20, y: 320 }
  };
  
  // State to track icon positions
  const [iconPositions, setIconPositions] = useState(defaultIconPositions);
  
  // Load saved positions from localStorage on component mount
  useEffect(() => {
    try {
      const savedPositions = localStorage.getItem('desktopIconPositions');
      if (savedPositions) {
        const parsedPositions = JSON.parse(savedPositions);
        // Make sure we have all the required icons
        const completePositions = {
          ...defaultIconPositions,
          ...parsedPositions
        };
        setIconPositions(completePositions);
      } else {
        // Save default positions to localStorage if nothing is saved
        localStorage.setItem('desktopIconPositions', JSON.stringify(defaultIconPositions));
      }
    } catch (error) {
      console.error('Error loading icon positions from localStorage:', error);
    }
  }, []); // Only run on mount
  
  // Handle icon position changes
  const handleIconPositionChange = (iconId, newPosition, isReset = false) => {
    if (!iconId) return; // Safety check
    
    // If isReset is true, use the default position for this icon
    if (isReset) {
      newPosition = defaultIconPositions[iconId];
    }
    
    // Update state with the new position
    setIconPositions(prev => {
      const updated = {
        ...prev,
        [iconId]: newPosition
      };
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('desktopIconPositions', JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving icon positions to localStorage:', error);
      }
      
      return updated;
    });
  };
  
  // Handle desktop context menu
  const handleDesktopContextMenu = (e) => {
    // Prevent default browser context menu
    e.preventDefault();
    
    // Set context menu position and target
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setContextMenuTarget({ type: 'Desktop', id: 'Background' });
    setShowContextMenu(true);
  };
  
  // Handle window context menu
  const handleWindowContextMenu = (e, windowId) => {
    // Prevent default browser context menu
    e.preventDefault();
    e.stopPropagation();
    
    // Set context menu position and target
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setContextMenuTarget({ type: 'Window', id: windowId });
    setShowContextMenu(true);
  };
  
  // Close context menu
  const closeContextMenu = () => {
    setShowContextMenu(false);
  };
  
  // Define desktop context menu items
  const getContextMenuItems = () => {
    // Different menu items based on target type
    if (contextMenuTarget.type === 'Desktop') {
      return [
        {
          label: 'Open Terminal',
          iconName: 'terminal',
          shortcut: 'Ctrl+Alt+T',
          onClick: () => handleIconClick('terminal')
        },
        {
          label: 'New Window',
          iconName: 'clone',
          onClick: () => handleIconClick('projects')
        },
        {
          separator: true
        },
        {
          label: 'Reset All Icons',
          iconName: 'reset',
          onClick: resetIconPositions
        },
        {
          separator: true
        },
        {
          label: 'Create New Folder',
          iconName: 'folder',
          onClick: () => console.log('Create New Folder clicked')
        },
        {
          label: 'Display Settings',
          iconName: 'settings',
          onClick: () => console.log('Display Settings clicked')
        },
        {
          separator: true
        },
        {
          label: 'Open System Tools',
          iconName: 'security',
          onClick: () => console.log('System Tools clicked')
        },
        {
          label: 'Network Settings',
          iconName: 'desktop',
          onClick: () => console.log('Network Settings clicked')
        }
      ];
    } else if (contextMenuTarget.type === 'Window') {
      const windowId = contextMenuTarget.id;
      const isMinimized = minimizedWindows[windowId];
      const isMaximized = maximizedWindows[windowId];
      
      return [
        {
          label: isMinimized ? 'Restore' : 'Minimize',
          iconName: isMinimized ? 'restore' : 'minimize',
          shortcut: 'Alt+F9',
          onClick: () => isMinimized ? handleRestoreWindow(windowId) : handleMinimizeWindow(windowId)
        },
        {
          label: isMaximized ? 'Restore' : 'Maximize',
          iconName: isMaximized ? 'restore' : 'maximize',
          shortcut: 'Alt+F10',
          onClick: () => handleMaximizeWindow(windowId)
        },
        {
          label: 'Close',
          iconName: 'close',
          shortcut: 'Alt+F4',
          onClick: () => handleCloseWindow(windowId)
        },
        {
          separator: true
        },
        {
          label: 'Center Window',
          iconName: 'center',
          onClick: () => centerWindow(windowId)
        },
        {
          separator: true
        },
        {
          label: 'Snap Left',
          iconName: 'expand',
          onClick: () => handleWindowSnap(windowId, 'left')
        },
        {
          label: 'Snap Right',
          iconName: 'expand',
          onClick: () => handleWindowSnap(windowId, 'right')
        },
        {
          label: 'Snap Top',
          iconName: 'expand',
          onClick: () => handleWindowSnap(windowId, 'top')
        },
        {
          label: 'Snap Bottom',
          iconName: 'expand',
          onClick: () => handleWindowSnap(windowId, 'bottom')
        }
      ];
    }
    
    return [];
  };

  // Reset all icon positions to default
  const resetIconPositions = () => {
    // Set icon positions back to default
    setIconPositions(defaultIconPositions);
    
    // Save default positions to localStorage
    try {
      localStorage.setItem('desktopIconPositions', JSON.stringify(defaultIconPositions));
    } catch (error) {
      console.error('Error saving default icon positions to localStorage:', error);
    }
  };
  
  // Desktop icons configuration
  const desktopIcons = [
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: <FolderIcon />, 
      position: iconPositions['projects'] || defaultIconPositions['projects'],
      bgColor: '#3498db' // Blue
    },
    { 
      id: 'experience', 
      label: 'Experience', 
      icon: <BriefcaseIcon />, 
      position: iconPositions['experience'] || defaultIconPositions['experience'],
      bgColor: '#9b59b6' // Purple
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: <UserIcon />, 
      position: iconPositions['about'] || defaultIconPositions['about'],
      bgColor: '#2ecc71' // Green
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: <EnvelopeIcon />, 
      position: iconPositions['contact'] || defaultIconPositions['contact'],
      bgColor: '#e74c3c' // Red
    }
  ];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-kali-wallpaper" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleDesktopContextMenu}
    >

      
      {/* Top Bar */}
      <TopBar 
        onTerminalClick={() => handleIconClick('terminal')} 
        onResetIcons={resetIconPositions} 
      />
      
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
            id={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={position}
            bgColor={icon.bgColor}
            onClick={() => handleIconClick(icon.id)}
            onPositionChange={handleIconPositionChange}
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

      {/* Context Menu */}
      {showContextMenu && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          onClose={closeContextMenu}
          menuItems={getContextMenuItems()}
          targetType={contextMenuTarget.type}
          targetId={contextMenuTarget.id}
        />
      )}
      
      {/* Kali-style Dock/Taskbar */}
      <Dock 
        openWindows={openWindows}
        showTerminal={showTerminal}
        activeWindow={activeWindow}
        onItemClick={handleIconClick}
        onTerminalClick={() => handleIconClick('terminal')}
        minimizedWindows={minimizedWindows}
      />
      
      {/* Terminal Window */}
      {showTerminal && !terminalMinimized && (
        <div 
          className="absolute rounded-md overflow-hidden shadow-2xl window-open"
          data-window-id="terminal"
          style={{
            top: maximizedWindows['terminal'] ? '0' : `${windowPositions.terminal?.y || (window.innerHeight * 0.1)}px`,
            left: maximizedWindows['terminal'] ? '0' : `${windowPositions.terminal?.x || (window.innerWidth * 0.1)}px`,
            width: maximizedWindows['terminal'] ? '100%' : `${windowSizes.terminal?.width || (window.innerWidth * 0.8)}px`,
            height: maximizedWindows['terminal'] ? '100%' : `${windowSizes.terminal?.height || (window.innerHeight * 0.8)}px`,
            zIndex: focusOrder.indexOf('terminal') + 100,
            transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s'
          }}
          onClick={() => bringToFront('terminal')}
        >
          <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-md overflow-hidden shadow-2xl border border-[#30363d] relative">
            {/* Terminal header with controls */}
            <div 
              className={`flex items-center h-8 px-3 cursor-move kali-terminal-header ${activeWindow === 'terminal' ? 'kali-window-header-active' : ''}`}
              onMouseDown={(e) => handleStartDrag(e, 'terminal')}
            >
              {/* Window title - left aligned */}
              <div className="flex-1 text-left text-sm font-mono text-white font-bold">
                Terminal - root@kali
              </div>
              
              {/* Window controls - right aligned */}
              <div className="flex space-x-4">
                {/* Minimize button with icon */}
                <div 
                  className="cursor-pointer hover:bg-[#444] rounded flex items-center justify-center group relative p-1 mx-0.5"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    setTerminalMinimized(!terminalMinimized);
                  }}
                >
                  <FaWindowMinimize className="h-3 w-3 text-gray-300" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">Minimize Terminal (Alt+F9)</span>
                </div>
                
                {/* Maximize button with icon */}
                <div 
                  className="cursor-pointer hover:bg-[#444] rounded flex items-center justify-center group relative p-1 mx-0.5"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    handleMaximizeWindow('terminal');
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation(); // Prevent other handlers
                    handleMaximizeWindow('terminal');
                  }}
                >
                  {maximizedWindows['terminal'] ? (
                    <FaWindowRestore className="h-3 w-3 text-gray-300" />
                  ) : (
                    <FaWindowMaximize className="h-3 w-3 text-gray-300" />
                  )}
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                    {maximizedWindows['terminal'] ? 'Restore Terminal (Alt+F10)' : 'Maximize Terminal (Alt+F10)'}
                  </span>
                </div>
                
                {/* Close button with icon */}
                <div 
                  className="cursor-pointer hover:bg-[#f44] rounded flex items-center justify-center group relative p-1 mx-0.5"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    setShowTerminal(false);
                  }}
                >
                  <FaTimes className="h-3 w-3 text-gray-300" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">Close Terminal (Alt+F4)</span>
                </div>
              </div>
            </div>
            
            {/* Terminal body */}
            {!terminalMinimized && (
              <div className="flex-1 bg-black h-full">
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
            className="absolute rounded-md overflow-hidden shadow-2xl window-open"
            data-window-id={windowContent}
            style={{
              top: maximizedWindows[windowContent] ? '0' : `${position.y}px`,
              left: maximizedWindows[windowContent] ? '0' : `${position.x}px`,
              width: maximizedWindows[windowContent] ? '100%' : `${windowSizes[windowContent]?.width || (window.innerWidth * 0.8)}px`,
              height: maximizedWindows[windowContent] ? '100%' : `${windowSizes[windowContent]?.height || (window.innerHeight * 0.8)}px`,
              zIndex: zIndex,
              transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s'
            }}
            onClick={() => bringToFront(windowContent)}
          >
            <div className="w-full h-full flex flex-col bg-[#1e1e2e] rounded-md overflow-hidden shadow-2xl border border-[#30363d] relative">
              {/* Content header with controls */}
              {/* Window title bar */}
              <div 
                className={`flex items-center h-8 px-3 cursor-move kali-window-header ${activeWindow === windowContent ? 'kali-window-header-active' : ''}`}
                onMouseDown={(e) => handleStartDrag(e, windowContent)}
              >
                {/* Window title - left aligned */}
                <div 
                  className="flex-1 text-left text-sm font-mono text-white font-bold"
                  onContextMenu={(e) => handleWindowContextMenu(e, windowContent)}
                >
                  {windowContent.charAt(0).toUpperCase() + windowContent.slice(1)}
                </div>
                
                {/* Window controls - right aligned */}
                <div className="flex space-x-4">
                  {/* Minimize button with icon */}
                  <div 
                    className="cursor-pointer hover:bg-[#444] rounded flex items-center justify-center group relative p-1 mx-0.5"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dragging when clicking button
                      handleMinimizeWindow(windowContent);
                    }}
                  >
                    <FaWindowMinimize className="h-3 w-3 text-gray-300" />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">Minimize Window (Alt+F9)</span>
                  </div>
                  
                  {/* Maximize/restore button with icon */}
                  <div 
                    className="cursor-pointer hover:bg-[#444] rounded flex items-center justify-center group relative p-1 mx-0.5"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dragging when clicking button
                      handleMaximizeWindow(windowContent);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation(); // Prevent other handlers
                      handleMaximizeWindow(windowContent);
                    }}
                  >
                    {maximizedWindows[windowContent] ? (
                      <FaWindowRestore className="h-3 w-3 text-gray-300" />
                    ) : (
                      <FaWindowMaximize className="h-3 w-3 text-gray-300" />
                    )}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                      {maximizedWindows[windowContent] ? 'Restore Window (Alt+F10)' : 'Maximize Window (Alt+F10)'}
                    </span>
                  </div>
                  
                  {/* Close button with icon */}
                  <div 
                    className="cursor-pointer hover:bg-[#f44] rounded flex items-center justify-center group relative p-1 mx-0.5"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dragging when clicking button
                      handleCloseWindow(windowContent);
                    }}
                  >
                    <FaTimes className="h-3 w-3 text-gray-300" />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">Close Window (Alt+F4)</span>
                  </div>
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