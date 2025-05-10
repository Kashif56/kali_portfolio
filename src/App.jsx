import { useState, useEffect } from 'react'
import Desktop from './components/Desktop'

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
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="text-green-500 font-mono text-xl mb-4">Booting Kashif Portfolio...</div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full animate-boot-progress"
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
