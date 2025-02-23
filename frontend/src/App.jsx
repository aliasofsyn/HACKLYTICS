import { useState } from 'react'
import './App.css'
import FlightInfoForm from './components/FlightInfoForm';

function App() 
{
  const [count, setCount] = useState(0)

  return (
    <div>
      <FlightInfoForm />    
    </div>
  );
}

export default App
