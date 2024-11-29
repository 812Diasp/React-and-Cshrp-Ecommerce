
import './flashsalestyle.scss'
import FlashSaleCounter from "./FlashSaleCounter.jsx";
import SaleSlider from "../SaleCarousel/SaleSlider.jsx";
const FlashSale = () => {
    //в таком формате для компонента FlashSaleCounter
    const targetDate = '2024-12-18 10:30:00';
    return (
        <div className={'flash-sale'}>
            <div className="today-sale-text-container">
                <span className="rectangle"></span>
            <p className={'today-sale-text'}>Today&#39;s</p>
            </div>
           <FlashSaleCounter targetDate={targetDate}></FlashSaleCounter>
<SaleSlider></SaleSlider>
           


        </div>
    );
};

export default FlashSale;