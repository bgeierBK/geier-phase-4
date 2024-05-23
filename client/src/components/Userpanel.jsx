import Signup from './Signup'
import Login from './Login'
import Userprofile from "./Userprofile"
import { useOutletContext } from 'react-router-dom'

function UserPanel() {
 const [currentUser, setCurrentUser] = useOutletContext()


  if (!currentUser) { 
    return (

        <div className="flex-row">

          <Signup setCurrentUser={setCurrentUser}/>

          <Login setCurrentUser={setCurrentUser}/>

        </div>

    )

    } else {

      return (
        <Userprofile currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      )

    }

}

export default UserPanel