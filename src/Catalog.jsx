import React, {useEffect, useState} from 'react';
import axios from "axios";
import SaleCarouselCard from "../components/SaleCarousel/SaleCarouselCard.jsx";

const Catalog = () => {

    const [allProducts, setallProducts] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const fetchSaleProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5248/api/products');
                setallProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                //setLoading(false)
            }
        };


        fetchSaleProducts();
    }, []);
    return (
        <div className={'container'}>
            <div className={'catalog-container '}>
                {allProducts.map((item, key) =>
                    <SaleCarouselCard key={key} cardInfo={item}></SaleCarouselCard>
                )}
            </div>
        </div>
    );
};

export default Catalog;