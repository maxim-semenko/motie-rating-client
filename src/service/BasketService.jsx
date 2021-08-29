import axios from "axios";

const AUTH_API_BASE_URL = "/api/v1/baskets";

class BasketService {

    add(basketId, filmId) {
        return axios.post(AUTH_API_BASE_URL + '/basket/' + basketId + '/film/' + filmId);
    }

    remove(basketId, filmId) {
        return axios.delete(AUTH_API_BASE_URL + '/basket/' + basketId + '/film/' + filmId);
    }

    async getById(id) {
        return await axios.get(AUTH_API_BASE_URL + '/' + id);
    }

    // Update user
    update(request) {
        return axios.put(AUTH_API_BASE_URL + '/' + request.id, request);
    }

}

export default new BasketService();