import axios from "axios"

const FEEDBACK_API_BASE_URL = "/api/v1/feedbacks"

class FeedbackService {

    async getAllTypes() {
        return axios.get(`${FEEDBACK_API_BASE_URL}/types`)
    }

    async getAll(page = 0, size = 0) {
        const params = new URLSearchParams([['page', (page - 1)], ['size', size], ['sort', 'id']]);
        return axios.get(FEEDBACK_API_BASE_URL, {params})
    }

    async create(request) {
        return axios.post(FEEDBACK_API_BASE_URL, request)
    }

}

export default new FeedbackService()
