import axios from "axios"
import {Cookies} from "react-cookie"

const MARK_API_BASE_URL = "/api/v1/mail"
const cookies = new Cookies()

class MailService {

    async send(request) {
        console.log(request)
        return axios.post(`${MARK_API_BASE_URL}`, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new MailService()