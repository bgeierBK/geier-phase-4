import { useOutletContext } from 'react-router-dom'
import Usercollectioncard from './Usercollectioncard.jsx'
import { useState } from 'react'

function Userprofile(){

    const {currentUser, setCurrentUser} = useOutletContext()
    const [ userItems, setUserItems ] = useState(currentUser.items)

    const mappedCollections = userItems.map(collection => <Usercollectioncard key={collection.id} id={collection.id} description={collection.description} price={collection.price} img_url={collection.img_url} userItems={userItems} setUserItems={setUserItems} />)

    function handleLogout(){
        setCurrentUser(null)
        fetch('/api/logout', {
            method: 'DELETE'
        })
    }

    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ image, setImage ] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "price": price,
                "img_url": image,
                "item_user_id": currentUser.id
            })
        })
        .then(res => res.json())
        .then(newItem => setUserItems([...userItems, newItem]))
        setName('')
        setDescription('')
        setPrice(0)
        setImage('')

    }
    

    return (
        <div id="userprofile">
            <h1> Welcome {currentUser.username} {currentUser.badges.map(badge=>badge.name).join(", ")}</h1>
            <button id="logout-btn" onClick={handleLogout}>Log out</button>
            <br></br>
            <div id="usercollectioncard-c">
                    {/* this will have a button to go to marketplace */}
                {mappedCollections}
            </div>
            <h2>Add a collection:</h2>
            <form onSubmit={handleSubmit}> 
                <input type='text' name='name' placeholder='Name' onChange={e => setName(e.target.value)} value={name }/>
                <input type='text' name='description' placeholder='Description' onChange={e => setDescription(e.target.value)} value={description }/>
                <input type='number' name='price' placeholder='Price' onChange={e => setPrice(e.target.value)} value={price }/>
                <input type='text' name='image' placeholder='Image_url' onChange={e => setImage(e.target.value)} value={image } />
                <input className="login-btn" type='submit' name='submit' />
            </form>
        </div>
    )
}

export default Userprofile