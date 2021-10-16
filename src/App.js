import './styles/App.css';
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./components/pages/common/HomePage";
import AboutPage from "./components/pages/common/AboutPage";
import SearchPage from "./components/pages/common/SearchPage";
import FeedbackPage from "./components/pages/common/FeedbackPage";
import TopPage from "./components/pages/common/TopPage";
import ClassCabinetPage from "./components/pages/user/CabinetPage";
import ProtectRoute from "./components/ProtectRoute";
import BasketPage from "./components/pages/user/BasketPage";
import PurchasesPage from "./components/pages/user/PurchasesPage";
import BalancePage from "./components/pages/user/BalancePage";
import ClassProfileEditPage from "./components/pages/user/ClassProfileEditPage";
import ClassAboutFilmPage from "./components/pages/common/AboutFilmPage";
import AdminPage from "./components/pages/admin/AdminPage";
import AllUsersPage from "./components/pages/admin/AllUsersPage";
import AllFilmsPage from "./components/pages/admin/AllFilmsPage";
import AllGenresPage from "./components/pages/admin/AllGenresPage";


function App() {
    return (
        <div className="App">
            <Route exact path="/" component={HomePage}/>
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
            <ProtectRoute path="/profile/admin/controllers" component={AdminPage}/>
            <ProtectRoute path="/profile/admin/all-users" component={AllUsersPage}/>
            <ProtectRoute path="/profile/admin/all-films" component={AllFilmsPage}/>
            <ProtectRoute path="/profile/admin/all-genres" component={AllGenresPage}/>
        </div>
    );
}

export default App;
