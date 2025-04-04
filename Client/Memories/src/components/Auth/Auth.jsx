import React, { useState } from 'react'
import { Container, Typography, Grid, Paper, Avatar, Button, TextField } from '@mui/material'
import { styled } from "@mui/system";
import { Styles } from './styles'
import Icon from './Icon';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const StyledPaper = styled(Paper)(() => (Styles.paper))
    // const isSignup = false;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        isSignup ? dispatch(signup(formData, navigate)) : dispatch(signin(formData, navigate))
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value })
        setFocusedField(name)
    }

    console.log("formData", formData)
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
        setFormData(initialState);
        setFocusedField(null)

    }
    const googleSuccess = async (res) => {
        // console.log(res?.credential);
        //JSON.pasrs fun takes string of obj to js object 
        // const jsonString = '{"name":"Ali", "age":25}';
        // const obj = JSON.parse(jsonString);
        // console.log(obj.name)
        const profileObj = res.credential ? JSON.parse(atob(res?.credential.split('.')[1])) : {};
        const Token = res?.credential;
        console.log(profileObj);
        console.log(Token)
        try {
            dispatch({ type: 'AUTH', data: { result: profileObj, token: Token } });
            navigate('/');

        } catch (error) {

        }
        // console.log('User Name:', name);

    }
    const googleFailure = (err) => {
        console.log(err);
    }
    return (
        <Container component='main' maxWidth='xs'>
            <StyledPaper elevation={3}>
                <Avatar className={Styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form autoComplete="off" className={Styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                        {isSignup ? (
                            <>
                                <Input name='firstName' label='First Name' type='text' value={formData.firstName} handleChange={handleChange} autoFocus={focusedField === 'firstName' || focusedField === null} half  />
                                <Input name='lastName' label='Last Name'  type='text' value={formData.lastName} handleChange={handleChange}  autoFocus={focusedField === 'lastName'} half />
                                <Input name='email' label='Email Address' value={formData.email} handleChange={handleChange} type='email'  autoFocus={focusedField === 'email'} fullWidth />
                                <Input name='password' label='Password' value={formData.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'}  autoFocus={focusedField === 'password'} handleShowPassword={handleShowPassword} fullWidth  />
                                <Input name='confirmPassword' label='Repeat Password' value={formData.confirmPassword} handleChange={handleChange} type='password'  autoFocus={focusedField === 'confirmPassword'} fullWidth  />
                            </>

                        ) : (
                            <>
                                <Input name='email' label='Email Address' value={formData.email} handleChange={handleChange} autoFocus={focusedField === 'email' || focusedField === null} type='email' fullWidth />
                                <Input name='password' label='Password' value={formData.password} handleChange={handleChange}  autoFocus={focusedField === 'password'} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} fullWidth  />
                            </>
                        )}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={Styles.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        render={renderProps => (
                            <Button variant='contained' className={Styles.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} Variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex end'>
                        <Button onClick={switchMode}>{isSignup ? 'Already have an account ? Sign In' : "Don't you have an account ? Sign Up "}</Button>
                    </Grid>
                </form>
            </StyledPaper>
        </Container>
    )
}

export default Auth