import * as types from "./UserActionType";

const initialState = {
    users: [],
    user: {},
    loading: true,
    currentPage: 1,
    sizePage: 9,
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
}

const userReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                numberOfElements: action.payload.numberOfElements,
                loading: false,
            }
        case types.GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case types.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.SET_SIZE_PAGE_USER:
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

export default userReducers;