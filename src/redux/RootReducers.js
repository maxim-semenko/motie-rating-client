import {combineReducers} from "redux";
import filmReducers from "./film/FilmReducers";
import userReducers from "./user/UserReducers";
import countryReducers from "./country/CountryReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataUsers: userReducers,
    dataFilms: filmReducers,
    dataCountries: countryReducers
})

export default rootReducers