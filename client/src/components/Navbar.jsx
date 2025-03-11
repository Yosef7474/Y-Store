import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-lg font-bold">Marketplace</Link>
            <div className="flex space-x-4">             
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                <Link to="/profile" className="text-gray-300 hover:text-white">Login</Link>
                <Link to="/addproduct" className="text-gray-300 hover:text-white bg-blue-500 p-1 rounded-md">Sell</Link>
                <Link to="/aboutus" className="text-gray-300 hover:text-white">About us</Link>
                
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar