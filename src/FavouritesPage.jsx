import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_URL} from "./Constants.js";
import SaleCarouselCard from "../components/SaleCarousel/SaleCarouselCard.jsx";

const FavouritesPage = () => {

    const [products, setProducts] = useState([]); // Состояние для хранения товаров
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки

    // Функция для получения товаров по категории
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const fetchFavProducts = async () => {
            try {
                setLoading(true); // Показываем индикатор загрузки
                const response = await axios.get(`${API_URL}/api/users/favorites`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Добавляем заголовок Authorization
                    },
                });
                setProducts(response.data); // Сохраняем полученные товары в состоянии
            } catch (error) {
                console.error('Error fetching favourite products:', error);
            } finally {
                setLoading(false); // Скрываем индикатор загрузки
            }
        };


        fetchFavProducts(); // Вызываем функцию при монтировании компонента

    }, []); // Зависимость от параметра category

    return (
        <div className="container">



            {/* Индикатор загрузки */}
            {loading && <div>Loading...</div>}

            {/* Если нет товаров */}
            {!loading && products.length === 0 && <div>No favourite products.</div>}

            {/* Отображение товаров */}
            <div className="catalog-container">
                {products.map((product) => (
                    <SaleCarouselCard key={product.id} cardInfo={product} />
                ))}
            </div>
        </div>
    );
};

export default FavouritesPage;