import axios from "axios"
import {Cookies} from "react-cookie"

const GENRE_API_BASE_URL = "/api/v1/genres"
const cookies = new Cookies()

class GenreService {

    async findAll() {
        return axios.get(GENRE_API_BASE_URL, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new GenreService()