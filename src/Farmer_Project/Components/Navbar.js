import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, CircularProgress } from '@mui/material';


function Navbar() {

   const location = useLocation();
   const navigate = useNavigate();
   const [loading,setLoading] = useState(false);

   const HandleLogout = () =>{
      setLoading(true)
      setTimeout(() => {
         localStorage.clear();
         navigate('/farm-login')
         setLoading(false)
      }, 1000);
   }

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
               <Link to="/farm-about"><li className={`li ${location.pathname === '/farm-about' && "active"}`}><Button className='li' size="medium">About</Button></li>
               </Link>
               {
                  !localStorage.getItem('token')
                     ?
                     <>
                        <Link to="/farm-login"><li className={`li ${location.pathname === '/farm-login' && "active"}`}><Button className='li' size="medium">Sign In</Button></li></Link>
                        <Link to="/farm-CreateAccount"><li className={`li ${location.pathname === '/farm-CreateAccount' && "active"}`}><Button className='li' size="medium">Sign Up</Button></li></Link>
                     </>
                     :
                     <Box>
                        <Button className='logoutBtn' loading={loading} size={window.innerWidth < 770 ? "small"  : "medium"} onClick={HandleLogout} variant="contained" endIcon={!loading && <LogoutIcon />}>
                           {loading ? <CircularProgress color='inherit' size='1.65rem' /> : "Log-out"}
                        </Button>
                     </Box>
               }
            </ul>
         </div>
      </div>
   )
}

export default Navbar
