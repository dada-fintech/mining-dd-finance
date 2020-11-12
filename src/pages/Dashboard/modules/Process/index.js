import React from 'react'
import { Input, Select, Button } from 'antd'
import './style.scss'

const processList = [
    {
        title: 'Process #1',
        date: 'October 10, 2020 - October 25, 2020',
        status: 'planning',
        description: `This step will unlock 30% of the fund to pay for the mining machinery purchase fund, and the purchase contract will be uploaded after the purchase plan is determined and the purchase details are finalized. The planned release date is October 25, 2020.<br/><br/>contact address: 0x654asd798FASDF4654sadf411sfasdfFDAds`,
        target: 100,
        voted: 70,
    },

]

const tokenSelect = (
    <Select defaultValue="BTC">
        <Select.Option value="BTC">BTC</Select.Option>
        <Select.Option value="USDT">USDT</Select.Option>
        <Select.Option value="USDC">USDC</Select.Option>
        <Select.Option value="ETC">ETC</Select.Option>
    </Select>
)

export default function Vote() {

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
                    <Input addonAfter={tokenSelect} />
                    <Button className="btn-green">Approve</Button>
                </div>
                <div className="votes-bar">
                    <div className="done" style={{ width: (item.voted / item.target) * 100 + '%' }}></div>
                </div>
                <div className="process-tag" style={{ marginLeft: (item.voted / item.target) * 100 - 5 + '%'}}>
                        {Number((item.voted / item.target) * 100).toFixed(2)}%
                </div>
            </div>
        ))}
    </div>)
}
