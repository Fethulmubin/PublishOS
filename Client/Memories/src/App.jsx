
import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import { SkeletonTheme } from 'react-loading-skeleton'


function App() {
  return (
    <SkeletonTheme baseColor="rgba(224, 224, 224, 0.5)" highlightColor="rgba(251, 232, 232, 0.5)">
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar />
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/auth' exact Component={Auth} />
          </Routes>
        </Container>
      </BrowserRouter>
    </SkeletonTheme>
  )
}

export default App
