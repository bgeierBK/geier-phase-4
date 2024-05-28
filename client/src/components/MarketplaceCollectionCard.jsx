import { useOutletContext } from "react-router-dom"

function MarketplaceCollectionCard({ collection}){

    const { currentUser,setCurrentUser } = useOutletContext()

    function handleAddToCart(){
        fetch(`/api/items/${collection.id}`,{
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({item_cart_id: currentUser.id})
        })
        .then(r=>r.json())
        .then(item => setCurrentUser({
                ...currentUser,
                cart: [{
                    ...currentUser.cart[0],
                    items: [
                        item,
                        ...currentUser.cart[0].items
                    ]
                }]
        }))
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column'
        }}>
            <img src={collection.img_url} style={{
                width: '200px',
                height: '200px'
            }} alt='collection image'/>
            <p>{collection.description}</p>
            <span>{collection.price}</span>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default MarketplaceCollectionCard