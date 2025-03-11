import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Detail from './components/Detail.jsx'
import Aboutus from './components/Aboutus.jsx'
import AddProduct from './components/AddProduct.jsx'
import Footer from './components/Footer.jsx'



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
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router}/>
    <Footer/>
    
  </StrictMode>
)
