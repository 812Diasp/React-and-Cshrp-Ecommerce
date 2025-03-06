import React from 'react';
import axios from 'axios';
import {API_URL, fetchCsrfToken} from "../../Constants.js";
import './OrderPage.scss'
import {Link} from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const currentYear = new Date().getFullYear();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        if (year !== currentYear) {
            return `${day}.${month}.${String(year).slice(-2)} ${hours}:${minutes}`;
        }
        return `${day}.${month} ${hours}:${minutes}`;
    };

    const validateOrder = (order) => ({
        userId: order.userId || 'N/A',
        totalPrice: order.totalPrice || 'N/A',
        orderDate: formatDate(order.orderDate) || 'N/A',
        orderStatus: order.orderStatus || 'N/A',
        paymentMethod: order.paymentMethod || 'N/A',
        shippingAddress: order.shippingAddress || 'N/A',
        orderItems: Array.isArray(order.orderItems) ? order.orderItems : [],
    });

    const fetchProductsForOrders = async (orders) => {
        const updatedOrders = await Promise.all(
            orders.map(async (order) => {
                const updatedItems = await Promise.all(
                    order.orderItems.map(async (item) => {
                        try {
                            const productResponse = await axios.get(`${API_URL}/api/products/${item.productId}`, {
                                withCredentials: true,
                            });
                            return {...item, product: productResponse.data};
                        } catch (err) {
                            console.error(`Error fetching product ${item.productId}:`, err);
                            return {...item, product: null};
                        }
                    })
                );
                return {...order, orderItems: updatedItems};
            })
        );
        return updatedOrders;
    };

    React.useEffect(() => {
        const fetchOrders = async () => {
            const token = sessionStorage.getItem('token');
            const csrf = await fetchCsrfToken();
            try {
                const response = await axios.get(
                    `${API_URL}/api/users/orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'X-CSRF-Token': csrf,
                        },
                        withCredentials: true,
                    }
                );
                const validatedOrders = (response.data || []).map(validateOrder);
                const ordersWithProducts = await fetchProductsForOrders(validatedOrders);
                setOrders(ordersWithProducts);
                setError(null);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        (async () => await fetchOrders())();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-80-container container">
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index + "_" + order.userId} className={'order-flex order-block mt-5'}>
                        <div className={'side-order-block'}>


                            <h4>Status: {order.orderStatus}</h4>
                            <p>Price: {order.totalPrice}$</p>
                            <p>Pay Method: {order.paymentMethod}</p>
                            <p>Date: {order.orderDate}</p>
                        </div>

                        {/*<p>Shipping Address: {typeof order.shippingAddress === 'object' ? JSON.stringify(order.shippingAddress) : order.shippingAddress}</p>*/}
                        {/*<h3>Order Items:</h3>*/}
                        <div className="row ">
                            {order.orderItems.length > 0 ? (
                                order.orderItems.map((item, itemIndex) => (
                                    item.product && (
                                        <Link key={itemIndex} to={`/products/${item.product.id}`}>
                                            <div className={'order-flex  mt-4'}>
                                                <img width={64} height={64} src={item.product.mainImage}
                                                     alt={item.product.name}/>
                                                <div className={'order-flex'}>
                                                    <h5>{item.product.name}</h5>
                                                    <p>{item.product.price}$</p>
                                                    <p>{item.quantity || 'N/A'} pcs.</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                ))
                            ) : (
                                <p>No items in this order</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default Orders;