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
      <div className="flex flex-col min-h-screen">
        <div className='fixed z-10 w-full'>
        <Navbar />
        </div>
        
        <main className="flex-grow">
          {children}
          <Outlet />
        </main>
       
      </div>
    </AuthProvider>
   
   
   </>
  )
}

export default App
