import './menubaner.scss'
import Carousel from "../BannerMenuCarousel/Carousel.jsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const BannerMenu = () => {
    const images = [
        "bannerIphone.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/71622d80849069.5ced519ae4235.png",
        "https://avatars.mds.yandex.net/i?id=2de975ebf8b171d2a7493dbd4d94cc42_l-4944748-images-thumbs&n=13",
        "https://indexiq.ru/storage/tiny/Xiaomi/14/XiaoMi-14-01.jpg"
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