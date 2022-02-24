import * as types from "./FilmActionType"
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
    type: types.SET_SIZE_PAGE_FILM,
    payload: size
})

export const resetFilms = () => ({
    type: types.RESET_FILMS,
})

export const resetFilm = () => ({
    type: types.RESET_FILM,
})

export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

export const setLoadingFilm = (loading) => ({
    type: types.SET_LOADING_FILM,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getFilms = (currentPage = 1, sizePage = 9) => {
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

export const getFilmsByName = (name, currentPage = 1, sizePage = 9) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        FilmService.getAllByName(currentPage, sizePage, name)
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
        dispatch(setLoadingFilm(true))
        FilmService.getById(id)
            .then((resp) => {
                console.log(resp.data)
                dispatch(gotFilmById(resp.data))
                dispatch(setLoadingFilm(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function createFilm(film) {
    return () => {
        return new Promise((resolve, reject) => {
            FilmService.create(film)
                .then((response) => {
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    };
}

export const updateFilm = (film, id) => {
    return () => {
        return new Promise((resolve, reject) => {
            FilmService.update(film, id)
                .then((response) => {
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    };
}

export const deleteFilmById = (id) => {
    return () => {
        return new Promise((resolve, reject) => {
            FilmService.deleteById(id)
                .then((response) => {
                    console.log(response)
                    return resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    return reject(error);
                })
        })
    }
}