import { Link, NavLink } from "react-router-dom"

function Navbar(){
    return(
        <div className="nav">
            <NavLink to ="/" activeClassName='active'> Home </NavLink>
            {/* <Link to ="/userprofile"> Profile </Link> */}
            <NavLink to ="/marketplace" activeClassName='active'> Marketplace </NavLink>
            <NavLink to ="/cart" activeClassName='active'> Your Cart </NavLink>
            <NavLink to ="/checkout" activeClassName='active'> Checkout </NavLink>
        </div>
    )
}

export default Navbar