import React from 'react'
import { Modal, Input, Button } from 'antd'
import VoteStatus from '../../../../components/VoteStatus'
import './style.scss'

export default function ConfirmVote(props) {
    return (
        <Modal wrapClassName="vote-confirm-modal" title="VOTE CONFIRM" visible={true} onCancel={()=>{props.onCancel()}}>
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
                {/* <VoteStatus approve={12321} object={3313} /> */}
                <Input.TextArea placeholder="Say Something" className="texts"/>
            </div>
            <Button className="btn-green">Submit Vote</Button>
        </Modal>
    )


}