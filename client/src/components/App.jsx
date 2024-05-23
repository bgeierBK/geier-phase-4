import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"

function App() {

  const [currentUser, setCurrentUser]= useState(null)
  const [collections, setCollections] =useState([])
  const [cartItems, setCartItems] =useState([])


  useEffect(()=>{
      fetch("http://localhost:3000/collections")
      .then(res => res.json())
      .then(collections => setCollections (collections))
  }, [])

  const [users, setUsers] = useState([])
  useEffect(()=>{
      fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(users => setUsers (users))
  }, [])

  function handleAddToCart(id){
    const newItem = collections.find(item => item.id === id) //using find because it returns an element while filter returns an array that contains that element.
    setCartItems(cartItems => [...cartItems, newItem])
  }

  
  return (

    <div className='App'>
 
      <h1 style={{
        width: '100%',
        textAlign: 'center',
        color: '#333'
      }}>Collector Market</h1>
        <Navbar/>
      <Outlet context={{collections:collections, setCollections: setCollections, users: users, currentUser:currentUser, setCurrentUser:setCurrentUser, cartItems: cartItems, setCartItems: setCartItems, handleAddToCart: handleAddToCart}} />
     
    </div>
  )

}

export default App
