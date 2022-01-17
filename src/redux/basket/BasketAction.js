import * as types from "./BasketActionType"
import BasketService from "../../service/BasketService";

const gotBasketById = (basket) => ({
    type: types.GET_BASKET,
    payload: basket,
})

const addedToBasket = (film) => ({
    type: types.ADD_TO_BASKET,
    payload: film,
})

const removedFromBasket = (filmId) => ({
    type: types.REMOVE_FROM_BASKET,
    payload: filmId,
})

export const setPrice = (price) => ({
    type: types.SET_PRICE,
    payload: price
})


export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getBasketById = (id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        BasketService.getById(id)
            .then((resp) => {
                dispatch(gotBasketById(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const addToBasket = (film) => {
    return function (dispatch) {
        BasketService.add(JSON.parse(localStorage.getItem("user")).id, film.id)
            .then(response => {
                dispatch(addedToBasket(film))
                dispatch(setPrice(response.data.summa))
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const removeFromBasket = (filmId) => {
    return function (dispatch) {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then(response => {
                dispatch(removedFromBasket(filmId))
                dispatch(setPrice(response.data.summa))
                console.log(response)
            })
            .catch(error => {
                    console.log(error)
                }
            )
    }
}