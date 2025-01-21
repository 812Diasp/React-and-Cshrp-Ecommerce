
import './flashsalestyle.scss'
import FlashSaleCounter from "./FlashSaleCounter.jsx";
import SaleSlider from "../SaleCarousel/SaleSlider.jsx";
import Skeleton from "../Skeleton/Skeleton.jsx";

// eslint-disable-next-line react/prop-types
const FlashSale = ({ HasCountdown, Text, DisplayTitle, Title, hasSlider, ViewAll, products, loading }) => {
    const targetDate = '2025-2-13 00:00:00';
    if (loading) {
        return (
            <div className={'flash-sale'}>
                <div className="today-sale-text-container">
                    <span className="rectangle"></span>
                    <p className={'today-sale-text'}>{Text}</p>
                </div>
                {DisplayTitle?
                    <h2 className={'bold sale-title'}>{Title}</h2>: ""}
                {HasCountdown ? <FlashSaleCounter targetDate={targetDate}></FlashSaleCounter> : ""}
                {/* Отобразите скелетоны, пока не придут данные */}
                <div className="skeleton-container">
                    <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                    <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                    <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                    <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                    <Skeleton width="200px" height="300px" style={{marginRight: "10px", display: "inline-block"}}/>
                </div>
                <div className={'viewall'}>
                    {ViewAll ? <button className={'btn btn-danger view-all'}>View all</button> : ""}
                </div>
            </div>
        );
    }


    return (
        <div className={'flash-sale'}>
            <div className="today-sale-text-container">
                <span className="rectangle"></span>
                <p className={'today-sale-text'}>{Text}</p>
            </div>
            {DisplayTitle?
                <h2 className={'bold sale-title'}>{Title}</h2>: ""}
            {HasCountdown ? <FlashSaleCounter targetDate={targetDate}></FlashSaleCounter> : ""}
            {hasSlider? <SaleSlider products={products}></SaleSlider>:""}
            <div className={'viewall'}>
                {ViewAll ? <button className={'btn btn-danger view-all'}>View all</button> : ""}
            </div>

        </div>
    );
};

export default FlashSale;