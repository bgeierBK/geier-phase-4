import { useOutletContext } from "react-router-dom"

function MarketplaceCollectionCard({ img_url, id, price, description}){

    const { handleAddToCart } = useOutletContext()

    return (
        <div id="marketplaceCollectionCard">
            <img src={img_url} alt='collection image'/>
            <p>{description}</p>
            <span>{price}</span>
            <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
        </div>
    )
}

export default MarketplaceCollectionCard