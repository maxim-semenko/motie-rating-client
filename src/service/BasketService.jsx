import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8088/api/v1/baskets";

class BasketService {

    add(userId, filmId) {
        return axios.post(AUTH_API_BASE_URL + '/user/' + userId + '/film/' + filmId);
    }

    remove(userId, filmId) {
        return axios.delete(AUTH_API_BASE_URL + '/user/' + userId + '/film/' + filmId);
    }

    getById(id) {
        return axios.get(AUTH_API_BASE_URL + '/' + id);
    }


    // Update user
    update(request) {
        return axios.put(AUTH_API_BASE_URL + '/' + request.id, request);
    }

}

export default new BasketService();