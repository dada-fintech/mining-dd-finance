import React, { useEffect, useState } from 'react'
import { Row, Col, Input, message, Modal, Button, Tooltip } from 'antd'
import {
    LoadingOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'utils/axios'
import AuditModal from './modals/AuditModal'
import { useSelector } from 'react-redux'
import AskModal from './modals/AskModal'
import RepayModal from './modals/RepayModal'
import { useWallet } from 'use-wallet'
import InsuranceModal from './modals/InsuranceModal'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ProcessModule from './modules/Process'
import mm from 'components/mm'
import DetailModule from './modules/Detail'
import Countdown from 'components/Countdown'
import config from 'config'
// import { toBr } from 'components/utils'
// import Timer from 'react-compound-timer'

import './style.scss'

export default function Project() {
    const [currentTab, setCurrentTab] = useState('process')
    const [project, setProject] = useState({ fundraising: {}, project_info: {} })
    const [lockNum, setLockedNum] = useState('')
    // const [contract, setContract] = useState('')
    const [askModalVisible, setAskModalVisible] = useState(false)
    const [auditModalVisible, setAuditModalVisible] = useState(false)
    const [repayModalVisible, setRepayModalVisible] = useState(false)
    const [insuranceModalVisible, setInsuranceModalVisible] = useState(false)
    const [currentParams, setCurrentParams] = useState({})
    const [timing, setTiming] = useState(0)
    const [nextStatus, setNextStatus] = useState('')
    const [subscribeVisible, setSubscribeVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [myShare, setMyShare] = useState({})
    const network = useSelector(state => state.setting.network)

    // 下一个进程是否在4天内
    // const [nextInFour, setNextInFour] = useState(false)
    const [lockLoading, setLocklLoading] = useState(false)
    const [role, setRole] = useState('visitor')
    const wallet = useWallet()
    const { id } = useParams()
    const { t, i18n } = useTranslation()
    useEffect(async () => {
        getInfo()
        // committee： 委员会成员，审核项目
        // manager： 理事会，有权限去更改计划
        // invester： 普通投资者
        if (wallet.account) {
            getUserInvest()
            axios.post('/project/user-role', {
                project_uniq_id: id,
                user_addr: wallet.account
            }).then(res => {
                const role = res.data.role
                setRole(role)
            })
        }
    }, [wallet.account])

    useEffect(() => {
        // 这里计算倒计时时间
        const status = project.project_info.status
        const oneHour = 60 * 60 * 1000
        const oneDay = 24 * oneHour
        const dateNow = new Date().valueOf()
        let result = 0
        let nextStatusValue = ''
        if (status === 'Auditing') {
            result = project.project_info.create_time + oneHour - dateNow
            nextStatusValue = 'Future'
        }
        if (status === 'Raising') {
            result = project.fundraising.end_time - dateNow
            nextStatusValue = 'PayingInsurance'
        }
        if (status === 'PayingInsurance') {
            result = project.fundraising.end_time + oneDay * 3 - dateNow
            nextStatusValue = 'Active'
        }
        if (status === 'Rolling') {
            const item = project.process.filter(item => item.status === 'Active')[0]
            if (item && item.vote_end_time) {
                result = item.vote_end_time - dateNow
                nextStatusValue = 'AllPhasesDone'
            }
        }
        if (status === 'AllPhaseDone') {
            result = project.project_info.income_settlement_time - dateNow
            nextStatusValue = 'Repaying'
        }
        if (status === 'ReplanNoticing') {
            const item = project.process.filter(item => item.status === 'VoteNotice')[0]
            if (item && item.vote_end_time) {
                result = item.vote_end_time - oneDay * 3 - dateNow
                nextStatusValue = 'empty'
            }
        }
        if (status === 'ReplanVoting') {
            const item = project.process.filter(item => item.status === 'VoteReplaning')[0]
            if (item && item.vote_end_time) {
                result = item.vote_end_time - dateNow
                nextStatusValue = 'empty'
            }
        }

        if (result > 0) {
            setTiming(result)
            setNextStatus(nextStatusValue)
        }


    }, [project])

    const getUserInvest = () => {
        axios.post('/project/user-invest', {
            project_uniq_id: id,
            user_addr: wallet.account,
        }).then(res => {
            setMyShare(res.data)
        })
    }

    const getInfo = () => {
        axios.get('/project/detail/' + id).then(res => {
            setProject({
                ...res.data,
                percent: parseInt((res.data.fundraising.current_raised_money / res.data.fundraising.max_amount) * 100),
                fullDesc: `https://mining-api.dd.finance/project/download/${res.data.project_info.project_uniq_id}/${res.data.project_info.white_paper.file_name}`
            })
            //判断下一个进程是否在4天内
            // const allFutureProcess = res.data.process.filter(item => item.status === 'Future')
            // if (allFutureProcess.length > 0) {
            //     const firstItem = allFutureProcess[0]
            //     if (firstItem.vote_start_time - new Date().valueOf() < 4 * 24 * 60 * 60 * 1000) {
            //         setNextInFour(true)
            //     }
            // } else {
            //     // 借用一下这个标识位。如果没有Future，可以直接禁用调更改计划
            //     setNextInFour(true)
            // }
        })
    }

    const doLock = () => {
        if (!lockNum) {
            message.error(t('hint.lockAmount'))
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
                mm.sendTransaction(lockParams, `Lock ${config[network].usdUnit}`).then(res => {
                    setLocklLoading(false)
                    getInfo()
                    getUserInvest()
                })
            } else {
                message.info(t('hint.approve'))
                mm.sendTransaction(approveParams, `Approve spending ${config[network].usdUnit}`).then(res => {
                    if (res) {
                        mm.sendTransaction(lockParams, `Lock ${config[network].usdUnit}`).then(res => {
                            setLocklLoading(false)
                            getInfo()
                            getUserInvest()
                        })
                    } else {
                        setLocklLoading(false)
                        getInfo()
                        getUserInvest()
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

    const doAsk = () => {
        setCurrentParams({
            project_uniq_id: id
        })
        setAskModalVisible(true)
    }

    const doSubscribe = () => {
        if (!email) {
            message.error(t('hint.pleaseInputEmail'))
            return false
        }
        axios.post('/email/subscribe', {
            project_uniq_id: id,
            user_email: email
        }).then(res => {
            message.success(t('hint.subscribeSuccess'))
            setSubscribeVisible(false)
        })
    }

    const doInsurance = () => {
        setCurrentParams({
            project_uniq_id: id,
            user_addr: wallet.account,
        })
        setInsuranceModalVisible(true)
    }

    const isEn = i18n.language === 'en'

    const statusMapping = {
        'Auditing': isEn ? 'Auditing' : '委员会审核中',
        'Future': isEn ? 'Project Coming Soon' : '项目即将到来',
        'Raising': isEn ? 'In Mid of Fundraising' : '正在筹款',
        'PayingInsurance': isEn ? 'Depositing to the Reserve' : '支付押金',
        'Active': isEn ? 'Active' : '进行中',
        'Rolling': isEn ? 'Voting On-going' : '正在投票',
        'AllPhasesDone': isEn ? 'Governance completed. Waiting for the Redemption' : '项目计划完成，等待获取报酬',
        'Repaying': isEn ? 'Users are Receiving the Redemption' : '用户获取回报',
        'Finished': isEn ? 'Governance completed' : '项目已完成',
        'Refunding': isEn ? 'Refunding' : '退款中',
        'PhaseFailed': isEn ? 'Stage Goal Failed' : '进程失败',
        'ReplanNoticing': isEn ? 'Update to Change the Plan' : '更改计划公示',
        'ReplanVoting': isEn ? 'Voting on Changing the Plan' : '更改计划投票',
        'ReplanFailed': isEn ? 'Failed to Change the Plan' : '更改计划失败',
        'Liquidating': isEn ? 'Liquidating' : '清算中',
        'Failed': isEn ? 'Failed' : '项目失败',
        'PreDefined': isEn ? 'On-going' : '进行中',
        // front end defined
        'empty': isEn ? 'None' : '无'
    }

    return (<div className="project-page">

        <Header role={role} breadCrumb={[t('sidebar.cryptoMining'), project.project_info.project_name]} />
        <div className="brief-info">
            <div className="title">{project.project_info.project_name}</div>
            <div className="date">
                {new Date(project.project_info.income_settlement_time).toLocaleDateString()}
                <div className="hint">{t('createProject.redemptionDate')}</div>
            </div>
            <Button className="btn-green" onClick={() => { setEmail(''); setSubscribeVisible(true) }}>{t('sidebar.subscribe')}</Button>
        </div>
        <Row gutter={24}>
            <Col xs={24} md={12} lg={8} xl={4}>
                <Tooltip title={`${project.fundraising.expected_apy} %`}>
                    <div className="info-item">
                        <div className="value nowrap">{project.fundraising.expected_apy}%</div>
                        <div className="title">{t('common.apy')}</div>
                    </div>
                </Tooltip>
            </Col>
            <Col xs={24} md={12} lg={8} xl={4}>
                <Tooltip title={`${parseInt((project.project_info.income_settlement_time - project.fundraising.end_time) / 1000 / 60 / 60 / 24)} ${t('common.days')}`}>
                    <div className="info-item">
                        <div className="value nowrap">{parseInt((project.project_info.income_settlement_time - project.fundraising.end_time) / 1000 / 60 / 60 / 24)} {t('common.days')}</div>
                        <div className="title">{t('sidebar.cycle')}</div>
                    </div>
                </Tooltip>
            </Col>
            <Col xs={24} md={12} lg={8} xl={4}>
                <Tooltip title={t('common.redemption')}>
                    <div className="info-item">
                        <div className="value nowrap">{t('common.redemption')}</div>
                        <div className="title">{t('common.repaymentModel')}</div>
                    </div>
                </Tooltip>
            </Col>
            <Col xs={24} md={12} lg={8} xl={4}>
                <Tooltip title={`${project.fundraising.min_amount} ${config[network].usdUnit}`}>
                    <div className="info-item">
                        <div className="value nowrap">{project.fundraising.min_amount} {config[network].usdUnit}</div>
                        <div className="title">{t('common.softCap')}</div>
                    </div>
                </Tooltip>
            </Col>
            <Col xs={24} md={12} lg={8} xl={4}>
                <Tooltip title={`${project.fundraising.max_amount} ${config[network].usdUnit}`}>
                    <div className="info-item">
                        <div className="value nowrap">{project.fundraising.max_amount} {config[network].usdUnit}</div>
                        <div className="title">{t('common.fundSize')}</div>
                    </div>
                </Tooltip>
            </Col>
            <Col xs={24} md={12} lg={8} xl={4}>
                <Tooltip title={statusMapping[project.project_info.status]}>
                    <div className="info-item">
                        <div className="value nowrap">{statusMapping[project.project_info.status]}</div>
                        <div className="title">{t('project.status')}</div>
                    </div>
                </Tooltip>
            </Col>
        </Row>
        <div className="middle-area">
            <Row gutter={32}>
                <Col xs={24} xl={12}>
                    <div className="info-box">
                        <div className="stage-block">
                            {statusMapping[nextStatus] && <div>
                                <div className="title">
                                    {t('common.nextStage')}
                                </div>
                                <div>
                                    {statusMapping[nextStatus]}
                                </div>
                            </div>}

                            <div>
                                <div className="title">
                                    {t('common.currentStage')}
                                </div>
                                <div>
                                    {statusMapping[project.project_info.status]}
                                </div>
                            </div>
                        </div>

                        {timing > 0 && <Countdown timestamp={timing} done={() => { getInfo() }} />}
                        {/* 一开始审核评议 */}
                        {(project.project_info.status === 'Auditing' && role === 'committee') && <Row>
                            <div className="handle-area">
                                <div className="btn-action" onClick={() => { doAudit() }}><span>{t('project.action.committeeReviews')}</span></div>
                            </div>
                        </Row>}

                        {project.project_info.status === 'Active' && role === 'manager' && project.fundraising.money_left > 0 && (project.project_info.template_id == config[network].templateIds[0] || project.project_info.template_id == config[network].templateIds[2]) && <Row>
                            <div className="handle-area">
                                <div className="btn-action" onClick={() => { doAsk() }}><span>发起请款</span></div>
                            </div>
                        </Row>}

                        {project.project_info.status === 'PayingInsurance' && role === 'manager' && <Row>
                            <div className="handle-area">
                                <div className="btn-action" onClick={() => { doInsurance() }}><span>{t('project.action.security')}</span></div>
                            </div>
                        </Row>}

                        {project.project_info.status === 'AllPhasesDone' && role === 'manager' && (new Date().valueOf() < project.project_info.income_settlement_time) && <Row>
                            <div className="handle-area">
                                <div className="btn-action" onClick={() => { doTakeMoney() }}><span>{t('project.action.repay')}</span></div>
                            </div>
                        </Row>}

                        {/* manager 不需投资 */}
                        {project.project_info.status === 'Raising' && role !== 'manager' && <Row gutter={32}>
                            <div className="handle-area">
                                <Input style={{ width: '140px', height: '44px' }} addonAfter={
                                    <div className="btn-input-action" onClick={() => { !lockLoading && doLock() }}><span className="text">{t('project.action.invest')} {lockLoading && <LoadingOutlined />
                                    }</span></div>} value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix={config[network].usdUnit} />
                            </div>
                            <div className="votes-bar">
                                <div className="done" style={{ width: project.percent + '%' }}>{project.percent}%</div>
                            </div>
                            <div className="votes-info">
                                <div>
                                    {t('common.currentRaised')}:{project.fundraising.current_raised_money} {config[network].usdUnit}
                                </div>
                                <div>
                                    {t('common.fundSize')}:{project.fundraising.max_amount} {config[network].usdUnit}
                                </div>
                            </div>
                            {/* <div className="process-tag" style={{ marginLeft: (project.percent > 50 ? (project.percent - 5) : project.percent) + '%' }}>
                                        {project.percent}%</div> */}
                        </Row>}

                        {/* manager 可以变更计划. */}
                        {(project.project_info.status === 'Active' || project.project_info.status === 'PhaseFailed' || project.project_info.status === 'ReplanFailed') && role === 'manager' && !project.project_info.template_id && <Row>
                            <div className="handle-area">
                                <a href={`/create-vote/${id}`}>
                                    <div className="btn-action"><span>{t('project.action.change')}</span></div>
                                </a>
                            </div>
                        </Row>}
                    </div>
                </Col>
                <Col xs={24} xl={12}>
                    <Sidebar myShare={myShare} role={role} rereshInvestInfo={() => { getUserInvest() }} />
                </Col>
            </Row>

        </div>

        <ul className="tabs">
            <li className={currentTab === 'process' ? 'active' : ''} onClick={() => { setCurrentTab('process') }}>{t('project.progress')}</li>
            <li className={currentTab === 'detail' ? 'active' : ''} onClick={() => { setCurrentTab('detail') }}>{t('project.details')}</li>
        </ul>

        <div className="bottom-area">
            <div className="container">
                {currentTab === 'process' && <ProcessModule id={id} role={role} processList={project.process || []} isTemplate={project.project_info.template_id == config[network].templateIds[0] || project.project_info.template_id == config[network].templateIds[2]} />}
                {currentTab === 'detail' && <DetailModule projectId={id} otherFiles={project.project_info.other_file} fullDesc={project.fullDesc} projectInfo={project.project_info} />}
            </div>
        </div>

        { repayModalVisible && <RepayModal params={currentParams} onCancel={() => { setRepayModalVisible(false); getInfo(); }} />}
        { askModalVisible && <AskModal maxAmount={project.fundraising.money_left} params={currentParams} onCancel={() => { setAskModalVisible(false); getInfo(); }} />}
        { auditModalVisible && <AuditModal params={currentParams} onCancel={() => { setAuditModalVisible(false); getInfo(); }} />}
        { insuranceModalVisible && <InsuranceModal params={currentParams} onCancel={() => { setInsuranceModalVisible(false); getInfo(); }} />}
        {subscribeVisible && <Modal title={t('sidebar.subscribe')} visible={true} onOk={() => { doSubscribe() }} onCancel={() => { setSubscribeVisible(false); getInfo(); }}>
            <div style={{ marginBottom: '4px' }}>
                {t('sidebar.enterEmail')}
            </div>
            <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />

        </Modal>}
    </div>)
}