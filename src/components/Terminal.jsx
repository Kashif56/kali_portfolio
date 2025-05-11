import React, { useState, useEffect, useRef } from 'react';
import projects from '../data/projects';
import experiences from '../data/experience';
import personalInfo from '../data/personal';

// No syntax highlighting function needed

const Terminal = ({ onCommandExecute }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: '┌──────────────────────────────────────────────────────┐', type: 'header' },
    { text: '│                                                      │', type: 'header' },
    { text: '│   ██╗  ██╗ █████╗ ███████╗██╗  ██╗██╗███████╗      │', type: 'kali-ascii' },
    { text: '│   ██║ ██╔╝██╔══██╗██╔════╝██║  ██║██║██╔════╝      │', type: 'kali-ascii' },
    { text: '│   █████╔╝ ███████║███████╗███████║██║█████╗        │', type: 'kali-ascii' },
    { text: '│   ██╔═██╗ ██╔══██║╚════██║██╔══██║██║██╔══╝        │', type: 'kali-ascii' },
    { text: '│   ██║  ██╗██║  ██║███████║██║  ██║██║██║           │', type: 'kali-ascii' },
    { text: '│   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝           │', type: 'kali-ascii' },
    { text: '│                                        PORTFOLIO    │', type: 'kali-ascii' },
    { text: '│                                                      │', type: 'header' },
    { text: '└──────────────────────────────────────────────────────┘', type: 'header' },
    { text: ' ', type: 'spacer' },
    { text: 'Welcome to Kali Portfolio Terminal [Version 1.0.0]', type: 'system' },
    { text: 'Type "help" to see available commands', type: 'system' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0); // Track cursor position within text
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

  // Update cursor position when input changes
  useEffect(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || input.length);
    }
  }, [input]);

  // Handle input changes and update cursor position
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleKeyDown = (e) => {
    // Handle Enter key to submit command
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
    // Handle left arrow to move cursor left
    else if (e.key === 'ArrowLeft') {
      // Let the default behavior handle the cursor movement
      // but capture the new position after it moves
      setTimeout(() => {
        if (inputRef.current) {
          setCursorPosition(inputRef.current.selectionStart || 0);
        }
      }, 0);
    }
    // Handle right arrow to move cursor right
    else if (e.key === 'ArrowRight') {
      // Let the default behavior handle the cursor movement
      // but capture the new position after it moves
      setTimeout(() => {
        if (inputRef.current) {
          setCursorPosition(inputRef.current.selectionStart || 0);
        }
      }, 0);
    }
    // Handle up arrow for command history
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        const newInput = commandHistory[commandHistory.length - 1 - newIndex];
        setInput(newInput);
        // Move cursor to end of input
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = newInput.length;
            inputRef.current.selectionEnd = newInput.length;
            setCursorPosition(newInput.length);
          }
        }, 0);
      }
    }
    // Handle down arrow for command history
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const newInput = commandHistory[commandHistory.length - 1 - newIndex];
        setInput(newInput);
        // Move cursor to end of input
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = newInput.length;
            inputRef.current.selectionEnd = newInput.length;
            setCursorPosition(newInput.length);
          }
        }, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
        setCursorPosition(0);
      }
    }
    // Handle click events to update cursor position
    else if (e.key === 'MouseDown' || e.key === 'MouseUp') {
      setTimeout(() => {
        if (inputRef.current) {
          setCursorPosition(inputRef.current.selectionStart || 0);
        }
      }, 0);
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
    
    // Removed visual flash feedback
    
    // Parse command
    switch (cmd) {
      case 'clear':
        setHistory([]);
        break;
        
      case 'help':
        // Add header
        addToHistory({ 
          text: `Available commands:`, 
          type: 'system' 
        });
        
        // Add each command on a separate line for better readability
        addToHistory({ text: `  projects    - View my project portfolio`, type: 'system' });
        addToHistory({ text: `  experience  - View my professional experience`, type: 'system' });
        addToHistory({ text: `  exp         - Alias for experience`, type: 'system' });
        addToHistory({ text: `  about       - About me`, type: 'system' });
        addToHistory({ text: `  contact     - Contact information`, type: 'system' });
        addToHistory({ text: `  whoami      - Display user information`, type: 'system' });
        addToHistory({ text: `  clear       - Clear terminal`, type: 'system' });
        addToHistory({ text: `  restart     - Refresh the page`, type: 'system' });
        addToHistory({ text: `  help        - Display this help message`, type: 'system' });
        
        // Removed the extra prompt that was causing duplication
        break;
        
      case 'whoami':
        addToHistory({ text: 'root', type: 'system' });
        // No extra prompt needed
        break;
        
      case 'projects':
        // Display projects information directly in the terminal from data file
        addToHistory({ text: `===== MY PROJECTS =====`, type: 'header' });
        
        // Loop through projects from the data file
        projects.forEach((project, index) => {
          addToHistory({ text: `${index + 1}. ${project.title}`, type: 'project-title' });
          addToHistory({ text: `   ${project.description}`, type: 'project-desc' });
          addToHistory({ text: `   Technologies: ${project.technologies.join(', ')}`, type: 'project-tech' });
          
          // Add a blank line between projects except for the last one
          if (index < projects.length - 1) {
            addToHistory({ text: ``, type: 'spacer' });
          }
        });
        break;
        
      case 'experience':
      case 'exp':
        // Display experience information directly in the terminal from data file
        addToHistory({ text: `===== PROFESSIONAL EXPERIENCE =====`, type: 'header' });
        
        // Loop through experiences from the data file
        experiences.forEach((exp, index) => {
          addToHistory({ text: `${exp.title} | ${exp.company} | ${exp.duration}`, type: 'exp-title' });
          
          // Split description into bullet points if it contains multiple sentences
          const sentences = exp.description.split('. ').filter(s => s.trim().length > 0);
          sentences.forEach(sentence => {
            addToHistory({ text: `• ${sentence}${!sentence.endsWith('.') ? '.' : ''}`, type: 'exp-desc' });
          });
          
          // Add technologies used
          addToHistory({ text: `  Technologies: ${exp.technologies.join(', ')}`, type: 'project-tech' });
          
          // Add a blank line between experiences except for the last one
          if (index < experiences.length - 1) {
            addToHistory({ text: ``, type: 'spacer' });
          }
        });
        break;
        
      case 'about':
        // Display about information directly in the terminal from data file
        addToHistory({ text: `===== ABOUT ME =====`, type: 'header' });
        addToHistory({ text: `${personalInfo.name} - ${personalInfo.title}`, type: 'about-title' });
        
        // Split bio into separate lines
        const bioLines = personalInfo.bio.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        bioLines.forEach(line => {
          addToHistory({ text: line, type: 'about' });
        });
        
        addToHistory({ text: ``, type: 'spacer' });
        addToHistory({ text: `Location: ${personalInfo.location}`, type: 'about-info' });
        
        // Display skills
        addToHistory({ text: ``, type: 'spacer' });
        addToHistory({ text: `Technical Skills:`, type: 'about-section' });
        
        // Group skills into categories for better display
        const skillGroups = [];
        for (let i = 0; i < personalInfo.skills.length; i += 4) {
          skillGroups.push(personalInfo.skills.slice(i, i + 4));
        }
        
        skillGroups.forEach(group => {
          addToHistory({ text: `• ${group.join(', ')}`, type: 'about-list' });
        });
        
        // Display education
        addToHistory({ text: ``, type: 'spacer' });
        addToHistory({ text: `Education:`, type: 'about-section' });
        personalInfo.education.forEach(edu => {
          addToHistory({ text: `• ${edu.degree}`, type: 'about-list' });
          addToHistory({ text: `  ${edu.institution}, ${edu.year}`, type: 'about-list-detail' });
        });
        break;
        
      case 'contact':
        // Display contact information directly in the terminal from data file
        addToHistory({ text: `===== CONTACT INFORMATION =====`, type: 'header' });
        addToHistory({ text: `Email: ${personalInfo.email}`, type: 'contact' });
        addToHistory({ text: `LinkedIn: ${personalInfo.linkedin}`, type: 'contact' });
        addToHistory({ text: `GitHub: ${personalInfo.github}`, type: 'contact' });
        
        addToHistory({ text: ``, type: 'spacer' });
        addToHistory({ text: `Feel free to reach out for collaboration opportunities or to discuss projects!`, type: 'contact-msg' });
        break;
        
      case 'restart':
        addToHistory({ text: `Refreshing the page...`, type: 'system' });
        // Use setTimeout to allow the message to be displayed before refreshing
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
        
      default:
        addToHistory({ 
          text: `Command not found: ${cmd}. Type 'help' for available commands.`, 
          type: 'error' 
        });
        // No extra prompt needed
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="flex-1 p-4 overflow-y-auto terminal-text text-sm text-kali-green bg-black h-full relative"
    >
      {/* Kali Linux watermark */}
      <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 24 24" className="text-kali-blue">
          <path fill="currentColor" d="M11.503 12.216c-.119.522.344 1.132.861 1.132.378 0 .787-.317.889-.883.104-.585-.318-1.142-.798-1.142-.41-.001-.857.329-.952.893z"/>
          <path fill="currentColor" d="M20.772 6.695c-.214-.446-.524-.88-.924-1.28a5.313 5.313 0 0 0-1.279-.923c-1.288-.619-2.877-.618-4.166 0a5.313 5.313 0 0 0-1.279.923c-.4.4-.709.834-.924 1.28-.213.446-.321.901-.321 1.36 0 .459.108.914.321 1.36.214.446.524.88.924 1.28.4.4.834.709 1.279.923.644.31 1.367.464 2.089.464s1.445-.155 2.088-.464a5.313 5.313 0 0 0 1.279-.923c.4-.4.709-.834.924-1.28.213-.446.321-.901.321-1.36 0-.459-.108-.914-.332-1.36zm-2.538 2.283c-.199.199-.437.348-.713.464-.574.243-1.292.243-1.866 0a2.637 2.637 0 0 1-.713-.464c-.199-.199-.348-.437-.464-.713-.243-.574-.243-1.292 0-1.866.116-.276.265-.514.464-.713.199-.199.437-.348.713-.464.574-.243 1.292-.243 1.866 0 .276.116.514.265.713.464.199.199.348.437.464.713.243.574.243 1.292 0 1.866-.116.276-.265.514-.464.713z"/>
        </svg>
      </div>
        {history.map((entry, index) => {
          // Define styling based on entry type
          let className = 'mb-1 ';
          
          switch(entry.type) {
            case 'error':
              className += 'text-red-500';
              break;
            case 'system':
              className += 'text-blue-400';
              break;
            case 'command':
              className += 'text-green-400';
              break;
            case 'header':
              className += 'text-yellow-300 font-bold';
              break;
            case 'kali-ascii':
              className += 'text-kali-blue font-bold';
              break;
            case 'project-title':
            case 'exp-title':
            case 'about-title':
              className += 'text-cyan-400 font-bold';
              break;
            case 'project-desc':
            case 'exp-desc':
            case 'about':
            case 'contact':
            case 'about-info':
              className += 'text-gray-300';
              break;
            case 'project-tech':
              className += 'text-green-300 italic';
              break;
            case 'about-section':
              className += 'text-purple-400 font-bold mt-2';
              break;
            case 'about-list':
              className += 'text-gray-300 ml-2';
              break;
            case 'about-list-detail':
              className += 'text-gray-400 italic ml-4';
              break;
            case 'contact-msg':
              className += 'text-gray-400 italic mt-2';
              break;
            case 'spacer':
              className += 'h-2'; // Empty space for separation
              break;
            default:
              className += 'text-green-400';
          }
          
          return (
            <div key={index} className={className}>
              {entry.text}
            </div>
          );
        })}
        
        {/* Current input line - using monospace characters and custom cursor */}
        <div className="flex items-center">
          <span className="text-kali-green font-bold">┌──(</span>
          <span className="text-red-500 font-bold">root💀kali</span>
          <span className="text-kali-green font-bold">)-[</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="text-kali-green font-bold">]</span>
          <br/>
          <span className="text-kali-green font-bold">└─#&nbsp;</span>
          <div className="relative font-mono">
            {/* Display text with cursor overlay at the correct position */}
            <div className="relative h-5 flex items-center">
              {/* Full text */}
              <div className="text-[#00ff00] whitespace-pre">{input}</div>
              
              {/* Cursor overlay - positioned absolutely */}
              <div 
                className={`absolute h-5 w-1 bg-[#00ff00] ${cursorVisible ? 'opacity-70' : 'opacity-0'}`}
                style={{
                  left: `${cursorPosition * 0.61}em`, // Position based on monospace character width
                  top: '0px'
                }}
              ></div>
            </div>
            
            {/* Hidden input for capturing keystrokes */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClick={() => {
                // Update cursor position on click
                if (inputRef.current) {
                  setCursorPosition(inputRef.current.selectionStart || 0);
                }
              }}
              className="opacity-0 absolute top-0 left-0 w-full h-full outline-none"
              autoFocus
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="hidden"></form>
    </div>
  );
};

export default Terminal;
