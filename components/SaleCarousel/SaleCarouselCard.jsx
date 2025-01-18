import './salecarousel.scss'
import StarRatingSaleCard from "./StarRatingSaleCard.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
// eslint-disable-next-line react/prop-types
const SaleCarouselCard = ({ cardInfo, key }) => {
    const infoOfCard = cardInfo;
    let saleAmount = 0.0;
    const { t, i18n } = useTranslation();
    const [isSale, setIsSale] = useState(false);


    function colorRating() {
        const allstars = document.querySelectorAll('.star');
        for (let i = 0; i < allstars.length; i++) {
            let elem = allstars[i].children[0];
            elem.setAttribute('fill', '#ffad33');
        }
    }

    function relDiff() {
        if (infoOfCard.discountedPrice == null) {
            return t("buybadge");
        } else {
            const difference = infoOfCard.price - infoOfCard.discountedPrice;
            const percentageDifference = (difference / infoOfCard.discountedPrice) * 100;
            return percentageDifference.toFixed(0).toString() + "%";
        }
    }

    saleAmount = relDiff();

    useEffect(() => {
        const timer = setTimeout(() => {
            colorRating();
        }, 10);

        setIsSale(infoOfCard.discountedPrice != null);


        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Removed infoOfCard from dependency array to avoid unnecessary renders


    return (
        <div className={'sale-card'} key={key}>
            {/* eslint-disable-next-line react/prop-types */}
            <Link to={`/products/${cardInfo.id}`}>
            <div className="card-sale-image">
                <img className={'card-image'} src={infoOfCard.image} alt={'saleCard'} width={'270px'} height={'250px'} />
                <div><span className={'card-discont-badge'}>{saleAmount}</span></div>
                <div className="hover-overlay">
                    <div className="hover-text">
                        <p>{t("addcart")}</p>
                    </div>
                </div>
                <div className="card-controls">
                    <img src={'./FillHeart.svg'} className={'heart-img'} alt={'like'} />
                    <img src={'./FillEye.svg'} alt={'track'} />
                </div>
            </div>

            <p className={'sale-product-title'}>{infoOfCard.name}</p>
            <p className={'sale-product-price'}>
                {isSale ? (
                    <>
                        {infoOfCard.discountedPrice}$
                        <span className={'gray-sale-product-price'}>{infoOfCard.price}$</span>
                    </>
                ) : (
                    `${infoOfCard.price}$`
                )}
            </p>
            <StarRatingSaleCard rating={infoOfCard.averageRating} quantity={infoOfCard.reviewCount}></StarRatingSaleCard>
            </Link>
        </div>
    );
};

export default SaleCarouselCard;