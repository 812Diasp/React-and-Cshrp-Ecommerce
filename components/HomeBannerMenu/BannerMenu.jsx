import './menubaner.scss';
import Carousel from "../BannerMenuCarousel/Carousel.jsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {useEffect} from "react";

const BannerMenu = () => {
    const images = [
        "https://avatars.mds.yandex.net/get-market-adv/8282799/ddf77ebc-e817-4257-be92-28a36c41f889/banner-width-720"
    ];

    const { t } = useTranslation();

    // Предзагрузка изображений
    useEffect(() => {
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }, []);

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
            <Carousel images={images} />
        </div>
    );
};

export default BannerMenu;