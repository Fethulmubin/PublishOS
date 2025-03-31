import React, { useState } from 'react'
import { Container, Typography, Grid, Paper, Avatar, Button, TextField } from '@mui/material'
import { styled } from "@mui/system";
import { Styles } from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const StyledPaper = styled(Paper)(() => (Styles.paper))
    // const isSignup = false;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {

    }
    const handleChange = () =>{

    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);

    }
    return (
        <Container component='main' maxWidth='xs'>
            <StyledPaper elevation={3}>
                <Avatar className={Styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={Styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup ? (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                <Input name='email' label='Email Address' handleChange={handleChange} type='email' fullWidth />
                                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} fullWidth />
                                <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' fullWidth />
                            </>
                        ) : (
                            <>
                                <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus fullWidth />
                                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} fullWidth />
                            </>
                        )}

                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={Styles.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify = 'flex end'>
                        <Button onClick={switchMode}>{isSignup ? 'Already have an accoutn ? Sign In' : "Don't you have an account ? Sign Up "}</Button>
                    </Grid>
                </form>
            </StyledPaper>
        </Container>
    )
}

export default Auth