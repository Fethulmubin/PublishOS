import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button } from '@mui/material';
import { styled } from "@mui/system";
import { Styles } from './styles';
import memory from '../../assets/memory.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Navbar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.authData);
    const StyledBar = styled(AppBar)(() => (Styles.appBar));
    const StyledTypography = styled(Typography)(() => (Styles.heading));
    const StyledToolbar = styled(Toolbar)(() => (Styles.toolbar));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <StyledBar position='static' color='inherit'>
            <div className={Styles.brandContainer}>
                <StyledTypography className={Styles.heading} component={Link} to='/' variant='h2' align='center'>
                    Memories
                </StyledTypography>
                <img className={Styles.image} src={memory} alt="memories" height='100' />
            </div>
            <StyledToolbar>
                {user ? (
                    <div className={Styles.profile}>
                        <Avatar className={Styles.purple} alt={user.result.name} src={user.result.imageURL}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <StyledTypography className={Styles.userName} variant='h6'>
                            {user.result.name}
                        </StyledTypography>
                        <Button onClick={logout} variant='contained' className={Styles.Logout} color='secondary'>
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
