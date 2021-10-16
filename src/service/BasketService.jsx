import axios from "axios"
import {Cookies} from "react-cookie"

const AUTH_API_BASE_URL = "/api/v1/baskets/"
const cookies = new Cookies()

class BasketService {

    add(userId, filmId) {
        return axios.post(AUTH_API_BASE_URL + 'user/' + userId + '/film/' + filmId, null, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    remove(userId, filmId) {
        return axios.delete(AUTH_API_BASE_URL + 'user/' + userId + '/film/' + filmId, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async getById(id) {
        return await axios.get(AUTH_API_BASE_URL + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    // Update user
    update(request) {
        return axios.put(AUTH_API_BASE_URL + request.id, request)
    }

}

export default new BasketService()