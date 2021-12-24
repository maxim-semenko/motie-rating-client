import axios from "axios"
import {Cookies} from "react-cookie"

const BASKET_API_BASE_URL = "/api/v1/administration"
const cookies = new Cookies()

class AdminService {

    async updateUserIsNonLockedById(id, isNonLocked) {
        console.log(BASKET_API_BASE_URL + '/locked/user/' + id)
        console.log(isNonLocked)
        return axios.put(BASKET_API_BASE_URL + '/locked/user/' + id, isNonLocked, {
            headers: {
                'Authorization': `Bearer_${cookies.get("jwt")}`
            },
        })
    }

    async updateUserRoleById(id, filmId) {
        return axios.put(BASKET_API_BASE_URL + '/user/' + id + '/film/' + filmId, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new AdminService()