import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CryptoContext from './CryptoContext.jsx'
import "react-alice-carousel/lib/alice-carousel.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark", // optional
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </ThemeProvider>
  </StrictMode>
);
