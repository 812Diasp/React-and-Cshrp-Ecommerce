

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './salecarousel.scss'
import SaleCarouselCard from "./SaleCarouselCard.jsx";
// eslint-disable-next-line react/prop-types
function SaleSlider({saleProducts}) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 4000
    };
    //сдесь будут fetch даные для карточек

    return (
        <Slider {...settings}>
                {/* eslint-disable-next-line react/prop-types */}
                {saleProducts.map((item,key) =>
                    <SaleCarouselCard key={key} cardInfo={item}></SaleCarouselCard>
                )}

            </Slider>
    );
}
export default SaleSlider;