import { Route, Routes } from "react-router-dom"
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

function App() {

  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/leaders" element={<Leaders />} />
      <Route path="/squads" element={<Squad />} />
      <Route path="/frens" element={<Frens />} />
      <Route path="/earn" element={<Earns />} />
      <Route path="/topsquads" element={<SquadLeaders />} />
      <Route path="/topusers" element={<UserLeaders />} />
    </Routes>
  )
}

export default App
