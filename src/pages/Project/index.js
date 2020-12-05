import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Button, message } from 'antd'

import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'utils/axios'
import AuditModal from './modals/AuditModal'
import web3 from 'components/web3'
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
    const [contract, setContract] = useState('')
    const [auditModalVisible, setAuditModalVisible] = useState(false)
    const [currentParams, setCurrentParams] = useState({})
    const [role, setRole] = useState('invester')
    const { id } = useParams()
    const { t } = useTranslation()
    useEffect(() => {
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

        axios.post('/project/user-role', {
            project_uniq_id: id,
            user_addr: window.ethereum.selectedAddress
        }).then(res => {
            const role = res.data.role
            setRole(role)
        })
    }, [])

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
        axios.post('project/invest', {
            project_uniq_id: id,
            user_addr: window.ethereum.selectedAddress,
            amount: lockNum
        }).then(res => {
            const callData = res.data.call_contract
            const approveParams = {
                from: window.ethereum.selectedAddress,
                to: callData[0].contract_addr,
                data: callData[0].call_data
            }

            const lockParams = {
                from: window.ethereum.selectedAddress,
                to: callData[1].contract_addr,
                data: callData[1].call_data
            }

            if (res.data.is_satisfied) {
                mm.sendTransaction(lockParams, '锁定balance')
            } else {
                message.info('请在锁定前先授权')
                mm.sendTransaction(lockParams, '授权锁定balance', lockParams)
            }
        })
    }


    const doAudit = () => {
        setCurrentParams({
            project_uniq_id: id,
            user_addr: window.ethereum.selectedAddress,
        })
        setAuditModalVisible(true)
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
                    <Row gutter={44} type="flex" align="middle">
                        <Col md={16}>
                            <div className="top">
                                <div className="title with-line"><span>{project.project_info && project.project_info.project_name}</span></div>
                            </div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: project.project_info && project.project_info.project_description }}></div>

                            {/* 一开始审核评议 */}
                            {project.status === 'Auditing' && role === 'committe' && <Row>
                                <div className="handle-area">
                                    <Button className="btn-action" onClick={() => { doAudit() }}>审核评议</Button>
                                </div>
                            </Row>}

                            {/* manager 不需投资 */}
                            {project.status === 'Raising' && role !== 'manager' && <Row>
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
                                        <Button className="btn-action" onClick={() => { doLock() }}>立即锁定</Button>
                                    </div>
                                </Col>
                            </Row>}

                            {/* manager 可以变更计划 */}
                            {(project.status === 'Active' || project.status === 'PhaseFailed' || project.status === 'ReplanFailed') && role === 'manager' && <Row>
                                <div className="handle-area">
                                    <a href={`/create-vote/${id}`}>
                                        <Button className="btn-action">发起变更投票</Button>
                                    </a>
                                </div>
                            </Row>}


                        </Col>
                        <Col md={8}>
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

            <Row gutter={{ md: 24, lg: 24 }}>
                <Col xs={24} md={16} lg={18}>
                    {/* <div className="project-content"> */}
                    {/* {currentTab === 'vote' && <VoteModule />} */}
                    {currentTab === 'process' && <ProcessModule id={id} processList={project.process || []} />}
                    {currentTab === 'detail' && <DetailModule fullDesc={project.fullDesc} />}
                    {currentTab === 'comments' && <CommentsModule />}
                    {/* </div> */}
                </Col>
                <Col xs={24} md={8} lg={6}>
                    <Sidebar projectId={id} role={role}/>
                </Col>
            </Row>

        </div>
        <Footer />

        { auditModalVisible && <AuditModal params={currentParams} onCancel={() => { setAuditModalVisible(false) }} />}

    </div>)
}