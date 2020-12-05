import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mm from 'components/mm'
import { Button } from 'antd'
import axios from 'utils/axios'
import './style.scss'

const supporterList = [
    {
        address: '0x98...5643',
        amount: 393
    },
    {
        address: '0x98...5643',
        amount: 263
    },
    {
        address: '0x98...5643',
        amount: 212
    },
    {
        address: '0x98...5643',
        amount: 198
    },
    {
        address: '0x98...5643',
        amount: 65
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
]

let totalAmount = 0
supporterList.map(item => {
    totalAmount += item.amount
})

export default function Sidebar(props) {
    const { projectId, role } = props
    const [myShare, setMyShare] = useState({})
    const { t } = useTranslation()
    const statusMapping = {
        "Refunding": "可退款",
        "Repaying": "可赎回",
        "Liquiditing": "可清算",
    }
    useEffect(() => {
        axios.post('/project/user-invest', {
            project_uniq_id: projectId,
            user_addr: window.ethereum.selectedAddress,
        }).then(res => {
            setMyShare(res.data)
        })
    }, [])

    const doAction = () =>{
        const params= {
            from: window.ethereum.selectedAddress,
            to: myShare.profit_call_data.contract_addr,
            data: myShare.profit_call_data.call_data
        }
        mm.sendTransaction(params, statusMapping[myShare.status])
    }

    return (<div className="sidebar">
        <div className="block">
            {role !== 'manager' && <>
                <div className="title">我的份额</div>
                <div className="box supporter-box">
                    {myShare.actual_raised > 0 && <div className="box-item">
                        <div className="progress" style={{ width: (myShare.user_balance / myShare.actual_raised) * 100 + '%' }}></div>
                        <div className="texts">
                            <div>{((myShare.user_balance / myShare.actual_raised) * 100).toFixed(2)}% ({myShare.user_balance} USDT)</div>
                        </div>
                    </div>}
                </div>
                <div className="my-share-box">
                    <div className="line">
                        <div>投资份额</div>
                        <div>{myShare.user_balance} USDT</div>
                    </div>
                    <div className="line">
                        <div>收益份额</div>
                        <div>{myShare.user_profit} USDT</div>
                    </div>
                    <div className="line">
                        <div>开始赎回</div>
                        <div>{new Date(myShare.income_settlement_time).toLocaleDateString()}</div>
                    </div>
                    <div className="line">
                        <div>项目周期</div>
                        <div>{myShare.project_duration}个月</div>
                    </div>
                    {myShare.status && <div className="line">
                        <div>收益状态</div>
                        <Button className="btn-green" onClick={() => { doAction() }}>
                            {statusMapping[myShare.status]}
                        </Button>
                    </div>}
                </div>
            </>}

            <div className="title">所有份额</div>
            <div className="box supporter-box">
                {supporterList.map(item => (
                    <div className="box-item">
                        <div className="progress" style={{ width: (item.amount / totalAmount) * 100 + '%' }}></div>
                        <div className="texts">
                            <div>{((item.amount / totalAmount) * 100).toFixed(2)}% ({item.amount} USDT)</div>
                            <div>{item.address}</div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        <div className="block">
            <div className="title">{t('sidebar.documents')}</div>
            <div className="box">
                <div className="box-item-doc">
                    <div>
                        WhitePaper.docx
                    </div>
                    {/*<div className="status-pass">*/}
                    {/*    PASS*/}
                    {/*</div>*/}
                </div>
                <div className="box-item-doc">
                    <div>
                        LICENSE.JPG
                    </div>
                    {/*<div className="status-fail">*/}
                    {/*    FAIL*/}
                    {/*</div>*/}
                </div>
                <div className="box-item-doc">
                    <div>
                        PURCHASE CONTRACT.JPG
                    </div>
                </div>
            </div>
        </div>
        {/*<div className="block">*/}
        {/*    <div className="title">History</div>*/}
        {/*    <div className="box">*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                PIP-7*/}
        {/*            </div>*/}
        {/*            <div className="status-pass">*/}
        {/*                PASS*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                PIP-1*/}
        {/*            </div>*/}
        {/*            <div className="status-fail">*/}
        {/*                FAIL*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="block">*/}
        {/*    <div className="title">Stats</div>*/}
        {/*    <div className="box">*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                Total asset*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                1,000,000 USD*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                Total Vote*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                1,000,000 DUSD*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>)
}