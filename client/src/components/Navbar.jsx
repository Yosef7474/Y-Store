import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">Marketplace</Link>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="p-2 rounded-md"
            />
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
            <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/add-product" className="text-gray-300 hover:text-white bg-blue-500 p-1 rounded-md">Sell</Link>
              <Link to="/about-us" className="text-gray-300 hover:text-white">About us</Link>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
            <Link to="/register" className="block text-gray-300 hover:text-white">Login</Link>
            <Link to="/add-product" className="block text-gray-300 hover:text-white bg-blue-500 p-1 rounded-md">Sell</Link>
            <Link to="/about-us" className="block text-gray-300 hover:text-white">About us</Link>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar