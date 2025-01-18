import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '/src/store/actions/authActions.js';
import './navbar.scss';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const language = useSelector((state) => state.app.language);


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        dispatch(logOut());
        navigate('/');
    };


    return (
        <div className={'nabpx'}>
            <div className={'main-navbar-wrapper'}>
                <div className="main-navbar">
                    <div className="navbar-logo">
                        <h2>CyberBaza</h2>
                    </div>
                    <div id={'navigation-links'} className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/" className="nav-link px-2 link-current">
                                {t('home')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog" className="nav-link px-2 link-current">
                                {t('catalog')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link px-2 link-current">
                                {t('contact')}
                            </Link>
                        </li>
                    </div>
                    <div className={'utilities'}>
                        <div className="navbar-searchbar">
                            <input className="navbar-search" type="text" placeholder={t('search-ph')}/>
                            <img src={'/search.png'} alt="Search" />
                        </div>
                        <div className={'navbar-wishlist-cart'}>
                            <img className={'wishlist-icon'} src={'/Wishlist.png'} alt="Wishlist" />
                            <img className={'cart-icon'} src={'/CartBuy.png'} alt="Cart" />
                            {isAuthenticated ? (
                                <div className="dropdown">
                                    <img
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        id="dropdownMenu2"
                                        className={'dropdown-toggle'}
                                        src={'/user.png'}
                                        alt="User"
                                    />
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                {t('profile')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/orders">
                                                {t('orders')}
                                            </Link>
                                        </li>
                                        <hr />
                                        <li>
                                            <button className="dropdown-item log-out" onClick={handleLogout}>
                                                {t('log out')}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to={'/register'}>
                                    <button className={'btn btn-info'}> {t('login')} / {t('register')}</button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;