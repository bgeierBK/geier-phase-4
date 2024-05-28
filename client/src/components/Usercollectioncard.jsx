import { useOutletContext } from "react-router-dom"

function Usercollectioncard({ img_url, id, price, description, userItems, setUserItems}){

function handledelete(){
    const updatedCollections = userItems.filter(collection => collection.id !== id)
    setUserItems(updatedCollections)
    fetch(`/api/items/${id}`, {
        method: 'DELETE',
    })
}
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column'
        }}>
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