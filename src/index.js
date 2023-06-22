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
    },
    MuiListItem: {
      
    }
  },
  palette: {
    type: 'light',
    primary: {
      main: '#303841',
    },
    secondary: {
      main: '#90ee90',
    },
    success: {
      main: '#ffe801',
    }
    // divider: 'rgba(255,255,255,0.12)',
  },
  typography: {
    fontFamily: ["Impact"],
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
