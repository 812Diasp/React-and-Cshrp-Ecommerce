
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
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
        <TopStripe></TopStripe>
        <Navbar></Navbar>
        <Routes>
            <Route path={'/profile'} element={<ProfilePage/>}></Route>
            <Route path={'/'} element={<Homepage/>}></Route>
            <Route path={'/register'} element={<Register/>}></Route>
        </Routes>
        <Footer></Footer>
    </BrowserRouter>
    </Provider>
)
