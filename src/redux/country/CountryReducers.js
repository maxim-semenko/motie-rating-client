import * as types from "./CountryActionType"

const initialState = {
    countries: [],
    country: {},
    loading: true,
    currentPage: 1,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const countryReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loading: false,
            }
        case types.GET_COUNTRY:
            return {
                ...state,
                country: action.payload,
                loading: false,
            }
        case types.CREATE_COUNTRY:
            return {
                ...state,
                countries: [...state.countries, action.payload]
            }
        case types.UPDATE_COUNTRY:
            const objIndex = state.countries.findIndex((item => item.id === action.payload.id));
            let updatedCountries = state.countries;
            updatedCountries[objIndex] = action.payload
            return {
                ...state,
                countries: updatedCountries,
            }
        case types.DELETE_COUNTRY:
            return {
                ...state,
                countries: state.countries.filter(item => item.id !== action.payload),
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

export default countryReducers;