import axios from "axios"
import {Cookies} from "react-cookie"

const GENRE_API_BASE_URL = "/api/v1/genres"
const cookies = new Cookies()

class GenreService {

    async findAll(page = 0, size = 0) {
        console.log("genres findAll() page=" + (page - 1) + ",size=" + size)
        const params = new URLSearchParams([['page', (page - 1)], ['size', size], ['sort', 'name']]);
        return axios.get(GENRE_API_BASE_URL, {
            params, headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async getById(id) {
        console.log(GENRE_API_BASE_URL + '/' + id)
        return axios.get(GENRE_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async create(request) {
        return axios.post(GENRE_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async update(request, id) {
        return axios.put(GENRE_API_BASE_URL + '/' + id, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async deleteById(id) {
        return axios.delete(GENRE_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

}

export default new GenreService()