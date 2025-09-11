import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import { AuthProvider } from './context/authContext'
import { Outlet } from 'react-router-dom'
import Home from './components/Home'

function App({children}) {

  return (
    
   <>
   <AuthProvider>

          <Navbar />
        <main className="min-h-screen mx-auto">
          {children}
          <Outlet />
        </main>
        <Footer />
    </AuthProvider>
   </>
  )
}

export default App
