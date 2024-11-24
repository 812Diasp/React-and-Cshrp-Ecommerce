
import './navbar.scss'
const Navbar = () => {
    return (
        <div className={'nabpx'}>
        <div className={'main-navbar-wrapper'}>
        <div className="main-navbar">
            <div className="navbar-logo">
                <h2>CyberBaza</h2>
            </div>
            <div id={'navigation-links'} className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 link-current">Home</a></li>
                <li><a href="#" className="nav-link px-2">Features</a></li>
                <li><a href="#" className="nav-link px-2">Pricing</a></li>
                <li><a href="#" className="nav-link px-2">FAQs</a></li>
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
                <img className={''} src={'/user.png'}/>
            </div>
            </div>
        </div>

        </div>
            <hr/>
        </div>
    );
};

export default Navbar;