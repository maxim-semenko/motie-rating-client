import axios from "axios"
import {Cookies} from "react-cookie"

const USER_API_BASE_URL = "/api/v1/users"
const cookies = new Cookies()

class UserService {

    async getAll(page, size) {
        console.log(`/api/v1/users?page=${page - 1}&size=${size}`)
        return axios.get(`/api/v1/users?page=${page - 1}&size=${size}`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
        // return axios.get(AUTH_API_BASE_URL, {
        //     headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        // })
    }

    async getById(id) {
        return axios.get(USER_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    // Update user
    async update(request) {
        let jwt = cookies.get("jwt");
        return axios.put(USER_API_BASE_URL + '/' + request.id, request, {
            headers: {
                'Authorization': `Bearer_${jwt}`
            },
        })
    }

}

export default new UserService()