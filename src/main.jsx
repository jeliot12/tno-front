import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom';
// import UserStore from './store/UserStore.js'

// export const Context = createContext(null)
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         (window.innerWidth <= 768 && window.innerHeight <= 1024) ||
         ('ontouchstart' in window);
};
if (!isMobileDevice() && !window.location.pathname.includes('/desktop')) {
  window.location.href = '/desktop';
}else {createRoot(document.getElementById('root')).render(
      <Router>
          <App />
      </Router>
)}
