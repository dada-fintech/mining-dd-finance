import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
import axios from 'utils/axios'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import './style.scss'

export default function InsuranceModal(props) {
    const params = props.params
    const wallet = useWallet()
    const { t } = useTranslation()
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = () => {
        axios.post('/project/pay-insurance', {
            ...params,
        }).then(res => {
            setInfo(res.data)
        })
    }

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

        setLoading(true)

        if (info.is_satisfied) {
            mm.sendTransaction(txnParams, 'Pay Insurance').then(async res => {
                setLoading(false)
                await getInfo()
                props.onCancel()
            })
        } else {
            mm.sendTransaction(approveParams, 'Approve paying insurance').then(async res => {
                if (res) {
                    mm.sendTransaction(txnParams, 'Pay Insurance').then(async secRes => {
                        setLoading(false)
                        await getInfo()
                        props.onCancel()
                    })
                } else {
                    setLoading(false)
                }
            })
        }
    }

    return (
        <Modal wrapClassName="insurance-modal" footer={null} title={t('modal.payInsurance')} visible={true} onCancel={() => { props.onCancel() }}>
            <div className="dada-circle">
                {info.approve_balance} DADA
            </div>
            <div className="hint" dangerouslySetInnerHTML={{ __html: t('modal.insuranceHint') }}>

            </div>
            <div className="handle-area">
                <Button loading={loading} className="btn-green" onClick={() => { doAction() }}>{info.is_satisfied ? t('common.pay') : t('common.approve')}</Button>
            </div>
        </Modal>
    )


}