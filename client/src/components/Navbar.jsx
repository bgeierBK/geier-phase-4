import { Link } from "react-router-dom"

function Navbar(){
    return(
        <div className="nav">
            <Link to ="/"> Home </Link>
            <Link to ="/userprofile"> Profile </Link>
            <Link to ="/marketplace"> Marketplace </Link>
            <Link to ="/cart"> Your Cart </Link>
            <Link to ="/checkout"> Checkout </Link>


        </div>
    )
}

export default Navbar