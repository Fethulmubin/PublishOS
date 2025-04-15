import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button } from '@mui/material';
import { styled } from "@mui/system";
import { Styles } from './styles';
import memory from '../../assets/memory.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import memories from '../../assets/memories.png';
import './NavBar.css'
// import jwt_decode from 'jwt-decode';

const Navbar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state?.auth.authData);
    const [showPopup, setShowPopup] = useState(false);
    // console.log(user)
    const StyledBar = styled(AppBar)(() => (Styles.appBar));
    const StyledTypography = styled(Typography)(() => (Styles.heading));
    const StyledToolbar = styled(Toolbar)(() => (Styles.toolbar));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };
    const togglePopup = () => {
        // Only toggle on mobile screens
            setShowPopup(!showPopup);
        
    };

    return (
        <StyledBar position='static' color='inherit' className={Styles.appBar} style={{ height: '80px', display: 'flex', justifyContent: 'space-around' }}>
            <div
                className={Styles.brandContainer}
                style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 600 ? 'column' : 'row',
                    width: '100%',
                }}
            >
                <StyledTypography className={Styles.heading} component={Link} to='/' variant='h3' align='center'>
                    <img className='nav-image' src={memories} alt="memories" width={300} />
                </StyledTypography>

            </div>
            <StyledToolbar>
                {user ? (
                    <div className="login-info-container" >
                        <Avatar onClick={togglePopup} className='login-avatar' alt={user?.result?.name} src={user?.result?.imageURL}>
                            {user?.result?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                        <StyledTypography className='login-name' variant='h6'>
                            {user?.result?.name}
                        </StyledTypography>
                        {showPopup && (
                            <div className="logout-popup">
                                <Button
                                    onClick={logout}
                                    variant="contained"
                                    className="logout-button"
                                    color="secondary"
                                >
                                    Logout
                                </Button>
                                <hr />
                                <p>My Account</p>
                                <div className="popup-arrow"></div>
                            </div>
                        )}
                        {/* <Button onClick={logout} variant='contained' className='logout-button' color='secondary'>
                            Logout
                        </Button> */}

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
