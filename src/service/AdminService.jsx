import axios from "axios"
import {Cookies} from "react-cookie"

const ADMIN_API_BASE_URL = "/api/v1/administration"
const cookies = new Cookies()

class AdminService {

    async updateUserIsNonLockedById(id, isNonLocked) {
        console.log(ADMIN_API_BASE_URL + '/locked/user/' + id)
        console.log(isNonLocked)
        return axios.put(ADMIN_API_BASE_URL + `/locked/user/${id}?status=${isNonLocked}`, null, {
            headers: {
                'Authorization': `Bearer_${cookies.get("jwt")}`
            },
        })
    }

    async updateUserRoleById(id) {
        return axios.put(ADMIN_API_BASE_URL + `/role/user/${id}`, null, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new AdminService()