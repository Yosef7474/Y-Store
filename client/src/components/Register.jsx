import React from 'react'
import registerImage from '../assets/register.jpg'


const Register = () => {
  return (
    <>
      <div className="flex w-full h-screen bg-gray-100">
        <div className="w-1/2 max-sm:min-w-full p-8 h-screen flex flex-col justify-center items-center bg-white shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Create an Account</h1>
          <form action="post" className="w-full max-w-md">
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
              <input type="text" id="username" name="username" required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input type="password" id="password" name="password" required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">Register</button>
          </form>
        </div>
        <div className="w-1/2 h-screen">
          <img className="w-full h-full object-cover max-sm:hidden" src={registerImage} alt="Register" />
        </div>
        
      </div>
    </>
  )
}

export default Register