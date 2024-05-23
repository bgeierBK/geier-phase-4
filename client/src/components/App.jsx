import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"

function App() {

  const [currentUser, setCurrentUser]= useState(null)

  const [collections, setCollections] =useState([])
  useEffect(()=>{fetch("http://localhost:3000/collections")
  .then(res => res.json())
  .then(collections => setCollections (collections))
  }, [])

  const [users, setUsers] = useState([])
  useEffect(()=>{fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => setUsers (users))
  }, [])
 
  // const collections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  // const users = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 's']

  return (

    <div className='App'>
 
      <h1 style={{
        width: '100%',
        textAlign: 'center',
        color: '#333'
      }}>Collector Market</h1>
        <Navbar/>
      <Outlet context={{collections:collections, users: users, currentUser:currentUser, setCurrentUser:setCurrentUser}} />
     
    </div>
  )

}

export default App
