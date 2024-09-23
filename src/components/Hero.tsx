import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  const [displayName, setDisplayName] = useState('')
  const resumeUrl = 'web/src/externalFiles/aashiq_resume.pdf'
  const realName = 'Mohammed Aashiq Nawaz'

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-={}[]|;:,.<>?'
    let glitchInterval: NodeJS.Timeout
    let displayInterval: NodeJS.Timeout

    const glitchEffect = () => {
      const glitchedName = realName
        .split('')
        .map(char => Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
        .join('')
      setDisplayName(glitchedName)
    }

    const startGlitching = () => {
      glitchInterval = setInterval(glitchEffect, 100)
      
      setTimeout(() => {
        clearInterval(glitchInterval)
        setDisplayName(realName)
        
        displayInterval = setTimeout(startGlitching, 3000)
      }, 2000)
    }

    startGlitching()

    return () => {
      clearInterval(glitchInterval)
      clearTimeout(displayInterval)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-green-500 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
          {displayName}
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Aspiring Vulnerability Assessor and Penetration Tester
        </p>
        <motion.a 
          href={resumeUrl} 
          download 
          className="bg-green-500 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors duration-300 inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Resume
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero