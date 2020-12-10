import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Button, message } from 'antd'
import {
    LoadingOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'utils/axios'
import AuditModal from './modals/AuditModal'
import RepayModal from './modals/RepayModal'
import { useWallet } from 'use-wallet'
import InsuranceModal from './modals/InsuranceModal'
// import web3 from 'components/web3'
// import BN from 'bignumber.js'
// import detectEthereumProvider from '@metamask/detect-provider'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import ProcessModule from './modules/Process'
import mm from 'components/mm'
import DetailModule from './modules/Detail'
import CommentsModule from './modules/Comments'

import './style.scss'

export default function Project() {
    const [currentTab, setCurrentTab] = useState('process')
    const [project, setProject] = useState({ fundraising: {}, project_info: {} })
    const [lockNum, setLockedNum] = useState('')
    // const [contract, setContract] = useState('')
    const [auditModalVisible, setAuditModalVisible] = useState(false)
    const [repayModalVisible, setRepayModalVisible] = useState(false)
    const [insuranceModalVisible, setInsuranceModalVisible] = useState(false)
    const [currentParams, setCurrentParams] = useState({})
    const [lockLoading, setLocklLoading] = useState(false)
    const [role, setRole] = useState('invester')
    const wallet = useWallet()
    const { id } = useParams()
    const { t } = useTranslation()
    useEffect(async () => {
        axios.get('/project/detail/' + id).then(res => {
            setProject({
                ...res.data,
                percent: parseInt((res.data.fundraising.current_raised_money / res.data.fundraising.max_amount) * 100),
                fullDesc: `https://mining-api.dd.finance/project/download/${res.data.project_info.project_uniq_id}/${res.data.project_info.white_paper.file_name}`
            }
            )
        })

        // committee： 委员会成员，审核项目
        // manager： 理事会，有权限去更改计划
        // invester： 普通投资者
        if (wallet.account) {
            axios.post('/project/user-role', {
                project_uniq_id: id,
                user_addr: wallet.account
            }).then(res => {
                const role = res.data.role
                setRole(role)
            })
        }

    }, [wallet.account])

    // useEffect(async () => {
    //     let ABI = [
    //         // transfer
    //         {
    //             "constant": false,
    //             "inputs": [
    //                 {
    //                     "name": "_to",
    //                     "type": "address"
    //                 },
    //                 {
    //                     "name": "_value",
    //                     "type": "uint256"
    //                 }
    //             ],
    //             "name": "transfer",
    //             "outputs": [
    //                 {
    //                     "name": "",
    //                     "type": "bool"
    //                 }
    //             ],
    //             "type": "function"
    //         }
    //     ];

    //     let CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'

    //     const contractRaw = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

    //     setContract(contractRaw)

    // }, [])

    const doLock = () => {
        if (!lockNum) {
            message.error('请输入锁定金额')
            return false
        }
        setLocklLoading(true)
        axios.post('project/invest', {
            project_uniq_id: id,
            user_addr: wallet.account,
            amount: lockNum
        }).then(res => {
            const callData = res.data.call_contract
            const approveParams = {
                from: wallet.account,
                to: callData[0].contract_addr,
                data: callData[0].call_data
            }

            const lockParams = {
                from: wallet.account,
                to: callData[1].contract_addr,
                data: callData[1].call_data
            }

            if (res.data.is_satisfied) {
                mm.sendTransaction(lockParams, '锁定USDT').then(res => {
                    setLocklLoading(false)
                })
            } else {
                message.error('请在锁定前先授权')
                mm.sendTransaction(approveParams, '授权消耗USDT').then(res => {
                    if (res) {
                        mm.sendTransaction(lockParams, '锁定USDT').then(res => {
                            setLocklLoading(false)
                        })
                    }
                })
            }
        })
    }

    const doTakeMoney = () => {
        setCurrentParams({
            project_uniq_id: id,
        })
        setRepayModalVisible(true)
    }

    const doAudit = () => {
        setCurrentParams({
            project_uniq_id: id,
            user_addr: wallet.account,
        })
        setAuditModalVisible(true)
    }

    const doInsurance = () => {
        setCurrentParams({
            project_uniq_id: id,
            user_addr: wallet.account,
        })
        setInsuranceModalVisible(true)
    }

    const statusMapping = {
        'Auditing': '委员会审核中',
        'Future': '项目即将到来',
        'Raising': '正在筹款',
        'PayingInsurance': '正在支付安全达',
        'Active': '项目正在进行中',
        'Rolling': '正在投票',
        'AllPhasesDone': '项目计划完成，等待获取报酬',
        'Repaying': '用户正在获取回报',
        'Finished': '项目已完成',
        'Refunding': '退款中',
        'PhaseFailed': '进程失败',
        'ReplanNoticing': '更改计划公示',
        'ReplanVoting': '更改计划投票',
        'ReplanFailed': '更改计划失败',
        'Liquidating': '清算中',
        'Failed': '项目失败',
        'PreDefined': '进行中',
    }

    return (<div className="project-page">
        <div className="top-area">
            <Header />
            <div className="container">
                <div className="project-intro">
                    <Row gutter={44} type="flex" align="center">
                        <Col md={13}>
                            <div className="top">
                                <div className="title with-line"><span>{project.project_info && project.project_info.project_name}</span></div>
                            </div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: project.project_info && project.project_info.project_description }}></div>

                            {/* 一开始审核评议 */}
                            {project.project_info.status === 'Auditing' && role === 'committee' && <Row>
                                <div className="handle-area">
                                    <div className="btn-action" onClick={() => { doAudit() }}><span>审核评议</span></div>
                                </div>
                            </Row>}

                            {project.project_info.status === 'PayingInsurance' && role === 'manager' && <Row>
                                <div className="handle-area">
                                    <div className="btn-action" onClick={() => { doInsurance() }}><span>支付保证金</span></div>
                                </div>
                            </Row>}

                            {project.project_info.status === 'AllPhasesDone' && role === 'manager' && (new Date().valueOf() < project.project_info.income_settlement_time) && <Row>
                                <div className="handle-area">
                                    <div className="btn-action" onClick={() => { doTakeMoney() }}><span>项目回款</span></div>
                                </div>
                            </Row>}

                            {/* manager 不需投资 */}
                            {project.project_info.status === 'Raising' && role !== 'manager' && <Row gutter={32}>
                                <Col md={12}>
                                    <div className="votes-bar">
                                        <div className="done" style={{ width: project.percent + '%' }}></div>
                                    </div>
                                    <div className="process-tag" style={{ marginLeft: (project.percent > 50 ? (project.percent - 5) : project.percent) + '%' }}>
                                        {project.percent}%</div>
                                </Col>
                                <Col md={12}>
                                    <div className="handle-area">
                                        <Input style={{ width: '140px', height: '44px' }} value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix="USDT" />
                                        <div className="btn-action" onClick={() => { !lockLoading && doLock() }}><span className="text">立即锁定 {lockLoading && <LoadingOutlined />}</span></div>
                                    </div>
                                </Col>
                            </Row>}

                            {/* manager 可以变更计划 */}
                            {(project.project_info.status === 'Active' || project.project_info.status === 'PhaseFailed' || project.project_info.status === 'ReplanFailed') && role === 'manager' && <Row>
                                <div className="handle-area">
                                    <a href={`/create-vote/${id}`}>
                                        <div className="btn-action"><span>发起变更投票</span></div>
                                    </a>
                                </div>
                            </Row>}


                        </Col>
                        <Col md={7}>
                            <div className="date-range">{new Date(project.fundraising.start_time).toLocaleDateString()} - {new Date(project.fundraising.end_time).toLocaleDateString()}</div>
                            <div className="top-box">
                                <div className="item">已完成：{project.fundraising.current_raised_money} USDT</div>
                                <div className="item">上限：{project.fundraising.max_amount} USDT</div>
                                <div className="item">状态：{statusMapping[project.project_info.status]}</div>
                                <div className="item">角色：{role === 'manager' ? '项目管理人' : (role === 'committee' ? '委员会成员' : '项目贡献者')}</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div className="middle-area">
            <div className="container">
                <ul className="tabs">
                    <li className={currentTab === 'process' && 'active'} onClick={() => { setCurrentTab('process') }}>{t('project.progress')}</li>
                    <li className={currentTab === 'detail' && 'active'} onClick={() => { setCurrentTab('detail') }}>{t('project.details')}</li>
                    {/* <li className={currentTab === 'vote' && 'active'} onClick={() => { setCurrentTab('vote') }}>{t('project.vote')}</li> */}
                    <li className={currentTab === 'comments' && 'active'} onClick={() => { setCurrentTab('comments') }}>{t('project.comments')}</li>
                </ul>
                <div className="apy">{t('common.apy')} {project.fundraising.expected_apy}%</div>
            </div>
        </div>
        <div className="container">

            <Row gutter={{ md: 24, lg: 24 }} align="center">
                <Col xs={24} md={12} lg={14}>
                    {/* <div className="project-content"> */}
                    {/* {currentTab === 'vote' && <VoteModule />} */}
                    {currentTab === 'process' && <ProcessModule id={id} processList={project.process || []} />}
                    {currentTab === 'detail' && <DetailModule fullDesc={project.fullDesc} projectInfo={project.project_info} />}
                    {currentTab === 'comments' && <CommentsModule />}
                    {/* </div> */}
                </Col>
                <Col xs={24} md={8} lg={6}>
                    <Sidebar projectId={id} role={role} otherFiles={project.project_info.other_file} />
                </Col>
            </Row>
        </div>
        <Footer />

        { repayModalVisible && <RepayModal params={currentParams} onCancel={() => { setRepayModalVisible(false) }} />}
        { auditModalVisible && <AuditModal params={currentParams} onCancel={() => { setAuditModalVisible(false) }} />}
        { insuranceModalVisible && <InsuranceModal params={currentParams} onCancel={() => { setInsuranceModalVisible(false) }} />}

    </div>)
}