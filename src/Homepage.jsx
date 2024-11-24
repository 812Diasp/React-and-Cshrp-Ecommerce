import './App.css'
import ProductList from "./ProductList.jsx";
import BannerMenu from "../components/HomeBannerMenu/BannerMenu.jsx";
function Homepage() {

  return (
      <div className={'homepage'}>
            <div className={'app-container'}>
            <BannerMenu></BannerMenu>
            <ProductList/>
            </div>
      </div>
  )
}

export default Homepage
