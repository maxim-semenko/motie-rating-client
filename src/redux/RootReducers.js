import {combineReducers} from "redux";
import filmReducers from "./film/FilmReducers";
import userReducers from "./user/UserReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataUsers: userReducers,
    dataFilms: filmReducers
})

export default rootReducers