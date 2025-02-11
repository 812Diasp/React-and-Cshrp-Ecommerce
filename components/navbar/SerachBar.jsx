import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Link, useLocation } from 'react-router-dom'; // Импортируем useLocation
import './SearchBar.scss'
import {useTranslation} from "react-i18next";
import {API_URL} from "../../src/Constants.js";
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Состояние для хранения текущего запроса
    const [searchResults, setSearchResults] = useState([]); // Состояние для хранения результатов поиска
    const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки
    const location = useLocation(); // Получаем текущий маршрут
    const { t } = useTranslation();
    // Дебаунсированная функция для поиска
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query.length >= 3) {
                setLoading(true); // Показываем индикатор загрузки
                try {
                    const response = await axios.get(`${API_URL}/api/products/search?query=${encodeURIComponent(query)}`);
                    setSearchResults(response.data); // Сохраняем результаты в состоянии
                } catch (error) {
                    console.error('Error fetching search results:', error);
                } finally {
                    setLoading(false); // Скрываем индикатор загрузки
                }
            } else {
                setSearchResults([]); // Очищаем результаты, если запрос короткий
            }
        }, 300),
        [] // Дебаунс на 300 мс
    );

    // Обработчик изменения ввода
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query); // Обновляем состояние запроса
        debouncedSearch(query); // Вызываем дебаунсированную функцию поиска
    };

    // Очистка состояния при изменении маршрута
    useEffect(() => {
        // Когда маршрут меняется, сбрасываем поле поиска и результаты
        setSearchQuery('');
        setSearchResults([]);
        debouncedSearch.cancel(); // Отменяем дебаунсированные вызовы
    }, [location, debouncedSearch]);

    return (
        <div className="navbar-searchbar">
            <input
                className="navbar-search"
                type="text"
                placeholder={t('search-ph')}
                value={searchQuery}
                onChange={handleInputChange}
            />
            <img src="/search.png" alt="Search" />

            {/* Индикатор загрузки */}
            {loading && <div className="loading-indicator">Loading...</div>}

            {/* Отображение результатов поиска */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((product) => (
                        <Link key={product.id + "_search"} to={`/products/${product.id}`} className="search-result-link">
                            <div className="search-result-item">
                                <img src={product.mainImage} className="search-res-image" alt={product.name} />
                                <span className="search-res-name">{product.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;