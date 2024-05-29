import MarketplaceCollectionCard from './MarketplaceCollectionCard.jsx'

function Marketplacecard({user}){

    const filteredCollection = user.items.filter(collection => collection.item_cart_id === null)
    const mappedCollections = filteredCollection.map(collection => <MarketplaceCollectionCard key={collection.id} collection = {collection} />)

    const filteredBadges = user.user_badge.filter(b => b.display)
    const mappedBadges = filteredBadges.map((b, i)=><img key={i} src={b.badge.src} height={30}/>)
    if (mappedCollections.length){
      return (
          <div id="marketplace">
                <h1>{user.username.toUpperCase()} {mappedBadges}</h1>
                <div id="marketplacecard">
                    {mappedCollections}
                </div>
           </div>
        )
    }
}

export default Marketplacecard