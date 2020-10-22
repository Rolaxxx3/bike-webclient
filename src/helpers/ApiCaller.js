import axios from 'axios'
import config from '../config'

class ApiCaller {
    constructor() {
        this.api_url = config.API_URL + '/_api';
    }
    async get(route) {
        try {
            return await axios.get(this.api_url + route);
        } catch (e) {
            console.error(e.message);
        }
    }
    async post(route, params) {
        try {
            await axios.post(this.api_url + route, params);
        } catch (e) {
            console.error(e.message);
        }
    }
    async patch(route, params) {
        try {
            await axios.patch(this.api_url + route, params);
        } catch (e) {
            console.error(e.message);
        }
    }
    async delete(route) {
        try {
            await axios.delete(this.api_url + route);
        } catch (e) {
            console.error(e.message);
        }
    }
}

const api = new ApiCaller();

export default api;