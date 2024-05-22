
function MarketplaceCollectionCard(){

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column'
        }}>
            <img src="https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?cs=srgb&dl=pexels-pixabay-159751.jpg&fm=jpg" style={{
                width: '200px',
                height: '200px'
            }} alt='collection image'/>
            <p>Collection description</p>
            <span>Collection price</span>
            <button>Add to Cart</button>
        </div>
    )
}

export default MarketplaceCollectionCard