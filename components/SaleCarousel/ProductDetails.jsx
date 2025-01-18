import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LocationStripe from "../UserProfile/LocationStripe.jsx";
import './productdetails.scss'
import StarRatingSaleCard from "./StarRatingSaleCard.jsx";
import {useTranslation} from "react-i18next";
function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5248/api/products/${productId}`);
                setProduct(response.data);
            } catch(error) {
                console.error("error fetching product:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    },[productId])

    if(loading)
        return <p>Loading product...</p>

    if (!product) {
        return <p>Product not found.</p>;
    }


    return (
        <div className={"container product-details"}>
            <div className={'side-detail-image'}>
                <LocationStripe location={`Product/${product.category}/${product.name}`} isGreet={false}></LocationStripe>
                <img width={400} height={500} src={product.image} alt={product.name}/>
            </div>
            <div className={'side-detail-textblock'}>
                <br/>
                <h3>{product.name}</h3>
                <StarRatingSaleCard rating={product.averageRating} quantity={product.reviewCount}></StarRatingSaleCard>
                <h3>${product.discountedPrice ? product.discountedPrice : product.price}</h3>
                <hr/>
                <p><i>{product.description}</i></p>
                <h2>{t("characteristics")}</h2>
                <ul>
                    {product.characteristics &&
                        Object.entries(product.characteristics).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                </ul>
                <div className={'delivery-node'}>
                    <div className={'delivery-node-item'}>
                        <img width={40} height={40} src={'/icon-delivery.png'}/>
                        <div className={'delivery-node-item-desc'}>
                            <h5>Free Delivery<br/>Fast delivery to your town post</h5>

                        </div>

                    </div>

                    <div className={'delivery-node-item'}>
                        <img width={40} height={40} src={'/Icon-return.png'}/>
                        <div className={'delivery-node-item-desc'}>
                            <h5>Return <br/>Make return of your order</h5>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
}

export default ProductDetails;

