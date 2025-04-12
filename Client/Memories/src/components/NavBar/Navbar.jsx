import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button } from '@mui/material';
import { styled } from "@mui/system";
import { Styles } from './styles';
import memory from '../../assets/memory.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './NavBar.css'
// import jwt_decode from 'jwt-decode';

const Navbar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state?.auth.authData);
    console.log(user)
    const StyledBar = styled(AppBar)(() => (Styles.appBar));
    const StyledTypography = styled(Typography)(() => (Styles.heading));
    const StyledToolbar = styled(Toolbar)(() => (Styles.toolbar));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };


    return (
        <StyledBar position='static' color='inherit' className={Styles.appBar} style={{ height: '80px', display: 'flex', justifyContent: 'space-around' }}>
            <div
                className={Styles.brandContainer}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: window.innerWidth < 600 ? 'column' : 'row',
                    alignItems: 'center',
                }}
            >
                <StyledTypography className={Styles.heading} component={Link} to='/' variant='h3' align='center'>
                    Memories
                </StyledTypography>
                <img className={Styles.image} src={memory} alt="memories" height='50' />
            </div>
            <StyledToolbar>
                {user ? (
                    <div className="login-info-container" >
                        <Avatar className='login-avatar' alt={user?.result?.name} src={user?.result?.imageURL}>
                            {user?.result?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <StyledTypography className='login-name' variant='h6'>
                            {user?.result?.name}
                        </StyledTypography>
                        <Button onClick={logout} variant='contained' className='logout-button' color='secondary'>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>
                        Sign In
                    </Button>
                )}
            </StyledToolbar>
        </StyledBar>
    );
};

export default Navbar;
