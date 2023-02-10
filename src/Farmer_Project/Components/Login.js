import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, Snackbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import allusers from '../../JSONS/users.json'
import { CircularProgress } from '@mui/material';

import Alert from './Alert.js'
function Login({ signUp }) {

    useEffect(() =>{
        if(signUp){
            document.title = "Harvestigation - Sign Up"
        }
        else{
            document.title = "Harvestigation - Sign In"
        }
    },[signUp])

    const [showPassword, setShowpassword] = useState(false)

    const [values, setValues] = useState({
        password: "",
        username: "",
        cpassword: ""
    })

    const [users, setUsers] = useState(allusers)

    const navigate = useNavigate()

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const Handleroute = () => {
        setValues({
            password: "",
            username: "",
            cpassword: ""
        })
    }

    const handleClickShowPassword = () => {
        showPassword ? setShowpassword(false) : setShowpassword(true)
    }
    const [popup, setPopup] = useState({
        pop: false,
        pop_msg: "",
        pop_type: ""
    })

    const [open, setOpen] = useState(false)

    const [load, setLoad] = useState(false)

    const HandleClick = () => {

        if (values.username.length === 0 || values.password.length === 0) {
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "All fields are manditory!",
                pop_type: "error"
            })
            return
        }

        setLoad(true)

        setTimeout(() => {
            setLoad(false)
            setOpen(true)
        }, 700);
        const { username, password, cpassword } = values;

        let userfound = false

        if (!signUp && !load) {
            users.forEach((user, i) => {
                if (user.name === username) {
                    userfound = true;
                    if (user.password === password) {
                        setPopup({
                            pop: true,
                            pop_msg: "Login Sucessfull!",
                            pop_type: "success"
                        })
                    }
                    else {
                        setPopup({
                            pop: true,
                            pop_msg: "Invalid Credentials!",
                            pop_type: "error"
                        })
                    }
                }
                else {
                    if (!userfound && i === users.length - 1) {
                        setPopup({
                            pop: true,
                            pop_msg: "User not found need to Sign Up first!",
                            pop_type: "info"
                        })
                    }
                }
            })
        }
        else{
            if(password !== cpassword){
                setPopup({
                    pop: true,
                    pop_msg: "Password Does'nt match! ",
                    pop_type: "error"
                })
                return
            }
            setUsers([...users,{name:username,password:password,"_id":Math.random()*7}])
            
            setTimeout(() => {
                navigate('/farm-login')
                setPopup({
                    pop: true,
                    pop_msg: "Sign Up Sucessfull!",
                    pop_type: "success"
                })
            }, 500);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container maxWidth="md">
            <Container maxWidth="lg" className='m-auto padding-left-0'>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={popup.pop_type} sx={{ width: '100%' }}>
                        {popup.pop_msg}
                    </Alert>
                </Snackbar>

                <div className="Login_box">
                    <div className="logo">
                        <img src="https://webstockreview.net/images/clover-clipart-daun-11.png" alt="logo" />
                    </div>
                    <section style={{"marginBottom":"2rem"}} className='section text-center'>
                        <h1 className="header_title text-center">
                            <span>{signUp ? "Sign-Up" : "Sign-In"}</span>
                        </h1>
                    </section>

                    <div className="inpt_box">
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='form_control'>
                            <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                value={values.username}
                                onChange={(e) => { setValues({ ...values, username: e.target.value }) }}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                label="Username"
                            />
                        </FormControl>
                    </div>

                    <div className="inpt_box">
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='form_control'>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={(e) => { setValues({ ...values, password: e.target.value }) }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>

                    {signUp && <div className="inpt_box">
                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='form_control'>
                            <InputLabel htmlFor="outlined-adornment-confirm password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.cpassword}
                                onChange={(e) => { setValues({ ...values, cpassword: e.target.value }) }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="confrim Password"
                            />
                        </FormControl>
                    </div>}

                    <div className="bottom_bts">
                        {!signUp && <Button size="small" >Forget password?</Button>}
                        <Button onClick={Handleroute} size="small" variant="text"> {signUp ? <Link to="/farm-login" ><small><b>Already have an account?</b>&nbsp;</small> Sign In</Link> : <Link to="/farm-CreateAccount" >Sign Up</Link>} </Button>
                    </div>

                    <div className="signIn_btn">
                        <Button fullWidth={true} onClick={HandleClick} variant="contained" size="large" >
                            {signUp ? load ? <CircularProgress color='inherit' size='1.65rem' /> : "Sign Up" : load ? <CircularProgress color='inherit' size='1.65rem' /> : "Sign In"}
                        </Button>
                    </div>

                </div>
            </Container>
        </Container>
    )
}

export default Login
