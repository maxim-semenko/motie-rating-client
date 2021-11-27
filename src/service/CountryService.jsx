import axios from "axios"
import {Cookies} from "react-cookie"

const COUNTRY_API_BASE_URL = "/api/v1/countries"
const cookies = new Cookies()

class CountryService {

    async findAll() {
        return axios.get(COUNTRY_API_BASE_URL, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new CountryService()