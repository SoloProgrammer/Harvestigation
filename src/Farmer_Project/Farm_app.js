import React from 'react'
import Login from './Components/Login'
import '../Farmer_Project/Combine.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import SpaceTop from './Components/SpaceTop'
import About from './Components/About'
import Navbar from './Components/Navbar'
import CropInput from './Components/CropInput'


function Farm_app() {
  return (
    <>
      <Navbar />
      <SpaceTop />
      <Routes>
        <Route path="/" element={<Home signUp={false} />} />
        <Route path="/farm-login" element={<Login signUp={false} />} />
        <Route path="/farm-CreateAccount" element={<Login signUp={true} />} />
        <Route path="/farm-CreateAccount" element={<Login signUp={true} />} />
        <Route path="/farm-about" element={<About />} />
        <Route path="/activate_crop" element={<CropInput />} />
      </Routes>

    </>
  )
}

export default Farm_app
