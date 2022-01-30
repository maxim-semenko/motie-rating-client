import axios from "axios"
import {Cookies} from "react-cookie"

const PURCHASE_API_BASE_URL = "/api/v1/purchases"
const cookies = new Cookies()

class PurchaseStorageService {

    async getById(userId) {
        console.log(PURCHASE_API_BASE_URL + '/user/' + userId)
        return axios.get(PURCHASE_API_BASE_URL + '/user/' + userId, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new PurchaseStorageService()