import web3 from 'web3';
import { CLAIMROUTER, DDDECIMALS } from '../constants/index';
import claimabi from './abi/claimabi.json';
import Wbe3Utils from './Wbe3Utils';
import * as Tools from '../utils/Tools';

class ClaimContractApi {
    /**
     * 获取 Claim余额
     * @param {*}
     * @param {*}
     */
    async getClaimBalance(address = '') {
        try {
            const contract = new Wbe3Utils.eth.Contract(claimabi, CLAIMROUTER);
            const balance = await contract.methods.can_claim().call({
                from: address,
            });
            console.log(balance);
            console.log(Tools.numDivDecimals(balance, DDDECIMALS));
            return Tools.numDivDecimals(balance, DDDECIMALS);
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

    /**
     * Claim
     * @param {*}
     * @param {*}
     */
    async claim(
        address = '',
        ethereum,
        errorFun = () => {},
        pendingFun = () => {},
        receiptFun = () => {}
    ) {
        try {
            console.log(address);
            const web3c = new web3(ethereum);
            const contract = new web3c.eth.Contract(claimabi, CLAIMROUTER);
            return contract.methods
                .claim()
                .send({
                    from: address,
                })
                .on('error', function (error) {
                    // console.log('error', error);
                    errorFun();
                })
                .on('transactionHash', function (transactionHash) {
                    // console.log('pending...', transactionHash);
                    // console.log(transactionHash);
                    pendingFun(transactionHash);
                    return transactionHash;
                })
                .on('receipt', (receipt) => {
                    // console.log('LptenTokenContract receipt', receipt);
                    receiptFun();
                });
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default new ClaimContractApi();
