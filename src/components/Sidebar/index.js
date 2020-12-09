import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import { Button, Input, Modal, message } from 'antd'
import axios from 'utils/axios'
import './style.scss'

export default function Sidebar(props) {
    const { projectId, role, otherFiles } = props
    const [myShare, setMyShare] = useState({})
    const [subscribeVisible, setSubscribeVisible] = useState(false)
    const [email, setEmail] = useState('')

    const [topInvestList, setTopInvestList] = useState([])
    const { t } = useTranslation()
    const wallet = useWallet()
    const statusMapping = {
        "Refunding": "可退款",
        "Repaying": "可赎回",
        "Liquiditing": "可清算",
    }
    useEffect(() => {
        //获取当前user的投资
        if (wallet.account) {
            axios.post('/project/user-invest', {
                project_uniq_id: projectId,
                user_addr: wallet.account,
            }).then(res => {
                setMyShare(res.data)
            })
        }

        //获取投资top用户
        axios.get(`/project/top-invest/${projectId}`).then(res => {
            setTopInvestList(res.data)
        })
    }, [wallet.account])

    const doAction = () => {
        const params = {
            from: wallet.account,
            to: myShare.profit_call_data.contract_addr,
            data: myShare.profit_call_data.call_data
        }
        mm.sendTransaction(params, statusMapping[myShare.status])
    }

    const doSubscribe = () => {
        if (!email) {
            message.error('请输入邮箱')
            return false
        }
        axios.post('/email/subscribe', {
            project_uniq_id: projectId,
            user_email: email
        }).then(res => {
            console.log(res)
            message.success('订阅成功!')
            setSubscribeVisible(false)
        })
    }

    return (<div className="sidebar">
        <div className="block">
            {/* user_balance > 0 的时候才显示我的份额 */}
            {role !== 'manager' && myShare && myShare.user_balance > 0 && <>
                <div className="title">我的份额</div>
                <div className="box supporter-box">
                    {myShare.actual_raised > 0 && <div className="box-item">
                        <div className="progress" style={{ width: (myShare.user_balance / myShare.actual_raised) * 100 + '%' }}></div>
                        <div className="texts">
                            <div>{((myShare.user_balance / myShare.actual_raised) * 100).toFixed(2)}% ({myShare.user_balance} USDT)</div>
                        </div>
                    </div>}
                    {myShare.actual_raised <= 0 && <div className="box-item">
                        <div className="progress" style={{ width: '0%' }}></div>
                        <div className="texts">
                            <div>0% ({myShare.user_balance} USDT)</div>
                        </div>
                    </div>}
                </div>
                {myShare.actual_raised > 0 && <div className="my-share-box">
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
                    {myShare.profit_status && <div className="line">
                        <div>收益状态</div>
                        <Button className="btn-green" onClick={() => { doAction() }}>
                            {statusMapping[myShare.profit_status]}
                        </Button>
                    </div>}
                </div>}
            </>}

            {myShare.actual_raised && topInvestList && <>
                <div className="title">所有份额</div>
                <div className="box supporter-box">
                    {topInvestList.map(item => (
                        <div className="box-item">
                            <div className="progress" style={{ width: (item.amount / myShare.actual_raised) * 100 + '%' }}></div>
                            <div className="texts">
                                <div>{((item.amount / myShare.actual_raised) * 100).toFixed(2)}% ({item.amount} USDT)</div>
                                <div>{item.user_addr.slice(0, 4)}...{item.user_addr.slice(-4)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </>}
        </div>
        {otherFiles && otherFiles.length > 0 && <div className="block">
            <div className="title">{t('sidebar.documents')}</div>
            <div className="box">
                {otherFiles.map(item => (
                    <div className="box-item-doc">
                        <a target="_blank" href={`https://mining-assets.dd.finance/${projectId}/${item.file_name}`}>
                            {item.file_name.slice(10)}
                        </a>
                    </div>
                ))}
            </div>
        </div>}

        <div>
            <Button className="btn-action" onClick={() => { setEmail(''); setSubscribeVisible(true) }}>订阅该项目获得最新动态</Button>
        </div>

        {subscribeVisible && <Modal title="订阅项目" visible={true} onOk={() => { doSubscribe() }} onCancel={() => { setSubscribeVisible(false) }}>
            <div style={{ marginBottom: '4px' }}>
                请输入邮箱
            </div>
            <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />

        </Modal>}

    </div>)
}