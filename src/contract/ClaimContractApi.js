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
    async getClaimBalance() {
        console.log(Wbe3Utils.eth);
        try {
            const contract = new Wbe3Utils.eth.Contract(claimabi, CLAIMROUTER);
            console.log(contract.methods.can_claim());
            const balance = await contract.methods.can_claim();
            console.log(balance);
            console.log(Tools.numDivDecimals(balance, DDDECIMALS));
            console.log(balance);
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    /**
     * Claim
     * @param {*}
     * @param {*}
     */
    async claim() {
        try {
            const contract = Wbe3Utils.eth.Contract(claimabi, CLAIMROUTER);
            await contract.methods
                .can_claim()
                // .send({
                //     from: userAddress,
                // })
                .on('error', (error) => {
                    console.log('invoke coreContract.add error: ', error);
                    return error;
                })
                .on('transactionHash', (transactionHash) => {
                    console.log('coreContract.add pending ', transactionHash);
                    return transactionHash;
                })
                .on('receipt', (receipt) => {
                    console.log('coreContract.add receipt', receipt);
                    return receipt;
                });
        } catch (e) {
            console.log(e);
            return 0;
        }
    }
}

export default new ClaimContractApi();
