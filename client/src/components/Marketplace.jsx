import { useOutletContext } from 'react-router-dom'
import Marketplacecard from './Marketplacecard.jsx'

function Marketplace(){

    const { users, currentUser } = useOutletContext()
    if (currentUser == null){
        return "Not Logged In"
    }
    const filteredUsers = users.filter(user => user.items.length > 0 && (currentUser === null || user.id !== currentUser.id))
    const mappedUsers = filteredUsers.map(user => <Marketplacecard key={user.id} user={user} />)
    return (
        <div>
            <h1 id="marktheader">MARKETPLACE</h1>
            <div>
                {mappedUsers}
            </div>
        </div>

    )
}

export default Marketplace