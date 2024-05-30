import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"

function App() {

  const [currentUser, setCurrentUser]= useState(null)
  const [collections, setCollections] =useState([])
  const [cartItems, setCartItems] =useState([])


  useEffect( () => {
    fetch('/api/check_session')
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(loggedUser => setCurrentUser(loggedUser))
      }
    }
    )
  }, [])


  useEffect(()=>{
      fetch("/api/items")
      .then(res => res.json())
      .then(collections => setCollections (collections))
  }, [])

  const [users, setUsers] = useState([])
  useEffect(()=>{
      fetch("/api/users")
      .then(res => res.json())
      .then(users => setUsers (users))
  }, [])

  function handleAddToCart(id){
    const newItem = collections.find(item => item.id === id) //using find because it returns an element while filter returns an array that contains that element.
    setCartItems(cartItems => [...cartItems, newItem])
  }

  
  return (

    <div className='App'>
 
      <h1 id="header">Collectible Corner</h1>
        <Navbar/>
      <Outlet context={{collections:collections, setCollections: setCollections, users: users, setUsers: setUsers, currentUser:currentUser, setCurrentUser:setCurrentUser, cartItems: cartItems, setCartItems: setCartItems, handleAddToCart: handleAddToCart}} />
     
    </div>
  )

}

export default App
