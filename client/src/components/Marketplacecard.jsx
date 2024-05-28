import { useOutletContext } from 'react-router-dom'
import MarketplaceCollectionCard from './MarketplaceCollectionCard.jsx'

function Marketplacecard({user}){

    const { collections } = useOutletContext()
    const mappedCollections = user.items.map(collection => <MarketplaceCollectionCard key={collection.id} collection = {collection} />)
    
    return (
        <div>
            <h1>{user.username.toUpperCase()}</h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: '3px'
            }}>
                {mappedCollections}
            </div>
        </div>
    )
}

export default Marketplacecard