import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faEye} from '@fortawesome/free-solid-svg-icons';
import StarRatingSaleCard from './StarRatingSaleCard';
import PropTypes from "prop-types";
import {API_URL} from "../../src/Constants.js";
import {updateFavorites, updateTracking} from "../../src/store/actions/authActions.js";
// eslint-disable-next-line react/prop-types
const SaleCarouselCard = ({cardInfo}) => {
    const {t} = useTranslation();

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

    // function colorRating() {
    //     const allstars = document.querySelectorAll('.star');
    //     for (let i = 0; i < allstars.length; i++) {
    //         let elem = allstars[i].children[0];
    //         elem.setAttribute('fill', '#ffad33');
    //     }
    // }
    // ОЧЕНЬ ВАЖНАЯ СТРОЧКА ДЛЯ ЦВЕТА ЗВЕЗДОЧЕК!!!!!!!
    useEffect(() => {
        if (isAuthenticated && user) {
            setTempIsFavorite(user?.favorites?.includes(cardInfo.id) || false);
            setTempIsTracking(user?.tracking?.includes(cardInfo.id) || false);
        }
    }, [isAuthenticated, user, cardInfo.id]);
    const handleAddToCart = async () => {
        // eslint-disable-next-line react/prop-types
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


    // Получение CSRF-токена
    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/api/csrf`, {withCredentials: true});
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            throw error;
        }
    }, []);

    // Обработчик переключения избранного
    const handleToggleFavorite = useCallback(() => {
        if (!isAuthenticated || !user) {
            return;
        }else{
            setTempIsFavorite(!tempIsFavorite);

            try {
                // Вызываем thunk из Redux
                dispatch(updateFavorites(cardInfo.id));
            } catch (error) {
                // Если запрос не удался, откатываем изменения
                setTempIsFavorite(!tempIsFavorite);
                console.error("Error toggling favorite", error);
            }
        }

        // Оптимистический подход: обновляем локальное состояние сразу

    }, [isAuthenticated, user, cardInfo.id, tempIsFavorite, dispatch]);

    // Обработчик переключения отслеживания
    const handleToggleTracking = useCallback(() => {
        if (!isAuthenticated || !user) {
            return;
        }else{
            setTempIsTracking(!tempIsTracking);

            try {
                // Вызываем thunk из Redux
                dispatch(updateTracking(cardInfo.id));
            } catch (error) {
                // Если запрос не удался, откатываем изменения
                setTempIsTracking(!tempIsTracking);
                console.error("Error toggling tracking", error);
            }
        }

        // Оптимистический подход: обновляем локальное состояние сразу

    }, [isAuthenticated, user, cardInfo.id, tempIsTracking, dispatch]);
    return (
        <div className={'sale-card'} key={cardInfo.id}>
            <div className="card-sale-image">
                <img className={'card-image'} src={cardInfo.mainImage} alt={'saleCard'} width={'270px'}
                     height={'250px'}/>
                <div><span className={'card-discont-badge'}>{Math.round(Number(cardInfo.discountPercentage))}%</span>
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
                        <div className="hover-text ">
                            <Link to={'/register'} className={"hover-text-card"}>{t("registerToBuy")}</Link>
                        </div>
                    )}
                </div>
                <div className="card-controls">
                    <div >
                        <FontAwesomeIcon
                            className={`card-control-item ${tempIsTracking ? 'active' : 'inactive'}`}
                            icon={faEye}
                            onClick={handleToggleTracking}
                        />
                    </div>
                    <div >
                        <FontAwesomeIcon
                            className={`card-control-item ${tempIsFavorite ? 'active' : 'inactive'}`}
                            icon={faHeart}
                            onClick={handleToggleFavorite}
                        />
                    </div>
                </div>
            </div>
            <Link to={`/products/${cardInfo.id}`} className={'color-text-link'}>
                <p className={'sale-product-title'}>{cardInfo.name}</p>
                <p className={'sale-product-price'}>
                    {cardInfo.price}$
                    <span className={'gray-sale-product-price'}>{cardInfo.originalPrice}$</span>
                </p>
            </Link>
            <StarRatingSaleCard rating={cardInfo.averageRating} quantity={cardInfo.reviewCount}/>


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
            Height: PropTypes.number,
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