

function Signup(){


    return(
        <div>
            <h2>Sign up</h2>
            <form style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column'
            }}>
                <input type="'text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" name="submit" value='Sign up'/>
            </form>
        </div>
)
}

export default Signup