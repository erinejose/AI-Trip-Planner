import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import LandingPage from './components/custom/LandingPage'
import CreateTrip from './components/create-trip/CreateTrip'
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage/>
      
    </>
  )
}

export default App
