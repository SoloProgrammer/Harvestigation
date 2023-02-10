import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';


function Navbar() {

   const location = useLocation()

   return (
      <div className='navbar'>
         <Link to="/">
            <div className="brand_side">
               <div className="brand_name">
                  <b>Harvestigation</b>
               </div>
               <div className="brand_logo">
               <div className="logo">
                    <img src="https://webstockreview.net/images/clover-clipart-daun-11.png" alt="logo" />
                </div>
               </div>
            </div>
         </Link>
         <div className="navigate_side">
            <ul>
               <Link to="/"><li className={`li ${location.pathname === '/' && "active"}`}><Button className='li' size="medium">Home</Button></li></Link>
               <Link to="/farm-about"><li className={`li ${location.pathname === '/farm-about' && "active"}`}><Button className='li' size="medium">About</Button></li></Link>
               <Link to="/farm-login"><li className={`li ${location.pathname === '/farm-login' && "active"}`}><Button className='li' size="medium">Sign In</Button></li></Link>
               <Link to="/farm-CreateAccount"><li className={`li ${location.pathname === '/farm-CreateAccount' && "active"}`}><Button className='li' size="medium">Sign Up</Button></li></Link>
            </ul>
         </div>
      </div>
   )
}

export default Navbar
