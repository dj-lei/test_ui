import axios from 'axios'

axios.defaults.withCredentials = true

let service
service = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 20000
})

export default service
