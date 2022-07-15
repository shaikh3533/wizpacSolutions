import React, { useState } from 'react'
import './Login.css'
import logo from '../../Assets/Images/PACRA_logo.png'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LoginIcon from '@mui/icons-material/Login';
import Imageslider from '../../Components/Imageslider'

const index = (props) => {
    const [isHidden, setisHidden] = useState(true)
    const handleClickShowPassword = () => {
        setisHidden(!isHidden)
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <body className='themeContainer items_middle'>
            <div className='row w-100 mx-auto justify-content-center'>
                <form className='d-none d-md-block shadow_2 col-md-5 col-lg-4 theme_bg'>
                    <Imageslider />
                </form>
                <form onSubmit={props.login} className='col-12 min_height shadow_1 col-md-5 col-lg-4'>
                    <div className='my-auto mx-auto mx-md-5'>
                        <div className='text-center'>
                            <img src={logo} className="logo_size mx-auto" />
                            <h3 className='my-2 mx-auto fw-bold theme_text'>Login Here</h3>
                        </div>

                        <FormControl className='w-100 mt-3' variant="outlined">
                            <TextField
                                id="outlined-basic"
                                label="Email / Username"
                                name="user_id"
                                variant="outlined"
                                clasName='input_'
                                onChange={props.handleFormChange} />
                        </FormControl>

                        <FormControl className='w-100 mt-3' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={!isHidden ? 'text' : 'password'}
                                name="user_password"
                                // value={props.user_password}
                                onChange={props.handleFormChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {isHidden ? <VisibilityOff className='theme_text' /> : <Visibility className='theme_text' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <p className='mb-0 theme_text'>(admin  123)</p>
                        <button className='button_'>Log In <LoginIcon className='ms-2' /></button>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default index