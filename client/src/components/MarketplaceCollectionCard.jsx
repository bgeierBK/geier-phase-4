import { useOutletContext } from "react-router-dom"

function MarketplaceCollectionCard({ collection}){

    const { currentUser,setCurrentUser, setUsers } = useOutletContext()

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
        .then(revised_item => {
            setCurrentUser({
                ...currentUser,
                cart: [{
                    ...currentUser.cart[0],
                    items: [
                        revised_item,
                        ...currentUser.cart[0].items
                    ]
                }]
            })
            setUsers(users=> users.map(user => {
                if(user.id == revised_item.item_user_id){
                    return {
                        ...user,
                        items: [
                            ...user.items.map(item => {
                                if (item.id == revised_item.id){
                                    return revised_item
                                }
                                return item
                            })
                        ]
                    }
                }
                return user
            }))
        })
    }

    return (
        <div id="marketplaceCollectionCard">
            <img src={collection.img_url} alt='collection image'/>
            <p>{collection.description}</p>
            <span>{collection.price}</span>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default MarketplaceCollectionCard