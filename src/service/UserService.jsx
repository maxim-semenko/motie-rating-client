import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8088/api/v1/users";

class UserService {

    // Exist user by username
    existByUsername(request) {
        return axios.get(AUTH_API_BASE_URL + '/find/' + request);
    }

    // Update user
    update(request) {
        return axios.put(AUTH_API_BASE_URL + '/' + request.id, request);
    }

}

export default new UserService();