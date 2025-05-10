import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ onCommandExecute }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'Welcome to Kali Portfolio Terminal', type: 'system' },
    { text: 'Type "help" to see available commands', type: 'system' },
    { text: 'root@kali:~# ', type: 'prompt' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on terminal click
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  const handleKeyDown = (e) => {
    // Handle Enter key to submit command
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
    // Handle up arrow for command history
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }
    // Handle down arrow for command history
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
    // Handle tab for auto-completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'projects', 'experience', 'exp', 'about', 'contact', 'clear', 'whoami'];
      const matchingCommands = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      } else if (matchingCommands.length > 1) {
        addToHistory({ text: matchingCommands.join('  '), type: 'system' });
      }
    }
  };

  const addToHistory = (entry) => {
    setHistory(prev => [...prev, entry]);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (input.trim()) {
      // Add command to history
      addToHistory({ text: `root@kali:~# ${input}`, type: 'command' });
      
      // Add to command history for up/down navigation
      setCommandHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);
      
      // Process command
      processCommand(input.trim().toLowerCase());
      
      // Clear input
      setInput('');
    }
  };

  const processCommand = (cmd) => {
    // Play terminal sound (commented out since we don't have the actual audio file)
    // const audio = new Audio('/terminal-beep.mp3');
    // audio.volume = 0.2;
    // audio.play().catch(e => console.log('Audio play error:', e));
    
    // Visual feedback instead of sound
    const terminalEl = terminalRef.current;
    if (terminalEl) {
      terminalEl.classList.add('terminal-flash');
      setTimeout(() => {
        terminalEl.classList.remove('terminal-flash');
      }, 100);
    }
    
    // Parse command
    switch (cmd) {
      case 'clear':
        setHistory([
          { text: 'root@kali:~# ', type: 'prompt' }
        ]);
        break;
        
      case 'help':
        addToHistory({ 
          text: `Available commands:
  projects    - View my project portfolio
  experience  - View my professional experience
  exp         - Alias for experience
  about       - About me
  contact     - Contact information
  whoami      - Display user information
  clear       - Clear terminal
  help        - Display this help message`, 
          type: 'system' 
        });
        addToHistory({ text: 'root@kali:~# ', type: 'prompt' });
        break;
        
      case 'whoami':
        addToHistory({ text: 'root', type: 'system' });
        addToHistory({ text: 'root@kali:~# ', type: 'prompt' });
        break;
        
      case 'projects':
      case 'experience':
      case 'exp':
      case 'about':
      case 'contact':
        // Normalize 'exp' to 'experience'
        const normalizedCmd = cmd === 'exp' ? 'experience' : cmd;
        onCommandExecute(normalizedCmd);
        addToHistory({ text: 'root@kali:~# ', type: 'prompt' });
        break;
        
      default:
        addToHistory({ 
          text: `Command not found: ${cmd}. Type 'help' for available commands.`, 
          type: 'error' 
        });
        addToHistory({ text: 'root@kali:~# ', type: 'prompt' });
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="flex-1 p-4 overflow-y-auto font-mono text-sm text-[#00ff00] bg-black"
    >
        {history.map((entry, index) => (
          <div 
            key={index} 
            className={`mb-1 ${
              entry.type === 'error' ? 'text-red-500' : 
              entry.type === 'system' ? 'text-blue-400' : 
              'text-green-400'
            }`}
          >
            {entry.text}
          </div>
        ))}
        
        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-[#00ff00]">root@kali:~#&nbsp;</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-[#00ff00] outline-none"
              autoFocus
            />
            {/* Position cursor after text */}
            <span 
              className={`absolute h-5 w-2 bg-[#00ff00] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: `${input.length * 0.6}ch`, top: '0' }}
            ></span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="hidden"></form>
    </div>
  );
};

export default Terminal;
