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
import './ColorSelector.scss'
import {API_URL} from "../../src/Constants.js";
function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [relatedProducts, setRelProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [images,setImages] = useState(null)


    // Состояние для текущего изображения
    const [currentImage, setCurrentImage] = useState(null);

    // Массив всех доступных изображений

    // Обработчик клика для изменения текущего изображения
    const handleImageClick = (image) => {
        setCurrentImage(image);

    };

    // Функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products/${productId}`);
                setProduct(response.data);

                // Загрузка связанных продуктов
                const responseRelatedProducts = await axios.get(`${API_URL}/api/products/related/${productId}`);
                shuffleArray(responseRelatedProducts.data);
                setRelProducts(responseRelatedProducts.data.slice(0, 4));

                // Загрузка отзывов
                const reviewsResponse = await axios.get(`${API_URL}/api/products/${productId}/reviews`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // Обновляем currentImage, когда загружается новый продукт
    useEffect(() => {
        if (product) {
            setCurrentImage(product.mainImage);
            setImages (product.additionalImages ? [product.mainImage, ...product.additionalImages] : [product.mainImage])
        }
    }, [product]);

    if (loading) return <p>{t('loadingProduct')}</p>;
    if (!product) return <p>{t('loadingProductError')}</p>;

    return (
        <div className="container">
            <LocationStripe location={`Product/${product.category}/${product.name}`} isGreet={false}></LocationStripe>
            <div className="container product-details">
                <div className="side-detail-image">
                    {/* Группа миниатюр */}
                    <div className="side-image-group">

                        {images.length > 0 && images.map((image, index) => (
                            <img
                                key={index}
                                width={170}
                                height={170}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                onClick={() => handleImageClick(image)}
                                style={{cursor: 'pointer'}}
                            />
                        ))}
                    </div>
                    {/* Текущее изображение */}
                    <div className="side-image-current">
                        <img
                            width={650}
                            height={650}
                            src={currentImage || product.mainImage} // Если currentImage не установлено, используем mainImage
                            alt={product.name}
                        />
                    </div>
                </div>
                <div className="side-detail-textblock">
                    <br />
                    <h3>{product.name}</h3>
                    <StarRatingSaleCard rating={product.averageRating} quantity={product.reviewCount}></StarRatingSaleCard>
                    <h3>${product.discountedPrice || product.price}</h3>
                    <hr />
                    <p><i>{product.description}</i></p>
                    {/*<div className="tags-container">*/}
                    {/*    {product.tags &&*/}
                    {/*        product.tags.map((tag, index) => (*/}
                    {/*            <span key={index} className="product-tag">*/}
                    {/*                {tag}*/}
                    {/*            </span>*/}
                    {/*        ))}*/}
                    {/*</div>*/}
                    {isAuthenticated ? (
                        <>

                            <AddCartComponent Product={product}></AddCartComponent>
                        </>
                    ) : (
                        <Link to="/register">
                            <button className="button-form-submit-1 mt-2 mb-2">
                                <h2>{t('registerToBuy')}</h2>
                            </button>
                        </Link>
                    )}
                    <h2>{t("characteristics")}</h2>
                    <ul>
                        {product.characteristics &&
                            Object.entries(product.characteristics).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                    </ul>
                    <h2>Прочаяя информация</h2>
                    <div>
                        <h5>
                        {product.dimensions.length}x{product.dimensions.width}x{product.dimensions.height} ({product.dimensions.unit})
                        <br/>
                       Warranty Period {product.warrantyPeriod}
                        </h5>
                    </div>
                    <div className="delivery-node">
                        <div className="delivery-node-item">
                            <img width={40} height={40} alt="cart" src="/icon-delivery.png" />
                            <div className="delivery-node-item-desc">
                                <h5>{t('freeDelivery')}<br/>{t('fastDeliverytotown')}</h5>
                            </div>
                        </div>
                        <hr />
                        <div className="delivery-node-item">
                            <img alt="return" width={40} height={40} src="/Icon-return.png" />
                            <div className="delivery-node-item-desc">
                                <h5>{t('return')} <br />{t('makeReturn')}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="mt-5">{t('relatedProducts')} {product.name}</h3>
            <div className="related-product-container-1">
                {relatedProducts.map((item, index) => (
                    <div key={index} className="related-product-item">
                        <SaleCarouselCard cardInfo={item}></SaleCarouselCard>
                    </div>
                ))}
            </div>
            <ReviewContainer Reviews={reviews} averageRating={product.averageRating} ProductId={productId}></ReviewContainer>
        </div>
    );
}

export default ProductDetails;