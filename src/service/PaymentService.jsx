import axios from "axios"
import {Cookies} from "react-cookie"

const BASKET_API_BASE_URL = "/api/v1/payment"
const cookies = new Cookies()

class PaymentService {

    async pay() {
        return axios.get(BASKET_API_BASE_URL, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }


}

export default new PaymentService()