import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { Bar } from './styles'
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import { styled } from "@mui/system";
import { Styles } from './styles'
import memory from './assets/memory.png'
import {BrowserRouter, Swich, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPost } from './actions/posts'
import Navbar from './components/NavBar/Navbar'

function App() {
// const classes = styled();
const [currentId, setCurrentId] = useState(null)
const StyledBar =  styled(AppBar)(()=> (Styles.appBar))
const StyledTypography =  styled(Typography)(()=> (Styles.heading))

const dispatch = useDispatch();

useEffect(()=>{
dispatch(getPost())
},[dispatch])
  return (
    
      <Container maxWidth='lg'>
        {/* <StyledBar  position='static' color='inherit'>
          <StyledTypography  variant='h2' align='center'>Memories</StyledTypography>
          <img className={Styles.image} src={memory} alt="memories" height='100' />
        </StyledBar> */}
        <Navbar/>
        <Grow in>
          <Container>
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId = {currentId} setCurrentId={setCurrentId} getPost={getPost}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>

  )
}

export default App
