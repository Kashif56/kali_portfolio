import React, { useState, useEffect } from 'react';

const TopBar = ({ onTerminalClick, onResetIcons }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [networkStrength, setNetworkStrength] = useState(4); // 0-4 for network strength
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);
  
  // Simulate network strength changes
  useEffect(() => {
    const updateNetworkStrength = () => {
      // Randomly fluctuate between 2-4 bars for realism
      const newStrength = Math.floor(Math.random() * 3) + 2;
      setNetworkStrength(newStrength);
    };
    
    const networkTimer = setInterval(updateNetworkStrength, 30000); // Update every 30 seconds
    return () => clearInterval(networkTimer);
  }, []);
  
  // Format time as HH:MM:SS
  const formatTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
  // Format date as Day, Month DD
  const formatDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return currentTime.toLocaleDateString('en-US', options);
  };
  
  // WiFi strength icon based on signal level
  const WifiIcon = ({ strength }) => {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 20.5C13.1046 20.5 14 19.6046 14 18.5C14 17.3954 13.1046 16.5 12 16.5C10.8954 16.5 10 17.3954 10 18.5C10 19.6046 10.8954 20.5 12 20.5Z" 
          fill="currentColor" 
        />
        <path 
          d="M16 15.5C16 15.5 14.5 13.5 12 13.5C9.5 13.5 8 15.5 8 15.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeOpacity={strength >= 2 ? "1" : "0.3"}
        />
        <path 
          d="M19 12.5C19 12.5 16.5 9.5 12 9.5C7.5 9.5 5 12.5 5 12.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeOpacity={strength >= 3 ? "1" : "0.3"}
        />
        <path 
          d="M22 9.5C22 9.5 18.5 5.5 12 5.5C5.5 5.5 2 9.5 2 9.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeOpacity={strength >= 4 ? "1" : "0.3"}
        />
      </svg>
    );
  };

  // Battery icon component
  const BatteryIcon = ({ level }) => {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="8" width={12 * level / 100} height="8" fill="currentColor" />
        <path d="M22 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  };

  // Volume icon component
  const VolumeIcon = () => {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L12 4V20L8 16H4V8H8Z" fill="currentColor" />
        <path d="M16 8.5C17.3333 10.3333 17.3333 13.6667 16 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 5C22 8.5 22 15.5 19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  };
  
  // Terminal icon component
  const TerminalIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  };

  // Reset icon component
  const ResetIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  };

  return (
    <div className="fixed w-full top-0 left-0 px-3 py-1.5 bg-[#1a1a1a]/90 text-[#00ff41] font-mono text-xs flex items-center justify-between border-b border-[#00ff41]/20 backdrop-blur-sm z-50 shadow-md">
      {/* Left side - Terminal button and Reset button */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={onTerminalClick}
          className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-[#00ff41]/10 transition-colors group relative"
        >
          <TerminalIcon />
          <span>Terminal</span>
          <span className="absolute -bottom-6 left-0 bg-[#1a1a1a] text-[#00ff41] text-xs py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Open Terminal</span>
        </button>

        <button 
          onClick={onResetIcons}
          className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-[#00ff41]/10 transition-colors group relative"
        >
          <ResetIcon />
          <span>Reset Icons</span>
          <span className="absolute -bottom-6 left-0 bg-[#1a1a1a] text-[#00ff41] text-xs py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Reset Bins</span>
        </button>
      </div>
      
      {/* Right side - System icons */}
      <div className="flex items-center space-x-4">
        {/* Battery icon */}
        <div className="flex items-center space-x-1 group relative">
          <BatteryIcon level={85} />
          <span className="text-xs">85%</span>
          <span className="absolute -bottom-6 right-0 bg-[#1a1a1a] text-[#00ff41] text-xs py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Battery</span>
        </div>
        
        {/* Volume icon */}
        <div className="flex items-center group relative">
          <VolumeIcon />
          <span className="absolute -bottom-6 right-0 bg-[#1a1a1a] text-[#00ff41] text-xs py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Volume</span>
        </div>
        
        {/* WiFi icon */}
        <div className="flex items-center space-x-1 group relative">
          <WifiIcon strength={networkStrength} />
          <span className="text-xs">{networkStrength * 25}%</span>
          <span className="absolute -bottom-6 right-0 bg-[#1a1a1a] text-[#00ff41] text-xs py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Network</span>
        </div>
        
        {/* Date and time */}
        <div className="flex items-center space-x-2 border-l border-[#00ff41]/20 pl-3">
          <span>{formatDate()}</span>
          <span className="font-bold">{formatTime()}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
