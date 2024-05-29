import { useOutletContext } from 'react-router-dom'
import MarketplaceCollectionCard from './MarketplaceCollectionCard.jsx'

function Marketplacecard({user}){

    const mappedCollections = user.items.map(collection => <MarketplaceCollectionCard key={collection.id} id={collection.id} description={collection.description} price={collection.price} img_url={collection.img_url} />)
    
    return (
        <div id="marketplace">
            <h1>{user.username}'s Store</h1>
            <div id="marketplacecard">
                {mappedCollections}
            </div>
        </div>
    )
}

export default Marketplacecard