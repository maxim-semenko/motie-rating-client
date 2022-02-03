import * as types from "./TransactionActionType"
import TransactionService from "../../service/TranscactionService";

const gotTransactionsByUserId = (transactions) => ({
    type: types.GET_ALL_TRANSACTIONS,
    payload: transactions,
})

export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getAllTransactionsByUserId = (userId) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        TransactionService.getAllByUserId(userId)
            .then((resp) => {
                console.log(resp.data)
                dispatch(gotTransactionsByUserId(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

