import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Home from './components/home'
import Register from './components/register'
import { BrowserRouter, HashRouter } from "react-router-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HashRouter>
        {/* used routes so that it particularly renders required component */}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
      </HashRouter>
    </>
  )
}

export default App
