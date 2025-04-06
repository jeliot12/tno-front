// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
// import UserStore from './store/UserStore.js'

// export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
    // <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    // </StrictMode>
)
