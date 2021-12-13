import * as types from "./CountryActionType"
import store from "../Store"
import CountryService from "../../service/CountryService";

const getFilmsSuccess = (countries) => ({
    type: types.GET_COUNTRIES,
    payload: countries,
})

const gotCountryById = (country) => ({
    type: types.GET_COUNTRY,
    payload: country,
})

export const setCurrentPage = (page) => ({
    type: types.SET_CURRENT_PAGE,
    payload: page
})

export const setSizePage = (size) => ({
    type: types.SET_SIZE_PAGE_COUNTRY,
    payload: size
})

export const setLoading = (loading) => ({
    type: types.SET_LOADING,
    payload: loading
})

//============================================ Axios requests ==========================================================

export const getCountries = (currentPage = 1, sizePage = 9) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        CountryService.getAll(currentPage, sizePage)
            .then((resp) => {
                console.log(resp.data)
                dispatch(getFilmsSuccess(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getCountryById = (id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        CountryService.getById(id)
            .then((resp) => {
                dispatch(gotCountryById(resp.data))
                dispatch(setLoading(false))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function createCountry(film) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CountryService.create(film)
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

export const updateCountry = (film, id) => {
    return function (dispatch) {
        CountryService.update(film, id)
            .then(() => {
                dispatch(getCountries(store.getState().dataFilms.currentPage, store.getState().dataFilms.sizePage))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// store.getState().dataOfStudents.currentPage
export const deleteCountryById = (id) => {
    return function (dispatch) {
        CountryService.deleteById(id)
            .then(() => {
                dispatch(getCountries(store.getState().dataFilms.currentPage, store.getState().dataFilms.sizePage))
            })
            .catch(error => {
                console.log(error)
            })
    }
}