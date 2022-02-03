import axios from "axios"
import {Cookies} from "react-cookie"

const TRANSACTION_API_BASE_URL = "/api/v1/transactions"
const cookies = new Cookies()

class TransactionService {

    async getAllByUserId(userId) {
        console.log(TRANSACTION_API_BASE_URL + '/user/' + userId)
        return axios.get(TRANSACTION_API_BASE_URL + '/user/' + userId, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new TransactionService()