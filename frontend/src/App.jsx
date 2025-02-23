import { useState } from 'react'
import './App.css'
import FlightInfoForm from './components/FlightInfoForm';

function App() 
{
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-red-500">
      <h1 className="text-4xl font-bold text-white text-center">Hello, Tailwind!</h1>
    </div>

  );
}

export default App
