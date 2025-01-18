import './App.scss'

import BannerMenu from "../components/HomeBannerMenu/BannerMenu.jsx";
import FlashSale from "../components/FlashSaleComponent/FlashSale.jsx";
import CategorySlider from "../components/SaleCarousel/CategorySlider.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
const HomePage = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const fetchSaleProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5248/api/products');

                const productsWithDiscount = response.data.filter(
                    (product) => product.discountedPrice !== null && product.discountedPrice > 0
                );
                const sortedProducts = response.data.sort((a, b) => b.reviewCount - a.reviewCount);
                setTopProducts(sortedProducts.slice(0, 15));
                setSaleProducts(productsWithDiscount.slice(0, 10));
            } catch (error) {
                console.error('Error fetching products:', error);
            }finally {
                setLoading(false)
            }
        };


        fetchSaleProducts();
    }, []);

    let categories = [
        {
            name:"Smartphone",
            image:"Category-CellPhone.svg"
        },
        {
            name:"Computer",
            image:"Category-Computer.svg"
        },
        {
            name:"Camera",
            image:"Category-Camera.svg"
        },
        {
            name:"Gamepad",
            image:"Category-Gamepad.svg"
        },
        {
            name:"Headphones",
            image:"Category-Headphone.svg"
        },
        {
            name:"SmartWatch",
            image:"Category-SmartWatch.svg"
        },];

    return (
        <div className={'homepage'}>
            <div className={'app-container'}>
                <BannerMenu></BannerMenu>
                <FlashSale HasCountdown={true} products={saleProducts} hasSlider={true} Text={"Today`s"} loading={loading}></FlashSale>

                {/*<ProductList/>*/}
                <FlashSale HasCountdown={false} DisplayTitle={true} Title={"Browse By Category"} Text={"Categories"} products={saleProducts} hasSlider={false} loading={loading}></FlashSale>
                <CategorySlider categories={categories}></CategorySlider>
                <FlashSale HasCountdown={false} DisplayTitle={true} hasSlider={true} Title={"Most rated products"} products={topProducts} ViewAll={true} Text={"This month"} loading={loading}></FlashSale>
                <img src={"/Frame 600.png"}></img>
            </div>
        </div>
    )
};

export default HomePage;