import { useOutletContext } from 'react-router-dom'
import Marketplacecard from './Marketplacecard.jsx'

function Marketplace(){

    const { users } = useOutletContext()

    const mappedUsers = users.map(user => <Marketplacecard key={user.id} username={user.name} />)
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