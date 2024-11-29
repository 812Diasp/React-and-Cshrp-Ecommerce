import './App.scss'
import ProductList from "./ProductList.jsx";
import BannerMenu from "../components/HomeBannerMenu/BannerMenu.jsx";
import FlashSale from "../components/FlashSaleComponent/FlashSale.jsx";
function Homepage() {

  return (
      <div className={'homepage'}>
            <div className={'app-container'}>
            <BannerMenu></BannerMenu>
            <FlashSale></FlashSale>
            <ProductList/>

            </div>
      </div>
  )
}

export default Homepage
