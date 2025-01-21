
import ReactDOM from 'react-dom/client'
import Homepage from './Homepage.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TopStripe from "../components/navbar/top-stripe.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import ProfilePage from "../components/UserProfile/ProfilePage.jsx";
import Footer from "./Footer.jsx";
import Register from "../components/LoginRegister/Register.jsx";
import {Provider} from "react-redux";
import store from './store/store.js';
import './i18n.js';
import ProductDetails from "../components/SaleCarousel/ProductDetails.jsx";
import CartPage from "../components/CartPage/CartPage.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
        <TopStripe></TopStripe>
        <Navbar></Navbar>
        <Routes>
            <Route path="/products/:productId" element={<ProductDetails />} /> {/* страница товара */}
            <Route path={'/profile'} element={<ProfilePage/>}></Route> {/* страница товара */}
            <Route path={'/'} element={<Homepage/>}></Route> {/* Глвная страница с баннерами меню и распродажами */}
            <Route path={'/register'} element={<Register/>}></Route> { /* Страница логина и регистрации */}
            <Route path={'/cart'} element={<CartPage/>}></Route>
        </Routes>
        <Footer></Footer>
    </BrowserRouter>
    </Provider>
)
