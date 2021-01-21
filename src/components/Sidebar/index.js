import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import config from 'config'
// import axios from 'utils/axios'
import './style.scss'

export default function Sidebar(props) {
    const { role, myShare, refreshInvestInfo } = props
    // const [myShare, setMyShare] = useState({})
    const [actionLoading, setActionLoading] = useState(false)
    const network = useSelector(state => state.setting.network)

    // const [topInvestList, setTopInvestList] = useState([])
    const { t } = useTranslation()
    const wallet = useWallet()
    const statusMapping = {
        "Refunding": "可退款",
        "Repaying": "可赎回",
        "Liquiditing": "可清算",
        "BonusCanClaim": "可领取",
    }
    // useEffect(() => {
    //     getInvestInfo()
    // }, [wallet.account])

    // const getInvestInfo = () => {
    //     //获取当前user的投资
    //     if (wallet.account) {
    //         axios.post('/project/user-invest', {
    //             project_uniq_id: projectId,
    //             user_addr: wallet.account,
    //         }).then(res => {
    //             setMyShare(res.data)
    //         })
    //     }

    //     //获取投资top用户
    //     // axios.get(`/project/top-invest/${projectId}`).then(res => {
    //     //     setTopInvestList(res.data)
    //     // })
    // }

    const doAction = () => {
        const params = {
            from: wallet.account,
            to: myShare.profit_call_data.contract_addr,
            data: myShare.profit_call_data.call_data
        }
        setActionLoading(true)
        mm.sendTransaction(params, statusMapping[myShare.status]).then(res => {
            setActionLoading(false)
            refreshInvestInfo()
        })
    }



    return (<div className="sidebar">
        <div className="block">
            {/* user_balance > 0 的时候才显示我的份额 */}
            {(true || (role !== 'manager' && myShare && myShare.user_balance > 0)) && <>
                {/* <div className="box supporter-box">
                    {myShare.actual_raised > 0 && <div className="box-item">
                        <div className="progress" style={{ width: (myShare.user_balance / myShare.actual_raised) * 100 + '%' }}></div>
                        <div className="texts">
                            <div>{((myShare.user_balance / myShare.actual_raised) * 100).toFixed(2)}% ({myShare.user_balance} {config[network].usdUnit})</div>
                        </div>
                    </div>}
                    {myShare.actual_raised <= 0 && <div className="box-item">
                        <div className="progress" style={{ width: '0%' }}></div>
                        <div className="texts">
                            <div>0% ({myShare.user_balance} {config[network].usdUnit})</div>
                        </div>
                    </div>}
                </div> */}
                {<div className="my-share-box">
                    <div className="line">
                        <div>{t('sidebar.myShare')}</div>
                        <div>{myShare.user_balance || 0} {config[network].usdUnit}</div>
                    </div>
                    {myShare.profit_status === 'BonusCanClaim' && <div className="line">
                        <div>{t('sidebar.bonus')}</div>
                        <div>{myShare.profit_dada || 0} DADA</div>
                    </div>}
                    {myShare.profit_status !== 'BonusCanClaim' && <div className="line">
                        <div>{t('sidebar.return')}</div>
                        <div>{myShare.profit_usdt || 0} {config[network].usdUnit}</div>
                    </div>}
                    {myShare.profit_status && <div className="line">
                        <div>{t('sidebar.gains')}</div>
                        <Button className="btn-green" loading={actionLoading} onClick={() => { doAction() }}>
                            {statusMapping[myShare.profit_status]}
                        </Button>
                    </div>}
                </div>}
            </>}

            {/* {myShare.actual_raised && topInvestList && topInvestList.length > 0 && <>
                <div className="title">{t('sidebar.allShare')}</div>
                <div className="box supporter-box">
                    {topInvestList.map((item, index) => (
                        <div className="box-item" key={index}>
                            <div className="progress" style={{ width: (item.amount / myShare.actual_raised) * 100 + '%' }}></div>
                            <div className="texts">
                                <div>{((item.amount / myShare.actual_raised) * 100).toFixed(2)}% ({item.amount} {config[network].usdUnit})</div>
                                <div>{item.user_addr.slice(0, 4)}...{item.user_addr.slice(-4)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </>} */}
        </div>

    </div>)
}