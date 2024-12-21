import './footer.scss'

const Footer = () => {
    return (

        <footer className="py-5">
            <div className='container'>
                <div className="row">
                    <div className="col-2">
                        <h5>Account</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">My Account</a>
                            </li>
                            <li className="nav-item mb-2"><a href="#"
                                                             className="nav-link p-0 ">Login/Register</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">Cart</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">Wishlist</a>
                            </li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">My Orders</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-2">
                        <h5>Support</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">Stavropol,
                                per. makarova 26 B</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0">+7-988-22-87-045</a></li>

                        </ul>
                    </div>

                    <div className="col-2">
                        <h5>Quick Navigation</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">Privacy
                                Policy</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">Terms Of
                                Use</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 ">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-4 offset-1">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly digest of whats new and exciting from us.</p>
                            <div className="d-flex w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control"
                                       placeholder="Email address"/>
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex justify-content-between py-4 my-4 border-top">
                    <p>© 2024 Denis Tkachenko. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-dark" href="#">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#twitter"></use>
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="#">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#instagram"></use>
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="#">
                            <svg className="bi" width="24" height="24">
                                <use xlinkHref="#facebook"></use>
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </div>
        </footer>

)
    ;
};

export default Footer;