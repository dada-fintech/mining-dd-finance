import React, { useEffect, useState } from 'react'
import { Input, Select, Button } from 'antd'
import Web3 from 'web3'
import BN from 'bignumber.js'
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

    let finalProcessList = processList.map(item => {
        return {
            ...item,
            totalVote: Number(item.affirmative_vote) + Number(item.dissenting_vote),
            yesPercent: (item.affirmative_vote / (Number(item.affirmative_vote) + Number(item.dissenting_vote))) * 100,
            noPercent: (item.dissenting_vote / (Number(item.affirmative_vote) + Number(item.dissenting_vote))) * 100,
        }

    })

    useEffect(async () => {
        const provider = await detectEthereumProvider(
            'wss://mainnet.infura.io/ws/v3/89db527f19e14a00902a439ae587a25b',
        )

        const web3 = new Web3(provider)

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
            <div className="process-item">
                <div className="top">
                    <div className="title">进程#{index + 1}</div>
                    <div className="date">{new Date(process.vote_start_time * 1000).toLocaleDateString()} - {new Date(process.vote_end_time * 1000).toLocaleDateString()}</div>
                </div>
                <div className="text-area">
                    <strong>解锁数额</strong>:{process.unlock_value}USDT({process.unlock_percentage}%)<br />
                    <strong>解锁时间</strong>:{new Date(process.unlock_time * 1000).toLocaleDateString()}<br />
                    <strong>描述</strong>:{process.description}<br />
                    <strong>投票结果</strong>:{process.affirmative_vote}支持 / {process.dissenting_vote}反对
                </div>
                <div className="vs-bar">
                    <div className="yes" style={{ width: process.yesPercent + '%' }}>{process.yesPercent >= 10 && (process.yesPercent + '%')} Approve</div>
                    <div className="no" style={{ width: process.noPercent + '%' }}>{process.noPercent >= 10 && (process.noPercent + '%')} Object</div>
                </div>
                <div className="handle-area">
                    <Input value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix="USDT" />
                    <Button disabled={process.done} className="btn-green" onClick={() => { doLock() }}>投资</Button>
                </div>

            </div>
        ))}

        { confirmVoteVisible && <ConfirmVote onCancel={() => { setConfirmVoteVisible(false) }} />}
    </div>)
}
