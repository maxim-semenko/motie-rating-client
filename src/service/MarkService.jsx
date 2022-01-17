import axios from "axios"
import {Cookies} from "react-cookie"

const MARK_API_BASE_URL = "/api/v1/marks"
const cookies = new Cookies()

class MarkService {

    async create(request) {
        console.log(request)
        return axios.post(`${MARK_API_BASE_URL}`, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async delete(id, userId) {
        return axios.delete(`${MARK_API_BASE_URL}/${id}?userId=${userId}`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    async getByUserIdAndFilmId(userId, filmId) {
        return axios.get(`${MARK_API_BASE_URL}/user/${userId}/film/${filmId}`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new MarkService()