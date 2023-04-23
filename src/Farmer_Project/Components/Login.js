import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material';

function Login({ signUp, setPopup, setOpen }) {

    const navigate = useNavigate();

    useEffect(() => {
        setValues({
            password: "",
            username: "",
            email: "",
            cpassword: ""
        })
        let token = localStorage.getItem('token');
        if (token) navigate('/')
    }, [navigate])

    useEffect(() => {
        if (signUp) {
            document.title = "Harvestigation - Sign Up"
        }
        else {
            document.title = "Harvestigation - Sign In"
        }
    }, [signUp]);

    const [showPassword, setShowpassword] = useState(false)

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: ""
    })


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        showPassword ? setShowpassword(false) : setShowpassword(true)
    }

    const [load, setLoad] = useState(false)

    let server = `https://inotebook-server-iphn.onrender.com`

    function removeAlert(){
        setTimeout(() => {
            setLoad(false)
            setOpen(false)
        }, 2000);
    }

    const HandleClick = async (e) => {
        e.preventDefault();

        const { username, password, cpassword, email } = values;

        if ((email.length === 0) || (signUp && username.length === 0) || (password.length === 0)) {
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "All fields are manditory!",
                pop_type: "error"
            })

            removeAlert();
            return
        }

        if (signUp && (password !== cpassword)) {
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "Password doesn't match!",
                pop_type: "error"
            })
            removeAlert()
            return
        }

        let configs = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }

        setLoad(true)
        
        if (signUp) {
            
            configs.body = JSON.stringify({ name1: username, email, password });

            const res = await fetch(`${server}/api/auth/createuser`, configs);
            const json = await res.json();

            setLoad(false);

            if (!json.success) {
                setOpen(true)
                let errormsg = json.errormsg ? json.errormsg : json.errors[0].msg
                setPopup({
                    pop: true,
                    pop_msg: errormsg,
                    pop_type: "error"
                })
                removeAlert()
                return
            }
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "Yeah We've Created an account for you!",
                pop_type: "success"
            });

            navigate('/');

            localStorage.setItem('token', json.authToken)

        }
        else {

            configs.body = JSON.stringify({ email, password });
            let res = await fetch(`${server}/api/auth/authenticate_user`, configs);
            let json = await res.json();
            setLoad(false);

            if (!json.success) {
                setOpen(true)
                setPopup({
                    pop: true,
                    pop_msg: json.errormsg,
                    pop_type: "error"
                })
                removeAlert();
                return
            }
            setOpen(true)
            setPopup({
                pop: true,
                pop_msg: "Login Sucessfull!",
                pop_type: "success"
            });

            navigate('/');

            localStorage.setItem('token', json.authToken)
        }

        removeAlert()
    }

    return (
        <Container maxWidth="md">
            <Container maxWidth="lg" className='m-auto padding-left-0'>

                <div className="Login_box">
                    <div className="logo">
                        <img src="https://webstockreview.net/images/clover-clipart-daun-11.png" alt="logo" />
                    </div>
                    <section style={{ "marginBottom": "2rem" }} className='section text-center'>
                        <h1 className="header_title text-center">
                            <span>{signUp ? "Sign-Up" : "Sign-In"}</span>
                        </h1>
                    </section>

                    <form onSubmit={HandleClick}>
                        {signUp && <div className="inpt_box">
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='form_control'>
                                <InputLabel htmlFor="outlined-adornment-name">Username</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
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
                        </div>}

                        <div className="inpt_box">
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='form_control'>
                                <InputLabel htmlFor="outlined-adornment-email" >Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    autoComplete="off"
                                    type='email'
                                    value={values.email}
                                    onChange={(e) => { setValues({ ...values, email: e.target.value }) }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                            >
                                                <MailOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="email"
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
                            <Button size="small" variant="text"> {signUp ? <Link to="/farm-login" ><small><b>Already have an account?</b>&nbsp;</small> Sign In</Link> : <Link to="/farm-CreateAccount" >Sign Up</Link>} </Button>
                        </div>

                        <div className="signIn_btn">
                            <Button fullWidth={true} onClick={HandleClick} variant="contained" size="large" type='submit'>
                                {signUp ? load ? <CircularProgress color='inherit' size='1.65rem' /> : "Sign Up" : load ? <CircularProgress color='inherit' size='1.65rem' /> : "Sign In"}
                            </Button>
                        </div>
                    </form>

                </div>
            </Container>
        </Container>
    )
}

export default Login
