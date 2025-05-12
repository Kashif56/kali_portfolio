import { useState, useEffect, useRef } from 'react'
import Desktop from './components/Desktop'
import kaliLogo from './assets/kali-1.svg'
import ImagePreloader from './components/ImagePreloader'
import projects from './data/projects'
import bgWallpaper from './assets/Kali-bg-custom.png'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  // Loading state for initial animation
  const [loading, setLoading] = useState(true)
  // State to control fade-in animation
  const [fadeIn, setFadeIn] = useState(false)
  // Collect all project images for preloading
  const [allImages, setAllImages] = useState([])
  // Boot log messages
  const [bootMessages, setBootMessages] = useState([])
  // Reference for auto-scrolling boot log
  const bootLogRef = useRef(null)
  // Track background image loading
  const [bgImageLoaded, setBgImageLoaded] = useState(false)
  // Track boot sequence completion
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false)

  useEffect(() => {
    // Collect all images from projects for preloading
    const projectImages = [];
    projects.forEach(project => {
      if (project.image) {
        projectImages.push(project.image);
      }
      if (project.images && Array.isArray(project.images)) {
        project.images.forEach(img => {
          if (img) projectImages.push(img);
        });
      }
    });
    
    // Add background wallpaper to preload list
    projectImages.push(bgWallpaper);
    setAllImages(projectImages);
    
    // Preload background image specifically
    const bgImg = new Image();
    bgImg.onload = () => {
      console.log('Background image loaded');
      setBgImageLoaded(true);
    };
    bgImg.onerror = () => {
      console.error('Failed to load background image');
      setBgImageLoaded(true); // Still mark as loaded to prevent getting stuck
    };
    bgImg.src = bgWallpaper;

    // Generate authentic Kali Linux boot messages
    const kaliBootMessages = [
      { text: 'Loading initial ramdisk...', delay: 50, type: 'info' },
      { text: 'Starting kernel...', delay: 100, type: 'info' },
      { text: 'Mounting root filesystem...', delay: 150, type: 'info' },
      { text: 'Starting udev...', delay: 200, type: 'info' },
      { text: 'Starting system message bus...', delay: 250, type: 'info' },
      { text: 'Starting network manager...', delay: 300, type: 'info' },
      { text: 'Starting sshd...', delay: 350, type: 'info' },
      { text: 'Starting PostgreSQL database server...', delay: 400, type: 'info' },
      { text: 'Starting Apache web server...', delay: 450, type: 'info' },
      { text: 'Starting Metasploit service...', delay: 500, type: 'info' },
      { text: 'Starting portfolio services...', delay: 550, type: 'info' },
      { text: 'Loading Projects Module...', delay: 600, type: 'ok' },
      { text: 'Loading Experience Module...', delay: 650, type: 'ok' },
      { text: 'Loading About Module...', delay: 700, type: 'ok' },
      { text: 'Loading Contact Module...', delay: 750, type: 'ok' },
      { text: 'Starting Desktop Environment...', delay: 800, type: 'ok' },
      { text: 'System initialization complete.', delay: 850, type: 'success' }
    ];

    // Add boot messages with a delay to simulate scrolling effect
    let currentDelay = 0;
    kaliBootMessages.forEach((message, index) => {
      const timer = setTimeout(() => {
        setBootMessages(prev => [...prev, message]);
        
        // Auto-scroll to bottom of boot log
        if (bootLogRef.current) {
          bootLogRef.current.scrollTop = bootLogRef.current.scrollHeight;
        }
        
        // Mark boot sequence as complete after all messages are displayed
        if (index === kaliBootMessages.length - 1) {
          setTimeout(() => {
            setBootSequenceComplete(true);
          }, 600);
        }
      }, message.delay);
      currentDelay = message.delay;
    });
    
    // Cleanup all timers
    return () => {
      kaliBootMessages.forEach((message) => {
        clearTimeout(message.delay);
      });
    }
    
    return () => clearTimeout(timer)
  }, [])
  
  // Effect to handle transition to desktop when both boot sequence and background image are ready
  useEffect(() => {
    if (bootSequenceComplete && bgImageLoaded) {
      setLoading(false);
      setFadeIn(true);
    }
  }, [bootSequenceComplete, bgImageLoaded])

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Preload all project images */}
      <ImagePreloader images={allImages} />
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black">
          {/* Kali Linux Logo */}
          <div className="mb-4">
            <img src={kaliLogo} alt="Kali Linux Logo" width="120" height="120" className="text-blue-500" />
          </div>
          
          {/* Boot Text */}
          <div className="text-kali-green font-mono text-xl mb-4">
            Booting Kashif Portfolio...
          </div>
          
          {/* Boot Log Container */}
          <div 
            ref={bootLogRef}
            className="text-gray-300 font-mono text-xs mb-4 flex flex-col items-start w-[600px] h-[300px] bg-black border border-gray-800 rounded p-2 overflow-y-auto"
            style={{ fontFamily: 'monospace' }}
          >
            {bootMessages.map((message, index) => {
              let statusColor = 'text-blue-400';
              let statusText = 'INFO';
              
              if (message.type === 'ok') {
                statusColor = 'text-green-500';
                statusText = 'OK';
              } else if (message.type === 'error') {
                statusColor = 'text-red-500';
                statusText = 'FAIL';
              } else if (message.type === 'warning') {
                statusColor = 'text-yellow-500';
                statusText = 'WARN';
              } else if (message.type === 'success') {
                statusColor = 'text-green-400';
                statusText = 'DONE';
              }
              
              return (
                <div key={index} className="mb-1 flex items-start animate-boot-message">
                  <span className="text-gray-500 mr-2">[{String(index).padStart(2, '0')}]</span>
                  <span className="mr-2">[ <span className={statusColor}>{statusText}</span> ]</span>
                  <span>{message.text}</span>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="w-[600px] h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kali-blue rounded-full animate-boot-progress"
              style={{ width: `${(bootMessages.length / 17) * 100}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <div className={`${fadeIn ? 'animate-fade-in' : 'opacity-0'}`}>
          <Desktop />
        </div>
      )}
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default App
