import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material'; 

import store from './redux/store';

import App from './components/App/App';

const exceleratorTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#303841",
          color: "white",
        }
      }
    }
  },
  palette: {
    type: 'light',
    primary: {
      main: '#303841',
      navy: '#061e45',
      green: '#90ee90',
      lightBlue: '#c3e3eb',
      midGray: '#36454f',
      lightGray: '#c9cbcd'
    },
    success: {
      main: '#ffe801',
    }
    // divider: 'rgba(255,255,255,0.12)',
  },
  typography: {
    fontSize: '18',
    fontFamily: ["Medium"],
  },
})


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={exceleratorTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
