import React, {useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    setProducts,
    setError
} from './store/reducer/productReducer.js';
import axios from "axios";
import './App.scss'
import BannerMenu from "../components/HomeBannerMenu/BannerMenu.jsx";
import FlashSale from "../components/FlashSaleComponent/FlashSale.jsx";
import CategorySlider from "../components/SaleCarousel/CategorySlider.jsx";
import { useTranslation } from "react-i18next";
import { API_URL } from "./Constants.js";

const HomePage = () => {
    const dispatch = useDispatch();
    const { products} = useSelector((state) => state.products);

    const [saleProducts, setSaleProducts] = React.useState([]);
    const [topProducts, setTopProducts] = React.useState([]);
    const [loading, setLoading] = useState(true)
    // Категории товаров
    const categories = useMemo(() => [
        { name: "Smartphones", image: "Category-CellPhone.svg" },
        { name: "Computer", image: "Category-Computer.svg" },
        { name: "Cameras", image: "Category-Camera.svg" },
        { name: "Gamepad", image: "Category-Gamepad.svg" },
        { name: "Headphones", image: "Category-Headphone.svg" },
        { name: "Wearables", image: "Category-SmartWatch.svg" },
    ], []);

    // Функция для получения данных о продуктах
    useEffect(() => {
        try {
            if (!products.length && loading) {

                const fetchProducts = async () => {
                    try {
                        const response = await axios.get(`${API_URL}/api/products`, { withCredentials: true });
                        dispatch(setProducts(response.data));
                    } catch (error) {
                        console.error('Error fetching products:', error);
                        dispatch(setError(error.message));
                    }
                };

                fetchProducts();
            }

            // Если продукты уже загружены из Redux, выполняем фильтрацию
            if (products.length) {
                // Фильтрация продуктов с учетом скидок
                const productsWithDiscount = products.filter(
                    product => product.discountedPrice !== null && product.discountedPrice > 0
                );

                // Сортировка продуктов по количеству отзывов
                const sortedProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount);

                // Установка первых 10 продуктов со скидкой и первых 15 самых популярных продуктов
                setSaleProducts(productsWithDiscount.slice(0, 6));
                setTopProducts(sortedProducts.slice(0, 6));
            }

        }catch (ex){
            console.log(ex);
        }
        finally {
           setLoading(false);
        }

    }, [products, loading]);

    const { t } = useTranslation();

    return (
        <div className="homepage">
            <div className="app-container">
                <BannerMenu />
                <FlashSale
                    HasCountdown={true}
                    products={saleProducts}
                    hasSlider={true}
                    Text={t("todays")}
                    loading={loading}
                />
                {/* Другие секции */}
                <FlashSale
                    HasCountdown={false}
                    DisplayTitle={true}
                    Title={t('browseByCategory')}
                    Text={t("categories")}
                    products={saleProducts}
                    hasSlider={false}
                    loading={loading}
                />
                <CategorySlider categories={categories} />
                <FlashSale
                    HasCountdown={false}
                    DisplayTitle={true}
                    hasSlider={true}
                    Title={t("mostRated")}
                    products={topProducts}
                    ViewAll={true}
                    Text={t("thisMonth")}
                    loading={loading}
                />
                <img loading={'lazy'}  src="https://st.weblancer.net/download/4800822_935xp.png" alt="decorative" />
            </div>
        </div>
    )
};

export default HomePage;