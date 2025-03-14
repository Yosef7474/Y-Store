import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'

function App() {

  return (
   <>
   <Navbar/>
   <ProductList/>
   <Footer/>
   </>
  )
}

export default App
