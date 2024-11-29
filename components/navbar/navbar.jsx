
import './navbar.scss'
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <div className={'nabpx'}>
        <div className={'main-navbar-wrapper'}>
        <div className="main-navbar">
            <div className="navbar-logo">
                <h2>CyberBaza</h2>
            </div>
            <div id={'navigation-links'} className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className="nav-link px-2 link-current">Home</Link></li>
                <li><a href="#" className="nav-link px-2">About</a></li>

            </div>
            <div className={'utilities'}>
            <div className="navbar-searchbar">
                <input className="navbar-search" type="text" placeholder="What are you looking for?"/>
                <img src={'/search.png'}/>

            </div>
            <div className={'navbar-wishlist-cart'}>
                <img className={'wishlist-icon'} src={'/Wishlist.png'}/>
                <img className={'cart-icon'} src={'/CartBuy.png'}/>

                <div className="dropdown">
                    <img data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenu2" className={'dropdown-toggle'} src={'/user.png'}/>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li>
                            <Link className="dropdown-item" to="/profile">Profile</Link>
                        </li>
                        <li><Link className="dropdown-item" to="/orders">Orders & deliveries</Link></li>
                        <hr/>
                        <li><Link className="dropdown-item log-out" to="/user-logout">Log out</Link></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>

        </div>
            <hr/>
        </div>
    );
};

export default Navbar;