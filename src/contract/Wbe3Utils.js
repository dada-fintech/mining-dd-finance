import Web3 from 'web3';
import React from 'react';
import { MetaMask_CONF_URL } from '../constants';

const Wbe3Utils = new Web3(MetaMask_CONF_URL);
export default Wbe3Utils;

export const AppContext = React.createContext({
    walletVisible: false,
    toggleWalletVisible: () => {},
    web3Instance: null,
    poolListRefresh: false,
    togglePLR: () => {},
});
