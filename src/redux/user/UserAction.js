import * as types from "./UserActionType"
import UserService from "../../service/UserService";

const getFilmsSuccess = (films) => ({
    type: types.GET_USERS,
    payload: films,
})

const getUserByIdSuccess = (film) => ({
    type: types.GET_USER,
    payload: film,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE,
    payload: size
})

export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getUsers = (currentPage = 1, sizePage = 9) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        UserService.getAll(currentPage, sizePage)
            .then((resp) => {
                dispatch(getFilmsSuccess(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getUserById = (id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        UserService.getById(id)
            .then((resp) => {
                dispatch(getUserByIdSuccess(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}