import  {useCallback, useState} from 'react';
import './AddCartComponent.scss'; // Создадим стили позже
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import axios from "axios";
import {API_URL} from "../../src/Constants.js";

// eslint-disable-next-line react/prop-types
const AddCartComponent = ({ Product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const { t } = useTranslation();
    // eslint-disable-next-line react/prop-types
    const [selectedColor, setSelectedColor] = useState(Product.colors[0]);
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/api/csrf`, { withCredentials: true });
            return response.data.token;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
            throw error;
        }
    }, []);

    const handleAddToCart = async () => {
        // eslint-disable-next-line react/prop-types
        const productId = Product.id;
        const token = sessionStorage.getItem('token');
        try {
            const csrfToken = await fetchCsrfToken();
            await axios.post(
                // eslint-disable-next-line react/prop-types
                `${API_URL}/api/users/cart/add/${productId}/${quantity}?color=${selectedColor}&variant=${Product.variants[0]}&color=${selectedColor}&variant=${Product.variants ? Product.variants[0] : ''}`,
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
            setTimeout(()=>setIsAdded(false), 3000);
        } catch (error) {
            console.error("error adding product to cart", error);
        }
    };


    const handleColorSelect = (color) => {
        setSelectedColor(color);
        console.log(color)
    };

    return (
        <div className="add-cart-container">
            <div className="mb-2">
                {/* eslint-disable-next-line react/prop-types */}
                <div className="color-selector">
                    {/* eslint-disable-next-line react/prop-types */}
                    {Product.colors.map((color, index) => (
                        <div
                            key={index}
                            className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                            style={{backgroundColor: color}}
                            onClick={() => handleColorSelect(color)}
                            title={color}
                        ></div>

                    ))}
                </div>

            </div>
            <div className="quantity-selector">
                <button className={"quantity-button"} onClick={handleDecrement}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className={"quantity-button"} onClick={handleIncrement}>
                    <FontAwesomeIcon icon={faPlus}/>
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
                <FontAwesomeIcon icon={faHeart}/>
            </button>
        </div>
    );
};

export default AddCartComponent;