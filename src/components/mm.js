// import { web3 } from '~/components/web3'
import { notification } from 'antd'
import { watchTransaction } from 'components/utils'

async function sendTransaction(transactionParameters, desc, approvedActionParam) {
    // approvedActionParam will be called when approvement is approved
    if (window.ethereum && window.ethereum.selectedAddress) {
        await window.ethereum
            .request({
                method: "eth_sendTransaction",
                params: [{ ...transactionParameters, chainId: 1 }],
            })
            .then(async (txHash) => {
                let previousActionObj = JSON.parse(localStorage.getItem('actionObj')) || {}
                previousActionObj[txHash] = {
                    desc: desc,
                    action: approvedActionParam ? approvedActionParam : ''
                }
                localStorage.setItem('actionObj', JSON.stringify(previousActionObj))

                watchTransaction(txHash)

            })
            .catch((error) => {
                // me.$message.error(me.$t("hint.rejected"));
            })

    } else {
        notification.error({
            message: 'Failed',
            description: 'Address not detected',
            icon: h => {
                return h('a-icon', { props: { type: 'close', style: { 'color': 'red' } } })
            }
        })
    }
}



export default {
    sendTransaction
}

