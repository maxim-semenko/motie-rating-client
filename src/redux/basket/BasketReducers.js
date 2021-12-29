import * as types from "./BasketActionType"

const initialState = {
    basketFilmList: null,
    price: 0,
    loadingBasket: true,
}

const basketReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BASKET:
            return {
                ...state,
                basketFilmList: action.payload.filmList,
                loadingBasket: false,
            }
        case types.ADD_TO_BASKET:
            return {
                ...state,
                basketFilmList: [...state.basketFilmList, action.payload],
            }
        case types.REMOVE_FROM_BASKET:
            return {
                ...state,
                basketFilmList: state.basketFilmList.filter(film => film.id !== action.payload),
            }
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export default basketReducers;