import { useState } from 'react'

import './App.css'
import MaxProfitProblem from './MaxProfitProblem'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MaxProfitProblem/>
    </>
  )
}

export default App
