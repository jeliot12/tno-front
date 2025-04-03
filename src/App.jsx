import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./pages/Home"
import Leaders from "./pages/Leaders"
import Frens from "./pages/Frens"
import Squad from "./pages/squads/Squad"
import Earns from "./pages/Earn"
import UserLeaders from "./pages/leaders/UserLeaders"
import SquadLeaders from "./pages/leaders/SquadLeaders"
import Auth from "./pages/Auth"
import Test from "./pages/Test"
import DesktopPage from "./pages/DesktopPage/DesktopPage";
import { MobileOnlyRoute } from "./components/MobileOnlyRoute"

function App() {

  return (
      <Routes>
        <Route path="/" element={
            <MobileOnlyRoute>
              <Auth />
            </MobileOnlyRoute>
          } />
        <Route path="/desktop" element={<DesktopPage />} />

        <Route path="/home" element={
          <MobileOnlyRoute>
            <Test />
          </MobileOnlyRoute>
        } />
        <Route path="/leaders" element={
          <MobileOnlyRoute>
            <Leaders />
          </MobileOnlyRoute>
        } />
        <Route path="/squads" element={
          <MobileOnlyRoute>
            <Squad />
          </MobileOnlyRoute>
        } />
        <Route path="/frens" element={
          <MobileOnlyRoute>
            <Frens />
          </MobileOnlyRoute>
        } />
        <Route path="/earn" element={
          <MobileOnlyRoute>
            <Earns />
          </MobileOnlyRoute>
        } />
        <Route path="/topsquads" element={
          <MobileOnlyRoute>
            <SquadLeaders />
          </MobileOnlyRoute>
        } />
        <Route path="/topusers" element={
          <MobileOnlyRoute>
            <UserLeaders />
          </MobileOnlyRoute>
        } />
      </Routes>
  )
}

export default App
