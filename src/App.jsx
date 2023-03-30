import { useState } from 'react'
import Timer from './components/Timer'
import Noise from './components/Noise'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Timer />
      <Noise />
    </div>
  )
}

export default App
