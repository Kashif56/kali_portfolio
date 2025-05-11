import React, { useState } from 'react';
import projects from '../data/projects';
import experiences from '../data/experience';
import personalInfo from '../data/personal';
import FileExplorer from './FileExplorer';
import kashifImage from '../assets/kashif/Kashif.png';

const ContentRenderer = ({ activeContent }) => {
  const [viewMode, setViewMode] = useState('explorer'); // Changed default to 'explorer' instead of 'default'
  
  if (!activeContent) return null;

  const renderProjects = () => {
    if (viewMode === 'explorer') { // This is now the default view
      return (
        <div className="h-full">
          <div className="flex justify-between items-center mb-4">
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
            <p className="text-gray-300 mb-4 font-sans text-sm leading-relaxed">{project.description}</p>
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
              {/* Profile image */}
              <img 
                src={kashifImage} 
                alt="Kashif Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
              <h3 className="text-center text-lg font-mono font-semibold text-[#00ff00]">{personalInfo.name}</h3>
              <p className="text-center text-[#00bfff] font-mono">{personalInfo.title}</p>
              <p className="text-center text-gray-400 font-sans mt-2">{personalInfo.location}</p>
            </div>
            
            {/* Highlights Section */}
            <div className="mt-4 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
              <h3 className="text-center text-md font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Highlights</h3>
              <div className="space-y-2">
                {personalInfo.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-[#00ff00] mr-2">✓</span>
                    <span className="text-sm font-sans text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-4 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
              <h3 className="text-center text-md font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Connect With Me</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <a 
                  href={personalInfo.socialMedia.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-2 py-1 bg-[#1e1e2e] rounded text-[#cdd6f4] border border-[#30363d] hover:bg-[#313244] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
                <a 
                  href={personalInfo.socialMedia.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-2 py-1 bg-[#1e1e2e] rounded text-[#cdd6f4] border border-[#30363d] hover:bg-[#313244] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href={personalInfo.socialMedia.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-2 py-1 bg-[#1e1e2e] rounded text-[#cdd6f4] border border-[#30363d] hover:bg-[#313244] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
            
            {/* Freelance Platform Links */}
            <div className="mt-4 p-3 bg-[#0d1117] rounded-md border border-[#30363d]">
              <h3 className="text-center text-md font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Hire Me On</h3>
              <div className="space-y-2">
                {personalInfo.freelancePlatforms.map((platform, index) => (
                  <a 
                    key={index} 
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#1e1e2e] p-2 rounded-md border border-[#30363d] hover:bg-[#313244] transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-mono text-[#00ff00] text-sm">{platform.name}</h4>
                      {platform.rating && (
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-xs font-mono text-gray-300">{platform.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-mono text-gray-400 mt-1">{platform.jobsCompleted} jobs completed</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] mb-4">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Bio</h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-line">{personalInfo.bio}</p>
            </div>
            
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] mb-4">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Skills</h3>
              
              {/* Frontend Skills */}
              <div className="mb-4">
                <h4 className="text-md font-mono text-[#00bfff] mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.frontend.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Backend Skills */}
              <div className="mb-4">
                <h4 className="text-md font-mono text-[#00bfff] mb-2">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.backend.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Database Skills */}
              <div className="mb-4">
                <h4 className="text-md font-mono text-[#00bfff] mb-2">Databases</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.database.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Vector DBs */}
              <div className="mb-4">
                <h4 className="text-md font-mono text-[#00bfff] mb-2">Vector Databases</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.vectorDBs.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Deployment */}
              <div className="mb-4">
                <h4 className="text-md font-mono text-[#00bfff] mb-2">Deployment</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.deployment.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Version Control */}
              <div>
                <h4 className="text-md font-mono text-[#00bfff] mb-2">Version Control</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.versionControl.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#1e1e2e] text-xs font-mono rounded text-[#00ff00] border border-[#30363d]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] mb-4">
              <h3 className="text-lg font-mono font-semibold text-[#00ff00] mb-3 border-b border-[#30363d] pb-2">Why Choose Me</h3>
              <div className="space-y-2">
                {personalInfo.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <span className="text-[#00ff00] mr-2 mt-1">✓</span>
                    <span className="text-sm font-mono text-gray-300">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-[#0d1117] rounded-md border border-[#30363d] mb-4">
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
