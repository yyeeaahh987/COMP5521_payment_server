import React, { useEffect } from 'react';
import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import MainTheme from './theme/MainTheme'

import NavBar from './components/NavBar';
import NotificationSnackbar from './components/NotificationSnackbar/NotificationSnackbar';
import PageRouter from './pages/PageRouter';
import Box from '@mui/material/Box';

function App() {
  const [navBarClose, setNavBarClose] = React.useState(false);

  useEffect(() => {
    if(navBarClose) setNavBarClose(false)
  }, [navBarClose]);

  return (
    <div className="App">
      <ThemeProvider theme={MainTheme} >
        <NavBar navBarClose={navBarClose}/>
        <NotificationSnackbar />
        <Box
          sx={{ margin: "0 auto", paddingTop: 8, paddingLeft: 8 }}
          onClick={() => setNavBarClose(true)}
        >
          <PageRouter/>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
