import * as types from "./GenreActionType"

const initialState = {
    genres: [],
    genre: {},
    loading: true,
    currentPage: 1,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const genreReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_GENRES:
            return {
                ...state,
                genres: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loading: false,
            }
        case types.GET_GENRE:
            return {
                ...state,
                genre: action.payload,
                loading: false,
            }
        case types.DELETE_GENRE_BY_ID:
            return {
                ...state,
                loading: false,
            }
        case types.SET_CURRENT_PAGE_GENRE:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_GENRE:
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