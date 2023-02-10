import { Container } from '@mui/material'
import React, { useEffect } from 'react'

function About() {
    useEffect(() => {
        document.title = "CropCaring - About"
    }, [])
    return (
        <Container maxWidth="lg" className='m_top'>
            <section className='section'>
                <h1 className="header_title text-center">
                    <span>About Crop <b className='brandname'>Harvestigation</b></span>
                </h1>
                <br />
                <div className="bottom_about">
                    <div className="about_img">
                        <img src="https://tse1.mm.bing.net/th?id=OIP.GQIrA9NP6bA3-nPYjIgcwgHaE8&pid=Api&P=0" alt="" />
                    </div>
                    <div className="about_content">
                        <h3>
                            IMPROVING AGRICULTURE, IMPROVING LIVES, CULTIVATING CROPS TO MAKE FARMERS INCREASE PROFIT.
                        </h3>
                        <br />

                        <p>We use state-of-the-art machine learning and deep learning technologies to help you guide through the entire farming process. Make informed decisions to understand the demographics of your area, understand the factors that affect your crop and keep them healthy for a super awesome successful yield.</p>
                        <br />
                        <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet nostrum distinctio quasi molestias magnam ipsam facere in est minus, ex quia porro, libero, repellendus possimus repudiandae sapiente maxime? Veniam cupiditate accusantium temporibus soluta odio, necessitatibus ea doloribus, reprehenderit culpa quas voluptates repudiandae reiciendis eaque optio Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default About
