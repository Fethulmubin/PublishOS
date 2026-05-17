import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useState } from 'react';
import theme from './theme';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import NavBottom from './components/NavBottom/NavBottom';

function App() {
  const [showFormGlobal, setShowFormGlobal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SkeletonTheme
        baseColor="rgba(226, 232, 240, 0.5)"
        highlightColor="rgba(248, 250, 252, 0.8)"
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout onNewPost={() => setShowFormGlobal(true)}>
                  <Home
                    showForm={showFormGlobal}
                    setShowForm={setShowFormGlobal}
                  />
                </Layout>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Routes>
            <Route
              path="/"
              element={
                <NavBottom
                  showForm={showFormGlobal}
                  setShowForm={setShowFormGlobal}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
