import { message } from 'antd';
import config from 'config'
// import { CHAINID } from '../constants';

export async function sendTransaction(transactionParameters, resFun, errFun) {
    try {
        // return new Promise(async (resolve, reject) => {
        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [{ ...transactionParameters, chainId: config.chainId }],
            })
            .then(async (txHash) => {
                console.log(txHash);
                resFun();
            })
            .catch((err) => {
                switch (err.code) {
                    case 4001:
                        message.error(err.message);
                        break;
                    default:
                        console.log(err);
                }
                errFun();
            });
        // });
    } catch (e) {
        console.log(e);
        return 0;
    }
}
