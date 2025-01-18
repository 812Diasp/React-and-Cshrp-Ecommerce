import './menubaner.scss'
import Carousel from "../BannerMenuCarousel/Carousel.jsx";
import {useTranslation} from "react-i18next";

const BannerMenu = () => {
    const images = [
        "bannerIphone.png",
        "macbookPreorder.png",
        "asusbanner.jpg",
        "https://indexiq.ru/storage/tiny/Xiaomi/14/XiaoMi-14-01.jpg"
    ];
    let current_year = new Date().getFullYear();
    const {t, i18n} = useTranslation();
    return (
        <div className={'app-1200 banner-menu'}>
            <div className="sidebar">
                <ul className={'sidebar-categories'}>
                    <li>
                        <div className="dropend">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <p>{t("smartphone")}</p>
                            </a>
                            <ul className="dropdown-menu">
                                <li>{t("catalog")}</li>
                                <li>{t("top")}</li>
                                <li>{t("budget")}</li>
                                <li>New {current_year}</li>
                            </ul>
                        </div>

                    </li>
                    <li>
                        <div className="dropend">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <p>{t("computers")}</p>

                            </a>
                            <ul className="dropdown-menu">

                                <li>{t("ready")}</li>
                                <li>{t("components")}</li>
                            </ul>
                        </div>
                    </li>
                    <li><p>{t("electronics")}</p></li>
                    <li><p>{t("homehygiene")}</p></li>
                    <li><p>{t("sound")}</p></li>
                    <li><p>{t("interesting18+")}</p></li>
                </ul>
            </div>
            <Carousel images={images}></Carousel>
        </div>
    );
};

export default BannerMenu;