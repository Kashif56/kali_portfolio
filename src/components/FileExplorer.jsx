import React, { useState, useEffect } from 'react';
import projects from '../data/projects';
import personalInfo from '../data/personal';
import Notepad from './Notepad';
// Import images from kashif folder
import kashifImage from '../assets/kashif/Kashif.png';
import kashifImage1 from '../assets/kashif/kashif_1.jpeg';

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
      
      // Get unique categories from all projects
      const uniqueCategories = [...new Set(projects.flatMap(project => project.categories))].sort();
      
      // Initialize projectsByCategory with all unique categories
      const projectsByCategory = {};
      uniqueCategories.forEach(category => {
        projectsByCategory[category] = [];
      });
      
      // Add pictures category if it doesn't exist
      if (!projectsByCategory['pictures']) {
        projectsByCategory['pictures'] = [];
      }
      
      // Categorize projects - now a project can be in multiple categories
      projects.forEach(project => {
        project.categories.forEach(category => {
          if (projectsByCategory[category]) {
            projectsByCategory[category].push(project);
          }
        });
      });
      
      // Initialize the file system with root directory
      const newFileSystem = {
        '/home/kali/projects': [],
        '/home/kali/documents': [],
        '/home/kali/downloads': [],
        '/home/kali/pictures': [],
        '/home/kali/music': [],
      };
      
      // Add all category folders to projects directory
      Object.keys(projectsByCategory).forEach(category => {
        newFileSystem['/home/kali/projects'].push({ 
          name: category, 
          type: 'directory', 
          icon: '📁' 
        });
        // Initialize empty array for each category path
        newFileSystem[`/home/kali/projects/${category}`] = [];
      });
      
      // Sort the folders alphabetically in the projects directory
      newFileSystem['/home/kali/projects'].sort((a, b) => a.name.localeCompare(b.name));
      
      // Add personal information file to documents folder
      newFileSystem['/home/kali/documents'].push({
        name: 'Kashif Mehmood.txt',
        type: 'file',
        icon: '📄',
        size: `${personalInfo.bio.length / 100} KB`,
        modified: formattedDate,
        content: formatPersonalInfo(personalInfo),
      });
      
      // Add images to pictures folder
      newFileSystem['/home/kali/pictures'] = [
        { 
          name: 'Kashif.png', 
          type: 'file', 
          icon: '🖼️', 
          size: '965 KB',
          modified: formattedDate,
          content: 'Image file',
          imageSrc: kashifImage
        },
        { 
          name: 'kashif_1.jpeg', 
          type: 'file', 
          icon: '🖼️', 
          size: '174 KB',
          modified: formattedDate,
          content: 'Image file',
          imageSrc: kashifImage1
        }
      ];
      
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
            projectId: project.id,
            technologies: project.technologies,
            link: project.link,
            image: project.image,
            images: project.images // Add the images array for the carousel
          });
        });
      });
      
      return newFileSystem;
    };
    
    setFileSystem(generateFileSystem());
  }, []);  // Empty dependency array means this runs once on mount
  
  // Format personal information for display
  const formatPersonalInfo = (info) => {
    return `Name: ${info.name}
Title: ${info.title}

${info.bio}

Location: ${info.location}
Email: ${info.email}

Education:
${info.education.map(edu => `• ${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}

Skills:
• Frontend: ${info.skills.frontend.join(', ')}
• Backend: ${info.skills.backend.join(', ')}
• Database: ${info.skills.database.join(', ')}
• Vector DBs: ${info.skills.vectorDBs.join(', ')}
• Deployment: ${info.skills.deployment.join(', ')}
• Version Control: ${info.skills.versionControl.join(', ')}

Social Media:
• GitHub: ${info.socialMedia.github}
• LinkedIn: ${info.socialMedia.linkedin}
• Instagram: ${info.socialMedia.instagram}

Freelance Platforms:
${info.freelancePlatforms.map(platform => `• ${platform.name}: ${platform.url} (Rating: ${platform.rating}, Jobs Completed: ${platform.jobsCompleted})`).join('\n')}`;
  };
  
  // Get current directory contents
  const currentDirContents = fileSystem[currentPath] || [];
  
  // Handle navigation to a directory
  const navigateToDirectory = (dirName) => {
    if (dirName === '..') {
      // Go up one level
      const pathParts = currentPath.split('/');
      pathParts.pop(); // Remove the last part
      const newPath = pathParts.join('/');
      setCurrentPath(newPath || '/'); // Ensure we don't end up with an empty path
    } else if (dirName === '/') {
      // Go to root
      setCurrentPath('/');
    } else if (dirName.startsWith('/')) {
      // Absolute path navigation (for sidebar)
      setCurrentPath(dirName);
    } else {
      // Navigate to the specified directory
      const newPath = `${currentPath}/${dirName}`.replace(/\/\/+/g, '/');
      setCurrentPath(newPath);
    }
    
    // Clear selection when navigating
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
  
  // State to track the currently opened image
  const [openedImage, setOpenedImage] = useState(null);

  // Handle double click on an item
  const handleItemDoubleClick = (item) => {
    if (item.type === 'directory') {
      navigateToDirectory(item.name);
    } else if (item.content && item.name.endsWith('.txt')) {
      // Open text files in Notepad
      console.log(`Opening file in Notepad: ${item.name}`);
      setOpenedFile(item);
    } else if (item.imageSrc && (item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.jpeg'))) {
      // Open image files in image viewer
      console.log(`Opening image: ${item.name}`);
      setOpenedImage(item);
    } else if (item.link) {
      // Open GitHub link in new tab
      window.open(item.link, '_blank');
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
          <button 
            className="mr-2 px-2 py-1 rounded hover:bg-[#313244] text-sm"
            onClick={() => {
              // Refresh the current directory by regenerating the file system
              const refreshFileSystem = () => {
                setFileSystem({});
                setTimeout(() => {
                  const generateFileSystem = () => {
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    
                    // Get unique categories from all projects
                    const uniqueCategories = [...new Set(projects.flatMap(project => project.categories))].sort();
                    
                    // Initialize projectsByCategory with all unique categories
                    const projectsByCategory = {};
                    uniqueCategories.forEach(category => {
                      projectsByCategory[category] = [];
                    });
                    
                    // Add pictures category if it doesn't exist
                    if (!projectsByCategory['pictures']) {
                      projectsByCategory['pictures'] = [];
                    }
                    
                    // Categorize projects - now a project can be in multiple categories
                    projects.forEach(project => {
                      project.categories.forEach(category => {
                        if (projectsByCategory[category]) {
                          projectsByCategory[category].push(project);
                        }
                      });
                    });
                    
                    // Initialize the file system with root directory
                    const newFileSystem = {
                      '/home/kali/projects': []
                    };
                    
                    // Add all category folders to root directory
                    Object.keys(projectsByCategory).forEach(category => {
                      // Add folder to root directory
                      newFileSystem['/home/kali/projects'].push({ 
                        name: category, 
                        type: 'directory', 
                        icon: '📁' 
                      });
                      // Initialize empty array for each category path
                      newFileSystem[`/home/kali/projects/${category}`] = [];
                    });
                    
                    // Sort the folders alphabetically in the root directory
                    newFileSystem['/home/kali/projects'].sort((a, b) => a.name.localeCompare(b.name));
                    
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
                          projectId: project.id,
                          technologies: project.technologies,
                          link: project.link
                        });
                      });
                    });
                    
                    // Make sure pictures folder exists
                    if (!newFileSystem['/home/kali/projects/pictures']) {
                      newFileSystem['/home/kali/projects/pictures'] = [];
                    }
                    
                    return newFileSystem;
                  };
                  
                  setFileSystem(generateFileSystem());
                }, 500); // Short delay to show loading state
              };
              
              refreshFileSystem();
            }}
          >
            <span className="mr-1">🔄</span> Refresh
          </button>
          <button 
            className="mr-2 px-2 py-1 rounded hover:bg-[#313244] text-sm"
            onClick={() => {
              // Navigate to the home directory
              setCurrentPath('/home/kali/projects');
              setSelectedItem(null);
            }}
          >
            <span className="mr-1">🏠</span> Home
          </button>
        </div>
        
        {/* Path bar */}
        <div className="px-4 py-2 bg-[#1e1e2e] border-b border-[#313244]">
          {renderBreadcrumbs()}
        </div>
        
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Quick access sidebar */}
          <div className="w-[200px] bg-[#11111b] border-r border-[#313244] overflow-y-auto">
            <div className="p-2 text-xs text-gray-400 border-b border-[#313244]">QUICK ACCESS</div>
            <div className="p-2 space-y-1">
              <div 
                className="p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center"
                onClick={() => navigateToDirectory('/home/kali/projects')}
              >
                <span className="mr-2 text-xl">📁</span>
                <span className="text-sm">Home</span>
              </div>
              <div 
                className="p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center"
                onClick={() => navigateToDirectory('/home/kali/documents')}
              >
                <span className="mr-2 text-xl">📁</span>
                <span className="text-sm">Documents</span>
              </div>
              <div 
                className="p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center"
                onClick={() => navigateToDirectory('/home/kali/downloads')}
              >
                <span className="mr-2 text-xl">📁</span>
                <span className="text-sm">Downloads</span>
              </div>
              <div 
                className="p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center"
                onClick={() => navigateToDirectory('/home/kali/pictures')}
              >
                <span className="mr-2 text-xl">📁</span>
                <span className="text-sm">Pictures</span>
              </div>
              <div 
                className="p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center"
                onClick={() => navigateToDirectory('/home/kali/music')}
              >
                <span className="mr-2 text-xl">📁</span>
                <span className="text-sm">Music</span>
              </div>
            </div>
            <div className="p-2 text-xs text-gray-400 border-b border-t border-[#313244] mt-2">DEVICES</div>
            <div className="p-2 space-y-1">
              <div className="p-2 rounded cursor-pointer hover:bg-[#313244] flex items-center">
                <span className="mr-2 text-xl">🖥️</span>
                <span className="text-sm">Local Disk</span>
              </div>
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
    
    {/* Image Viewer component - outside main container for proper overlay */}
    {openedImage && (
      <div className="fixed inset-0 flex items-center justify-center z-[9999]" style={{ pointerEvents: 'none' }}>
        <div 
          className="bg-[#1e1e2e] border border-[#313244] rounded shadow-lg w-4/5 max-w-4xl h-4/5 flex flex-col"
          style={{
            pointerEvents: 'auto',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Image viewer header */}
          <div className="bg-[#181825] border-b border-[#313244] p-2 flex justify-between items-center cursor-grab">
            <div className="flex items-center">
              <span className="mr-2 text-xl">🖼️</span>
              <span className="font-medium">{openedImage.name} - Image Viewer</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-2 py-1 hover:bg-[#313244] rounded">−</button>
              <button className="px-2 py-1 hover:bg-[#313244] rounded">🔸</button>
              <button 
                className="px-2 py-1 hover:bg-[#f38ba8] hover:text-white rounded"
                onClick={() => setOpenedImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Image content */}
          <div className="flex-1 p-4 overflow-auto bg-[#11111b] flex items-center justify-center">
            <img 
              src={openedImage.imageSrc} 
              alt={openedImage.name}
              className="max-w-full max-h-full object-contain" 
            />
          </div>
          
          {/* Image viewer status bar */}
          <div className="bg-[#181825] border-t border-[#313244] px-4 py-1 text-xs text-gray-400 flex justify-between">
            <div>
              {openedImage.size} | {openedImage.modified || 'Unknown date'}
            </div>
            <div>
              Image Viewer
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default FileExplorer;
