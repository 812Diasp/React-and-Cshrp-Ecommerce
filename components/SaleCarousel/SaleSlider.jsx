

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './salecarousel.scss'
import SaleCarouselCard from "./SaleCarouselCard.jsx";
function SaleSlider() {
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
    let saleProducts = [
        {
            title:"Iphone 14pro (Gold) 1TB",
            currentPrice: 780,
            prevPrice: 1100,
            imgsrc:"https://avatars.mds.yandex.net/i?id=ab49bc69bd6230fc0a6b02db597bccbe_l-10815143-images-thumbs&n=13"
        },{
        title: "Gaming Microphone Fifile Aplingame A8 (Black)",
        currentPrice: 60,
        prevPrice: 96,
        imgsrc: "https://ir.ozone.ru/s3/multimedia-s/c1000/6849412876.jpg"
        },
        {
            title: "Gaming Mouse Ajazz J159 (White)",
            currentPrice: 20,
            prevPrice: 45,
            imgsrc: "https://ae04.alicdn.com/kf/Se8cc3b6ea64147bfb381ded4e37d4286U.jpg_640x640.jpg"
        },{
        title: "Samsung S24 ULTRA (Orange) 512GB",
            currentPrice: 880,
            prevPrice: 1300,
        imgsrc:"https://avatars.mds.yandex.net/i?id=487126588fae5393e63434849e3ec99f_l-6622507-images-thumbs&n=13"
        },{
            title: "Xiaomi 14 (Black) 512GB",
            currentPrice: 980,
            prevPrice: 1100,
        imgsrc:"https://prosmart-dn.ru/wp-content/uploads/2024/03/1_9adj-ct_jpg.jpg"
        },{
        title: "Samsung Odyssey Neo G9 S57CG952NI, 7680x2160, VA, 240hz",
            currentPrice: 2100,
            prevPrice: 2500,
            imgsrc:"https://avatars.mds.yandex.net/get-mpic/10815509/2a0000018b2536cb125d1c0d2f5b70678cdf/orig"
        },{
        prevPrice: 600,
        currentPrice: 400,
            imgsrc: "https://avatars.mds.yandex.net/i?id=bf926dbcde640c1c0652752521e0107ccdd05408-5283698-images-thumbs&n=13",
        title: "Vivo x200 pro mini"
        },{
            title: "Fifine H9 (Black)",
            currentPrice: 20,
            prevPrice: 45,
            imgsrc:"https://xistore.by/upload/iblock/93d/93db750cc78ce4a40555efa7f58b45e6.jpg"

        }
    ]
    return (
        <Slider {...settings}>
            {saleProducts.map((item,key) =>
                    <SaleCarouselCard key={key} cardInfo={item}></SaleCarouselCard>
            )}

        </Slider>
    );
}
export default SaleSlider;