

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './salecarousel.scss'
import SaleCarouselCard from "./SaleCarouselCard.jsx";
// eslint-disable-next-line react/prop-types
function SaleSlider({products}) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 20000
    };
    //сдесь будут fetch даные для карточек

    return (
        <Slider {...settings}>
                {/* eslint-disable-next-line react/prop-types */}
                {products.map((item,key) =>
                    <div key={key}>
                        <SaleCarouselCard cardInfo={item}></SaleCarouselCard>
                    </div>

                )}

            </Slider>
    );
}
export default SaleSlider;