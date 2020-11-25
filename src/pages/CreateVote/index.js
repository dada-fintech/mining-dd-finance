import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
import axios from 'utils/axios'
import { useParams } from 'react-router-dom'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'

export default function CreateVote() {
    const [currentStep, setCurrentStep] = useState(0)
    const [processList, setProcessList] = useState([])
    const [projectInfo, setProjectInfo] = useState({})
    const [fundraising, setFundraising] = useState({})
    const { t, i18n } = useTranslation()
    const { id } = useParams()

    const sidebarList = i18n.language === 'en' ? [
        'Create the Voting', 'Project Info', 'Confirmation'
    ] : [
            '创建投票', '项目信息', '确认信息'
        ]

    useEffect(() => {
        axios.get('/project/detail/' + id).then(res => {
            console.log(res.data, 'bbbb')
            setProcessList(res.data.process)
            setProjectInfo(res.data.project_info)
            setFundraising(res.data.fundraising)
        })
    }, [])


    const confirmInfo = () => {
        axios.post('/project/change-process', processList)
    }

    return (<div className="create-vote-page">
        <Header />

        <div className="container create-vote-main">
            <Row gutter={{ md: 32 }}>
                <Col xs={24} md={18}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0" dangerouslySetInnerHTML={{ __html: t('createVote.hint') }}>
                        </div>}

                        {currentStep === 1 && <div className="step-1">
                            <div className="title">{t('createVote.projectInfo')}</div>
                            <div className="confirm-box">
                                <div className="line">
                                    <div className="name">
                                        项目名称
                                    </div>
                                    <div className="value">
                                        {projectInfo.project_name}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        筹款期
                                    </div>
                                    <div className="value">
                                        {new Date(fundraising.start_time).toLocaleDateString()} - {new Date(fundraising.end_time).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        项目币名称
                                    </div>
                                    <div className="value">
                                        {projectInfo.project_token_symbol}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        预期APY
                                    </div>
                                    <div className="value">
                                        {projectInfo.expected_apy}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        筹款目标
                                    </div>
                                    <div className="value">
                                        {fundraising.softtop}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        筹款限制
                                    </div>
                                    <div className="value">
                                        {fundraising.hardtop}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        回款日期
                                    </div>
                                    <div className="value">
                                        {new Date(projectInfo.income_settlement_time).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            {processList.map(item => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{item.id}</div>
                                </div>
                                <div className="confirm-box">
                                    <div className="status finish">
                                        FINISH
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.unlockingAmount')}</div>
                                        <div className="value">{item.value}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.unlockingTime')}</div>
                                        <div className="value">{item.time}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.desc}</div>
                                    </div>
                                </div>

                            </>)}
                            <div className="add-item-box">
                                <PlusCircleOutlined />
                            </div>
                            <div className="description-block">
                                <div className="process-top">
                                    <div>{t('createVote.editDescription')}</div>
                                </div>
                                <Input.TextArea autoSize={{ minRows: 5 }} />
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createVote.additionalDoc')}</div>
                                <Upload>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                </Upload>
                            </div>
                        </div>}

                        {currentStep === 2 && <div className="step-1">
                            <div className="title" style={{ marginTop: '56px' }}>{t('createVote.projectInfo')}</div>
                            {processList.map(item => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{item.id}</div>
                                </div>
                                <div className="confirm-box">
                                    <div className="line">
                                        <div className="name">{t('project.unlockingAmount')}</div>
                                        <div className="value">{item.value}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.unlockingTime')}</div>
                                        <div className="value">{item.time}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.desc}</div>
                                    </div>
                                </div>
                            </>)}
                            <div className="title" style={{ marginTop: '56px' }}>{t('createVote.additionalDoc')}</div>
                            <div className="confirm-box">
                                WHITEPAPER.DOCX<br />
                                LICENSE.JPG
                            </div>
                            <div className="description-block">
                                <div className="process-top">
                                    <div>{t('common.description')}</div>
                                </div>
                                <div>
                                    Since the project has entered the site and the project is progressing rapidly, 10% of the fund originally scheduled to be released on October 10 is about 100000 US dollars, and the deposit needs to be unlocked in advance. Therefore, the proposal is applied. After the proposal takes effect, the unlocking plan of October 10 will be cancelled and the follow-up plan will be advanced.
                                </div>
                            </div>


                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <Button onClick={() => { setCurrentStep(prev => prev - 1) }} className="btn-grey">{t('common.back')}</Button>}
                        </div>
                        {currentStep < 2 && <div>
                            <Button onClick={() => { setCurrentStep(prev => prev + 1) }} className="btn-green">{t('common.next')}</Button>
                        </div>}
                        {currentStep == 2 && <div>
                            <span className="hint">{t('common.gasFeeHint')}</span>
                            <Button onClick={() => { message.success('Confirmed!') }} className="btn-green">{t('common.confirmInfo')}</Button>
                        </div>}
                    </div>
                </Col>
                <Col xs={24} md={6}>
                    <ul className="step-sidebar">
                        {sidebarList.map((item, index) => <li>
                            <div className={'circle ' + (currentStep === index ? 'active ' : '') + (currentStep > index ? 'done' : '')}></div>
                            <span>{item}</span>
                        </li>)}
                    </ul>
                </Col>
            </Row>
        </div>
        <Footer />
    </div>)
}