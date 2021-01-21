import Web3 from 'web3';
import React from 'react';
import config from 'config';
// import { MetaMask_CONF_URL } from '../constants';

const network = localStorage.getItem('network')

const Wbe3Utils = new Web3(config[network].provider);
export default Wbe3Utils;

export const AppContext = React.createContext({
    walletVisible: false,
    toggleWalletVisible: () => {},
    web3Instance: null,
    poolListRefresh: false,
    togglePLR: () => {},
});
