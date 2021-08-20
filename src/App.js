import './styles/App.css';
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import ClassHomePage from "./components/pages/ClassHomePage";
import AboutPage from "./components/pages/AboutPage";
import SearchPage from "./components/pages/SearchPage";
import FeedbackPage from "./components/pages/FeedbackPage";
import TopPage from "./components/pages/TopPage";
import ClassCabinetPage from "./components/pages/ClassCabinetPage";
import ProtectRoute from "./components/ProtectRoute";
import BasketPage from "./components/pages/BasketPage";
import PurchasesPage from "./components/pages/PurchasesPage";
import BalancePage from "./components/pages/BalancePage";
import ClassProfileEditPage from "./components/pages/ClassProfileEditPage";
import AdminPage from "./components/pages/AdminPage";
import ClassAboutFilmPage from "./components/pages/ClassAboutFilmPage";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/" component={ClassHomePage}/>
                <Route exact path="/top" component={TopPage}/>
                <Route exact path="/search" component={SearchPage}/>
                <Route exact path="/about" component={AboutPage}/>
                <Route exact path="/feedback" component={FeedbackPage}/>
                <Route exact path="/film/:id" component={ClassAboutFilmPage}/>
                <ProtectRoute path="/profile/cabinet" component={ClassCabinetPage}/>
                <ProtectRoute path="/profile/basket" component={BasketPage}/>
                <ProtectRoute path="/profile/purchases" component={PurchasesPage}/>
                <ProtectRoute path="/profile/balance" component={BalancePage}/>
                <ProtectRoute path="/profile/edit" component={ClassProfileEditPage}/>
                <ProtectRoute path="/profile/admin" component={AdminPage}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
