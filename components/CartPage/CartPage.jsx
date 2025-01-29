import React, {useState, useEffect, useCallback} from 'react';
import LocationStripe from "../UserProfile/LocationStripe.jsx";
import axios from 'axios';
import './CartPage.scss'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [updateError, setUpdateError] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [bearerToken, setBearerToken] = useState(null);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const { t } = useTranslation();
    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5248/api/csrf', { withCredentials: true });
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            setError("Error fetching CSRF token");
            throw error;
        }
    }, []);

    const fetchCartData = useCallback(async (token) => {
        try {
            const response = await axios.get('http://localhost:5248/api/users/userCart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });
            const cart = response.data;
            const productDetails = await Promise.all(
                cart.map(async (item) => {
                    const productResponse = await axios.get(`http://localhost:5248/api/products/${item.productId}`, {
                        withCredentials: true
                    });
                    return { ...item, product: productResponse.data };
                })
            );
            setCartItems(productDetails);
            const initialQuantities = productDetails.reduce((acc, item) => {
                acc[item.productId] = item.quantity;
                return acc;
            }, {});
            setQuantities(initialQuantities);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.error("error fetch cart", error);
        }
    }, []);

    useEffect(() => {
        const getTokensAndCart = async () => {
            setLoading(true)
            try {
                const bearer = sessionStorage.getItem('token')
                setBearerToken(bearer);
                await fetchCartData(bearer);
            } catch (error)
            {
                setLoading(false)
                console.error("error getting csrf", error)
            }
        };
        getTokensAndCart();
    }, [fetchCartData]);
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += (quantities[item.productId] || item.quantity) * (item.product.discountedPrice ? item.product.discountedPrice : item.product.price);
        });
        setTotalPrice(total)
    }, [cartItems, quantities])

    const handleQuantityChange = (productId, change) => {
        const newQuantity = Math.max(1, (quantities[productId] || 1) + change);

        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    const handleRemoveItem = async (productId) => {
        if (!bearerToken) {
            setError("Bearer token not initialized");
            return;
        }
        try {
            const csrfToken = await fetchCsrfToken();
            await axios.delete(`http://localhost:5248/api/users/cart/remove/${productId}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    'X-CSRF-Token': csrfToken,
                },
                withCredentials: true
            });

            setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
            setQuantities((prevQuantities) => {
                const newQuantities = { ...prevQuantities };
                delete newQuantities[productId];
                return newQuantities;
            });
        } catch (error) {
            console.error("error remove cart item", error)
            setError("error remove cart item");
        }
    };
    const handleReturnToShop = () => {
        navigate('/');
    };
    const handleUpdateCart = async () => {
        if (!bearerToken) {
            setError("Bearer token not initialized");
            return;
        }
        setIsUpdating(true)
        try {
            await Promise.all(
                cartItems.map(async (item) => {
                    if (quantities[item.productId] !== item.quantity) {
                        const csrfToken = await fetchCsrfToken();
                        await axios.patch(
                            `http://localhost:5248/api/users/cart/update/${item.productId}/${quantities[item.productId]}`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${bearerToken}`,
                                    'X-CSRF-Token': csrfToken,
                                },
                                withCredentials: true
                            }
                        );
                        setCartItems((prevItems) =>
                            prevItems.map((prevItem) => {
                                if (prevItem.productId === item.productId) {
                                    return { ...prevItem, quantity: quantities[item.productId] };
                                }
                                return prevItem;
                            })
                        );
                        setUpdateError((prevErrors) => {
                            const newErrors = { ...prevErrors };
                            delete newErrors[item.productId];
                            return newErrors;
                        });
                    }
                })
            );
            setIsUpdating(false)
        } catch (error) {
            console.error("error update cart", error);
            setIsUpdating(false)
            if(error.response && error.response.data)
            {
                const errorData = error.response.data;
                if(typeof errorData === 'string')
                {
                    setError(errorData)
                    return;
                }
                if(Array.isArray(errorData))
                {
                    setError(errorData.join(', '))
                    return;
                }
            }
            setError("Error updating cart")
        }
    };

    if (loading) {
        return <div className={"container mt-5"}>
            <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
            <h2>Loading cart...</h2>
        </div>
    }
    if (error) {
        return <div className={"container mt-5"}>
            <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
            <h2>{typeof error === 'string' ? error : "Error fetch cart."}</h2>
        </div>
    }

    if (cartItems.length === 0) {
        return <div className={"container mt-5"}>
            <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
            <h2>Your cart is empty.</h2>
        </div>
    }
    return (
        <div className={"container mt-5"}>
            <LocationStripe location={"Home / Cart"} isGreet={false}></LocationStripe>
            <table className="cart-table">
                <thead>
                <tr>
                    <th>{t("product")}</th>
                    <th className={'cart-table-cell-center'}>{t("price")}</th>
                    <th className={'cart-table-cell-center'}>{t("quantity")}</th>
                    <th className={'cart-table-cell-center'}>{t("subtotal")}</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.productId}>
                        <td>
                            <div className={"cart-item-product"}>
                                <FontAwesomeIcon onClick={() => handleRemoveItem(item.productId)} className={'cart-item-product-remove'} icon={faXmark}></FontAwesomeIcon>
                                <img width={64} height={64} src={item.product.image} alt={item.product.name} />
                                <Link to={`/products/${item.product.id}`}><span>{item.product.name}</span></Link>
                            </div>
                        </td>
                        <td className={'cart-table-cell-center'}>${item.product.discountedPrice ? item.product.discountedPrice : item.product.price}</td>
                        <td className={'cart-table-cell-center'}>
                            <div className="quantity-selector">
                                <button className={"quantity-button"} onClick={() => handleQuantityChange(item.productId, -1)}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                                <span className="quantity-value">{quantities[item.productId] || item.quantity}</span>
                                <button className={"quantity-button"} onClick={() => handleQuantityChange(item.productId, 1)}>
                                    <FontAwesomeIcon icon={faCaretUp} />
                                </button>
                                {updateError[item.productId] && (
                                    <div className="error-message">{updateError[item.productId]}</div>
                                )}
                            </div>
                        </td>
                        <td className={'cart-table-cell-center'}>${(quantities[item.productId] || item.quantity) * (item.product.discountedPrice ? item.product.discountedPrice : item.product.price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="cart-footer-container">
                <div className="coupon-container">
                    <input className="coupon-input" type="text" placeholder={t("couponcode")}/>
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
                    <button className={"button-form-submit"} onClick={handleUpdateCart}>{t("tocheckout")}</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;