import React, { useEffect, useState } from 'react'
import { Input, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import ConfirmVote from '../../modals/ConfirmVote'
import './style.scss'


// const tokenSelect = (
//     <Select defaultValue="USDT">
//         {/* <Select.Option value="BTC">BTC</Select.Option> */}
//         <Select.Option value="USDT">USDT</Select.Option>
//         {/* <Select.Option value="USDC">USDC</Select.Option>
//         <Select.Option value="ETC">ETC</Select.Option> */}
//     </Select>
// )

export default function Process(props) {
    const { processList } = props
    const [confirmVoteVisible, setConfirmVoteVisible] = useState(false)
    const [currentParams, setCurrentParams] = useState({})

    const { id } = props
    const { t } = useTranslation()
    let finalProcessList = processList.map(item => {
        return {
            ...item,
            totalVote: Number(item.affirmative_vote) + Number(item.dissenting_vote),
            yesPercent: (item.affirmative_vote / (Number(item.affirmative_vote) + Number(item.dissenting_vote))) * 100,
            noPercent: (item.dissenting_vote / (Number(item.affirmative_vote) + Number(item.dissenting_vote))) * 100,
        }
    })

    const sayYes = (phase_id) => {
        setCurrentParams({
            project_uniq_id: id,
            phase_id: phase_id,
            user_addr: window.ethereum.selectedAddress,
            vote: 'yes'
        })
        setConfirmVoteVisible(true)
    }

    const sayNo = (phase_id) => {
        setCurrentParams({
            project_uniq_id: id,
            phase_id: phase_id,
            user_addr: window.ethereum.selectedAddress,
            vote: 'no'
        })
        setConfirmVoteVisible(true)

    }


    return (<div className="process-module">
        {finalProcessList.map((process, index) => (
            <div className="process-item" key={index}>
                <div className="top">
                    <div className="title">{t('project.progress')} #{index + 1}</div>
                    <div>
                        <span className="date">{new Date(process.vote_start_time).toLocaleDateString()} - {new Date(process.vote_end_time).toLocaleDateString()}</span>
                        <span className={`status ${process.status}`}>{process.status}</span>
                    </div>
                </div>
                <div className="text-area">
                    <div>
                        释放额度: <strong>{process.unlock_percentage}%</strong>
                    </div>
                    <div>
                        {t('project.event')}: <strong>{process.description}</strong><br />
                    </div>
                </div>
                {process.status === 'Active' && <>
                    <div className="vs-bar">
                        <div className="yes" style={{ width: process.yesPercent + '%' }}></div>
                        <div className="no" style={{ width: process.noPercent + '%' }}></div>
                    </div>
                    <div className="vote-result">
                        <div>
                            {process.affirmative_vote} {t('project.approve')}
                        </div>
                        <div>
                            {process.dissenting_vote} {t('project.object')}
                        </div>
                    </div>
                    <div className="vote-action">
                        <Button onClick={()=>{sayYes(process.index)}}>同意</Button>
                        <Button onClick={()=>{sayNo(process.index)}}>反对</Button>
                    </div>
                </>}
            </div>
        ))}
        {/* <a href={`/create-vote/${id}`}>
            {finalProcessList.filter(item => item.status === 'Active').length != 0 && <Button className="btn-green">变更计划</Button>}
        </a> */}

        { confirmVoteVisible && <ConfirmVote params={currentParams} onCancel={() => { setConfirmVoteVisible(false) }} />}
    </div>)
}
