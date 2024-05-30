import { useOutletContext } from "react-router-dom"

function Usercollectioncard({ img_url, id, price, description, currentUser, setCurrentUser}){

function handledelete(){
    const updatedCollections = currentUser.items.filter(collection => collection.id !== id)
    setCurrentUser({...currentUser,items:updatedCollections})
    fetch(`/api/items/${id}`, {
        method: 'DELETE',
    })
}
    return (
        <div id="usercollectioncard">
            <img src={img_url} style={{
                width: '200px',
                height: '200px'
            }} alt='collection image'/>
            <p>{description}</p>
            <span>Price: {price}</span>
            <button onClick={handledelete}>Delete</button>
        </div>
    )
}

export default Usercollectioncard