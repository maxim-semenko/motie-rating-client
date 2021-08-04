import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8088/api/v1/films";

class FilmService {

    // Login user
    getAll() {
        return axios.get(AUTH_API_BASE_URL);
    }

    // Register user
    getById(id) {
        return axios.get(AUTH_API_BASE_URL + '/' + id);
    }


}

export default new FilmService();