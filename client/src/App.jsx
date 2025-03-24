import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import { AuthProvider } from './context/authContext'
import { Outlet } from 'react-router-dom'

function App() {

  return (
   <>
   <AuthProvider>
   <Navbar/>
   <ProductList/>
   <Outlet/>
   <Footer/>
   </AuthProvider>
   
   
   </>
  )
}

export default App
