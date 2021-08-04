import './App.css';
import React from "react";
import HomePage from "./components/HomePage";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/Route";
import AboutPage from "./components/AboutPage";
import SearchPage from "./components/SearchPage";
import FeedbackPage from "./components/FeedbackPage";
import TopPage from "./components/TopPage";
import CabinetPage from "./components/CabinetPage";
import ProtectRoute from "./components/ProtectRoute";
import BasketPage from "./components/BasketPage";
import PurchasesPage from "./components/PurchasesPage";
import BalancePage from "./components/BalancePage";
import ProfileEditPage from "./components/ProfileEditPage";
import AdminPage from "./components/AdminPage";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/top" component={TopPage}/>
                <Route exact path="/search" component={SearchPage}/>
                <Route exact path="/about" component={AboutPage}/>
                <Route exact path="/feedback" component={FeedbackPage}/>
                <ProtectRoute path="/profile/cabinet" component={CabinetPage}/>
                <ProtectRoute path="/profile/basket" component={BasketPage}/>
                <ProtectRoute path="/profile/purchases" component={PurchasesPage}/>
                <ProtectRoute path="/profile/balance" component={BalancePage}/>
                <ProtectRoute path="/profile/edit" component={ProfileEditPage}/>
                <ProtectRoute path="/profile/admin" component={AdminPage}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
