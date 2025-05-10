import { useState, useEffect } from 'react'
import Desktop from './components/Desktop'
import kaliLogo from './assets/kali-1.svg'

function App() {
  // Loading state for initial animation
  const [loading, setLoading] = useState(true)
  // State to control fade-in animation
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => {
      setLoading(false)
      // Trigger fade-in animation after loading is complete
      setFadeIn(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black">
          {/* Kali Linux Logo */}
          <div className="mb-8">
            <img src={kaliLogo} alt="Kali Linux Logo" width="120" height="120" className="text-blue-500" />
          </div>
          
          {/* Boot Text */}
          <div className="text-kali-green font-mono text-xl mb-6">
            Booting Kashif Portfolio...
          </div>
          
          {/* Boot Messages */}
          <div className="text-gray-500 font-mono text-xs mb-6 flex flex-col items-start w-80">
            <div className="mb-1 animate-message" style={{animationDelay: '0.1s'}}>[ <span className="text-green-500">OK</span> ] Started Initialize Portfolio...</div>
            <div className="mb-1 animate-message" style={{animationDelay: '0.5s'}}>[ <span className="text-green-500">OK</span> ] Loaded Projects Module</div>
            <div className="mb-1 animate-message" style={{animationDelay: '0.9s'}}>[ <span className="text-green-500">OK</span> ] Loaded Experience Module</div>
            <div className="mb-1 animate-message" style={{animationDelay: '1.3s'}}>[ <span className="text-green-500">OK</span> ] Loaded About Module</div>
            <div className="mb-1 animate-message" style={{animationDelay: '1.7s'}}>[ <span className="text-green-500">OK</span> ] Loaded Contact Module</div>
            <div className="mb-1 animate-message" style={{animationDelay: '2.1s'}}>[ <span className="text-green-500">OK</span> ] Starting Desktop Environment...</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-kali-blue rounded-full animate-boot-progress"
            ></div>
          </div>
        </div>
      ) : (
        <div className={`${fadeIn ? 'animate-fade-in' : 'opacity-0'}`}>
          <Desktop />
        </div>
      )}
    </div>
  )
}

export default App
