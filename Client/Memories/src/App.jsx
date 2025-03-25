import { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import { styled } from "@mui/system";
import { Styles } from './styles'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import Home from './components/Home/Home'

function App() {
// const classes = styled();
  return (
    <BrowserRouter>
      <Container maxWidth='lg'> 
        <Navbar/>
        <Switch>
        <Route path='/' exact component ={Home} />
        <Route path='/auth' exact component ={Home} />
        </Switch>
   
      </Container>
      </BrowserRouter>

  )
}

export default App
