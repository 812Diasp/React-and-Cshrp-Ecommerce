import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_URL } from "./Constants.js";
import SaleCarouselCard from "../components/SaleCarousel/SaleCarouselCard.jsx";

const FavouritesPage = () => {
    const [products, setProducts] = useState([]); // Состояние для хранения товаров
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

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
                if (products.length <= 0) {
                    setLoading(false);
                }
            } catch (error) {
                // Проверяем статус ошибки
                if (error.response && error.response.status === 401) {
                    setError("Запрещено 401"); // Устанавливаем сообщение об ошибке
                } else {
                    console.error('Error fetching favourite products:', error);
                    setError("Произошла ошибка при загрузке данных."); // Общее сообщение об ошибке
                }
            } finally {
                setLoading(false); // Скрываем индикатор загрузки
            }
        };

        fetchFavProducts(); // Вызываем функцию при монтировании компонента
    }, []); // Зависимость от параметра category

    return (
        <div className="container min-80-container">
            {/* Индикатор загрузки */}
            {loading && <div className={'center'}><h2>Loading...</h2></div>}

            {/* Отображение ошибки */}
            {error && <div className={'center'}><h2>{error}</h2></div>}

            {/* Если нет товаров и нет ошибки */}
            {!loading && !error && products.length === 0 &&
                <div className={'center'}><h2>No favourite products.</h2></div>}

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