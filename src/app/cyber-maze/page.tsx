'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { FaBug, FaLaptop } from 'react-icons/fa'

interface MazeCellProps {
  isPath: boolean;
  isBug: boolean;
  isComputer: boolean;
}

const MazeCell: React.FC<MazeCellProps> = ({ isPath, isBug, isComputer }) => (
  <div 
    className={`w-4 h-4 sm:w-5 sm:h-5 border border-gray-600 ${
      isPath ? 'bg-gray-800' : 'bg-gray-900'
    } flex items-center justify-center transition-all duration-300 hover:bg-gray-700`}
  >
    {isBug && <FaBug className="text-lime-500 text-xs sm:text-sm animate-pulse" />}
    {isComputer && <FaLaptop className="text-blue-500 text-xs sm:text-sm" />}
  </div>
)

interface GlitchyTextProps {
  text: string;
}

const GlitchyText: React.FC<GlitchyTextProps> = ({ text }) => {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitched = text
        .split('')
        .map((char) => (Math.random() > 0.8 ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char))
        .join('')
      setGlitchText(glitched)
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [text])

  return (
    <div
      className="text-2xl md:text-4xl font-bold text-center animate-pulse"
      style={{
        color: '#39ff14',
        textShadow: '0 0 5px #39ff14, 0 0 10px #39ff14',
        fontFamily: 'monospace',
      }}
      aria-live="polite"
    >
      {glitchText}
    </div>
  )
}

interface HoveredCell {
  x: number;
  y: number;
}

const HackingBackground: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>([])
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null)

  const generateGrid = useCallback(() => {
    const characters = '01'
    const newGrid: string[][] = []
    const rows = Math.ceil(window.innerHeight / 20)
    const cols = Math.ceil(window.innerWidth / 20)

    for (let i = 0; i < rows; i++) {
      const row: string[] = []
      for (let j = 0; j < cols; j++) {
        row.push(characters[Math.floor(Math.random() * characters.length)])
      }
      newGrid.push(row)
    }
    return newGrid
  }, [])

  useEffect(() => {
    setGrid(generateGrid())
    const handleResize = () => setGrid(generateGrid())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [generateGrid])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / 20)
    const y = Math.floor((event.clientY - rect.top) / 20)
    setHoveredCell({ x, y })
  }, [])

  const handleMouseLeave = () => setHoveredCell(null)

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {grid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div 
              key={`${i}-${j}`} 
              className={`w-5 h-5 flex items-center justify-center text-xs
                ${hoveredCell && Math.abs(i - hoveredCell.y) + Math.abs(j - hoveredCell.x) < 5
                  ? 'text-lime-500 animate-pulse'
                  : 'text-gray-700'}`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

interface FileSystem {
  [key: string]: string | FileSystem;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [currentDir, setCurrentDir] = useState('~')
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState('')

  const fileSystem: FileSystem = {
    '/': {
      'home': {
        'kali': {}
      },
      'etc': {},
      'var': {},
      'usr': {},
      'admin': {
        'flag.txt': 'This portfolio website was created using only AI tools. The tools used to create this website are Cursor AI, Claude, ChatGPT, and Vercel v0. All of these tools are free versions, and it took 3 days to build this project from scratch.'
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullPrompt = `┌──(kali㉿kali)-[${currentDir}]\n└─$ ${input}`
    setOutput((prevOutput) => [...prevOutput, fullPrompt])
    processCommand(input)
    setInput('')
  }

  const processCommand = (command: string) => {
    const [cmd, ...args] = command.split(' ')
    switch (cmd) {
      case 'cd':
        changeDirectory(args[0])
        break
      case 'ls':
        listDirectory()
        break
      case 'cat':
        catFile(args[0])
        break
      default:
        setOutput((prevOutput) => [...prevOutput, `Command not found: ${cmd}`])
    }
  }

  const changeDirectory = (dir: string) => {
    if (dir === '..') {
      if (currentDir !== '/') {
        setCurrentDir(currentDir.split('/').slice(0, -1).join('/') || '/')
      }
    } else if (dir === '~') {
      setCurrentDir('~')
    } else {
      const newPath = currentDir === '~' ? `/home/kali/${dir}` : 
                      currentDir === '/' ? `/${dir}` : `${currentDir}/${dir}`
      if (getDirectoryContents(newPath)) {
        setCurrentDir(newPath)
      } else {
        setOutput((prevOutput) => [...prevOutput, `cd: ${dir}: No such file or directory`])
      }
    }
  }

  const listDirectory = () => {
    const contents = getDirectoryContents(currentDir)
    if (contents) {
      setOutput((prevOutput) => [...prevOutput, Object.keys(contents).join(' ')])
    }
  }

  const catFile = (filename: string) => {
    const contents = getDirectoryContents(currentDir)
    if (contents && contents[filename]) {
      if (typeof contents[filename] === 'string') {
        setPopupContent(contents[filename] as string)
        setShowPopup(true)
      } else {
        setOutput((prevOutput) => [...prevOutput, `cat: ${filename}: Is a directory`])
      }
    } else {
      setOutput((prevOutput) => [...prevOutput, `cat: ${filename}: No such file or directory`])
    }
  }

  const getDirectoryContents = (path: string): FileSystem | null => {
    if (path === '~') path = '/home/kali'
    const parts = path.split('/').filter(p => p !== '')
    let current: FileSystem | string = fileSystem['/']
    for (const part of parts) {
      if (typeof current === 'object' && part in current) {
        current = current[part]
      } else {
        return null
      }
    }
    return typeof current === 'object' ? current : null
  }

  return (
    <div className="p-4 rounded-lg w-full max-w-2xl h-96 overflow-auto font-mono text-red-500 relative">
      <div className="mb-4">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="whitespace-pre">┌──(kali㉿kali)-[{currentDir}]
└─$ </span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full bg-transparent text-red-500 focus:outline-none ml-0"
          placeholder=""
          autoFocus
        />
      </form>
      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl mb-2">File Contents</h2>
            <p>{popupContent}</p>
            <button 
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const CyberMazePage: React.FC = () => {
  const [bugPosition, setBugPosition] = useState({ x: 1, y: 1 })
  const [completed, setCompleted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)

  const maze: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      let newX = bugPosition.x
      let newY = bugPosition.y

      switch (key) {
        case 'ArrowUp':
          newY = Math.max(0, bugPosition.y - 1)
          break
        case 'ArrowDown':
          newY = Math.min(maze.length - 1, bugPosition.y + 1)
          break
        case 'ArrowLeft':
          newX = Math.max(0, bugPosition.x - 1)
          break
        case 'ArrowRight':
          newX = Math.min(maze[0].length - 1, bugPosition.x + 1)
          break
        default:
          return
      }

      if (maze[newY][newX] !== 1) {
        setBugPosition({ x: newX, y: newY })
        if (maze[newY][newX] === 2) {
          setCompleted(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [bugPosition, maze])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
      <HackingBackground />
      {showInstructions && (
        <div className="bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg text-green-500 mb-8 max-w-md z-20">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the arrow keys to navigate the bug through the maze.</li>
            <li>Avoid walls (dark cells) and find the path to the computer (blue icon).</li>
            <li>Once you reach the computer, you&apos;ll gain access to the terminal.</li>
            <li>In the terminal, use Linux commands to explore and find the flag.</li>
            <li>Common commands: cd, ls, cat</li>
          </ul>
          <button 
            onClick={() => setShowInstructions(false)}
            className="mt-6 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Start Game
          </button>
        </div>
      )}
      {!completed && !showInstructions && (
        <div className="mb-8 relative z-10 overflow-auto max-h-[80vh] max-w-[90vw]" role="img" aria-label="Cyber maze with navigable bug">
          <div className="transform scale-100 origin-center p-4 bg-gray-900 bg-opacity-50 rounded-lg shadow-lg">
            {maze.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, cellIndex) => (
                  <MazeCell
                    key={cellIndex}
                    isPath={cell === 0}
                    isBug={rowIndex === bugPosition.y && cellIndex === bugPosition.x}
                    isComputer={cell === 2}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {completed && (
        <>
          <GlitchyText text="ACCESS GRANTED" />
          <Terminal />
        </>
      )}
      <Link href="/" className="absolute bottom-4 left-4 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors z-20">
        Back
      </Link>
    </div>
  )
}

export default CyberMazePage