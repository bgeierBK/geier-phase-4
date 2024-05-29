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
                <div className="login-div">
                    <h2>Log in</h2>
                    <form onSubmit = {handleLogin} >
                        <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="Username" value={username}/>
                        <input onChange ={e => setPassword(e.target.value)}type="password" name="password" placeholder="Password" value={password}/>
                        <button className="login-btn" type="submit" name="submit">Log in</button>
                    </form>
                    <br />
                    <div> Don't have an account?&nbsp;
                        <a onClick={e => setIsClicked(!isClicked)} href="#">create one here</a>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="login-div">
                    <h2>Sign up</h2>
                    <form onSubmit={handleSignup} >
                        <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="Username" value={username} />
                        <input onChange ={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" value={password}/>
                        <button className="login-btn" type="submit" name="submit">Sign up</button>
                    </form>
                    <br />
                    <div> Log in &nbsp;
                        <a onClick={e => setIsClicked(!isClicked)} href="#">click here</a>
                    </div>
                </div>
        )
        }
}

export default Login