import Signup from "./Signup.jsx"
import Login from "./Login.jsx"

function Homepage(){

    return(
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row'
        }}>
            <Signup />
            <Login />
        </div>
    )
 pass

}


export default Homepage