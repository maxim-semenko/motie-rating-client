import * as types from "./CountryActionType"
import CountryService from "../../service/CountryService";

const gotCountriesSuccess = (countries) => ({
    type: types.GET_COUNTRIES,
    payload: countries,
})

const gotCountrySuccess = (country) => ({
    type: types.GET_COUNTRY,
    payload: country,
})

const createdCountrySuccess = (country) => ({
    type: types.CREATE_COUNTRY,
    payload: country,
})

const updatedCountrySuccess = (country) => ({
    type: types.UPDATE_COUNTRY,
    payload: country,
})

const deletedCountrySuccess = (id) => ({
    type: types.DELETE_COUNTRY,
    payload: id,
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

export const getCountries = (currentPage = 0, sizePage = 0) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        CountryService.getAll(currentPage, sizePage)
            .then((response) => {
                console.log(response.data)
                dispatch(gotCountriesSuccess(response.data))
            })
            .catch(error => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }
}

export const getCountryById = (id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        CountryService.getById(id)
            .then((response) => {
                dispatch(gotCountrySuccess(response.data))
            })
            .catch(error => {
                dispatch(setLoading(false))
                console.log(error)
            })
    }
}

export function createCountry(country) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CountryService.create(country)
                .then((response) => {
                    dispatch(createdCountrySuccess(response.data))
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

export function updateCountry(country, id) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CountryService.update(country, id)
                .then((response) => {
                    dispatch(updatedCountrySuccess(response.data))
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

export const deleteCountryById = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            CountryService.deleteById(id)
                .then((response) => {
                    dispatch(deletedCountrySuccess(id))
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
