// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useCallback} from 'react';
import LocationStripe from "../UserProfile/LocationStripe.jsx";
import axios from 'axios';
import './CartPage.scss'; // Import your CSS file

import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {API_URL,fetchCsrfToken} from "../../src/Constants.js";
// Fetch CSRF token
const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [bearerToken, setBearerToken] = useState(null);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [totalPrice, setTotalPrice] = useState(0);
    const { t } = useTranslation();



// Fetch cart data
    // Fetch cart data
    const fetchCartData = useCallback(async (token) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/userCart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            const cart = response.data;

            // Fetch product details for each cart item
            const productDetails = await Promise.all(
                cart.map(async (item) => {
                    const productResponse = await axios.get(`${API_URL}/api/products/${item.productId}`, {
                        withCredentials: true,
                    });
                    return { ...item, product: productResponse.data };
                })
            );

            // Set initial quantities using unique keys (productId_color_variant)
            const initialQuantities = productDetails.reduce((acc, item) => {
                const key = `${item.productId}_${item.color}_${item.variant || ''}`;
                acc[key] = item.quantity;
                return acc;
            }, {});

            setCartItems(productDetails);
            setQuantities(initialQuantities);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Unauthorized: 401"); // Устанавливаем сообщение для 401
            } else {
                setError("Error fetching cart"); // Общее сообщение об ошибке
            }
            setLoading(false);
            console.error("Error fetching cart", error);
        }
    }, []);
    useEffect(() => {
        const getTokensAndCart = async () => {
            setLoading(true);
            try {
                const bearer = sessionStorage.getItem('token');
                setBearerToken(bearer);
                await fetchCartData(bearer);
            } catch (error) {
                setLoading(false);
                console.error("Error getting CSRF token", error);
            }
        };
        getTokensAndCart();
    }, [fetchCartData]);

// Calculate total price
    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            const key = `${item.productId}_${item.color}_${item.variant || ''}`;
            const quantity = quantities[key] || item.quantity;
            const price = item.product.discountedPrice || item.product.price;
            total += quantity * price;
        });
        setTotalPrice(total.toFixed(2));
    }, [cartItems, quantities]);

// Handle quantity change
    const handleQuantityChange = (productId, color, variant, change) => {
        const key = `${productId}_${color}_${variant || ''}`;
        const newQuantity = Math.max(1, (quantities[key] || 1) + change);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [key]: newQuantity,
        }));
    };

// Handle remove item
    const handleRemoveItem = async (productId, color, variant) => {
        if (!bearerToken) {
            setError("Bearer token not initialized");
            return;
        }
        try {
            const csrfToken = await fetchCsrfToken();
            const key = `${productId}_${color}_${variant || ''}`;
            await axios.delete(
                `${API_URL}/api/users/cart/remove/${productId}?color=${color}&variant=${variant || ''}`,
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                        'X-CSRF-Token': csrfToken,
                    },
                    withCredentials: true,
                }
            );
            setCartItems((prevItems) =>
                prevItems.filter(
                    (item) =>
                        !(item.productId === productId && item.color === color && item.variant === variant)
                )
            );
            setQuantities((prevQuantities) => {
                const newQuantities = { ...prevQuantities };
                delete newQuantities[key];
                return newQuantities;
            });
        } catch (error) {
            console.error("Error removing cart item", error);
            setError("Error removing cart item");
        }
    };

// Handle update cart
    const handleUpdateCart = async () => {
        if (!sessionStorage.getItem('token') && !isAuthenticated) {
            setError("Bearer token not initialized");
            console.error('ERROR');
            return;
        }
        setIsUpdating(true);

        try {
            for (const item of cartItems) {
                const key = `${item.productId}_${item.color}_${item.variant || ''}`;
                if (quantities[key] !== item.quantity) {
                    const csrfToken = await fetchCsrfToken();
                    await axios.patch(
                        `${API_URL}/api/users/cart/update/${item.productId}/${quantities[key]}?color=${item.color}&variant=${item.variant || ''}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${bearerToken}`,
                                'X-CSRF-Token': csrfToken,
                            },
                            withCredentials: true,
                        }
                    );
                    setCartItems((prevItems) =>
                        prevItems.map((prevItem) =>
                            prevItem.productId === item.productId &&
                            prevItem.color === item.color &&
                            prevItem.variant === item.variant
                                ? { ...prevItem, quantity: quantities[key] }
                                : prevItem
                        )
                    );
                }
            }
            setIsUpdating(false);
            navigate('/orderpage')
        } catch (error) {
            console.error("Error updating cart", error);
            setIsUpdating(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (typeof errorData === 'string') {
                    setError(errorData);
                    return;
                }
                if (Array.isArray(errorData)) {
                    setError(errorData.join(', '));
                    return;
                }
            }
            setError("Error updating cart");
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 cart-container min-80-container">
                <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
                <h2>Loading cart...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 cart-container min-80-container">
                <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
                <h2>{typeof error === 'string' ? error : "Error fetching cart."}</h2>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 cart-container">
                <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
                <h2>Your cart is empty.</h2>
            </div>
        );
    }
    return (
        <div className="container mt-5 min-80-container">
            <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
            <table className="cart-table">
                <thead>
                <tr>
                    <th>{t("product")}</th>
                    <th className="cart-table-cell-center">{t("price")}</th>
                    <th className="cart-table-cell-center">{t("quantity")}</th>
                    <th className="cart-table-cell-center">{t("subtotal")}</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={`${item.productId}_${item.color}_${item.variant || ''}`}>
                        <td>
                            <div className="cart-item-product">
                                <img
                                    onClick={() => handleRemoveItem(item.productId, item.color, item.variant)}
                                    className="cart-item-product-remove"
                                    width={16} height={16}
                                    src={'/cross.svg'}
                                />

                                <img
                                    width={64}
                                    height={64}
                                    src={item.product.mainImage}
                                    alt={item.product.name}
                                />
                                <Link to={`/products/${item.product.id}`}>
                                <span>
                                   {item.product.name && (
                                       `${item.product.name} (${t(item.color)}${item.variant && item.variant !== "undefined" ? `, ${item.variant}` : ''})`
                                   )}
                                </span>
                                </Link>
                            </div>
                        </td>
                        <td className="cart-table-cell-center">
                            $
                            {item.product.discountedPrice
                                ? item.product.discountedPrice
                                : item.product.price}
                        </td>
                        <td className="cart-table-cell-center">
                            <div className="quantity-selector">
                                <button
                                    className="quantity-button"
                                    onClick={() =>
                                        handleQuantityChange(item.productId, item.color, item.variant, -1)
                                    }
                                >
                                    <img width={32} height={32} src={'/down.svg'}/>
                                </button>
                                <span className="quantity-value">
                                {quantities[`${item.productId}_${item.color}_${item.variant || ''}`] ||
                                    item.quantity}
                            </span>
                                <button
                                    className="quantity-button"
                                    onClick={() =>
                                        handleQuantityChange(item.productId, item.color, item.variant, 1)
                                    }
                                >
                                    <img width={32} height={32} src={'/up.svg'}/>
                                </button>
                            </div>
                        </td>
                        <td className="cart-table-cell-center">
                            $
                            {(quantities[`${item.productId}_${item.color}_${item.variant || ''}`] || item.quantity) *
                                (item.product.discountedPrice || item.product.price)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="cart-footer-container">
                <div className="coupon-container">
                    <input className="coupon-input" type="text" placeholder={t("couponcode")} />
                    <button className="button-form-submit">{t("applycoupon")}</button>
                </div>
                <div className="cart-total-container">
                    <h3>{t("carttotal")}</h3>
                    <div className="cart-total-item">
                        <span className="cart-total-label">{t("subtotal")}:</span>
                        <span className="cart-total-value">${totalPrice}</span>
                    </div>
                    <div className="cart-total-item">
                        <span className="cart-total-label">{t("shipping")}:</span>
                        <span className="cart-total-value">Free</span>
                    </div>
                    <div className="cart-total-item">
                        <span className="cart-total-label">{t("total")}:</span>
                        <span className="cart-total-value">${totalPrice}</span>
                    </div>
                    <button className="button-form-submit" onClick={handleUpdateCart}>
                        {t("tocheckout")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;