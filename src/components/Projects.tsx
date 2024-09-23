import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<number>(0)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const projects: Project[] = [
    {
      id: 1,
      title: "Project 1",
      description: "Detailed description of Project 1. This innovative solution addresses key challenges in the industry.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://link-to-project-1.com"
    },
    {
      id: 2,
      title: "Project 2",
      description: "Comprehensive overview of Project 2. This cutting-edge application revolutionizes user experience.",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      link: "https://link-to-project-2.com"
    },
    {
      id: 3,
      title: "Project 3",
      description: "In-depth explanation of Project 3. This robust system provides scalable solutions for enterprise needs.",
      technologies: ["Angular", "Django", "MySQL"],
      link: "https://link-to-project-3.com"
    },
    // Add more projects here
  ]

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold mb-12 text-center">Projects</h1>
      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-lg shadow-lg cursor-pointer"
            onClick={togglePopup}
          >
            <h3 className="text-3xl font-bold mb-4">{projects[currentProject].title}</h3>
            <p className="text-lg mb-4">{projects[currentProject].description}</p>
            <div className="text-green-500">
              Technologies used: {projects[currentProject].technologies.join(', ')}
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevProject}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-green-500 text-black p-2 rounded-full"
        >
          &#8592;
        </button>
        <button
          onClick={nextProject}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-green-500 text-black p-2 rounded-full"
        >
          &#8594;
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative">
            <h3 className="text-3xl font-bold mb-4 text-white">{projects[currentProject].title}</h3>
            <p className="text-lg mb-4 text-white">{projects[currentProject].description}</p>
            <div className="text-green-500 mb-4">
              Technologies used: {projects[currentProject].technologies.join(', ')}
            </div>
            <button
              onClick={() => window.location.href = projects[currentProject].link}
              className="absolute bottom-4 right-4 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Go
            </button>
            <button
              onClick={togglePopup}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects