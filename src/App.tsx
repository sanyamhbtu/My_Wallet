import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Wallet } from './pages/Wallet'
import './App.css'
import { useState } from 'react'
type backgroundType = "light" | "dark";

function App() {
const[background, SetBackground] = useState<backgroundType>("dark")
  return (
    <div className={`fixed inset-0 overflow-y-auto ${background === "light" ? "bg-white" : "bg-black"}`}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home background={background} setBackground={SetBackground} />} />
        <Route path="/wallet" element={<Wallet background={background} setBackground={SetBackground} />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
