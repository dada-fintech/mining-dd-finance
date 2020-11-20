import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mining-api.dd.finance'
})

export default instance