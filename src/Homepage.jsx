import './App.scss'

import BannerMenu from "../components/HomeBannerMenu/BannerMenu.jsx";
import FlashSale from "../components/FlashSaleComponent/FlashSale.jsx";
import CategorySlider from "../components/SaleCarousel/CategorySlider.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {API_URL} from "./Constants.js";
const HomePage = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const fetchSaleProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`, {withCredentials:true});

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
            name:"Smartphones",
            image:"Category-CellPhone.svg"
        },
        {
            name:"Computer",
            image:"Category-Computer.svg"
        },
        {
            name:"Cameras",
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
            name:"Wearables",
            image:"Category-SmartWatch.svg"
        },];
    const { t } = useTranslation();
    return (
        <div className={'homepage'}>
            <div className={'app-container'}>
                <BannerMenu></BannerMenu>
                <FlashSale HasCountdown={true} products={saleProducts} hasSlider={true} Text={t("todays")} loading={loading}></FlashSale>

                {/*<ProductList/>*/}
                <FlashSale HasCountdown={false} DisplayTitle={true} Title={t('browseByCategory')} Text={t("categories")} products={saleProducts} hasSlider={false} loading={loading}></FlashSale>
                <CategorySlider categories={categories}></CategorySlider>

                <FlashSale HasCountdown={false} DisplayTitle={true} hasSlider={true} Title={t("mostRated")} products={topProducts} ViewAll={true} Text={t("thisMonth")} loading={loading}></FlashSale>
                <img src={"/Frame 600.png"}></img>
            </div>
        </div>
    )
};

export default HomePage;