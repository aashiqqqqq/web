import React from 'react'

interface NavbarProps {
  onHackClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHackClick }) => {
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <button 
          onClick={onHackClick}
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Hack
        </button>
      </div>
    </nav>
  )
}

export default Navbar