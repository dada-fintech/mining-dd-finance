import axios from 'axios'
import config from 'config'

const network = localStorage.getItem('network')

const instance = axios.create({
    baseURL: config[network].baseURL,
})

export default instance