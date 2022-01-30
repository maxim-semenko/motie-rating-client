import * as types from "./PurchaseActionType"

const initialState = {
    purchaseFilmList: null,
    loadingPurchaseStorage: true,
}

const purchaseReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_PURCHASE_STORAGE:
            return {
                ...state,
                purchaseFilmList: action.payload.filmList,
                loadingPurchaseStorage: false,
            }
        case types.SET_LOADING:
            return {
                ...state,
                loadingPurchaseStorage: action.payload
            }
        default:
            return state
    }
}

export default purchaseReducers;