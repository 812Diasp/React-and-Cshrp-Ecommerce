import React, {useCallback, useState} from 'react';
import './AddCartComponent.scss'; // Создадим стили позже
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const AddCartComponent = ({ Product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const { t } = useTranslation();

    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5248/api/csrf', { withCredentials: true });
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            throw error;
        }
    }, []);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        // eslint-disable-next-line react/prop-types
        const productId = Product.id;
        const token = sessionStorage.getItem('token');
        try {
            const csrfToken = await fetchCsrfToken();
            await axios.post(
                `http://localhost:5248/api/users/cart/add/${productId}/${quantity}`,
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
        <div className="add-cart-container">
            <div className="quantity-selector">
                <button className={"quantity-button"} onClick={handleDecrement}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className={"quantity-button"} onClick={handleIncrement}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {isAdded ? (
                <button className="button-form-submit-1-clicked">
                    {t("added")}
                </button>
            ) : (
                <button className="button-form-submit-1" onClick={handleAddToCart}>
                    {t("addcart")}
                </button>
            )}
            <button className="add-to-favorites-button">
                <FontAwesomeIcon icon={faHeart} />
            </button>
        </div>
    );
};

export default AddCartComponent;