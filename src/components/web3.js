import Web3 from "web3";

const provider = "wss://mainnet.infura.io/ws/v3/89db527f19e14a00902a439ae587a25b"
// const provider = 'https://kovan.infura.io/v3/e468cafc35eb43f0b6bd2ab4c83fa688'

const web3 = new Web3(provider);

export {
    web3
}

export default web3