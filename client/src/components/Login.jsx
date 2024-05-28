import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Login(){

    const[username, setUsername]= useState ('')
    const[password, setPassword]= useState ('')
    const [ isClicked, setIsClicked ] = useState(false)

    const{setCurrentUser}=useOutletContext()

    function handleLogin(e){
        e.preventDefault()
        fetch("/api/login", {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then (res =>{
            if(res.ok ){
                res.json()
                .then(newUser => setCurrentUser(newUser))
            }else{
                alert("Invalid Username or Password")
            }
        })

    }

    function handleSignup(e){
        e.preventDefault()
        fetch("/api/signup", {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify({username, password})
        })
        .then (res =>{
            if(res.ok ){
                res.json()
                .then(newUser => setCurrentUser(newUser))
            }else{
                alert("Signup Failed")
            }
        })

    }
        if (!isClicked) {
            return(
                <div>
                    <h2>Log in</h2>
                    <form onSubmit = {handleLogin} style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column'
                    }}>
                        <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="username" value={username}/>
                        <input onChange ={e => setPassword(e.target.value)}type="password" name="password" placeholder="password" value={password}/>
                        <input type="submit" name="submit" value='Log in'/>
                    </form>
                    <div> Don't have an account?
                        <a onClick={e => setIsClicked(!isClicked)} href="#">create one here</a>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <h2>Sign up</h2>
                    <form onSubmit={handleSignup} style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column'
                    }}>
                        <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="username" value={username} />
                        <input onChange ={e => setPassword(e.target.value)} type="password" name="password" placeholder="password" value={password}/>
                        <input type="submit" name="submit" value='Sign up'/>
                    </form>
                    <div> Log in
                        <a onClick={e => setIsClicked(!isClicked)} href="#">click here</a>
                    </div>
                </div>
        )
        }
}

export default Login