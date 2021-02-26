import { message } from 'antd';
import config from 'config'
// import { CHAINID } from '../constants';
import store from '../redux/store';
import { ApiSavetransaction } from '../services';
const { setting } = store.getState()

export async function sendTransaction (transactionParameters, resFun, errFun, id = '') {
    try {
        // return new Promise(async (resolve, reject) => {
        const network = setting.network;
        await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [{ ...transactionParameters, chainId: config[network].chainId }],
            })
            .then(async (txHash) => {
                console.log(txHash);
                await ApiSavetransaction.apply(txHash, id).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
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
