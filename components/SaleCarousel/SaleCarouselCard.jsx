import './salecarousel.scss'
import StarRatingSaleCard from "./StarRatingSaleCard.jsx";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
// eslint-disable-next-line react/prop-types
const SaleCarouselCard = ({ cardInfo, key }) => {
    const infoOfCard = cardInfo;
    const [isAdded, setIsAdded] = useState(false);
    const { t, i18n } = useTranslation();
   // const [isSale, setIsSale] = useState(false);


    function colorRating() {
        const allstars = document.querySelectorAll('.star');
        for (let i = 0; i < allstars.length; i++) {
            let elem = allstars[i].children[0];
            elem.setAttribute('fill', '#ffad33');
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            colorRating();
        }, 10);


        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Removed infoOfCard from dependency array to avoid unnecessary renders
    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5248/api/csrf', { withCredentials: true });
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            throw error;
        }
    }, []);
    const handleAddToCart = async () => {
        // eslint-disable-next-line react/prop-types
        const productId = infoOfCard.id;
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

    return (
        <div className={'sale-card'} key={key}>
            {/* eslint-disable-next-line react/prop-types */}

            <div className="card-sale-image">
                <img className={'card-image'} src={infoOfCard.image} alt={'saleCard'} width={'270px'} height={'250px'} />
                <div><span className={'card-discont-badge'}>{infoOfCard.discountPercentage}%</span></div>
                <div className="hover-overlay">
                    {isAdded ? (
                        <div className="hover-text hover-text-added" onClick={handleAddToCart}>
                            <p>{t("added")}</p>
                        </div>
                    ) : (
                        <div className="hover-text" onClick={handleAddToCart}>
                            <p>{t("addcart")}</p>
                        </div>
                    )}
                </div>
                <div className="card-controls">
                    <FontAwesomeIcon className={'card-control-item'} icon={faEye} />  {/* Use the imported faEye */}
                    <FontAwesomeIcon className={'card-control-item'} icon={faHeart} /> {/* Use the imported faHeart */}
                </div>
            </div>
            {/* eslint-disable-next-line react/prop-types */}
            <Link to={`/products/${cardInfo.id}`} className={'color-text-link'}>
            <p className={'sale-product-title'}>{infoOfCard.name}</p>
            <p className={'sale-product-price'}>
                {infoOfCard.price}$
                <span className={'gray-sale-product-price'}>{infoOfCard.originalPrice}$</span>
            </p>
            <StarRatingSaleCard rating={infoOfCard.averageRating} quantity={infoOfCard.reviewCount}></StarRatingSaleCard>
            </Link>
        </div>
    );
};

export default SaleCarouselCard;