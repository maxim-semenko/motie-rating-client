import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8088/api/v1/users";

class UserService {

    // Login user
    existByUsername(request) {
        return axios.get(AUTH_API_BASE_URL + '/find/' + request);
    }

}

export default new UserService();