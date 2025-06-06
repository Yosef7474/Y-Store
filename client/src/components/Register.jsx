import React from 'react'
import registerImage from '../assets/register.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import getBaseUrl from '../utils/baseUrl'
import { useEffect } from 'react'


const Register = () => {

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  })

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(
        `${getBaseUrl()}/api/auth/register`,
         formdata);
      console.log(res);
      alert('Register successful!');
      // Assuming the response contains a token
      document.cookie = `token=${res.data.token}; path=/;`;
      navigate('/');
      window.location.reload();
    }catch(err){
      console.error('Error registering:', err);
      alert('Invalid credentials');
    }
    
  }
  return (
    <>
      <div className="flex w-full h-screen bg-gray-100">
        <div className="w-1/2 max-sm:min-w-full p-8 h-screen flex flex-col justify-center items-center bg-white shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Create an Account</h1>
          <form onSubmit={handleSubmit} action="post" className="w-full max-w-md">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">name:</label>
              <input type="text" id="username" name="name"
              value={formdata.name}
              onChange={(e) => setFormdata({...formdata, name: e.target.value})}
              required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input type="email" id="email" name="email"
              value={formdata.email}
              onChange={(e) => setFormdata({...formdata, email: e.target.value})}
              required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input type="password" id="password" name="password" 
              value={formdata.password}
              onChange={(e) => setFormdata({...formdata, password: e.target.value})}
              required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
              <input type="address" id="address" name="address" 
              value={formdata.address}
              onChange={(e) => setFormdata({...formdata, address: e.target.value})}
              required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">phone:</label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={formdata.phone}
                onChange={(e) => {
                  const phone = e.target.value;
                  if (phone.length > 10) {
                    alert("invalid phone number");
                    return;
                  }
                  setFormdata({ ...formdata, phone });
                }}
                onBlur={() => {
                  if (
                    formdata.phone.length !== 10 ||
                    !(formdata.phone.startsWith("09") || formdata.phone.startsWith("07"))
                  ) {
                    alert("Invalid phone number. The number has to start with 09 or 07 and be 10 digits long.");
                  }
                }}
                required
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">Register</button>
            
          </form>
          <p>Already have account? <Link to="/Login" className='text-blue-600' >Login</Link></p> 
        </div>
        <div className="w-1/2 h-screen">
          <img className="w-full h-full object-cover max-sm:hidden" src={registerImage} alt="Register" />
        </div>        
      </div>
    </>
  )
}

export default Register
