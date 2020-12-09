// import { web3 } from '~/components/web3'
import { notification } from 'antd'
import { subscribe } from '@nextcloud/event-bus'
import { watchTransaction } from 'components/utils'


async function sendTransaction(transactionParameters, desc, approvedActionParam) {
    // approvedActionParam will be called when approvement is approved



    return new Promise(async (resolve, reject) => {
        await window.ethereum
            .request({
                method: "eth_sendTransaction",
                params: [{ ...transactionParameters, chainId: 42 }],
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

                watchTransaction(txHash)
            })
            .catch((error) => {
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

