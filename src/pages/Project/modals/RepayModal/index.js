import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import axios from 'utils/axios'
import mm from 'components/mm'
import config from 'config'
import './style.scss'

export default function RepayModal(props) {
    const params = props.params
    const wallet = useWallet()
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({})
    const { t } = useTranslation()

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
        mm.sendTransaction(repayParams, 'Repay').then(res => {
            setLoading(false)
            props.onCancel()
        })
    }

    return (
        <Modal wrapClassName="repay-modal" footer={null} title={t('modal.repayTitle')} visible={true} onCancel={() => { props.onCancel() }}>
            <div className="hint">
                {t('modal.youNeedPay')} {info.repay_amount} {config.usdUnit}。
            </div>
            <div className="handle-area">
                <Button loading={loading} className="btn-green" onClick={() => { doRepay() }}>{t('common.confirm')}</Button>
            </div>
        </Modal>
    )


}