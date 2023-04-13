import React, { useEffect, useState } from 'react'
import Login from './Components/Login'
import '../Farmer_Project/Combine.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Components/Home'
import SpaceTop from './Components/SpaceTop'
import About from './Components/About'
import Navbar from './Components/Navbar'
import CropInput from './Components/CropInput'

import Alert from './Components/Alert'
import { Snackbar } from '@mui/material'

function Farm_app() {

  const [popup, setPopup] = useState({
    pop: false,
    pop_msg: "",
    pop_type: ""
  })

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() =>{
    window.scrollTo(0,0)
  },[navigate])
  return (
    <>
      <Navbar />
      <SpaceTop />
      <Routes>
        <Route path="/" element={<Home signUp={false} setOpen={setOpen} setPopup={setPopup} />} />
        <Route path="/farm-login" element={<Login signUp={false} open={open} setOpen={setOpen} popup={popup} setPopup={setPopup} />} />
        <Route path="/farm-CreateAccount" element={<Login signUp={true} open={open} setOpen={setOpen} popup={popup} setPopup={setPopup} />} />
        <Route path="/farm-about" element={<About />} />
        <Route path="/activate_crop" element={<CropInput />} />
      </Routes>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={popup.pop_type} sx={{ width: '100%' }}>
          {popup.pop_msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Farm_app
