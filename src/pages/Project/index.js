import React, { useEffect, useState } from 'react'
import { Row, Col, Input, message } from 'antd'
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
import Header from '../../components/Header'
import ProjectFooter from '../../components/ProjectFooter'
import Sidebar from '../../components/Sidebar'
import ProcessModule from './modules/Process'
import mm from 'components/mm'
import DetailModule from './modules/Detail'
import { toBr } from 'components/utils'
import Timer from 'react-compound-timer'

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
    const [timing, setTiming] = useState(0)
    const [timingHint, setTimingHint] = useState('')

    // 下一个进程是否在4天内
    // const [nextInFour, setNextInFour] = useState(false)
    const [lockLoading, setLocklLoading] = useState(false)
    const [role, setRole] = useState('invester')
    const wallet = useWallet()
    const { id } = useParams()
    const { t, i18n } = useTranslation()
    useEffect(async () => {
        getInfo()

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

    useEffect(() => {
        // 这里计算倒计时时间
        const status = project.project_info.status
        const oneHour = 60 * 60 * 1000
        const oneDay = 24 * oneHour
        const dateNow = new Date().valueOf()
        let result = 0
        let hint = ''
        console.log('status is', status)
        if (status === 'Auditing') {
            result = project.project_info.create_time + oneHour - dateNow
            hint = '距离审核结束仅剩'
        }
        if (status === 'Raising') {
            result = project.fundraising.end_time - dateNow
            hint = '距离筹款结束仅剩'
        }
        if (status === 'PayingInsurance') {
            result = project.fundraising.end_time + oneDay * 3 - dateNow
            hint = '距离保证金支付结束仅剩'
        }
        if (status === 'Rolling') {
            const item = project.process.filter(item => item.status === 'Active')[0]
            result = item.vote_end_time - dateNow
            hint = '距离此阶段结束仅剩'
        }
        if (status === 'AllPhaseDone') {
            result = project.project_info.income_settlement_time - dateNow
            hint = '距离获取报酬仅剩'
        }
        if (status === 'ReplanNoticing') {
            const item = project.process.filter(item => item.status === 'VoteNotice')[0]
            result = item.vote_end_time - oneDay * 3 - dateNow
            hint = '距离更改计划公式结束仅剩'
        }
        if (status === 'ReplanVoting') {
            const item = project.process.filter(item => item.status === 'VoteReplaning')[0]
            result = item.vote_end_time - dateNow
            hint = '距离更改计划投票结束仅剩'
        }

        if (result > 0) {
            setTiming(result)
            setTimingHint(hint)
        }


    }, [project])

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
                mm.sendTransaction(lockParams, 'Lock USDT').then(res => {
                    setLocklLoading(false)
                    getInfo()
                })
            } else {
                message.info(t('hint.approve'))
                console.log(approveParams, 'ppp')
                mm.sendTransaction(approveParams, 'Approve spending USDT').then(res => {
                    if (res) {
                        mm.sendTransaction(lockParams, 'Lock USDT').then(res => {
                            setLocklLoading(false)
                        })
                    } else {
                        setLocklLoading(false)
                        getInfo()
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

    const isEn = i18n.language === 'en'

    const statusMapping = {
        'Auditing': isEn ? 'Auditing' : '委员会审核中',
        'Future': isEn ? 'Project Coming Soon' : '项目即将到来',
        'Raising': isEn ? 'In Mid of Fundraising' : '正在筹款',
        'PayingInsurance': isEn ? 'Depositing to the Reserve' : '正在支付安全达',
        'Active': isEn ? 'Active' : '项目正在进行中',
        'Rolling': isEn ? 'Voting On-going' : '正在投票',
        'AllPhasesDone': isEn ? 'Project Completes. Waiting for the Redemption' : '项目计划完成，等待获取报酬',
        'Repaying': isEn ? 'Users are Receiving the Redemption' : '用户正在获取回报',
        'Finished': isEn ? 'Project Completed' : '项目已完成',
        'Refunding': isEn ? 'Refunding' : '退款中',
        'PhaseFailed': isEn ? 'Stage Goal Failed' : '进程失败',
        'ReplanNoticing': isEn ? 'Update to Change the Plan' : '更改计划公示',
        'ReplanVoting': isEn ? 'Voting on Changing the Plan' : '更改计划投票',
        'ReplanFailed': isEn ? 'Failed to Change the Plan' : '更改计划失败',
        'Liquidating': isEn ? 'Liquidating' : '清算中',
        'Failed': isEn ? 'Failed' : '项目失败',
        'PreDefined': isEn ? 'On-going' : '进行中',
    }

    return (<div className="project-page">
        <div className="top-area">
            <Header role={role} />
            <div className="container">
                <div className="project-intro">
                    <Row gutter={{ md: 24, xl: 44 }} type="flex" align="center">
                        <Col xs={24} md={17}>
                            <div className="top">
                                <div className="title with-line"><span>{project.project_info && project.project_info.project_name}</span></div>
                            </div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: project.project_info && toBr(project.project_info.project_profile) }}></div>
                            <Row gutter={24}>
                                <Col md={5}>
                                    <div className="info-item">
                                        <div className="title">项目收益</div>
                                        <div className="value">{project.fundraising.expected_apy}%</div>
                                    </div>
                                </Col>
                                <Col md={5}>
                                    <div className="info-item">
                                        <div className="title">项目周期</div>
                                        <div className="value">{parseInt((project.project_info.income_settlement_time - project.fundraising.end_time) / 1000 / 60 / 60 / 24)}天</div>
                                    </div>
                                </Col>
                                <Col md={5}>
                                    <div className="info-item">
                                        <div className="title">回款方式</div>
                                        <div className="value">到期还本付息</div>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <div className="info-item">
                                        <div className="title">已筹集额度/筹集额度</div>
                                        <div className="value">{project.fundraising.current_raised_money} USDT/{project.fundraising.max_amount} USDT</div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} md={7}>
                            <div className="info-box-title">
                                {statusMapping[project.project_info.status]}
                            </div>
                            <div className="info-box">
                                {timing > 0 && <div className="countdown">
                                    <div className="title">{timingHint}</div>
                                    <div className="timer">
                                        {<Timer initialTime={timing} direction="backward" checkpoints={[{ time: 0, callback: () => getInfo() }]}>
                                            <div>
                                                <div className="num">
                                                    <Timer.Days />
                                                </div>
                                                <div>天</div>
                                            </div>
                                            <div>:</div>
                                            <div>
                                                <div className="num">
                                                    <Timer.Hours />

                                                </div>
                                                <div>时</div>
                                            </div>
                                            <div>:</div>
                                            <div>
                                                <div className="num">
                                                    <Timer.Minutes />

                                                </div>
                                                <div>分</div>
                                            </div>
                                            <div>:</div>
                                            <div>
                                                <div className="num">
                                                    <Timer.Seconds />

                                                </div>
                                                <div>秒</div>
                                            </div>
                                        </Timer>}

                                    </div>

                                </div>}

                                {/* 一开始审核评议 */}
                                {project.project_info.status === 'Auditing' && role === 'committee' && <Row>
                                    <div className="handle-area">
                                        <div className="btn-action" onClick={() => { doAudit() }}><span>{t('project.action.committeeReviews')}</span></div>
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
                                            }</span></div>} value={lockNum} onChange={(event) => { setLockedNum(event.target.value) }} suffix="USDT" />
                                    </div>
                                    <div className="votes-bar">
                                        <div className="done" style={{ width: project.percent + '%' }}>{project.percent}%</div>
                                    </div>
                                    <div className="votes-info">
                                        <div>
                                            当前投资:{project.fundraising.current_raised_money} USDT
                                        </div>
                                        <div>
                                            募集总额:{project.fundraising.max_amount} USDT
                                        </div>
                                    </div>
                                    {/* <div className="process-tag" style={{ marginLeft: (project.percent > 50 ? (project.percent - 5) : project.percent) + '%' }}>
                                        {project.percent}%</div> */}
                                </Row>}

                                {/* manager 可以变更计划. */}
                                {(project.project_info.status === 'Active' || project.project_info.status === 'PhaseFailed' || project.project_info.status === 'ReplanFailed') && role === 'manager' && <Row>
                                    <div className="handle-area">
                                        <a href={`/create-vote/${id}`}>
                                            <div className="btn-action"><span>{t('project.action.change')}</span></div>
                                        </a>
                                    </div>
                                </Row>}
                            </div>



                            {/* <div className="date-range">{new Date(project.fundraising.start_time).toLocaleDateString()} - {new Date(project.fundraising.end_time).toLocaleDateString()}</div>
                            <div className="top-box">
                                <div className="item">{t('project.fundRaised')}：{project.fundraising.current_raised_money} USDT</div>
                                <div className="item">{t('project.hardCap')}：{project.fundraising.max_amount} USDT</div>
                                <div className="item">{t('project.status')}：{statusMapping[project.project_info.status]}</div>
                                <div className="item">{t('project.roles')}：{role === 'manager' ? t('project.role.manager') : (role === 'committee' ? t('project.role.committee') : (role === 'invester' ? t('project.role.supporter') : t('project.role.visitor')))}</div>
                            </div> */}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        <div className="middle-area">
            <div className="container">
                <ul className="tabs">
                    <li className={currentTab === 'process' ? 'active' : ''} onClick={() => { setCurrentTab('process') }}>{t('project.progress')}</li>
                    <li className={currentTab === 'detail' ? 'active' : ''} onClick={() => { setCurrentTab('detail') }}>{t('project.details')}</li>
                </ul>
                <div className="apy">{t('common.apy')} {project.fundraising.expected_apy}%</div>
            </div>
        </div>
        <div className="bottom-area">
            <div className="container">
                <Row gutter={{ lg: 24 }} align="center">
                    <Col xs={24} lg={14}>
                        {currentTab === 'process' && <ProcessModule id={id} role={role} processList={project.process || []} />}
                        {currentTab === 'detail' && <DetailModule fullDesc={project.fullDesc} projectInfo={project.project_info} />}
                        {/* {currentTab === 'comments' && <CommentsModule />} */}
                    </Col>
                    <Col xs={24} lg={6}>
                        <Sidebar projectId={id} role={role} otherFiles={project.project_info.other_file} />
                    </Col>
                </Row>
            </div>
        </div>

        <ProjectFooter />

        { repayModalVisible && <RepayModal params={currentParams} onCancel={() => { setRepayModalVisible(false) }} />}
        { auditModalVisible && <AuditModal params={currentParams} onCancel={() => { setAuditModalVisible(false) }} />}
        { insuranceModalVisible && <InsuranceModal params={currentParams} onCancel={() => { setInsuranceModalVisible(false) }} />}

    </div>)
}