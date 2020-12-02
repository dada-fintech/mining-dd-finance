import React, { useEffect, useState } from 'react'
import { Input, Select, Button } from 'antd'
import web3 from 'components/web3'
import BN from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import detectEthereumProvider from '@metamask/detect-provider'
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
    const [lockNum, setLockedNum] = useState('')
    const [contract, setContract] = useState('')
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

    useEffect(async () => {
        let ABI = [
            // transfer
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "type": "function"
            }
        ];

        let CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'

        const contractRaw = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

        setContract(contractRaw)


    }, [])

    const doLock = () => {
        const toAddress = '0xfc965F41F1BC0160db5920087C1BF9E578D07Bb4'
        const amount = String(new BN(lockNum).shiftedBy(6))
        contract.methods.transfer(toAddress, amount).send({
            from: window.ethereum.selectedAddress
        }).on('transactionHash', hash => {
            console.log(hash)
        })
    }

    return (<div className="process-module">
        {finalProcessList.map((process, index) => (
            <div className="process-item" key={index}>
                <div className="top">
                    <div className="title">{t('project.progress')} #{index + 1}</div>
                    <div className="date">{new Date(process.vote_start_time * 1000).toLocaleDateString()} - {new Date(process.vote_end_time * 1000).toLocaleDateString()}</div>
                </div>
                <div className="text-area">
                    <strong>{t('project.unlockingAmount')}</strong>: {process.unlock_value}USDT({process.unlock_percentage}%)<br />
                    <strong>{t('project.unlockingTime')}</strong>: {new Date(process.unlock_time * 1000).toLocaleDateString()}<br />
                    <strong>{t('project.event')}</strong>: {process.description}<br />
                    <strong>{t('project.voteResult')}</strong>: {process.affirmative_vote} {t('project.approve')} / {process.dissenting_vote} {t('project.object')}
                </div>
                <div className="vs-bar">
                    <div className="yes" style={{ width: process.yesPercent + '%' }}>{process.yesPercent >= 10 && (process.yesPercent + '%')} {t('project.approve')}</div>
                    <div className="no" style={{ width: process.noPercent + '%' }}>{process.noPercent >= 10 && (process.noPercent + '%')} {t('project.object')}</div>
                </div>
                <div className="handle-area">
                    <Input value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix="USDT" />
                    <Button disabled={process.done} className="btn-green" onClick={() => { doLock() }}>{t('common.invest')}</Button>
                </div>

            </div>
        ))}
        <a href={`/create-vote/${id}`}>
            {finalProcessList.filter(item => item.status === 'Active').length != 0 && <Button className="btn-green">变更计划</Button>}
        </a>

        { confirmVoteVisible && <ConfirmVote onCancel={() => { setConfirmVoteVisible(false) }} />}
    </div>)
}
