import React, { useEffect, useState } from 'react'
import { Input, Select, Button } from 'antd'
import Web3 from 'web3'
import BN from 'bignumber.js'
import detectEthereumProvider from '@metamask/detect-provider'
import ConfirmVote from '../../modals/ConfirmVote'
import './style.scss'

const processList = [
    {
        title: 'Process #1',
        date: 'October 10, 2020 - October 25, 2020',
        status: 'planning',
        description: `Unlock Value: <strong>300,000USDT(30%)</strong><br/><br/>This step will unlock 30% of the fund to pay for the mining machinery purchase fund, and the purchase contract will be uploaded after the purchase plan is determined and the purchase details are finalized. The planned release date is October 25, 2020.<br/><br/>contact address: 0x654asd798FASDF4654sadf411sfasdfFDAds`,
        target: 100,
        voted: 70,
    },

]

const tokenSelect = (
    <Select defaultValue="USDT">
        {/* <Select.Option value="BTC">BTC</Select.Option> */}
        <Select.Option value="USDT">USDT</Select.Option>
        {/* <Select.Option value="USDC">USDC</Select.Option>
        <Select.Option value="ETC">ETC</Select.Option> */}
    </Select>
)

export default function Vote() {
    const [confirmVoteVisible, setConfirmVoteVisible] = useState(false)
    const [lockNum, setLockedNum] = useState('')
    const [contract, setContract] = useState('')

    useEffect(async() => {
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
        const amount = new BN(lockNum).shiftedBy(6)
        contract.methods.transfer(toAddress, amount).send({
            from: window.ethereum.selectedAddress
        }).on('transactionHash', hash => {
            console.log(hash)
        })
    }

    return (<div className="process-module">
        {processList.map(item => (
            <div className="process-item">
                <div className="top">
                    <div className="title">{item.title}</div>
                    <div>
                        <div className="date">{item.date} </div>
                        <div className={'status ' + item.status} >
                            {item.status}
                        </div>
                    </div>
                </div>
                <div className="desc-title">
                    Description
                </div>
                <div className="description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                <div className="handle-area">
                    <Input value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix="USDT" />
                    <Button className="btn-green" onClick={() => { doLock() }}>Lock</Button>
                </div>
                <div className="votes-bar">
                    <div className="done" style={{ width: (item.voted / item.target) * 100 + '%' }}></div>
                </div>
                <div className="process-tag" style={{ marginLeft: (item.voted / item.target) * 100 - 5 + '%' }}>
                    {Number((item.voted / item.target) * 100).toFixed(2)}%
                </div>
            </div>
        ))}

        {confirmVoteVisible && <ConfirmVote onCancel={() => { setConfirmVoteVisible(false) }} />}
    </div>)
}
