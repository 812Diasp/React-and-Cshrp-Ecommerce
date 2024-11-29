
import './salecarousel.scss'
import StarRatingSaleCard from "./StarRatingSaleCard.jsx";
import {useEffect} from "react";
// eslint-disable-next-line react/prop-types
const SaleCarouselCard = ({cardInfo,key}) => {
    const infoOfCard = cardInfo;
    let saleAmount = 0.0;
    function colorRating(){
        const allstars = document.querySelectorAll('.star')
        for (let i = 0; i < allstars.length; i++) {
            let elem = allstars[i].children[0]
            elem.setAttribute('fill','#ffad33')

        }
    }

    function relDiff() {

        const difference = infoOfCard.currentPrice - infoOfCard.prevPrice;
        const percentageDifference = (difference / infoOfCard.prevPrice) * 100;

        return percentageDifference.toFixed(0);
    }
    saleAmount = relDiff()
    useEffect(() => {

        const timer = setTimeout(() => {
            colorRating()
        }, 10);

        return () => clearTimeout(timer);

    }, []);


    return (
        <div className={'sale-card'} key={key}>

            <div className="card-sale-image">

                <img className={'card-image'} src={infoOfCard.imgsrc} alt={'saleCard'} width={'270px'} height={'250px'}/>
                <div><span className={'card-discont-badge'}>{saleAmount}%</span></div>
                <div className="hover-overlay">
                    <div className="hover-text">
                        <p>Add to cart</p>
                    </div>
                </div>
                <div className="card-controls">
                    <img src={'./FillHeart.svg'} className={'heart-img'} alt={'like'}/>
                    <img src={'./FillEye.svg'} alt={'track'}/>
                </div>

            </div>

            <p className={'sale-product-title'}>{infoOfCard.title}</p>
            <p className={'sale-product-price'} >
                ${infoOfCard.currentPrice} <span className={'gray-sale-product-price'}>{infoOfCard.prevPrice}$</span>
            </p>
            <StarRatingSaleCard rating={4.9}></StarRatingSaleCard>

        </div>
    );
};

export default SaleCarouselCard;