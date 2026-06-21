import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from './theme/theme.ts'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import './config/firebase-config.js'
import './App.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
