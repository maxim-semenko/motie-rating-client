import * as types from "./CountryActionType"
import {SET_SIZE_PAGE_COUNTRY} from "./CountryActionType";

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

const countryReducers = (state = initialState, action) => {
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

export default countryReducers;