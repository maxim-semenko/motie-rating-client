import axios from "axios";

const AUTH_API_BASE_URL = "/api/v1/films/";

class FilmService {

    findAll() {
        return axios.get(AUTH_API_BASE_URL);
    }

    async getById(id) {
        return await axios.get(AUTH_API_BASE_URL + id);
    }


}

export default new FilmService();