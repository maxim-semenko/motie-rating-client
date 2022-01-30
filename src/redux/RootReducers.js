import {combineReducers} from "redux";
import filmReducers from "./film/FilmReducers";
import userReducers from "./user/UserReducers";
import countryReducers from "./country/CountryReducers";
import basketReducers from "./basket/BasketReducers";
import genreReducers from "./genre/GenreReducers";
import purchaseReducers from "./purchase/PurchaseReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataUsers: userReducers,
    dataFilms: filmReducers,
    dataCountries: countryReducers,
    dataGenres: genreReducers,
    dataBaskets: basketReducers,
    dataPurchases: purchaseReducers,
})

export default rootReducers