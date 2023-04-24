import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SpaceTop from './SpaceTop';
// import { loadPyodide } from 'pyodide';
// import {PythonShell} from 'python-shell';


function Home({ setPopup, setOpen }) {

  useEffect(() => {
    document.title = "Harvestigation - Home"
  }, [])

  const navigate = useNavigate();

  const HandleClick = async () => {
    if (!localStorage.getItem("token")) {
      setOpen(true)
      setPopup({
        pop: true,
        pop_msg: "You must login to access our service!",
        pop_type: "warning"
      });
      navigate('/farm-login')
    }
    else {
      navigate('/activate_crop')
    }
  }


  return (
    <div className='Home_box'>
      <SpaceTop />
      <section className='section'>
        <h1 className="header_title text-center">
          <span>Welcome To Crop <b className='brandname'>Harvestigation</b> Company </span>
        </h1>
      </section>
      <section className='header section'>
        <div className="header_content_section">
          <h2>Harvestigation</h2>
          <h4 className='letter_spacing'>
            Get Informed Decisions About Your Farming Strategy.
          </h4>
          <br />
          <h4 className='letter_spacing'>
            Here Are Some Questions We'll Answer
          </h4>
          <br />
          <p>1. What crop to plant here?</p>
          <p>2. What fertilizer to use?</p>
          <p>3. Which disease do your crop have?</p>
          <br />
        </div>
      </section>
      <section className='section m-top'>
        <h1 className="header_title text-center">
          <span><b className='brandname'>Harvestigation</b> Improves Growth of Crops by 85.99%</span>
          {/* <span style={{ "marginTop": "1rem", "display": "inline-block" }}><img className='tractor' width={80} src="https://cdn-icons-png.flaticon.com/512/3665/3665077.png" alt="" /></span> */}
        </h1>
      </section>
      <section className='all_equipments'>
        <div className="equip"><img src="https://tse2.explicit.bing.net/th?id=OIP.EK7UHP0cJxcJCZMuBkMLhAHaE7&pid=Api&P=0" alt="" /></div>
        <div className="equip"><img src="https://tse2.mm.bing.net/th?id=OIP.-s2YVSCWaOicm_pwt5m0RAHaFP&pid=Api&P=0" alt="" /></div>
        <div className="equip"><img src="https://tse3.mm.bing.net/th?id=OIP.qryfWFOpzhQUCIGhG38cVgHaES&pid=Api&P=0" alt="" /></div>
        <div className="equip"><img src="https://cdn.wikifarmer.com/wp-content/uploads/2019/05/Growing-Eggplant-for-Profit.jpg" alt="" /></div>
      </section>
      <Container maxWidth="lg">
        <section className='section m-top'>
          <h1 className="text-center">
            <span>Our Service!</span>
          </h1>
        </section>
        <section id='Our_service' className='section m-top'>
          <div className="left">
            <img src="https://tse3.mm.bing.net/th?id=OIP.yxzhqhks3AE7_sKf_76JAgHaE7&pid=Api&P=0" alt="" />
          </div>
          <div className="right">
            <h4>
              Best Crop Harvesting and Cultivation Technique!<span><img src="https://cdn-icons-png.flaticon.com/512/3442/3442648.png" alt="crop" className='flat_icon_img' /></span>
            </h4>
            <br />
            <h2 className='letter_spacing'>
              CROP
            </h2>
            <br />
            <p>
              Recommendation about the type of crops to be cultivated which is best suited
              for the respective conditions.
            </p>
            <Button onClick={HandleClick} className='mui_btn' variant="text">lets Get Started</Button>
          </div>
        </section>
      </Container>


    </div>
  )
}

export default Home
