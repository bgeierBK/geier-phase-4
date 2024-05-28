import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Userprofile from "./Userprofile.jsx"
import { useOutletContext } from "react-router-dom"

function Homepage(){

    const {currentUser, setCurrentUser} = useOutletContext()
    if (!currentUser) { 
        return (
    
            <div className="flex-row">
    
              {/* <Signup setCurrentUser={setCurrentUser}/> */}
              <Login setCurrentUser={setCurrentUser}/>
    
            </div>
    
        )
    
        } else {

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
            <Userprofile/>
        </div>
    )
 pass

}
}


export default Homepage