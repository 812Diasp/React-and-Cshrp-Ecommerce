
import ReactDOM from 'react-dom/client'
import Homepage from './Homepage.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TopStripe from "../components/navbar/top-stripe.jsx";
import Navbar from "../components/navbar/navbar.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <TopStripe></TopStripe>
        <Navbar></Navbar>
        <Routes>
            <Route path={'/'} element={<Homepage/>}></Route>
        </Routes>
    </BrowserRouter>
)
