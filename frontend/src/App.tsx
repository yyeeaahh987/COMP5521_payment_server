import React from 'react';
import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import MainTheme from './theme/MainTheme'

import NavBar from './components/NavBar';
import PageRouter from './pages/PageRouter';
import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={MainTheme} >
        <NavBar />
        <Box sx={{ margin: "0 auto", paddingTop: 8, paddingLeft: 8 }}>
          <PageRouter/>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
