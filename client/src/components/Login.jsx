import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" name="email" required className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input type="password" id="password" name="password" required className="mt-1 p-2 w-full border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        <p>Dont have account? <Link to="/register" className='text-blue-600'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login