import * as types from "./GenreActionType"
import GenreService from "../../service/GenreService";

const gotGenresSuccess = (genres) => ({
    type: types.GET_GENRES,
    payload: genres,
})

const gotGenreSuccess = (genre) => ({
    type: types.GET_GENRE,
    payload: genre,
})

const createdGenreSuccess = (genre) => ({
    type: types.CREATE_GENRE,
    payload: genre,
})

const updatedGenreSuccess = (genre) => ({
    type: types.UPDATE_GENRE,
    payload: genre,
})

const deletedGenreSuccess = (id) => ({
    type: types.DELETE_GENRE,
    payload: id,
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
            })
            .catch(error => {
                dispatch(setLoading(false))
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
                dispatch(gotGenreSuccess(resp.data))
            })
            .catch(error => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }
}

export function createGenre(genre) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            GenreService.create(genre)
                .then((response) => {
                    dispatch(createdGenreSuccess(genre))
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
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            GenreService.update(genre, id)
                .then((response) => {
                    dispatch(updatedGenreSuccess(response.data))
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

export const deleteGenreById = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            GenreService.deleteById(id)
                .then((response) => {
                    dispatch(deletedGenreSuccess(id))
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