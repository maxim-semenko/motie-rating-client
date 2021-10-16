import * as types from "./FilmActionType"
import store from "../Store"
import FilmService from "../../service/FilmService";

const getFilmsSuccess = (films) => ({
    type: types.GET_FILMS,
    payload: films,
})

const gotFilmById = (film) => ({
    type: types.GET_FILM,
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

export const getFilms = (currentPage = 1, sizePage = 15) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        FilmService.getAll(currentPage, sizePage)
            .then((resp) => {
                dispatch(getFilmsSuccess(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getFilmById = (id) => {
    return function (dispatch) {
        FilmService.getById(id)
            .then((resp) => {
                dispatch(gotFilmById(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const saveFilm = (film) => {
    return function (dispatch) {
        FilmService.save(film)
            .then((resp) => {
                dispatch(getFilms(store.getState().dataOfStudents.currentPage, store.getState().dataOfStudents.perPage))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const updateFilm = (film) => {
    return function (dispatch) {
        FilmService.update(film)
            .then((resp) => {
                dispatch(getFilms(store.getState().dataOfStudents.currentPage, store.getState().dataOfStudents.perPage))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// store.getState().dataOfStudents.currentPage
export const deleteFilmById = (id) => {
    return function (dispatch) {
        FilmService.deleteById(id)
            .then((resp) => {
                dispatch(getFilms(store.getState().dataOfStudents.currentPage, store.getState().dataOfStudents.perPage))
            })
            .catch(error => {
                console.log(error)
            })
    }
}