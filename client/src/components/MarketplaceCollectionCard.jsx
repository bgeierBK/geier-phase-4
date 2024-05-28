import { useOutletContext } from "react-router-dom"

function MarketplaceCollectionCard({ img_url, id, price, description}){

    const { handleAddToCart } = useOutletContext()

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
            <span>{price}</span>
            <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
        </div>
    )
}

export default MarketplaceCollectionCard