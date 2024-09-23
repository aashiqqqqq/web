// import React from 'react'

// interface CyberMazeModalProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }

// const CyberMazeModal: React.FC<CyberMazeModalProps> = ({ isOpen, setIsOpen }) => {
//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-4">Welcome to CyberMaze</h2>
//         <p className="mb-4">This is where you&apos;d implement your CyberMaze game or experience.</p>
//         <button 
//           onClick={() => setIsOpen(false)}
//           className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CyberMazeModal