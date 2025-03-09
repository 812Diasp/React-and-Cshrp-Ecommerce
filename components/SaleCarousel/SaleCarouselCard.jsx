import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import StarRatingSaleCard from './StarRatingSaleCard';
import PropTypes from "prop-types";
import { API_URL, fetchCsrfToken } from "../../src/Constants.js";
import { updateFavorites, updateTracking } from "../../src/store/actions/authActions.js";


// import { FaEye, FaHeart } from 'react-icons/fa'; // Импортируем иконки

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

    useEffect(() => {
        if (isAuthenticated && user) {
            setTempIsFavorite(user?.favorites?.includes(cardInfo.id) || false);
            setTempIsTracking(user?.tracking?.includes(cardInfo.id) || false);
        }
    }, [isAuthenticated, user, cardInfo.id]);

    const handleAddToCart = async () => {
        const productId = cardInfo.id;
        const token = sessionStorage.getItem('token');
        try {
            const csrfToken = await fetchCsrfToken();
            await axios.post(
                `${API_URL}/api/users/cart/add/${productId}/1?color=${cardInfo.colors[0]}&variant=${cardInfo.variants ? cardInfo.variants[0] : ''}`,
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

    // Обработчик переключения избранного
    const handleToggleFavorite = useCallback(() => {
        if (!isAuthenticated || !user) return;

        setTempIsFavorite(!tempIsFavorite);

        try {
            dispatch(updateFavorites(cardInfo.id));
        } catch (error) {
            setTempIsFavorite(!tempIsFavorite);
            console.error("Error toggling favorite", error);
        }
    }, [isAuthenticated, user, cardInfo.id, tempIsFavorite, dispatch]);

    // Обработчик переключения отслеживания
    const handleToggleTracking = useCallback(() => {
        if (!isAuthenticated || !user) return;

        setTempIsTracking(!tempIsTracking);

        try {
            dispatch(updateTracking(cardInfo.id));
        } catch (error) {
            setTempIsTracking(!tempIsTracking);
            console.error("Error toggling tracking", error);
        }
    }, [isAuthenticated, user, cardInfo.id, tempIsTracking, dispatch]);

    return (
        <div className="sale-card" key={cardInfo.id}>
            <div className="card-sale-image">
                <img
                    loading="lazy"
                    className="card-image"
                    src={cardInfo.mainImage}
                    alt="saleCard"
                    width="270px"
                    height="250px"
                />


                <div>
                    <span className="card-discont-badge">{Math.round(Number(cardInfo.discountPercentage))}%</span>
                </div>
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
                            <Link to="/register" className="hover-text-card">
                                {t("registerToBuy")}
                            </Link>
                        </div>
                    )}
                </div>
                <div className="card-controls">
                    {/* Контрол для "Глаза" */}
                    <div>
                        {/*<FaEye*/}
                        {/*   */}
                        {/*    size={32}*/}
                        {/*  */}
                        {/*/>*/}
                        <svg className={`card-control-item ${tempIsTracking ? 'active' : 'inactive'}`}
                             onClick={handleToggleTracking}
                              width="32px" height="32px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                                    fill="#000000"/>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                                      fill="#000000"/>
                            </g>

                        </svg>
                    </div>
                    {/* Контрол для "Сердца" */}
                    <div>

                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg"  onClick={handleToggleFavorite}
                             className={`card-control-item ${tempIsFavorite ? 'active' : 'inactive'}`}>

                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                    fill="#000000"/>
                            </g>

                        </svg>
                        {/*<FaHeart*/}
                        {/*    className={`card-control-item ${tempIsFavorite ? 'active' : 'inactive'}`}*/}
                        {/*    size={32}*/}
                        {/*    onClick={handleToggleFavorite}*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
            <Link to={`/products/${cardInfo.id}`} className="color-text-link">
                <p className="sale-product-title">{cardInfo.name}</p>
                <p className="sale-product-price">
                    {cardInfo.price}$
                    <span className="gray-sale-product-price">{cardInfo.originalPrice}$</span>
                </p>
            </Link>
            {/*<StarRatingSaleCard rating={cardInfo.averageRating} quantity={cardInfo.reviewCount} />*/}
        </div>
    );
};

SaleCarouselCard.propTypes = {
    cardInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        brand: PropTypes.string,
        category: PropTypes.string,
        mainImage: PropTypes.string.isRequired,
        additionalImages: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        characteristics: PropTypes.object,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number.isRequired,
        discountPercentage: PropTypes.number.isRequired,
        discountedPrice: PropTypes.number,
        discountStartDate: PropTypes.string,
        discountEndDate: PropTypes.string,
        vatRate: PropTypes.number,
        reviews: PropTypes.array,
        reviewCount: PropTypes.number,
        ratingCount: PropTypes.number,
        fiveStarRatingCount: PropTypes.number,
        fourStarRatingCount: PropTypes.number,
        threeStarRatingCount: PropTypes.number,
        twoStarRatingCount: PropTypes.number,
        oneStarRatingCount: PropTypes.number,
        averageRating: PropTypes.number,
        stockQuantity: PropTypes.number,
        weight: PropTypes.number,
        dimensions: PropTypes.shape({
            Length: PropTypes.number,
            Width: PropTypes.number,
            Height:PropTypes.number,
            Unit: PropTypes.string
        }),
        tags: PropTypes.arrayOf(PropTypes.string),
        isAvailable: PropTypes.bool,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        variants: PropTypes.array,
        metaTitle: PropTypes.string,
        metaDescription: PropTypes.string,
        urlSlug: PropTypes.string,
        manufacturer: PropTypes.string,
        shippingCost: PropTypes.number,
        vendor: PropTypes.string,
        warrantyPeriod: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string),
        options: PropTypes.array
    }).isRequired
};

export default SaleCarouselCard;