import axios from "axios"

const AUTH_API_BASE_URL = "/api/v1/auth"

class AuthService {

    // Login user
    async login(request) {
        return axios.post(AUTH_API_BASE_URL + '/login', request)
    }

    // Register user
    async register(request) {
        return axios.post(AUTH_API_BASE_URL + '/register', request)
    }

    async restorePassword(request) {
        return axios.put(AUTH_API_BASE_URL + '/restore-password', request)
    }

    // Get new token
    async getToken(userId) {
        console.log(AUTH_API_BASE_URL + `/token/${userId}`)
        return axios.get(AUTH_API_BASE_URL + `/token/${userId}`)
    }

    // Logout user
    async logout(cookies) {
        cookies.remove("jwt", {path: "/"})
        localStorage.removeItem("user")
    }
}

export default new AuthService()