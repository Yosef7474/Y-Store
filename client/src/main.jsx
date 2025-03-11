import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import ProductList from './components/ProductList.jsx'


const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{path: 'login',
element: <Login/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>
)
