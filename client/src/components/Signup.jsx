import { useState } from "react"
import { useOutlet, useOutletContext } from "react-router-dom"


function Signup(){

const[username, setUsername]= useState ('')
const[password, setPassword]= useState ('')

const{setCurrentUser}=useOutletContext()

function handleSubmit(e){
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
 
   
}

export default Signup