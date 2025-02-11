import {useEffect, useState} from 'react';
import axios from "axios";
import SaleCarouselCard from "../components/SaleCarousel/SaleCarouselCard.jsx";
import {API_URL} from "./Constants.js";
import Skeleton from "../components/Skeleton/Skeleton.jsx";

const Catalog = () => {

    const [allProducts, setallProducts] = useState([]);
   const [loading, setLoading] = useState(true);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const fetchSaleProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);
                setallProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false)
            }
        };


        fetchSaleProducts();
    }, []);
    return (
        <div className={'container'}>
            <div className={'catalog-container '}>
                {loading ? <>
                        <div className="skeleton-container">
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                            <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                        </div>
                    </>
                    :  allProducts.map((item, key) =>
                            <SaleCarouselCard key={key} cardInfo={item}></SaleCarouselCard>
                        )}

            </div>
        </div>
    );
};

export default Catalog;