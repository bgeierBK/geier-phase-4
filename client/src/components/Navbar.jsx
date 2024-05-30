import { Link, NavLink } from "react-router-dom"

function Navbar(){
    return(
        <div className="nav">
            <NavLink to ="/"> Home </NavLink>
            {/* <Link to ="/userprofile"> Profile </Link> */}
            <NavLink to ="/marketplace"> Marketplace </NavLink>
            <NavLink to ="/cart"> Your Cart </NavLink>
            <NavLink to ="/checkout"> Checkout </NavLink>
        </div>
    )
}

export default Navbar