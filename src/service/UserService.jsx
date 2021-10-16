import axios from "axios"
import {Cookies} from "react-cookie"

const AUTH_API_BASE_URL = "/api/v1/users/"
const cookies = new Cookies()

class UserService {

    async findAll() {
        return await axios.get(AUTH_API_BASE_URL, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }



    // Exist user by username
    existByUsername(request) {
        return axios.get(AUTH_API_BASE_URL + 'find/' + request)
    }

    // Update user
    update(request) {
        let jwt = cookies.get("jwt");
        return axios.put(AUTH_API_BASE_URL + request.id, request, {
            headers: {
                'Authorization': `Bearer_${jwt}`
            },
        })
    }

}

export default new UserService()