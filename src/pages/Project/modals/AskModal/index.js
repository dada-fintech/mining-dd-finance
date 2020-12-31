import React, { useState } from 'react'
import { Modal, Input, Button, message, Row, Col, DatePicker, } from 'antd'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import axios from 'utils/axios'
import mm from 'components/mm'
import './style.scss'

export default function AuditModal(props) {
    const { project_uniq_id } = props.params
    const { maxAmount } = props
    const wallet = useWallet()
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState(false)
    const [start_time, setStartTime] = useState(0)
    const [end_time, setEndTime] = useState(0)
    const [amount, setAmount] = useState('')

    const { t } = useTranslation()

    const doAsk = () => {
        if (!description || !start_time || !end_time || !amount) {
            message.error('请填写所有必要信息')
            return false
        }
        axios.post('/project/create-proposal', {
            project_uniq_id,
            description,
            start_time,
            end_time,
            amount,
        }).then(res => {
            const params = {
                from: wallet.account,
                to: res.data.contract_addr,
                data: res.data.call_data
            }
            mm.sendTransaction(params, '请款').then(res => {
                setLoading(false)
                props.onCancel()
            })
        }).catch(error => {
            console.log(error)
            // message.error(error.response)
        })
    }

    return (
        <Modal wrapClassName="ask-modal" footer={null} width="60%" title="请款" visible={true} onCancel={() => { props.onCancel() }}>
            <div className="assets-rule-item">
                <Row gutter={24}>
                    <Col md={12}>
                        <div className="form-item">
                            <div className="label ">{t('project.unlockingAmount')} {maxAmount > 0 && <span>({t('common.maxValue')} {maxAmount}USDT)</span>} </div>
                            <Input suffix="USDT" value={amount} onChange={e => { e.target.value <= maxAmount && setAmount(e.target.value) }} />
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="form-item">
                            <div className="label ">{t('createProject.votingDate')} </div>
                            <DatePicker.RangePicker value={start_time && [moment(start_time), moment(end_time)]} onChange={value => { value && setStartTime(value[0].valueOf()); value && setEndTime(value[1].valueOf()) }} />
                        </div>
                    </Col>
                </Row>
                <div className="form-item">
                    <div className="label">{t('common.description')}</div>
                    <Input.TextArea value={description} onChange={e => setDescription(e.target.value)} autoSize={{ minRows: 6 }} />
                </div>
            </div>
            <div className="handle-area">
                <Button loading={loading} className="btn-green" onClick={() => { doAsk() }}>{t('common.confirm')}</Button>
            </div>
        </Modal>
    )


}