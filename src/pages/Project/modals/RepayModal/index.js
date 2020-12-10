import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, message } from 'antd'
import { useWallet } from 'use-wallet'
import axios from 'utils/axios'
import mm from 'components/mm'
import './style.scss'

export default function RepayModal(props) {
    const params = props.params
    const wallet = useWallet()
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({})

    useEffect(() => {
        axios.post('/project/manager-repay', {
            ...params,
        }).then(res => {
            setInfo(res.data)
        })
    }, [])

    const doRepay = () => {
        setLoading(true)
        const repayParams = {
            from: wallet.account,
            to: info.call_data.contract_addr,
            data: info.call_data.call_data
        }
        mm.sendTransaction(repayParams, '项目回款').then(res => {
            setLoading(false)
            props.onCancel()
        })
    }

    return (
        <Modal wrapClassName="repay-modal" footer={null} title="项目回款" visible={true} onCancel={() => { props.onCancel() }}>
            <div className="hint">
                您需要支付{info.repay_amount}USDT。
            </div>
            <div className="handle-area">
                <Button loading={loading} className="btn-green" onClick={() => { doRepay() }}>确定</Button>
            </div>
        </Modal>
    )


}