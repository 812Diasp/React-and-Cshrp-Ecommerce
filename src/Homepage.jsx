import './App.scss'
import ProductList from "./ProductList.jsx";
import BannerMenu from "../components/HomeBannerMenu/BannerMenu.jsx";
import FlashSale from "../components/FlashSaleComponent/FlashSale.jsx";
import CategoryCard from "../components/SaleCarousel/CategoryCard.jsx";
import CategorySlider from "../components/SaleCarousel/CategorySlider.jsx";
function Homepage() {

    let categories = [
        {
            name:"Smartphone",
            image:"Category-CellPhone.svg"
        },
        {
            name:"Computer",
            image:"Category-Computer.svg"
        },
        {
            name:"Camera",
            image:"Category-Camera.svg"
        },
        {
            name:"Gamepad",
            image:"Category-Gamepad.svg"
        },
        {
            name:"Headphones",
            image:"Category-Headphone.svg"
        },
        {
            name:"SmartWatch",
            image:"Category-SmartWatch.svg"
        },];

  return (
      <div className={'homepage'}>
            <div className={'app-container'}>
            <BannerMenu></BannerMenu>
            <FlashSale HasCountdown={true}  hasSlider={true} Text={"Today`s"}></FlashSale>

            {/*<ProductList/>*/}
            <FlashSale HasCountdown={false} DisplayTitle={true} Title={"Browse By Category"} Text={"Categories"} hasSlider={false}></FlashSale>
            <CategorySlider categories={categories}></CategorySlider>
                <FlashSale HasCountdown={false} DisplayTitle={true} hasSlider={true} Title={"Best Selling Products"} ViewAll={true} Text={"This month"}></FlashSale>
           <img src={"/Frame 600.png"}></img>
            </div>
      </div>
  )
}

export default Homepage
