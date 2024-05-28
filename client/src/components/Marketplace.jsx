import { useOutletContext } from 'react-router-dom'
import Marketplacecard from './Marketplacecard.jsx'

function Marketplace(){

    const { users } = useOutletContext()
    const filteredUsers = users.filter(user => user.items.length > 0)
    const mappedUsers = filteredUsers.map(user => <Marketplacecard key={user.id} user={user} />)
    return (
        <div>
            <h1>Marketplace</h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {mappedUsers}
            </div>
        </div>

    )
}

export default Marketplace