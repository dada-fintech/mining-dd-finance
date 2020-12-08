import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, message } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
import axios from 'utils/axios'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import './style.scss'

export default function ConfirmVote(props) {
    const params = props.params
    const wallet = useWallet()
    const [info, setInfo] = useState({})
    useEffect(() => {
        axios.post('/project/pay-insurance', {
            ...params,
        }).then(res => {
            setInfo(res.data)
        })
    }, [])

    const doAction = () => {
        const approveParams = {
            from: wallet.account,
            to: info.call_contract[0].contract_addr,
            data: info.call_contract[0].call_data
        }

        const txnParams = {
            from: wallet.account,
            to: info.call_contract[1].contract_addr,
            data: info.call_contract[1].call_data
        }

        if (info.is_satisfied) {
            mm.sendTransaction(txnParams, '支付保证金')
        } else {
            mm.sendTransaction(approveParams, '授权支付保证金', txnParams)
        }

    }

    return (
        <Modal wrapClassName="insurance-modal" footer={null} title="支付保证金" visible={true} onCancel={() => { props.onCancel() }}>
            <div className="dada-circle">
                {info.approve_balance} DADA
            </div>
            <div className="hint">
                您的项目即将启动，您需要支付募集额度10%的DADA作为项目抵押金。<br />项目完成后，将会收取其中25%的费用作为保险费用，返回剩余75%的押金。
            </div>
            <div className="handle-area">
                <Button className="btn-green" onClick={() => { doAction() }}>{info.is_satisfied ? '支付' : '授权'}</Button>
            </div>
        </Modal>
    )


}