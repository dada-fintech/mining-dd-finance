import Web3 from "web3";
import config from 'config'

const network = localStorage.getItem('network')


const web3 = new Web3(config[network].provider);

export {
    web3
}

export default web3