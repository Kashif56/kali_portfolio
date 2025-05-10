import React, { useState, useEffect } from 'react';
import projects from '../data/projects';
import Notepad from './Notepad';

const FileExplorer = ({ onClose }) => {
  // State to track current directory
  const [currentPath, setCurrentPath] = useState('/home/kali/projects');
  // State to track selected file/folder
  const [selectedItem, setSelectedItem] = useState(null);
  // State to track the currently opened file in Notepad
  const [openedFile, setOpenedFile] = useState(null);
  
  // Generate file system structure based on actual projects data
  const [fileSystem, setFileSystem] = useState({});
  
  useEffect(() => {
    // Create file system structure from projects data
    const generateFileSystem = () => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      
      // Initialize the file system with root directory and three main folders
      const newFileSystem = {
        '/home/kali/projects': [
          { name: 'web-development', type: 'directory', icon: '📁' },
          { name: 'mobile-apps', type: 'directory', icon: '📁' },
          { name: 'ui-ux-designs', type: 'directory', icon: '📁' }
        ],
        '/home/kali/projects/web-development': [],
        '/home/kali/projects/mobile-apps': [],
        '/home/kali/projects/ui-ux-designs': []
      };
      
      // Group projects by category
      const projectsByCategory = {
        'web-development': [],
        'mobile-apps': [],
        'ui-ux-designs': []
      };
      
      // Categorize projects
      projects.forEach(project => {
        if (projectsByCategory[project.category]) {
          projectsByCategory[project.category].push(project);
        }
      });
      
      // Add project .txt files to each category folder
      Object.keys(projectsByCategory).forEach(category => {
        projectsByCategory[category].forEach(project => {
          // Create a .txt file for each project
          newFileSystem[`/home/kali/projects/${category}`].push({
            name: `${project.title}.txt`,
            type: 'file',
            icon: '📄',  // 📄 file icon
            size: `${(project.description.length / 100).toFixed(1)} KB`,
            modified: formattedDate,
            content: project.description,
            projectId: project.id
          });
        });
      });
      
      return newFileSystem;
    };
    
    setFileSystem(generateFileSystem());
  }, []);  // Empty dependency array means this runs once on mount
  
  // Get current directory contents
  const currentDirContents = fileSystem[currentPath] || [];
  
  // Handle navigation to a directory
  const navigateToDirectory = (dirName) => {
    if (dirName === '..') {
      // Navigate up one level
      const pathParts = currentPath.split('/');
      pathParts.pop();
      const newPath = pathParts.join('/') || '/';
      setCurrentPath(newPath);
    } else {
      // Navigate into directory
      const newPath = `${currentPath}/${dirName}`;
      if (fileSystem[newPath]) {
        setCurrentPath(newPath);
      }
    }
    setSelectedItem(null);
  };
  
  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItem(item.name);
    
    // If it's a directory, navigate into it
    if (item.type === 'directory') {
      navigateToDirectory(item.name);
    }
    // For files, we could implement a preview or details panel in the future
  };
  
  // Handle double click on an item
  const handleItemDoubleClick = (item) => {
    if (item.type === 'directory') {
      navigateToDirectory(item.name);
    } else if (item.link) {
      // Open GitHub link in new tab
      window.open(item.link, '_blank');
    } else if (item.content && item.name.endsWith('.txt')) {
      // Open text files in Notepad
      console.log(`Opening file in Notepad: ${item.name}`);
      setOpenedFile(item);
    } else {
      // For other files, show a message
      console.log(`Opening file: ${item.name}`);
      alert(`Opening ${item.name}...\n\nFile viewer functionality coming soon!`);
    }
  };
  
  // Render breadcrumb navigation
  const renderBreadcrumbs = () => {
    const pathParts = currentPath.split('/').filter(part => part);
    let builtPath = '';
    
    return (
      <div className="flex items-center text-xs text-gray-300 mb-2 overflow-x-auto">
        <span 
          className="px-1 hover:bg-[#333] cursor-pointer rounded"
          onClick={() => setCurrentPath('/home/kali/projects')}
        >
          /home/kali/projects
        </span>
        {pathParts.map((part, index) => {
          if (index < 3) return null; // Skip /home/kali/projects
          builtPath += `/${part}`;
          return (
            <React.Fragment key={index}>
              <span className="mx-1">/</span>
              <span 
                className="px-1 hover:bg-[#333] cursor-pointer rounded"
                onClick={() => setCurrentPath(`/home/kali${builtPath}`)}
              >
                {part}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  
  return (
    <>
      <div className="bg-[#1e1e2e] text-[#cdd6f4] rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-[#313244]">
        {/* Title bar */}
        <div className="bg-[#181825] p-2 flex justify-between items-center border-b border-[#313244]">
          <div className="flex items-center">
            <span className="mr-2 text-xl">📂</span>
            <span className="font-medium">File Explorer</span>
          </div>
          <button 
            className="hover:bg-[#313244] rounded p-1"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {/* Toolbar */}
        <div className="flex items-center px-4 py-2 bg-[#181825] border-b border-[#313244]">
          <button 
            className="mr-2 px-2 py-1 rounded hover:bg-[#313244] text-sm"
            onClick={() => navigateToDirectory('..')}
            disabled={currentPath === '/home/kali/projects'}
          >
            <span className="mr-1">⬅️</span> Back
          </button>
          <button className="mr-2 px-2 py-1 rounded hover:bg-[#313244] text-sm">
            <span className="mr-1">➡️</span> Forward
          </button>
          <button className="mr-2 px-2 py-1 rounded hover:bg-[#313244] text-sm">
            <span className="mr-1">🔄</span> Refresh
          </button>
          <button className="mr-2 px-2 py-1 rounded hover:bg-[#313244] text-sm">
            <span className="mr-1">🏠</span> Home
          </button>
        </div>
        
        {/* Path bar */}
        <div className="px-4 py-2 bg-[#1e1e2e] border-b border-[#313244]">
          {renderBreadcrumbs()}
        </div>
        
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-[#181825] border-r border-[#313244] p-2 overflow-y-auto">
            <div className="mb-2 font-bold text-xs text-gray-400 uppercase">Quick Access</div>
            <div className="mb-1 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">📁</span> Home
            </div>
            <div className="mb-1 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">📁</span> Documents
            </div>
            <div className="mb-1 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">📁</span> Downloads
            </div>
            <div className="mb-1 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">📁</span> Pictures
            </div>
            <div className="mb-4 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">📁</span> Music
            </div>
            
            <div className="mb-2 font-bold text-xs text-gray-400 uppercase">Devices</div>
            <div className="mb-1 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">💻</span> Local Disk (C:)
            </div>
            <div className="mb-1 pl-2 py-1 text-sm hover:bg-[#313244] rounded cursor-pointer">
              <span className="mr-2">💾</span> USB Drive
            </div>
          </div>
          
          {/* File list */}
          <div className="flex-1 p-2 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                  {/* Show loading message if file system is not ready */}
                  {Object.keys(fileSystem).length === 0 && (
                    <div className="col-span-3 flex justify-center items-center h-40 text-gray-400">
                      Loading file system...
                    </div>
                  )}
                  {/* Up directory option if not at root */}
                  {currentPath !== '/home/kali/projects' && (
                    <div 
                      className={`p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center`}
                      onClick={() => navigateToDirectory('..')}
                      onDoubleClick={() => navigateToDirectory('..')}
                    >
                      <span className="mr-2 text-xl">⬆️</span>
                      <span className="text-sm">..</span>
                    </div>
                  )}
                  
                  {/* Directory contents */}
                  {currentDirContents.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center ${selectedItem === item.name ? 'bg-[#313244]' : ''}`}
                      onClick={() => handleItemClick(item)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                    >
                      <span className="mr-2 text-xl">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm">{item.name}</span>
                        {item.type === 'file' && (
                          <span className="text-xs text-gray-400">{item.size}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          
          {/* Status bar */}
          <div className="px-4 py-1 bg-[#181825] border-t border-[#313244] text-xs text-gray-400">
            {currentDirContents.length} items
          </div>
        </div>
      </div>
    
    {/* Notepad component - outside main container for proper overlay */}
    {openedFile && (
      <Notepad 
        file={openedFile} 
        onClose={() => setOpenedFile(null)} 
      />
    )}
    </>
  );
};

export default FileExplorer;
