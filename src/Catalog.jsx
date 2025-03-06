import { useEffect, useState } from "react";
import axios from "axios";
import SaleCarouselCard from "../components/SaleCarousel/SaleCarouselCard.jsx";
import { API_URL } from "./Constants.js";
import Skeleton from "../components/Skeleton/Skeleton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./store/reducer/productReducer.js";

const Catalog = () => {
    const dispatch = useDispatch();
    const { products, loading: reduxLoading } = useSelector((state) => state.products);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Текущая страница
    const [hasMore, setHasMore] = useState(true); // Есть ли еще данные для загрузки

    // Функция для загрузки продуктов с пагинацией
    const fetchProducts = async (page) => {
        try {
            const response = await axios.get(`${API_URL}/api/products`, {
                params: { page, limit: 10 }, // Параметры пагинации
                withCredentials: true,
            });

            if (response.data.length === 0) {
                setHasMore(false); // Если нет больше данных, устанавливаем hasMore в false
            }

            dispatch(setProducts([...products, ...response.data])); // Добавляем новые продукты к существующим
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Обработчик события скролла
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        ) {
            return;
        }

        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1); // Переходим к следующей странице
        }
    };

    useEffect(() => {
        // Выполняем запрос только если продуктов нет в Redux или требуется загрузить новую страницу
        if ((products.length === 0 && reduxLoading) || page > 1) {
            fetchProducts(page);
        }

        // Если продукты уже есть в Redux, устанавливаем loading в false
        if (products.length && page === 1) {
            setLoading(false);
        }
    }, [page, products, reduxLoading, dispatch]);

    useEffect(() => {
        // Добавляем обработчик скролла
        window.addEventListener("scroll", handleScroll);

        // Удаляем обработчик при размонтировании компонента
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="container">
            <div className="catalog-container">
                {loading ? (
                    <div className="skeleton-container">
                        {[...Array(12)].map((_, index) => (
                            <Skeleton
                                key={index}
                                width="200px"
                                height="300px"
                                style={{ marginRight: "10px", display: "inline-block" }}
                            />
                        ))}
                    </div>
                ) : (
                    products.map((item, index) => (
                        <SaleCarouselCard key={index} cardInfo={item}></SaleCarouselCard>
                    ))
                )}
            </div>
        </div>
    );
};

export default Catalog;