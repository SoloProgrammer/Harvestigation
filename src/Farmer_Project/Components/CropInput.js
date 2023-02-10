import { Fab, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import States from './States'

import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function CropInput() {
    const [open,setOpen] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <>
            <div className="Soil_minerals_wall">
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                        Developers are working on it !
                    </Alert>
                </Snackbar>
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
                            variant="filled"
                        />
                        <TextField
                            id="filled-number"
                            label="Phosphorous"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
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
                            variant="filled"
                        />
                        <TextField
                            id="filled-number"
                            label="ph level"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </div>
                    <div className="number_input">
                        <TextField
                            id="filled-number"
                            label="Rainfall (in mm)"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </div>
                    <div className="state_city_input">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="State"
                            // onChange={handleChange}
                            >
                                {
                                    States.map(s => {
                                        return <MenuItem value={s}>{s}</MenuItem>
                                    })
                                }

                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="State"
                            // onChange={handleChange}
                            >
                                {
                                    States.map(s => {
                                        return <MenuItem value={s}>{s}</MenuItem>
                                    })
                                }

                            </Select>
                        </FormControl>
                    </div>
                    <div className="Predict_crop">
                        <Fab onClick={()=>{ setOpen(true) }} className='mui_btn' variant="extended" size="large" color="primary" aria-label="add">
                            Predict Crop
                        </Fab>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CropInput
