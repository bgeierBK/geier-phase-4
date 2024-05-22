import { useOutletContext } from 'react-router-dom'
import MarketplaceCollectionCard from './MarketplaceCollectionCard.jsx'

function Marketplacecard(){

    const { collections } = useOutletContext()
    const mappedCollections = collections.map(collection => <MarketplaceCollectionCard />)
    return (
        <div>
            <h1>Username</h1>
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