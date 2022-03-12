import axios from "axios"
import {Cookies} from "react-cookie"

const USER_API_BASE_URL = "/api/v1/users"
const cookies = new Cookies()

class UserService {

    /**
     * Get all users by page and size.
     * @param page page
     * @param size size
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async getAll(page, size) {
        console.log(`/api/v1/users?page=${page - 1}&size=${size}`)
        return axios.get(`/api/v1/users?page=${page - 1}&size=${size}`, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`}
        })
    }

    /**
     * Get user by id.
     * @param id user's id
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async getById(id) {
        console.log(USER_API_BASE_URL + '/' + id)
        return axios.get(USER_API_BASE_URL + '/' + id, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

    /**
     * Update user by id.
     * @param request data
     * @param id user's id
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async updateById(request, id) {
        console.log(USER_API_BASE_URL + '/' + id)
        let jwt = cookies.get("jwt");
        return axios.put(USER_API_BASE_URL + '/' + id, request, {
            headers: {
                'Authorization': `Bearer_${jwt}`
            },
        })
    }

    /**
     * Update user's password by id.
     * @param request data
     * @param id user's id
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async updatePasswordById(request, id) {
        console.log(USER_API_BASE_URL + '/password/' + id)
        let jwt = cookies.get("jwt");
        return axios.put(USER_API_BASE_URL + '/password/' + id, request, {
            headers: {
                'Authorization': `Bearer_${jwt}`
            },
        })
    }

    /**
     * Delete user's account.
     * @param password user's password
     * @param id user's id
     * @returns {Promise<AxiosResponse<any>>} AxiosResponse
     */
    async deleteAccount(password, id) {
        console.log(USER_API_BASE_URL + '/' + id)
        let jwt = cookies.get("jwt");

        return axios.delete(USER_API_BASE_URL + '/' + id, {
            headers: {
                'Authorization': `Bearer_${jwt}`
            },
            data: {
                password: password
            }
        });
    }

    async updateUserIsNonLockedById(request, id) {
        return axios.patch(`${USER_API_BASE_URL}/${id}/locked`, request, {
            headers: {
                'Authorization': `Bearer_${cookies.get("jwt")}`
            },
        })
    }

    async updateUserRolesById(request, id) {
        return axios.patch(`${USER_API_BASE_URL}/${id}/roles`, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new UserService()
