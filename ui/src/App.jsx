import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LineChart from './component/LineChart'

function App() {
  const [data, setData] = useState([{}])

  // useEffect(()=>{
  //   fetch("http://localhost:8000/chart")
  //     .then(res=>res.json())
  //     .then(data => {
  //       setData(data) 
  //       console.log(data)
  //     })
  //     .catch(err=>console.log(err))
  // }, [])

//"2020-01-02T00:00:00"



  return (
    <>
      <LineChart/>
    </>
  )
}

export default App
