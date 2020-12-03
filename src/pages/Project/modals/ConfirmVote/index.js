import React, {useState} from 'react'
import { Modal, Input, Button } from 'antd'
// import VoteStatus from '../../../../components/VoteStatus'
import axios from 'utils/axios'
import mm from 'components/mm'
import './style.scss'

export default function ConfirmVote(props) {
    const params = props.params
    const [comment, setComment] = useState('')
    const doYes = () => {
        axios.post('/project/vote-for-phase', {
            ...params,
            comment: comment,
        }).then(res => {

        })
    }
    const doNo = () =>{
        axios.post('/project/vote-against-phase', {
            ...params,
            comment: comment,
        }).then(res => {

        })
    }


    return (
        <Modal wrapClassName="vote-confirm-modal" footer={null} title="VOTE CONFIRM" visible={true} onCancel={() => { props.onCancel() }}>
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
                <Input.TextArea value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder="请输入评论" className="texts" />
            </div>
            <Button className="btn-green" onClick={() => { params.vote === 'yes' ? doYes() : doNo() }}>确定</Button>
        </Modal>
    )


}