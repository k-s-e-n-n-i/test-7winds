import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';

import './App.scss';
import Page404 from '../../pages/404/404';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Routes>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(App));
