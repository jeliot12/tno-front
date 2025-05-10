import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./pages/Home"
import Leaders from "./pages/Leaders"
import Frens from "./pages/Frens"
import Squad from "./pages/squads/Squad"
import Earns from "./pages/Earn"
import Auth from "./pages/Auth"
import Test from "./pages/Test"
import Profile from "./pages/squads/squadprofile/profile"

function App() {

  return (
      <Routes>
        <Route path="/" element={
            <Auth />
          } />
        <Route path="/home" element={
            <Home />
        } />
        <Route path="/leaders" element={
            <Leaders />
        } />
        <Route path="/squads" element={
            <Squad />
        } />
        <Route path="/frens" element={
            <Frens />
        } />
        <Route path="/earn" element={
            <Earns />
        } />
        <Route path="/squadprofile" element={
            <Profile />
        } />
      </Routes>
  )
}

export default App
