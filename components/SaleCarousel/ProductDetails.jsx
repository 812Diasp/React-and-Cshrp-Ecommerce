// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import LocationStripe from "../UserProfile/LocationStripe.jsx";
import './productdetails.scss'
import StarRatingSaleCard from "./StarRatingSaleCard.jsx";
import {useTranslation} from "react-i18next";
import AddCartComponent from "../BuyComponents/AddCartComponent.jsx";
import SaleCarouselCard from "./SaleCarouselCard.jsx";
import ReviewContainer from "../ReviewComponent/ReviewContainer.jsx";
import {useSelector} from "react-redux";

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)
    const { t } = useTranslation();
    const [relatedProducts, setRelProducts] = useState([])
    const [reviews, setReviews] = useState([])
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5248/api/products/${productId}`);
                setProduct(response.data);

                const responseRelatedProducts = await axios.get(`http://localhost:5248/api/products/related/${productId}`);
                // Перемешиваем массив перед взятием среза
                shuffleArray(responseRelatedProducts.data);
                setRelProducts(responseRelatedProducts.data.slice(0, 4));
            } catch(error) {
                console.error("error fetching product:", error)
            } finally {
               try {
                   const reviewsResponse = await axios.get(`http://localhost:5248/api/products/${productId}/reviews`);
                    setReviews(reviewsResponse.data)

               }catch (e){
                   console.log(e)
               } finally {
                   //когда все получили
                   setLoading(false)
               }
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
        <div className={"container"}>
            <LocationStripe location={`Product/${product.category}/${product.name}`}
                            isGreet={false}></LocationStripe>
            <div className={"container product-details"}>
                <div className={'side-detail-image'}>

                    <img width={400} height={400} src={product.image} alt={product.name}/>
                </div>
                <div className={'side-detail-textblock'}>
                    <br/>
                    <h3>{product.name}</h3>
                    <StarRatingSaleCard rating={product.averageRating}
                                        quantity={product.reviewCount}></StarRatingSaleCard>
                    <h3>${product.discountedPrice ? product.discountedPrice : product.price}</h3>
                    <hr/>
                    <p><i>{product.description}</i></p>
                    <div className="tags-container">
                        {product.tags && product.tags.map((tag, index) => (
                            <span key={index} className="product-tag">{tag}</span>
                        ))}
                    </div>
                    {isAuthenticated ?  <AddCartComponent Product={product}></AddCartComponent> : <Link to={'/register'}>
                        <button className={'btn btn-danger mt-5 mb-5'}><h2>Зарегистрируйтесь или войдите для покупки!</h2>
                        </button>
                    </Link>}

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
                            <img width={40} height={40} alt={'cart'} src={'/icon-delivery.png'}/>
                            <div className={'delivery-node-item-desc'}>
                                <h5>Free Delivery<br/>Fast delivery to your town post</h5>

                            </div>
                        </div>
                        <hr/>

                        <div className={'delivery-node-item'}>
                            <img alt={"return"} width={40} height={40} src={'/Icon-return.png'}/>
                            <div className={'delivery-node-item-desc'}>
                                <h5>Return <br/>Make return of your order</h5>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <h3 className={'mt-5'}>Related Products</h3>
            <div className={'related-product-container-1'}>

                {relatedProducts.map((item, index) =>
                    <div key={index} className={'related-product-item'}>
                        <SaleCarouselCard cardInfo={item}></SaleCarouselCard>
                    </div>

                )}
            </div>
        <ReviewContainer Reviews={reviews} averageRating={product.averageRating} ProductId={productId}></ReviewContainer>

        </div>
    );
}

export default ProductDetails;

