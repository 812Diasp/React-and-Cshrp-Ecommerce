import {useEffect, useState} from 'react';
import SaleCarouselCard from "../SaleCarousel/SaleCarouselCard.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {API_URL} from "../../src/Constants.js";

const CategoryPage = () => {
    const { category } = useParams(); // Получаем параметр :category из URL
    const [products, setProducts] = useState([]); // Состояние для хранения товаров
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
    const { t } = useTranslation();
    const navigate = useNavigate();
    // Функция для получения товаров по категории
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true); // Показываем индикатор загрузки
                const response = await axios.get(`${API_URL}/api/products/category/${category}`);
                setProducts(response.data); // Сохраняем полученные товары в состоянии
            } catch (error) {
                console.error('Error fetching products for category:', error);
            } finally {
                setLoading(false); // Скрываем индикатор загрузки
            }
        };

        if (category) {
            fetchCategoryProducts(); // Вызываем функцию при монтировании компонента
        }
    }, [category]); // Зависимость от параметра category
    const handleBack = () =>{
        navigate("/");
    }
    return (
        <div className="container">
            <h1>
                <button className={'button-form-submit-1'} onClick={handleBack}><i className="fa-solid fa-backward"></i></button>
                {category}</h1>
            {/* Отображаем название категории */}

            {/* Индикатор загрузки */}
            {loading && <div>Loading...</div>}

            {/* Если нет товаров */}
            {!loading && products.length === 0 && <div>No products found in this category.</div>}

            {/* Отображение товаров */}
            <div className="catalog-container">
                {products.map((product) => (
                    <SaleCarouselCard key={product.id} cardInfo={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;