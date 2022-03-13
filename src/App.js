import './styles/App.css';
import React from "react";
import {Route} from "react-router-dom";
import HomePage from "./components/pages/guest/HomePage";
import AboutPage from "./components/pages/guest/AboutPage";
import TopPage from "./components/pages/guest/TopPage";
import ClassCabinetPage from "./components/pages/user/cabinet/CabinetPage";
import ProtectRoute from "./components/common/ProtectRoute";
import BasketPage from "./components/pages/user/cabinet/BasketPage";
import PurchasesPage from "./components/pages/user/cabinet/PurchasesPage";
import ClassProfileEditPage from "./components/pages/user/cabinet/EditProfilePage";
import ClassAboutFilmPage from "./components/pages/guest/AboutFilmPage";
import AdminPage from "./components/pages/admin/AdminPage";
import AllUsersPage from "./components/pages/admin/users/AllUsersPage";
import AllFilmsPage from "./components/pages/admin/films/AllFilmsPage";
import AllGenresPage from "./components/pages/admin/genres/AllGenresPage";
import AllCountriesPage from "./components/pages/admin/countries/AllCountriesPage";
import RestorePasswordPage from "./components/pages/guest/RestorePasswordPage";
import PaymentOrderPage from "./components/pages/user/payment/PaymentOrderPage";
import TransactionalHistory from "./components/pages/user/cabinet/TransactionalHistory";
import FeedbackPage from "./components/pages/guest/FeedbackPage";


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
            <ProtectRoute path="/profile/history" component={TransactionalHistory}/>
            <ProtectRoute path="/profile/edit" component={ClassProfileEditPage}/>
            <ProtectRoute path="/profile/payment" component={PaymentOrderPage}/>
            <ProtectRoute path="/profile/admin/controls" component={AdminPage}/>
            <ProtectRoute path="/profile/admin/all-users" component={AllUsersPage}/>
            <ProtectRoute path="/profile/admin/all-films" component={AllFilmsPage}/>
            <ProtectRoute path="/profile/admin/all-countries" component={AllCountriesPage}/>
            <ProtectRoute path="/profile/admin/all-genres" component={AllGenresPage}/>
            <ProtectRoute path="/profile/admin/all-messages" component={AllGenresPage}/>
        </div>
    );
}

export default App;
