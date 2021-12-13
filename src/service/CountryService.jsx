import axios from "axios"
import {Cookies} from "react-cookie"

const COUNTRY_API_BASE_URL = "/api/v1/countries"
const cookies = new Cookies()

class CountryService {

    async findAll() {
        return axios.get(COUNTRY_API_BASE_URL, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async getAll(page = 1, size = 999) {
        console.log(`/api/v1/countries?page=${page - 1}&size=${size}`)
        return axios.get(COUNTRY_API_BASE_URL + `?page=${page - 1}&size=${size}&sort=id`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async getById(id) {
        return axios.get(COUNTRY_API_BASE_URL + '/' + id)
    }

    async create(request) {
        return axios.post(COUNTRY_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async update(request, id) {
        return axios.put(COUNTRY_API_BASE_URL + '/' + id, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async deleteById(id) {
        return axios.delete(COUNTRY_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

}

export default new CountryService()