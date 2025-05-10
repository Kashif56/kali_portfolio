import React, { useState } from 'react';
import projects from '../data/projects';
import experiences from '../data/experience';
import personalInfo from '../data/personal';
import FileExplorer from './FileExplorer';

const ContentRenderer = ({ activeContent }) => {
  const [viewMode, setViewMode] = useState('default'); // 'default' or 'explorer'
  
  if (!activeContent) return null;

  const renderProjects = () => {
    if (viewMode === 'explorer') {
      return (
        <div className="h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-mono font-semibold text-[#00ff00]">File Explorer</h2>
            <button 
              onClick={() => setViewMode('default')}
              className="px-3 py-1 bg-[#0d1117] text-[#00ff00] hover:bg-[#1e1e2e] hover:text-[#00ffaa] font-mono text-sm border border-[#30363d] rounded transition-colors"
            >
              Switch to Card View
            </button>
          </div>
          <div className="h-[calc(100%-40px)]">
            <FileExplorer />
          </div>
        </div>
      );
    }
    
    return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-mono font-semibold text-[#00ff00]">My Projects</h2>
        <button 
          onClick={() => setViewMode('explorer')}
          className="px-3 py-1 bg-[#0d1117] text-[#00ff00] hover:bg-[#1e1e2e] hover:text-[#00ffaa] font-mono text-sm border border-[#30363d] rounded transition-colors"
        >
          Switch to Explorer View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#1e1e2e] p-6 rounded-md border border-[#30363d] hover:border-[#00ff00] transition-colors shadow-lg">
            <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3">{project.title}</h3>
            <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">{project.description}</p>
            <div className="mb-4">
              <h4 className="text-sm font-mono text-gray-400 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-[#0d1117] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-4 py-2 bg-[#0d1117] text-[#00ff00] hover:bg-[#1e1e2e] hover:text-[#00ffaa] font-mono text-sm border border-[#30363d] rounded transition-colors"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
  };

  const renderExperience = () => (
    <div className="space-y-8">

      
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-[#1e1e2e] p-6 rounded-md border border-[#30363d] hover:border-[#00ff00] transition-colors shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00]">{exp.title}</h3>
              <span className="text-gray-400 font-mono text-sm bg-[#0d1117] px-3 py-1 rounded border border-[#30363d] mt-2 md:mt-0">{exp.duration}</span>
            </div>
            <h4 className="text-md font-mono text-[#00bfff] mb-3">{exp.company}</h4>
            <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">{exp.description}</p>
            <div className="mt-4">
              <h4 className="text-sm font-mono text-gray-400 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-[#0d1117] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-8">

      
      <div className="bg-[#1e1e2e] p-8 rounded-md border border-[#30363d] shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="w-40 h-40 mx-auto bg-[#0d1117] rounded-full overflow-hidden border-2 border-[#00ff00]">
              {/* Placeholder for profile image */}
              <div className="w-full h-full flex items-center justify-center text-[#00ff00]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
              <h3 className="text-center text-lg font-mono font-semibold text-[#00ff00]">{personalInfo.name}</h3>
              <p className="text-center text-[#00bfff] font-mono">{personalInfo.title}</p>
              <p className="text-center text-gray-400 font-mono mt-2">{personalInfo.location}</p>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] mb-4">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Bio</h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-line">{personalInfo.bio}</p>
            </div>
            
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] mb-4">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d]">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Education</h3>
              <div className="space-y-3">
                {personalInfo.education.map((edu, index) => (
                  <div key={index} className="bg-[#1e1e2e] p-4 rounded-md border border-[#30363d]">
                    <h4 className="font-mono text-[#00ff00]">{edu.degree}</h4>
                    <p className="text-sm font-mono text-[#00bfff] mt-1">{edu.institution}</p>
                    <p className="text-xs font-mono text-gray-400 mt-1 bg-[#0d1117] inline-block px-3 py-1 rounded border border-[#30363d]">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">

      
      <div className="bg-[#1e1e2e] p-8 rounded-md border border-[#30363d] shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-[#0d1117] p-4 rounded-md border border-[#30363d]">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Get In Touch</h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed">
                Feel free to reach out for collaborations, opportunities, or just to say hello!
              </p>
            </div>
            
            <div className="bg-[#0d1117] p-4 rounded-md border border-[#30363d]">
              <h4 className="text-md font-mono text-[#00bfff] mb-2 border-b border-[#30363d] pb-2">Email</h4>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="text-[#00ff00] font-mono text-sm hover:text-[#00ffaa] transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            
            <div className="bg-[#0d1117] p-4 rounded-md border border-[#30363d]">
              <h4 className="text-md font-mono text-[#00bfff] mb-2 border-b border-[#30363d] pb-2">Location</h4>
              <p className="text-gray-300 font-mono text-sm">{personalInfo.location}</p>
            </div>
            
            <div className="bg-[#0d1117] p-4 rounded-md border border-[#30363d]">
              <h4 className="text-md font-mono text-[#00bfff] mb-2 border-b border-[#30363d] pb-2">Social</h4>
              <div className="flex space-x-4">
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#00ff00] hover:text-[#00ffaa] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#00ff00] hover:text-[#00ffaa] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1117] p-6 rounded-md border border-[#30363d]">
            <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-4 border-b border-[#30363d] pb-2">Contact Form</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#30363d] rounded-md text-gray-300 font-mono text-sm focus:outline-none focus:border-[#00ff00]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#30363d] rounded-md text-gray-300 font-mono text-sm focus:outline-none focus:border-[#00ff00]"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#30363d] rounded-md text-gray-300 font-mono text-sm focus:outline-none focus:border-[#00ff00]"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-2 bg-[#00aa00] hover:bg-[#008800] text-black font-mono font-bold rounded-md transition-colors focus:outline-none border border-[#30363d]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  switch (activeContent) {
    case 'projects':
      return renderProjects();
    case 'experience':
      return renderExperience();
    case 'about':
      return renderAbout();
    case 'contact':
      return renderContact();
    default:
      return null;
  }
};

export default ContentRenderer;
