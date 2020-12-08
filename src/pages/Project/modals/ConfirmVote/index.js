import React, { useState } from 'react'
import { Modal, Input, Button, message } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
import axios from 'utils/axios'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import './style.scss'

export default function ConfirmVote(props) {
    const params = props.params
    const wallet = useWallet()

    const [comment, setComment] = useState('')
    const doAction = () => {
        let target = ''
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

        axios.post(target, {
            ...params,
            comment: comment,
        }).then(res => {
            console.log(res.data, 'bb')
            if (res.data.need_call) {
                const txnParams = {
                    from: wallet.account,
                    to: res.data.call_data.contract_addr,
                    data: res.data.call_data.call_data
                }
                mm.sendTransaction(txnParams, params.status === 'Active' ? '确认投票' : '确认变更投票')
            } else {
                message.success('操作成功')
            }
        })
    }

    return (
        <Modal wrapClassName="vote-confirm-modal" footer={null} title={params.status === 'Active' ? '确认投票' : '确认变更投票'} visible={true} onCancel={() => { props.onCancel() }}>
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
                确定要投{params.vote === 'yes' ? '同意' : '拒绝'}票吗？
                {/* <VoteStatus approve={12321} object={3313} /> */}
                <Input.TextArea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="请输入评论" className="texts" />
            </div>
            <Button className="btn-green" onClick={() => { doAction() }}>确定</Button>
        </Modal>
    )


}