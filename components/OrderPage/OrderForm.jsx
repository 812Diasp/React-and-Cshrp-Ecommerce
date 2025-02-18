// eslint-disable-next-line no-unused-vars
import React, {useState, useCallback, useEffect, useMemo} from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import './OrderForm.scss'
import {API_URL} from "../../src/Constants.js";

const OrderForm = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const {t} = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    // eslint-disable-next-line no-unused-vars
    const [csrfToken, setCsrfToken] = useState('');
    const [productDetails, setProductDetails] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const paymentMethods = [
        'Credit Card',
        'USDT',
        'BTC',
        'ETH'
    ];

    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/api/csrf`, {withCredentials: true});
            setCsrfToken(response.data.token);
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            throw error;
        }
    }, []);


    useEffect(() => {
        const fetchCartItems = async () => {
            if (!isAuthenticated) return;
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/users/userCart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });
                setOrderItems(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = {};
            for (const item of orderItems) {
                try {
                    const response = await axios.get(`${API_URL}/api/products/${item.productId}`);
                    details[item.productId] = response.data;
                } catch (error) {
                    console.error(`Error fetching product details for ${item.productId}:`, error);
                    details[item.productId] = null;
                }
            }
            setProductDetails(details);
        };
        fetchProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderItems]);

    const toCart = () => {
        navigate("/cart")
    }
    const validateForm = () => {
        let errors = {};
        if (!street) errors.street = 'Street is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';

        // Regex for most common postal code formats
        const postalCodeRegex = /^[A-Za-z\d\s-]{3,10}$/;
        if (!postalCode) {
            errors.postalCode = 'Postal Code is required';
        } else if (!postalCodeRegex.test(postalCode)) {
            errors.postalCode = 'Postal Code is invalid';
        }
        if (!paymentMethod) errors.paymentMethod = 'Payment method is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        if (!validateForm()) {
            return;
        }
        const token = sessionStorage.getItem('token');
        const order = {
            orderItems: orderItems,
            shippingAddress: {
                street: street,
                city: city,
                state: state,
                postalCode: postalCode
            },
            paymentMethod: paymentMethod
        };
        try {
            const csrfToken = await fetchCsrfToken();
            const response = await axios.post(
                `${API_URL}/api/orders`,
                order,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-CSRF-Token": csrfToken
                    },
                    withCredentials: true
                }
            );
            console.log("Order created:", response.data);
            alert("Order created");
            navigate('/')
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Error creating order");
        }
    };

    const totalPrice = useMemo(() => {
        let total = 0;
        for (const item of orderItems) {
            const product = productDetails[item.productId];
            if (product) {
                const price = product.discountedPrice != null ? product.discountedPrice : product.price;
                total += price * item.quantity;
            }
        }
        return total;
    }, [orderItems, productDetails]);

    return (
        <div className="container">
            <div className="order-form-container">
                <div className={'order-form-1-section'}>
                    <h2 className="mb-4">{t("checkout")}</h2>
                    <h3 className="mb-4">Внимательно проверяйте данные, если будут указаны нечитаемые/невалидные данные ваш заказ отменится</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street <span style={{color: 'red'}}>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.street ? 'is-invalid' : ''}`}
                                id="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                            {formErrors.street && (
                                <div className="invalid-feedback">{formErrors.street}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City <span
                                style={{color: 'red'}}>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                            {formErrors.city && (
                                <div className="invalid-feedback">{formErrors.city}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State <span
                                style={{color: 'red'}}>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                            {formErrors.state && (
                                <div className="invalid-feedback">{formErrors.state}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postalCode" className="form-label">Postal Code <span
                                style={{color: 'red'}}>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.postalCode ? 'is-invalid' : ''}`}
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                            {formErrors.postalCode && (
                                <div className="invalid-feedback">{formErrors.postalCode}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <p>Выберите метод платежа</p>
                            <label htmlFor="paymentMethod" className="form-label">Payment Method <span
                                style={{color: 'red'}}>*</span></label>
                            <select
                                className={`form-select ${formErrors.paymentMethod ? 'is-invalid' : ''}`}
                                id="paymentMethod"
                                value={paymentMethod}

                                onChange={(e) => setPaymentMethod(e.target.value)}
                                required
                            >

                                {paymentMethods.map((method) => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>
                            {formErrors.paymentMethod && (
                                <div className="invalid-feedback">{formErrors.paymentMethod}</div>
                            )}
                        </div>
                        <h4 className="mt-3">Total Price: ${totalPrice.toFixed(2)}</h4>
                        <button type="submit" className="btn btn-primary">Create Order</button>
                    </form>
                </div>
                <div className={'order-form-2-section'}>
                    <h3>Order Items:</h3>
                    {orderItems.map((item) => {
                        const product = productDetails[item.productId];
                        if (!product) return null;
                        const price = product.discountedPrice != null ? product.discountedPrice : product.price;
                        return (
                            <div key={item.productId} className="mb-3">
                                <div className="order-card-body">
                                    <div className="order-card-image">
                                        <img src={product.mainImage} alt={product.name}
                                             style={{width: '150px', height: '150px', marginRight: '10px'}}/>
                                    </div>
                                    <div className={'order-card-text'}>
                                        <h5 className="">{product.name} {product.color} <br/> ({item.quantity} pcs.)
                                        </h5>

                                        <h5>${price.toFixed(2)}</h5>
                                        <button
                                            type="button"
                                            className="btn btn-info ms-auto"
                                            onClick={() => toCart()}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default OrderForm;