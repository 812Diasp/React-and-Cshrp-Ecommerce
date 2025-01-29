import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './navbar.scss';
import { useTranslation } from 'react-i18next';
import {  setAuth, logout } from '/src/store/features/auth/authSlice';
import axios from "axios";
const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const language = useSelector((state) => state.app.language);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5248/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true, // Очень важно для работы с куками
                    });
                    if (response.status === 200) {
                        // Успешный запрос, пользователь авторизован
                        dispatch(setAuth({ isAuthenticated: true, user: response.data })); // Pass user data
                    } else {
                        // Неуспешный запрос, пользователь не авторизован
                        sessionStorage.removeItem('token'); // Удалить токен, если запрос не удался
                        dispatch(setAuth({ isAuthenticated: false }));
                    }
                } catch (error) {
                    console.error('Ошибка авторизации:', error);
                    sessionStorage.removeItem('token'); // Удалить токен при ошибке
                    dispatch(setAuth({ isAuthenticated: false }));
                }
            } else {
                dispatch(setAuth({ isAuthenticated: false }));
            }
        };

        checkAuthentication();
    }, [dispatch]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        dispatch(logout());
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

                            {isAuthenticated ? (<>
                                    <img className={'wishlist-icon'} src={'/Wishlist.png'} alt="Wishlist"/>

                                    <Link to={'/cart'}>
                                    <button type="button" className="btn position-relative">
                                       <img className={'cart-icon'} src={'/CartBuy.png'} alt="Cart"/>

                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                       !!!
                                         <span className="visually-hidden">products in cart</span>
                                        </span>
                                    </button>
                                    </Link>
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
                                            <hr/>
                                            <li>
                                                <button className="dropdown-item log-out" onClick={handleLogout}>
                                                    {t('log out')}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link to={'/register'}>
                                    <button className={'button-form-submit-1'}> {t('login')} / {t('register')}</button>
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