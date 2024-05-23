// import { useState, useEffect, } from "react"
// import useOutletContext from 'react-router-dom'
import { useState } from "react"
import { useOutlet, useOutletContext } from "react-router-dom"

function Login(){

const[username, setUsername]= useState ('')
const[password, setPassword]= useState ('')

const{setCurrentUser}=useOutletContext()

function handleSubmit(e){
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
    return(
        <div>
            <h2>Log in</h2>
            <form style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column'
            }}>
                <input onChange ={e => setUsername(e.target.value)} type="'text" name="username" placeholder="username" value={username}/>
                <input onChange ={e => setPassword(e.target.value)}type="password" name="password" placeholder="password" value={password}/>
                <input type="submit" name="submit" value='Log in'/>
            </form>
        </div>
    )
}

export default Login