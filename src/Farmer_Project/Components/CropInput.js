import { FormControl, InputLabel, MenuItem, Select, TextField, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { States, Cities } from './StatesCities'
import CropDetailModal from './Modals/CropDetailModal';
import { flushSync } from 'react-dom';

function CropInput({ setPopup, setOpen }) {

    const [show, setShow] = useState(false);
    const [modaldetail, setModalDetail] = useState({})
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        if(!localStorage.getItem('token')){
            window.location.href = window.location.origin
        }   
    },[])
    
    const handleClose = () => setShow(false);
    const [inptData, setInptData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });

    const handleChange = (e) => {
        setInptData({ ...inptData, [e.target.name]: e.target.value })
    }

    function removeAlert() {
        setTimeout(() => {
            setOpen(false)
        }, 2000);
    }

    const predictCrop = async () => {

        // Destructuring values from inptData...
        const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = inptData

        if (!nitrogen || !phosphorus || !potassium || !temperature || !humidity || !ph || !rainfall) {
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "Please fill all the details!",
                pop_type: "error"
            })
        }
        else if(!state){
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "Please specify your state",
                pop_type: "error"
            })
        }
        else if(!city){
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "Please specify your city",
                pop_type: "error"
            })
        }
        else {
            try {
                setLoading(true)
                const flask_server = {
                    local:"http://127.0.0.1:5000",
                    production:"https://harvestigation-flask-backend.onrender.com"
                }
                const res = await fetch(`${flask_server.local}/harvest`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "soilData": { ...inptData } })
                });
                const json = await res.json();

                if(json){
                    setShow(true)
                    flushSync(()=>{
                        setModalDetail({ ...json })
                    })
                   
                   setLoading(false)
                }
            } catch (error) {
                setOpen(true)
                setPopup({
                    pop: true,
                    pop_msg: error.message,
                    pop_type: "error"
                })
                setLoading(false)
            }
        }
        setTimeout(() => {
            removeAlert()
        }, 3000);
    }

    const handleStateChange = (e) => {
        setState(e.target.value);
        setCity('')
    }

    const handleCityChange = (e) => setCity(e.target.value);

    return (
        <>
            <CropDetailModal show={show} setShow={setShow} handleClose={handleClose} modaldetail={modaldetail} />
            <div className="Soil_minerals_wall">
                <h2 className='text-center'>Find out the most suitable crop to grow in your farm</h2>
                <div className="Soil_minerals_inputs">
                    <div className="number_input">
                        <TextField
                            id="filled-number"
                            label="Nitrogen"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="nitrogen"
                            variant="filled"
                            value={inptData.nitrogen}
                            onChange={handleChange}
                        />
                        <TextField
                            id="filled-number"
                            label="Phosphorus"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="phosphorus"
                            variant="filled"
                            value={inptData.phosphorus}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="number_input">
                        <TextField
                            id="filled-number"
                            label="Pottasium"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="potassium"
                            variant="filled"
                            value={inptData.potassium}
                            onChange={handleChange}
                        />
                        <TextField
                            id="filled-number"
                            label="Temperature"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="temperature"
                            variant="filled"
                            value={inptData.temperature}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="number_input">
                        <TextField
                            id="filled-number"
                            label="humidity"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="humidity"
                            variant="filled"
                            value={inptData.humidity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="number_input">
                        <TextField
                            id="filled-number"
                            label="ph level"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="ph"
                            variant="filled"
                            value={inptData.ph}
                            onChange={handleChange}
                        />
                        <TextField
                            id="filled-number"
                            label="Rainfall (in mm)"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="rainfall"
                            variant="filled"
                            value={inptData.rainfall}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="state_city_input">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state}
                                label="State"
                                onChange={handleStateChange}
                            >
                                {
                                    States.map((s, i) => {
                                        return <MenuItem key={i} value={s}>{s}</MenuItem>
                                    })
                                }

                            </Select>
                        </FormControl>
                        {state && <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                disabled={state ? false : true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="City"
                                onChange={handleCityChange}
                            >
                                {
                                    Cities[state].map((c, i) => {
                                        return <MenuItem key={i} value={c}>{c}</MenuItem>
                                    })
                                }

                            </Select>
                        </FormControl>}
                    </div>
                    <div className="Predict_crop">
                        <Button fullWidth={true} variant="contained" size="large" type='submit' loading={loading} onClick={predictCrop} className='mui_btn' color="primary" >
                            {loading ? <CircularProgress color='inherit' size='1.65rem' /> : "Predict Crop"}
                        </Button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CropInput
