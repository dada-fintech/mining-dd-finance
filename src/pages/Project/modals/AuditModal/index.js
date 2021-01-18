import React, { useState } from 'react'
import { Modal, Input, Button, message, InputNumber } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import axios from 'utils/axios'
import mm from 'components/mm'
import './style.scss'

export default function AuditModal(props) {
    const params = props.params
    const wallet = useWallet()
    const [comment, setComment] = useState('')
    const [approveLoading, setApproveLoading] = useState(false)
    const [rejectLoading, setRejectLoading] = useState(false)
    const [insuranceRate, setInsuranceRate] = useState('')
    const { t } = useTranslation()

    const doAudit = (support) => {
        if (!comment) {
            message.error(t('hint.leaveComment'))
            return false
        }
        if (support) {
            setApproveLoading(true)
        } else {
            setRejectLoading(true)
        }
        axios.post('/project/audit-project', {
            ...params,
            comment: comment,
            support: support,
            insurance_rate: (insuranceRate * 100).toString()
        }).then(res => {
            const auditParams = {
                from: wallet.account,
                to: res.data.contract_addr,
                data: res.data.call_data
            }
            mm.sendTransaction(auditParams, 'Audit').then(res => {
                setApproveLoading(false)
                setRejectLoading(false)
                props.onCancel()
            })
        })
    }

    return (
        <Modal wrapClassName="audit-modal" footer={null} title={t('modal.auditTitle')} visible={true} onCancel={() => { props.onCancel() }}>
            <div className="safe-zone">
                <div>Comment</div>
                <Input.TextArea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Leave your comment" className="texts" />
            </div>
            <div className="change-rate">
                <div>Change insurance rate</div>
                <InputNumber min={0} parser={value => value ? parseInt(value) : ''} onChange={(e)=>{setInsuranceRate(e)}}/> %
            </div>
            <div className="hint" dangerouslySetInnerHTML={{__html: t('modal.auditHint')}}>
            </div>
            <div className="handle-area">
                <Button loading={rejectLoading} className="btn-red" onClick={() => { doAudit(false) }}>{t('common.reject')}</Button>
                <Button loading={approveLoading} className="btn-green" onClick={() => { doAudit(true) }}>{t('common.pass')}</Button>
            </div>
        </Modal>
    )


}