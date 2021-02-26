// import { web3 } from '~/components/web3'
import { subscribe } from '@nextcloud/event-bus'
import { watchTransaction, getTransactionReceiptPromise } from 'components/utils'
import config from 'config'
import store from '../redux/store';
import { ApiSavetransaction } from '../services';
const { setting } = store.getState();

async function sendTransaction (transactionParameters, desc, approvedActionParam, id = '') {
    // approvedActionParam will be called when approvement is approved

    const network = setting.network
    return new Promise(async (resolve, reject) => {
        await window.ethereum
            .request({
                method: "eth_sendTransaction",
                params: [{ ...transactionParameters, chainId: config[network].chainId }],
            })
            .then(async (txHash) => {

                let previousActionObj = JSON.parse(localStorage.getItem('actionObj')) || {}
                previousActionObj[txHash] = {
                    desc: desc,
                    action: approvedActionParam ? approvedActionParam : ''
                }
                localStorage.setItem('actionObj', JSON.stringify(previousActionObj))

                subscribe(txHash, (val) => {
                    resolve(val)
                })
                console.log(id, txHash, 'get receipt')
                watchTransaction(txHash, id);

            })
            .catch((error) => {
                resolve(false)
                // me.$message.error(me.$t("hint.rejected"));
            })
    })

    // 这里就不需要检查地址了
    // notification.error({
    //     message: 'Failed',
    //     description: 'Address not detected',
    //     icon: h => {
    //         return h('a-icon', { props: { type: 'close', style: { 'color': 'red' } } })
    //     }
    // })
}



export default {
    sendTransaction
}

