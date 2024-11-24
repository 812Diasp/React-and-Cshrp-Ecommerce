
import './menubaner.scss'
import Carousel from "../BannerMenuCarousel/Carousel.jsx";
const BannerMenu = () => {
    const images = [
        "bannerIphone.png",
        "macbookPreorder.png",
        "asusbanner.jpg",
        "videocard.png"
    ];

    return (
        <div className={'app-1200 banner-menu'}>
            <div className="sidebar">
                <ul className={'sidebar-categories'}>
                    <li><p>Woman&#39;s Fashion</p><img src={'/DropDownLeft.png'}/></li>
                    <li><p>Men&#39;s Fashion</p> <img src={'/DropDownLeft.png'}/></li>
                    <li><p>Electronics</p></li>
                    <li><p>Home & Lifestyle</p></li>
                    <li><p>Medicine</p></li>
                    <li><p>Sports & Outdoor</p></li>
                    <li><p>Baby&#39;s & Toys</p></li>
                    <li><p>Groceries & Pets</p></li>
                    <li><p>Health & Beauty</p></li>
                </ul>
            </div>
           <Carousel images={images}></Carousel>
        </div>
    );
};

export default BannerMenu;