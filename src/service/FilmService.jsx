import axios from "axios"
import {Cookies} from "react-cookie"

const AUTH_API_BASE_URL = "/api/v1/films/"
const cookies = new Cookies()

class FilmService {

    async getAll(page, size) {
        console.log("/api/v1/films/?page=" + page + "&size=" + size)
        return await axios.get(`/api/v1/films/?page=" + ${page - 1} + "&size=" + size`)
    }

    async getById(id) {
        return await axios.get(AUTH_API_BASE_URL + id)
    }

    async save(request) {
        return await axios.post(AUTH_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async update(request) {
        return await axios.post(AUTH_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async deleteById(id) {
        return await axios.delete(AUTH_API_BASE_URL + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

}

export default new FilmService()