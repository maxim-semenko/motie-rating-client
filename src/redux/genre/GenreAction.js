import * as types from "./GenreActionType"
import store from "../Store"
import GenreService from "../../service/GenreService";

const gotGenresSuccess = (genres) => ({
    type: types.GET_GENRES,
    payload: genres,
})

const gotCountrySuccess = (genre) => ({
    type: types.GET_GENRE,
    payload: genre,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE_GENRE,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_GENRE,
    payload: size
})

export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getGenres = (page = 0, size = 0) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        GenreService.findAll(page, size)
            .then((resp) => {
                console.log(resp.data)
                dispatch(gotGenresSuccess(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}


export const getGenreById = (id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        GenreService.getById(id)
            .then((resp) => {
                console.log(resp.data)
                dispatch(gotCountrySuccess(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function createGenre(genre) {
    return () => {
        return new Promise((resolve, reject) => {
            GenreService.create(genre)
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

export function updateGenre(genre, id) {
    return () => {
        return new Promise((resolve, reject) => {
            GenreService.update(genre, id)
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

// store.getState().dataOfStudents.currentPage
export const deleteGenreById = (id) => {
    return function (dispatch) {
        GenreService.deleteById(id)
            .then(() => {
                dispatch(getGenres(store.getState().dataGenres.currentPage, store.getState().dataGenres.sizePage))
            })
            .catch(error => {
                console.log(error)
            })
    }
}