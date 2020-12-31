import React, { useState } from 'react'
import { Modal, Input, Button, message } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
import axios from 'utils/axios'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import './style.scss'

export default function ConfirmVote(props) {
    const { params } = props
    const wallet = useWallet()
    const [loading, setLoading] = useState(false)
    const { t, i18n } = useTranslation()
    const [comment, setComment] = useState('')
    const doAction = () => {
        let target = ''
        if (params.isTemplate) {
            target = '/project/vote-proposal'
        } else {
            params.comment = comment
            if (params.status === 'Active') {
                if (params.vote === 'yes') {
                    target = '/project/vote-for-phase'
                } else {
                    target = '/project/vote-against-phase'
                }
            } else {
                if (params.vote === 'yes') {
                    target = '/project/vote-for-replan'
                } else {
                    target = '/project/vote-against-replan'
                }
            }
        }

        setLoading(true)
        axios.post(target, {
            ...params,
        }).then(res => {
            if (res.data.need_call || params.isTemplate) {
                let txnParams = {}
                if(res.data.need_call){
                    txnParams = {
                        from: wallet.account,
                        to: res.data.call_data.contract_addr,
                        data: res.data.call_data.call_data
                    }
                }else{
                    txnParams = {
                        from: wallet.account,
                        to: res.data.contract_addr,
                        data: res.data.call_data
                    }
                }
             
                mm.sendTransaction(txnParams, params.status === 'Active' ? t('modal.confirmVoting') : t('modal.confirmChangeVoting')).then(res => {
                    setLoading(false)
                    props.onCancel()
                })
            } else {
                message.success(t('hint.actionSuccess'))
                setLoading(false)
                props.onCancel()
            }
        })
    }

    return (
        <Modal wrapClassName="vote-confirm-modal" footer={null} title={(params.status === 'Active' || params.isTemplate) ? t('modal.confirmVoting') : t('modal.confirmChangeVoting')} visible={true} onCancel={() => { props.onCancel() }}>
            {/* <div className="hint">You are voting for the following proposal:</div>
            <div className="description">
                Vote #3 PIP-3 : Unlock 10% in advance for deposit
        </div>
            <div className="your-vote">
                Your Vote<br />
                <table>
                    <tr>
                        <td className="yes">YES</td>
                        <td>13,497 DUSD</td>
                    </tr>
                    <tr>
                        <td className="no">NO</td>
                        <td>0 DUSD</td>
                    </tr>
                </table>
            </div> */}
            <div className="safe-zone">
                {i18n.language === 'en' ? <div>
                    Are you sure to vote?
                </div> : <div>
                        确定要投{params.vote === 'yes' ? '同意' : '拒绝'}票吗？
                </div>}
                {!params.isTemplate && <Input.TextArea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Leave your comment" className="texts" />}
            </div>
            <Button loading={loading} className="btn-green" onClick={() => { doAction() }}>{t('common.confirm')}</Button>
        </Modal>
    )


}