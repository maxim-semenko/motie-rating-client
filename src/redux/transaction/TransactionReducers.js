import * as types from "./TransactionActionType"

const initialState = {
    transactionsList: null,
    loadingTransactions: true,
}

const transactionReducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_ALL_TRANSACTIONS:
            return {
                ...state,
                transactionsList: action.payload,
                loadingTransactions: false,
            }
        case types.SET_LOADING:
            return {
                ...state,
                loadingTransactions: action.payload
            }
        default:
            return state
    }
}

export default transactionReducers;