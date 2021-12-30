import './styles/App.css';
import React from "react";
import {Route} from "react-router-dom";
import HomePage from "./components/pages/common/HomePage";
import AboutPage from "./components/pages/common/AboutPage";
import FeedbackPage from "./components/pages/common/FeedbackPage";
import TopPage from "./components/pages/common/TopPage";
import ClassCabinetPage from "./components/pages/user/CabinetPage";
import ProtectRoute from "./components/ProtectRoute";
import BasketPage from "./components/pages/user/BasketPage";
import PurchasesPage from "./components/pages/user/PurchasesPage";
import PurchasesHistoryPage from "./components/pages/user/PurchasesHistoryPage";
import ClassProfileEditPage from "./components/pages/user/EditProfilePage";
import ClassAboutFilmPage from "./components/pages/common/AboutFilmPage";
import AdminPage from "./components/pages/admin/AdminPage";
import AllUsersPage from "./components/pages/admin/users/AllUsersPage";
import AllFilmsPage from "./components/pages/admin/films/AllFilmsPage";
import AllGenresPage from "./components/pages/admin/genres/AllGenresPage";
import AllCountriesPage from "./components/pages/admin/countries/AllCountriesPage";
import RestorePasswordPage from "./components/pages/common/RestorePasswordPage";


function App() {
    return (
        <div className="App">
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/top" component={TopPage}/>
            <Route exact path="/about" component={AboutPage}/>
            <Route exact path="/feedback" component={FeedbackPage}/>
            <Route exact path="/restore-password" component={RestorePasswordPage}/>
            <Route exact path="/film/:id" component={ClassAboutFilmPage}/>
            <ProtectRoute path="/profile/cabinet" component={ClassCabinetPage}/>
            <ProtectRoute path="/profile/basket" component={BasketPage}/>
            <ProtectRoute path="/profile/purchases" component={PurchasesPage}/>
            <ProtectRoute path="/profile/balance" component={PurchasesHistoryPage}/>
            <ProtectRoute path="/profile/edit" component={ClassProfileEditPage}/>
            <ProtectRoute path="/profile/admin/controllers" component={AdminPage}/>
            <ProtectRoute path="/profile/admin/all-users" component={AllUsersPage}/>
            <ProtectRoute path="/profile/admin/all-films" component={AllFilmsPage}/>
            <ProtectRoute path="/profile/admin/all-countries" component={AllCountriesPage}/>
            <ProtectRoute path="/profile/admin/all-genres" component={AllGenresPage}/>
        </div>
    );
}

export default App;
