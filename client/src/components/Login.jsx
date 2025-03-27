import React from 'react'
import { createCookie, Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = React.useState({
      email: '',
       password: '' 
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          // 'http://localhost:5000/api/auth/login',
          'https://shopfloww.onrender.com/api/auth/login',
           formData);
        document.cookie = `token=${res.data.token}; path=/;`; // Save the token in a cookie
        alert('Login successful!');
        navigate('/');
        window.location.reload();
      } catch (err) {
        console.error('Error logging in:', err);
        alert('Invalid credentials');
      }
    };

    // value
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" name="email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           required className="mt-1 p-2 w-full border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password:</label>
          <input type="password" id="password" name="password" value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="mt-1 p-2 w-full border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        <p>Dont have account? <Link to="/register" className='text-blue-600'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login