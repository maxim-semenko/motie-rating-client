import * as types from "./GenreActionType"

const initialState = {
    genres: [],
    genre: {},
    loadingGenre: true,
    currentPage: 1,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const genreReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loadingGenre: false,
            }
        case types.GET_COUNTRY:
            return {
                ...state,
                country: action.payload,
                loading: false,
            }
        case types.DELETE_COUNTRY_BY_ID:
            return {
                ...state,
                loading: false,
            }
        case types.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_COUNTRY:
            return {
                ...state,
                sizePage: action.payload
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

export default genreReducers;