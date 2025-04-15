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
import CircularProgress from '@mui/material/CircularProgress';
import './Auth.css'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false)

    const [isSignup, setIsSignup] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const StyledPaper = styled(Paper)(() => (Styles.paper))
    // const isSignup = false;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        isSignup ? dispatch(signup(formData, navigate)).then(() => setLoading(false)) :
            dispatch(signin(formData, navigate)).then(() => setLoading(false))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
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
        <div className="container">
            <div className="avatar">🔒</div>
            <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>

            {loading ? (
                <CircularProgress className="loading" />
            ) : (
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isSignup && (
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Repeat Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <button type="submit">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </button>

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

                    <button type="button" className="switch-btn" onClick={switchMode}>
                        {isSignup
                            ? 'Already have an account? Sign In'
                            : "Don't you have an account? Sign Up"}
                    </button>
                </form>
            )}
        </div>
    )
}

export default Auth