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
    const { process } = props
    const [confirmVoteVisible, setConfirmVoteVisible] = useState(false)
    const [lockNum, setLockedNum] = useState('')
    const [contract, setContract] = useState('')

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
        {/* {processList.map(item => ( */}
        <div className="process-item">
            <div className="text-area">
                <strong>{process.title}</strong><br />
                <strong>项目募集金额</strong>:{process.amount}<br />
                <strong>年化收益率</strong>:{process.apy}<br />
                <strong>赎回日期</strong>:{process.date}
            </div>

            {/* <div className="top">
                    <div className="title">{item.title}</div>
                    <div>
                        <div className="date">{item.date} </div>
                        <div className={'status ' + item.status} >
                            {item.status}
                        </div>
                    </div>
                </div> */}
            {/* <div className="desc-title">
                    Description
                </div>
                <div className="description" dangerouslySetInnerHTML={{ __html: item.description }}></div> */}
            <div className="handle-area">
                <Input value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix="USDT" />
                <Button disabled={process.done} className="btn-green" onClick={() => { doLock() }}>投资</Button>
            </div>
            <div className="votes-bar">
                <div className="done" style={{ width: (process.voted / process.target) * 100 + '%' }}></div>
            </div>
            <div className="process-tag" style={{ marginLeft: ((process.voted / process.target) * 100 > 50 ? ((process.voted / process.target) * 100 - 7) : (process.voted / process.target) * 100) + '%' }}>
                {Number((process.voted / process.target) * 100).toFixed(2)}%
                </div>
        </div>
        {/* ))} */}

        {confirmVoteVisible && <ConfirmVote onCancel={() => { setConfirmVoteVisible(false) }} />}
    </div>)
}
