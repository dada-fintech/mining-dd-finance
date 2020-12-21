import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import { Button, Input, Modal, message } from 'antd'
import axios from 'utils/axios'
import config from 'config'
import './style.scss'

export default function Sidebar(props) {
    const { projectId, role, otherFiles } = props
    const [myShare, setMyShare] = useState({})
    const [subscribeVisible, setSubscribeVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [actionLoading, setActionLoading] = useState(false)

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
        setActionLoading(true)
        mm.sendTransaction(params, statusMapping[myShare.status]).then(res => {
            setActionLoading(false)
        })
    }

    const doSubscribe = () => {
        if (!email) {
            message.error(t('hint.pleaseInputEmail'))
            return false
        }
        axios.post('/email/subscribe', {
            project_uniq_id: projectId,
            user_email: email
        }).then(res => {
            message.success(t('hint.subscribeSuccess'))
            setSubscribeVisible(false)
        })
    }

    return (<div className="sidebar">
        <div className="block">
            {/* user_balance > 0 的时候才显示我的份额 */}
            {role !== 'manager' && myShare && myShare.user_balance > 0 && <>
                <div className="title">{t('sidebar.myShare')}</div>
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
                        <div>{t('sidebar.investment')}</div>
                        <div>{myShare.user_balance} USDT</div>
                    </div>
                    <div className="line">
                        <div>{t('sidebar.return')}</div>
                        <div>{myShare.user_profit} USDT</div>
                    </div>
                    <div className="line">
                        <div>{t('sidebar.redeemable')}</div>
                        <div>{new Date(myShare.income_settlement_time).toLocaleDateString()}</div>
                    </div>
                    <div className="line">
                        <div>{t('sidebar.cycle')}</div>
                        <div>{myShare.project_duration} {t('sidebar.months')}</div>
                    </div>
                    {myShare.profit_status && <div className="line">
                        <div>{t('sidebar.gains')}</div>
                        <Button className="btn-green" loading={actionLoading} onClick={() => { doAction() }}>
                            {statusMapping[myShare.profit_status]}
                        </Button>
                    </div>}
                </div>}
            </>}

            {myShare.actual_raised && topInvestList && topInvestList.length > 0 && <>
                <div className="title">{t('sidebar.allShare')}</div>
                <div className="box supporter-box">
                    {topInvestList.map((item, index) => (
                        <div className="box-item" key={index}>
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
                {otherFiles.map((item, index) => (
                    <div className="box-item-doc" key={index}>
                        <a target="_blank" href={`${config.assetURL}/${projectId}/${item.file_name}`}>
                            {item.file_name.slice(10)}
                        </a>
                    </div>
                ))}
            </div>
        </div>}

        <div>
            <Button className="btn-action" onClick={() => { setEmail(''); setSubscribeVisible(true) }}>{t('sidebar.subscribe')}</Button>
        </div>

        {subscribeVisible && <Modal title={t('sidebar.subscribe')} visible={true} onOk={() => { doSubscribe() }} onCancel={() => { setSubscribeVisible(false) }}>
            <div style={{ marginBottom: '4px' }}>
                {t('sidebar.enterEmail')}
            </div>
            <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />

        </Modal>}

    </div>)
}