import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Detail from './components/Detail.jsx'
import Aboutus from './components/Aboutus.jsx'
import AddProduct from './components/AddProduct.jsx'
import Footer from './components/Footer.jsx'
import Register from './components/Register.jsx'
import { Link } from 'react-router-dom'


const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path: 'login',
  element: <Login/>
},
{
  path: '/Detail/:id',
  element: <Detail/>
},
{
  path: '/aboutus',
  element: <Aboutus/>
},
{
  path: '/addproduct',
  element: <AddProduct/>
},
{
  path: '/register',
  element: <Register/>
}
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>


    
    <RouterProvider router={router}/>
    <Footer/>
    
    
    
  </StrictMode>
  
)
