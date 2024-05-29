function Collectioncard({ img_url, id, price, description, onDelete}){


    return (
        <div id="cartcollectioncard">
            <img src={img_url} style={{
                width: '200px',
                height: '200px'
            }} alt='collection image'/>
            <p>{description}</p>
            <span>Price: {price}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

export default Collectioncard