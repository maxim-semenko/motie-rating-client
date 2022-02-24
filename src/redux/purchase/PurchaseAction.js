import * as types from "./PurchaseActionType"
import PurchaseStorageService from "../../service/PurchaseStorageService";

const gotPurchaseStorageById = (purchase) => ({
    type: types.GET_PURCHASE_STORAGE,
    payload: purchase,
})

export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getPurchaseStorageById = (id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        PurchaseStorageService.getById(id)
            .then((resp) => {
                console.log(resp)
                dispatch(gotPurchaseStorageById(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

