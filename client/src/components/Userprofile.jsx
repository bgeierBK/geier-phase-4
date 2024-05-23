import { useOutletContext } from 'react-router-dom'
import Usercollectioncard from './Usercollectioncard.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'

function Userprofile(){

    const {currentUser, setCurrentUser} = useOutletContext()
    const { collections } = useOutletContext()

    const mappedCollections = collections.map(collection => <Usercollectioncard key={collection.id} id={collection.id} description={collection.description} price={collection.price} img_url={collection.img_url} />)
    

    return (
        <div>
            <h1> Welcome {currentUser.username} </h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '3px'
            }}>
                    {/* this will have a button to go to marketplace */}
                {mappedCollections}
            </div>
            <br />
            <br />
            <h2 style={{
                width: '100%',
                textAlign: 'center',
                color: '#333'
            }}>Add a collection:</h2>
            <form style={{
                position: 'absolute',
                left: '50%',
                top: '80%',
                transform: 'translateX(-50%'
            }}> 
                <input type='text' name='description' placeholder='description'/>
                <input type='number' name='price' placeholder='price'/>
                <input type='text' name='image' placeholder='image_url' />
            </form>
        </div>
    )
}

export default Userprofile