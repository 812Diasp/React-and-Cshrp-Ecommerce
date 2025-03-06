import './menubaner.scss'
import Carousel from "../BannerMenuCarousel/Carousel.jsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const BannerMenu = () => {
    const images = [
        "https://cdn.salla.sa/aganz/design/qfhw27KU3Dml0g8mlX80OnE4ecdu9k9576hyjCmq.jpg?rand=0.7038505553084533?rand=0.38573032712791866",
        "https://www.asus.com/ca-en/site/White-Edition/assets/images/hero/hero.jpg",
        "https://avatars.mds.yandex.net/i?id=2de975ebf8b171d2a7493dbd4d94cc42_l-4944748-images-thumbs&n=13",
        "https://www.asus.com/ca-en/site/White-Edition/assets/images/hero/hero.jpg"
    ];

    const {t} = useTranslation();
    return (
        <div className={'app-1200 banner-menu'}>
            <div className="sidebar">
                <ul className={'sidebar-categories'}>
                    <li>
                        <div className="dropend">
                            <Link to={"/products/category/Smartphones"} className="nav-link">
                                <p>{t("smartphone")}</p>
                            </Link>

                        </div>

                    </li>
                    <li>
                        <div className="dropend">
                            <Link to={"/products/category/Cameras"} className="nav-link">
                                <p>{t("Cameras")}</p>

                            </Link>

                        </div>
                    </li>
                    <li>
                        <div className="dropend">
                            <Link to={"/products/category/Sound"} className="nav-link">
                                <p>{t("sound")}</p>
                            </Link>
                        </div>
                    </li>

                </ul>
            </div>
            <Carousel images={images}></Carousel>
        </div>
    );
};

export default BannerMenu;