import { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import { styled } from "@mui/system";
import { Styles } from './styles'
import {BrowserRouter, Route , Routes} from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';

function App() {
// const classes = styled();
  return (
    <BrowserRouter>
      <Container maxWidth='lg'> 
        <Navbar/>
        {/* <Switch> */}
        <Routes>
        <Route path='/' exact Component ={Home} />
        <Route path='/auth' exact Component ={Auth} />
        </Routes>
        {/* </Switch> */}
      </Container>
      </BrowserRouter>

  )
}

export default App
