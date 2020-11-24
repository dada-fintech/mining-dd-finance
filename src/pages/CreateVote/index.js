import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'


const assetsRuleList = [
    {
        id: 1,
        value: '100, 000 USDT(10%)',
        time: 'Oct 05, 2020',
        period: 'Oct 01,2020 - Oct 05,2020',
        desc: '10% is scheduled to be released on Oct. 5 for approximately $100,000 to cover the deposit on the mine purchase.'
    },
    {
        id: 2,
        value: '100, 000 USDT(10%)',
        time: 'Oct 05, 2020',
        period: 'Oct 01,2020 - Oct 05,2020',
        desc: '10% is scheduled to be released on Oct. 5 for approximately $100,000 to cover the deposit on the mine purchase.'
    }
]


export default function CreateVote() {
    const [currentStep, setCurrentStep] = useState(0)
    const { t, i18n } = useTranslation()

    const sidebarList = i18n.language === 'en' ? [
        'Create the Voting', 'Project Info', 'Confirmation'
    ] : [
            '创建投票', '项目信息', '确认信息'
        ]

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
                            {assetsRuleList.map(item => <>
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
                            {assetsRuleList.map(item => <>
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