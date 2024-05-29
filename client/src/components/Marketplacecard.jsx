import MarketplaceCollectionCard from './MarketplaceCollectionCard.jsx'

function Marketplacecard({user}){

    const filteredCollection = user.items.filter(collection => collection.item_cart_id === null)
    const mappedCollections = filteredCollection.map(collection => <MarketplaceCollectionCard key={collection.id} collection = {collection} />)
    if (mappedCollections.length){
      return (
          <div id="marketplace">
              <h1>{user.username.toUpperCase()}</h1>
              <div id="marketplacecard">
                  {mappedCollections}
           </div>
        )
    }
}

export default Marketplacecard