import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { setFavorites, setTracking } from '/src/store/features/auth/authSlice.js';
import StarRatingSaleCard from './StarRatingSaleCard';
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const SaleCarouselCard = ({ cardInfo }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isAdded, setIsAdded] = useState(false);

    // Мемоизация состояний избранного и отслеживания
    const isFavorite = useMemo(() => Boolean(user?.favorites?.includes(cardInfo.id)), [user, cardInfo.id]);
    const isTracking = useMemo(() => Boolean(user?.tracking?.includes(cardInfo.id)), [user, cardInfo.id]);

    // Локальные состояния для временного хранения состояний кнопок
    const [tempIsFavorite, setTempIsFavorite] = React.useState(isFavorite);
    const [tempIsTracking, setTempIsTracking] = React.useState(isTracking);

    function colorRating() {
        const allstars = document.querySelectorAll('.star');
        for (let i = 0; i < allstars.length; i++) {
            let elem = allstars[i].children[0];
            elem.setAttribute('fill', '#ffad33');
        }
    }
    // ОЧЕНЬ ВАЖНАЯ СТРОЧКА ДЛЯ ЦВЕТА ЗВЕЗДОЧЕК!!!!!!!
    useEffect(() => {

        const timer = setTimeout(() => {
            colorRating();
        }, 10);
        if (isAuthenticated && user) {
            setTempIsFavorite(user?.favorites?.includes(cardInfo.id) || false);
            setTempIsTracking(user?.tracking?.includes(cardInfo.id) || false);
        }
        return () => clearTimeout(timer);
    }, [isAuthenticated, user, cardInfo.id]);
    const handleAddToCart = async () => {
        // eslint-disable-next-line react/prop-types
        const productId = cardInfo.id;
        const token = sessionStorage.getItem('token');
        try {
            const csrfToken = await fetchCsrfToken();
            await axios.post(
                `http://localhost:5248/api/users/cart/add/${productId}/1`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-CSRF-Token": csrfToken
                    },
                    withCredentials: true
                }
            );
            setIsAdded(true);
            console.log("Product added to cart");
        } catch (error) {
            console.error("error adding product to cart", error);
        }
    };


    // Получение CSRF-токена
    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5248/api/csrf', { withCredentials: true });
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            throw error;
        }
    }, []);

    // Обработчик переключения избранного
    const handleToggleFavorite = useCallback(async () => {
        if (!isAuthenticated || !user) return;

        // Оптимистический подход: обновляем локальное состояние сразу
        setTempIsFavorite(!tempIsFavorite);

        try {
            const token = sessionStorage.getItem('token');
            const csrfToken = await fetchCsrfToken();

            const response = await axios.post(
                `http://localhost:5248/api/products/${cardInfo.id}/favorites`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-CSRF-Token": csrfToken
                    },
                    withCredentials: true
                }
            );

            // Обновляем глобальное состояние Redux
            if (response.data.includes("removed")) {
                dispatch(setFavorites(user.favorites.filter(id => id !== cardInfo.id)));
            } else {
                dispatch(setFavorites([...(user.favorites || []), cardInfo.id]));
            }
        } catch (error) {
            // Если запрос не удался, откатываем изменения
            setTempIsFavorite(!tempIsFavorite);
            console.error("Error toggling favorite", error);
        }
    }, [isAuthenticated, user, cardInfo.id, tempIsFavorite]);

    // Обработчик переключения отслеживания
    const handleToggleTracking = useCallback(async () => {
        if (!isAuthenticated || !user) return;

        // Оптимистический подход: обновляем локальное состояние сразу
        setTempIsTracking(!tempIsTracking);

        try {
            const token = sessionStorage.getItem('token');
            const csrfToken = await fetchCsrfToken();

            const response = await axios.post(
                `http://localhost:5248/api/products/${cardInfo.id}/tracking`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-CSRF-Token": csrfToken
                    },
                    withCredentials: true
                }
            );

            // Обновляем глобальное состояние Redux
            if (response.data.includes("removed")) {
                dispatch(setTracking(user.tracking.filter(id => id !== cardInfo.id)));
            } else {
                dispatch(setTracking([...(user.tracking || []), cardInfo.id]));
            }
        } catch (error) {
            // Если запрос не удался, откатываем изменения
            setTempIsTracking(!tempIsTracking);
            console.error("Error toggling tracking", error);
        }
    }, [isAuthenticated, user, cardInfo.id, tempIsTracking]);
    return (
        <div className={'sale-card'} key={cardInfo.id}>
            <div className="card-sale-image">
                <img className={'card-image'} src={cardInfo.image} alt={'saleCard'} width={'270px'} height={'250px'}/>
                <div><span className={'card-discont-badge'}>{cardInfo.discountPercentage}%</span></div>
                <div className="hover-overlay">
                    {isAuthenticated ? (
                        isAdded ? (
                            <div className="hover-text hover-text-added" onClick={handleAddToCart}>
                                <p>{t("added")}</p>
                            </div>
                        ) : (
                            <div className="hover-text" onClick={handleAddToCart}>
                                <p>{t("addcart")}</p>
                            </div>
                        )
                    ) : (
                        <div className="hover-text">
                            <Link to={'/register'}>Войдите в аккаунт</Link>
                        </div>
                    )}
                </div>
                <div className="card-controls">
                    <FontAwesomeIcon
                        className={`card-control-item ${tempIsTracking ? 'active' : 'inactive'}`}
                        icon={faEye}
                        onClick={handleToggleTracking}
                    />
                    <FontAwesomeIcon
                        className={`card-control-item ${tempIsFavorite ? 'active' : 'inactive'}`}
                        icon={faHeart}
                        onClick={handleToggleFavorite}
                    />
                </div>
            </div>
            <Link to={`/products/${cardInfo.id}`} className={'color-text-link'}>
                <p className={'sale-product-title'}>{cardInfo.name}</p>
                <p className={'sale-product-price'}>
                    {cardInfo.price}$
                    <span className={'gray-sale-product-price'}>{cardInfo.originalPrice}$</span>
                </p>
                <StarRatingSaleCard rating={cardInfo.averageRating} quantity={cardInfo.reviewCount}/>
            </Link>
        </div>
    );
};
SaleCarouselCard.propTypes = {
    cardInfo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.string.isRequired,
        discountPercentage: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number.isRequired,
        averageRating: PropTypes.number.isRequired,
        reviewCount: PropTypes.number.isRequired,
    }).isRequired,
    // key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default SaleCarouselCard;