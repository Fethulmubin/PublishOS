import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useState } from 'react';
import theme from './theme';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import AIStudio from './components/Pages/AIStudio/AIStudio';
import Schedule from './components/Pages/Schedule/Schedule';
import Analytics from './components/Pages/Analytics/Analytics';
import Notifications from './components/Pages/Notifications/Notifications';
import Profile from './components/Pages/Profile/Profile';
import Settings from './components/Pages/Settings/Settings';
import NavBottom from './components/NavBottom/NavBottom';

function App() {
  const [showFormGlobal, setShowFormGlobal] = useState(false);

  const pageRoutes = [
    { path: '/', element: <Home showForm={showFormGlobal} setShowForm={setShowFormGlobal} /> },
    { path: '/feed', element: <Home showForm={showFormGlobal} setShowForm={setShowFormGlobal} /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/ai-studio', element: <AIStudio /> },
    { path: '/schedule', element: <Schedule /> },
    { path: '/analytics', element: <Analytics /> },
    { path: '/notifications', element: <Notifications /> },
    { path: '/profile', element: <Profile /> },
    { path: '/settings', element: <Settings /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SkeletonTheme
        baseColor="rgba(226, 232, 240, 0.5)"
        highlightColor="rgba(248, 250, 252, 0.8)"
      >
        <BrowserRouter>
          <Routes>
            {pageRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <Layout onNewPost={() => setShowFormGlobal(true)}>
                      {element}
                    </Layout>
                  </ProtectedRoute>
                }
              />
            ))}
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Routes>
            {pageRoutes.map(({ path }) => (
              <Route
                key={path}
                path={path}
                element={
                  <NavBottom
                    showForm={showFormGlobal}
                    setShowForm={setShowFormGlobal}
                  />
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
