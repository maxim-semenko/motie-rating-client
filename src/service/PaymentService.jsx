import axios from "axios"
import {Cookies} from "react-cookie"

const BASKET_API_BASE_URL = "/api/v1/users"
const cookies = new Cookies()

class PaymentService {

    async pay() {
        const user = JSON.parse(localStorage.getItem("user"))
        return axios.post(BASKET_API_BASE_URL + '/test/' + user.id, null, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }


}

export default new PaymentService()