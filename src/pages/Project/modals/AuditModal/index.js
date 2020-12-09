import React, { useState } from 'react'
import { Modal, Input, Button, message } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
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

    const doAudit = (support) => {
        if (!comment) {
            message.error('请填写专业意见')
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
            support: support
        }).then(res => {
            const auditParams = {
                from: wallet.account,
                to: res.data.contract_addr,
                data: res.data.call_data
            }
            mm.sendTransaction(auditParams, '审计项目').then(res => {
                setApproveLoading(false)
                setRejectLoading(false)
                props.onCancel()
            })
        })
    }

    return (
        <Modal wrapClassName="audit-modal" footer={null} title="审计意见" visible={true} onCancel={() => { props.onCancel() }}>
            <div className="safe-zone">
                <Input.TextArea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="请留下您的专业意见" className="texts" />
            </div>
            <div className="hint">
                请您根据项目详情对项目进行评价，并做出判断<br />
            通过审核的项目将会得到安全达承保<br />
            未通过审核的项目将会撤销项目
            </div>
            <div className="handle-area">
                <Button loading={rejectLoading} className="btn-red" onClick={() => { doAudit(false) }}>拒绝</Button>
                <Button loading={approveLoading} className="btn-green" onClick={() => { doAudit(true) }}>通过</Button>
            </div>
        </Modal>
    )


}