import { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import { styled } from "@mui/system";
import { Styles } from './styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import { SkeletonTheme } from 'react-loading-skeleton'


function App() {
  // const classes = styled();
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />
          {/* <Switch> */}
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/auth' exact Component={Auth} />
          </Routes>
          {/* </Switch> */}
        </Container>
      </BrowserRouter>
    </SkeletonTheme>

  )
}

export default App
