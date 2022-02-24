import axios from "axios"
import {Cookies} from "react-cookie"

const COUNTRY_API_BASE_URL = "/api/v1/countries"
const cookies = new Cookies()

class CountryService {

    async getAll(page = 0, size = 0) {
        console.log("countries getAll() page=" + (page - 1) + ",size=" + size)
        const params = new URLSearchParams([['page', (page - 1)], ['size', size], ['sort', 'name']]);
        return axios.get(COUNTRY_API_BASE_URL, {
            params, headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async getById(id) {
        return axios.get(`${COUNTRY_API_BASE_URL}/${id}`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async create(request) {
        return axios.post(COUNTRY_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async update(request, id) {
        return axios.put(`${COUNTRY_API_BASE_URL}/${id}`, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async deleteById(id) {
        return axios.delete(`${COUNTRY_API_BASE_URL}/${id}`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

}

export default new CountryService()