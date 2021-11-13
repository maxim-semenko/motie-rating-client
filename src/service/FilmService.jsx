import axios from "axios"
import {Cookies} from "react-cookie"

const FILM_API_BASE_URL = "/api/v1/films"
const cookies = new Cookies()

class FilmService {

    async getAll(page, size) {
        console.log(`/api/v1/films?page=${page - 1}&size=${size}&sort=id,desc`)
        return axios.get(FILM_API_BASE_URL + `?page=${page - 1}&size=${size}&sort=id,desc`)
    }

    async getById(id) {
        return axios.get(FILM_API_BASE_URL + '/' + id)
    }

    async create(request) {
        return axios.post(FILM_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async update(request, id) {
        return axios.put(FILM_API_BASE_URL + '/' + id, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    async deleteById(id) {
        return axios.delete(FILM_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

}

export default new FilmService()