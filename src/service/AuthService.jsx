import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8088/api/v1/auth";

class BookService {

    // Login user
    login(request) {
        return axios.post(AUTH_API_BASE_URL + '/login', request);
    }

    // Register user
    register(request) {
        return axios.post(AUTH_API_BASE_URL + '/register', request);
    }

}

export default new BookService();