import Collectioncard from "./Collectioncard.jsx";
import { useOutletContext } from "react-router-dom";


function Cart(){

    const { cartItems, setCartItems } = useOutletContext()

    console.log(cartItems)

    function onDelete(id) {
        let itemRemoved = false; 
        const updatedCartItems = cartItems.filter(item => { 

            if (item.id === id && !itemRemoved) {
                itemRemoved = true; 
                return false; 
            }
            return true; 
        });
        setCartItems(updatedCartItems); 
    }
    //New array for items
    const updatedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(accItem => accItem.id === item.id);
    if (existingItem) {
    // If the item is already in acc, update its price and count
        existingItem.price += item.price;
        existingItem.count++;
    } else {
    // If the item is not in acc, add it
        acc.push({ ...item});
    }
    return acc;
    }, []);

    if (cartItems == "") {
        return (<h1>Your cart is empty!</h1>)
    }
    return (
        <div>
            {updatedItems.map(item => <Collectioncard key={item.id} id={item.id} description={item.description} price={item.price} img_url={item.img_url} onDelete={onDelete} />)}
        </div>
    )
}

export default Cart