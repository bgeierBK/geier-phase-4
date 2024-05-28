import Collectioncard from "./Collectioncard.jsx";
import { useOutletContext } from "react-router-dom";


function Cart(){

    const { currentUser, setCurrentUser } = useOutletContext()

    function onDelete(id) {
        fetch(`/api/items/${id}`,{
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({item_cart_id: null})
        })
        .then(r => r.json())
        .then(revised_item => setCurrentUser({
            ...currentUser,
            cart: [{
                ...currentUser.cart[0],
                items: [
                    ...currentUser.cart[0].items.filter(item => item.id !== revised_item.id)
                ]
            }]
        }))
    }
    if (currentUser == null){
        return "Not Logged In"
    }

    if (currentUser.cart[0].items.length === 0) {
        return (<h1>Your cart is empty!</h1>)
    }
    return (
        <div>
            {currentUser.cart[0].items.map(item => <Collectioncard key={item.id} id={item.id} description={item.description} price={item.price} img_url={item.img_url} onDelete={onDelete} />)}
        </div>
    )
}

export default Cart