import { notification } from 'antd'
import { web3 } from 'components/web3'
import mm from "components/mm";
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';


const getTokenBalance = (balanceList, target) => {
    let result = 0
    balanceList.forEach((balance) => {
        if (balance.symbol == target) {
            result = balance.balance / Math.pow(10, balance.decimals);
        }
    });
    return result
}

const debounce = (fn, delay, immediate) => {
    let timerId;
    function debouncedFn(...args) {
        return new Promise(resolve => {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }

            if (immediate && timerId === undefined) {
                timerId = setTimeout(() => {
                    timerId = undefined;
                }, delay);
                resolve(fn.apply(this, args));
            } else {
                timerId = setTimeout(() => {
                    resolve(fn.apply(this, args));
                    timerId = undefined;
                }, delay);
            }
        });
    }

    debouncedFn.cancel = function () {
        clearTimeout(timerId);
        timerId = undefined;
    };

    return debouncedFn;
}

const sleep = (ms) => {
    // Unit is ms
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getTransactionReceiptPromise(hash) {
    // here we just promisify getTransactionReceipt function for convenience
    return new Promise(((resolve, reject) => {
        web3.eth.getTransactionReceipt(hash, function (err, data) {
            console.log(err, data, 'get receipt')
            if (err !== null) reject(err);
            else resolve(data);
        });
    }));
}

const getTxReceipt = async (txHash) => {
    const receipt = await getTransactionReceiptPromise(txHash)
    return receipt
}

const watchTransaction = async (txHash) => {
    const actionObj = JSON.parse(localStorage.getItem('actionObj'))
    const currentAction = actionObj[txHash]
    const msgTitle = '链上确认中' || 'Waiting for confirmation'
    if (currentAction) {
        notification.info({
            message: msgTitle,
            description: currentAction.desc,
            icon: <LoadingOutlined style={{ color: 'blue' }} />,
            className: txHash,
            duration: null
        })

        let receipt = null
        while (receipt === null) {
            receipt = await getTransactionReceiptPromise(txHash)
            await sleep(1000)
        }

        if (receipt) {
            if (receipt.status) {
                notification.success({
                    message: 'Success',
                    description: currentAction.desc,
                    icon: <CheckOutlined style={{ color: 'green' }} />,
                })

                //TODO，成功之后要重新刷各种list

                // trigger approved action
                if (currentAction.action) {
                    mm.sendTransaction(currentAction.action)
                }
            } else {
                notification.error({
                    message: 'Failed',
                    description: currentAction.desc,
                    icon: h => {
                        return h('a-icon', { props: { type: 'close', style: { 'color': 'red' } } })
                    }
                })
            }
            // remove obj from localstorage
            let latestObj = JSON.parse(localStorage.getItem('actionObj'))
            delete latestObj[txHash]
            localStorage.setItem('actionObj', JSON.stringify(latestObj))
            // remove notification
            if (document.getElementsByClassName(txHash)) {
                document.getElementsByClassName(txHash)[0].style.display = 'none'

            }
        }
    } else {
        console.log('did not find txn')
    }



}

export {
    getTokenBalance,
    watchTransaction,
    getTxReceipt,
    debounce,
}