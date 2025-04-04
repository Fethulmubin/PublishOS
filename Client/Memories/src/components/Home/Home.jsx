import React, { useState, useEffect } from 'react'
import { Styles } from './Styles'
import { useDispatch } from 'react-redux'
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPost } from '../../actions/posts'
import { styled } from "@mui/system";


const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const [isSignup, setIsSignup] = useState(false);
    const StyledBar = styled(AppBar)(() => (Styles.appBar))
    const StyledTypography = styled(Typography)(() => (Styles.heading))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch])

    // useEffect(()=>{
    //     const token = localStorage.getItem('profile')
    //     if(token){
    //        setIsSignup(true)
    //     }
    //     else{
    //         setIsSignup(false)
    //     }
    // },[])
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} getPost={getPost} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home