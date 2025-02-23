import { useState } from 'react'
import './App.css'
import FlightInfoForm from './components/FlightInfoForm';

function App() 
{
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>WingMan</h1>
        <FlightInfoForm />
      </header>
    </div>
  )
}

export default App
