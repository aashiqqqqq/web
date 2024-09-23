'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import { useState, useEffect } from 'react'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

const MatrixBackground = () => {
  const [columns, setColumns] = useState<string[][]>([])

  useEffect(() => {
    const characters = '01'
    const columnCount = Math.floor(window.innerWidth / 20)
    const rowCount = Math.floor(window.innerHeight / 20)

    const createColumn = () => {
      return Array.from({ length: rowCount }, () => characters[Math.floor(Math.random() * characters.length)])
    }

    const initialColumns = Array.from({ length: columnCount }, createColumn)
    setColumns(initialColumns)

    const intervalId = setInterval(() => {
      setColumns(prevColumns => {
        return prevColumns.map(column => {
          const newColumn = [...column]
          newColumn.pop()
          newColumn.unshift(characters[Math.floor(Math.random() * characters.length)])
          return newColumn
        })
      })
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black bg-opacity-80">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="absolute top-0 text-green-500 text-opacity-30 text-xs" style={{ left: `${columnIndex * 20}px` }}>
          {column.map((char, charIndex) => (
            <div key={charIndex} style={{ height: '20px' }}>{char}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  const router = useRouter()

  const handleHackClick = () => {
    router.push('/cyber-maze')
  }

  return (
    <div className={`bg-black text-green-500 ${orbitron.className} relative`}>
      <MatrixBackground />
      <div className="relative z-10">
        <Navbar onHackClick={handleHackClick} />
        <motion.section 
          className="h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
        </motion.section>
        <motion.section 
          className="h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Projects />
        </motion.section>
        <motion.section 
          className="h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Skills />
        </motion.section>
        <motion.section 
          className="h-screen"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Contact />
        </motion.section>
      </div>
    </div>
  )
}