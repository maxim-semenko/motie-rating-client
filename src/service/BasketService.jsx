import axios from "axios"
import {Cookies} from "react-cookie"

const BASKET_API_BASE_URL = "/api/v1/baskets"
const cookies = new Cookies()

class BasketService {

    async add(id, filmId) {
        return axios.post(BASKET_API_BASE_URL + '/user/' + id + '/film/' + filmId, null, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async remove(id, filmId) {
        return axios.delete(BASKET_API_BASE_URL + '/user/' + id + '/film/' + filmId, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async getById(id) {
        console.log(BASKET_API_BASE_URL + '/' + id)
        return axios.get(BASKET_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    // Update user
    async update(request) {
        return axios.put(BASKET_API_BASE_URL + request.id, request)
    }

}

export default new BasketService()