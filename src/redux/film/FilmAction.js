import * as types from "./FilmActionType"
import FilmService from "../../service/FilmService";

const gotFilmsSuccess = (films) => ({
    type: types.GET_FILMS,
    payload: films,
})

const gotFilmSuccess = (film) => ({
    type: types.GET_FILM,
    payload: film,
})

const createdFilmSuccess = (film) => ({
    type: types.CREATE_FILM,
    payload: film,
})

const updatedFilmSuccess = (film) => ({
    type: types.UPDATE_FILM,
    payload: film,
})

const deletedFilmSuccess = (id) => ({
    type: types.DELETE_FILM,
    payload: id,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_FILM,
    payload: size
})

export const setLoadingFilms = (loading) => ({
    type: types.SET_LOADING_FILMS,
    payload: loading
})

export const setLoadingFilm = (loading) => ({
    type: types.SET_LOADING_FILM,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getFilms = (currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingFilms(true))
        FilmService.getAll(currentPage, sizePage)
            .then((resp) => {
                dispatch(gotFilmsSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                dispatch(setLoadingFilms(false))
                console.log(error)
            })
    }
}

export const getFilmsByName = (name, currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoadingFilms(true))
        FilmService.getAllByName(currentPage, sizePage, name)
            .then((resp) => {
                dispatch(gotFilmsSuccess(resp.data))
            })
            .catch(error => {
                dispatch(setLoadingFilms(false))
                console.log(error)
            })
    }
}

export const getFilmById = (id) => {
    return function (dispatch) {
        dispatch(setLoadingFilm(true))
        FilmService.getById(id)
            .then((resp) => {
                dispatch(gotFilmSuccess(resp.data))
                console.log(resp.data)
            })
            .catch(error => {
                dispatch(setLoadingFilm(false))
                console.log(error)
            })
    }
}

export function createFilm(film) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            FilmService.create(film)
                .then((response) => {
                    dispatch(createdFilmSuccess(response.data))
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
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            FilmService.update(film, id)
                .then((response) => {
                    dispatch(updatedFilmSuccess(response.data))
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
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            FilmService.deleteById(id)
                .then((response) => {
                    dispatch(deletedFilmSuccess(id))
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