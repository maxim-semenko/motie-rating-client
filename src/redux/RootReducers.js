import {combineReducers} from "redux";
import filmReducers from "./film/FilmReducers";

// There is store all reducers for work with any entity
const rootReducers = combineReducers({
    dataFilms: filmReducers
})

export default rootReducers