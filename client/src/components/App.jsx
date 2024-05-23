import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function App() {

  const collections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const users = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 's']

  return (
    <div className='App'>
      <h1 style={{
        width: '100%',
        textAlign: 'center',
        color: '#333'
      }}>Collector Market</h1>
      <Outlet context={{collections:collections, users: users}} />
    </div>
  )

}

export default App
