import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'



const confirmAssetsRuleList = [
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
    },
    {
        id: 3,
        value: '100, 000 USDT(10%)',
        time: 'Oct 05, 2020',
        period: 'Oct 01,2020 - Oct 05,2020',
        desc: '10% is scheduled to be released on Oct. 5 for approximately $100,000 to cover the deposit on the mine purchase.'
    },
    {
        id: 4,
        value: '100, 000 USDT(10%)',
        time: 'Oct 05, 2020',
        period: 'Oct 01,2020 - Oct 05,2020',
        desc: '10% is scheduled to be released on Oct. 5 for approximately $100,000 to cover the deposit on the mine purchase.'
    },
]


export default function CreateProject() {
    const [currentStep, setCurrentStep] = useState(0)
    const [councilMemberAddressList, setCouncilMemberAddressList] = useState([''])
    const { t, i18n } = useTranslation()

    const addCouncilMemberAddress = () => {
        message.info('Function under development')
    }

    const sidebarList = i18n.language === 'en' ? [
        'Create the project', 'Project Info', 'Add Addresses', 'Fundraising Info', 'Rules for Unlock', 'Upload Files', 'Confirmation'
    ] : [
            '创建项目', '项目信息', '添加地址', '筹款信息', '解锁规则', '上传文件', '确认信息'
        ]

    const assetsRuleList = [
        { id: 1 },
        { id: 2 }
    ]

    return (<div className="create-project-page">
        <Header />

        <div className="container create-project-main">
            <Row gutter={{ md: 32 }}>
                <Col xs={24} md={18}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0" dangerouslySetInnerHTML={{ __html: t('createProject.hint') }}>
                        </div>}
                        {currentStep === 1 && <div className="step-1">
                            <div className="form-item">
                                <div className="label">{t('createProject.projectName')}</div>
                                <Input style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectIntro')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.whitepaper')}</div>
                                <Upload>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                    <span style={{ marginLeft: '12px', color: '#707070' }}>*.pdf</span>
                                </Upload>
                            </div>
                        </div>}
                        {currentStep === 2 && <div className="step-2">
                            <div className="form-item">
                                <div className="label">{t('createProject.nameOfToken')}</div>
                                <Input style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.addWallet')}</div>
                                <Input style={{ width: '500px' }} />
                                <div className="hint red">{t('createProject.addWalletHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.boardMembers')}</div>
                                {councilMemberAddressList.map(item => <Input style={{ width: '500px' }} />)}
                                <PlusCircleOutlined onClick={addCouncilMemberAddress} className="handle-icon" />
                                <div className="hint">{t('createProject.boardMembersHint')}</div>
                            </div>
                        </div>}
                        {currentStep === 3 && <div className="step-3">

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingPeriod')}</div>
                                <DatePicker.RangePicker />
                                <div className="hint">{t('createProject.fundraisingPeriodHint')}</div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingGoal')}</div>
                                <Input style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    {t('createProject.fundraisingGoalHint')}
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingLimit')}</div>
                                <Input style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    {t('createProject.fundraisingLimitHint')}
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.redemptionDate')}</div>
                                <DatePicker />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('common.apy')}</div>
                                <Input style={{ width: '180px' }} suffix="%" />
                            </div>
                        </div>}
                        {currentStep === 4 && <div className="step-4">
                            <div className="assets-rule-title">{t('createProject.assetsRuleHint')}</div>
                            {assetsRuleList.map(item => <>
                                <div className="asset-id"># {item.id}</div>
                                <div className="assets-rule-item">
                                    <Row gutter={24}>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label">{t('createProject.unlockDate')}</div>
                                                <DatePicker />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label">{t('createProject.shares')}</div>
                                                <Input suffix="%" />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="form-item">
                                                <div className="label">{t('createProject.votingDate')}</div>
                                                <DatePicker.RangePicker />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="form-item">
                                        <div className="label">{t('common.description')}</div>
                                        <Input.TextArea autoSize={{ minRows: 6 }} />
                                    </div>
                                </div>

                            </>)}
                            <div className="add-item-box">
                                <PlusCircleOutlined />
                            </div>
                            {/* <div className="form-item">
                                <div className="hint">New project locked 8% of Total fund to add in insure pool.</div>
                            </div> */}
                        </div>}
                        {currentStep === 5 && <div className="step-5">
                            <div className="form-item">
                                <div className="label">{t('createProject.additionalDoc')}</div>
                                <Upload>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                </Upload>
                                <div className="hint" style={{ marginTop: '160px' }}>
                                    {t('createProject.additionalDocHint')}
                                </div>
                            </div>
                        </div>}
                        {currentStep === 6 && <div className="step-6">
                            <div className="title">{t('createProject.projectInfo')}</div>
                            <div className="confirm-box confirm-box-long">
                                <div className="line">
                                    <div className="name">{t('createProject.projectName')}</div>
                                    <div className="value">MINING FUND</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingPeriod')}</div>
                                    <div className="value">Oct 01,2020 - Oct 05,2020</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.tokenName')}</div>
                                    <div className="value">DADA-MF</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('common.apy')}</div>
                                    <div className="value">15%</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingGoal')}</div>
                                    <div className="value">800,000 USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingLimit')}</div>
                                    <div className="value">1,000,000 USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.redemptionDate')}</div>
                                    <div className="value">Oct 01,2021</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundAddress')}</div>
                                    <div className="value"><Tooltip title="0xaaAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">0xaa...aaa</Tooltip></div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.councilAddress')}</div>
                                    <div className="value"><Tooltip title="0xaaAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">0xaa...aaa</Tooltip><br />
                                        <Tooltip title="0xaaAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">0xaa...aaa</Tooltip></div>
                                </div>
                            </div>
                            {/* <div className="title" style={{ marginTop: '56px' }}>ASSETS RULE</div> */}
                            {confirmAssetsRuleList.map(item => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{item.id}</div>
                                    <div>{item.time}</div>
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
                            <div className="title" style={{ marginTop: '56px' }}>{t('createProject.additionalDoc')}</div>
                            <div className="confirm-box">
                                WHITEPAPER.DOCX<br />
                                LICENSE.JPG
                            </div>
                        </div>}
                        {currentStep === 7 && <div className="step-pay">
                            <div class="dada-circle">
                                10000 DADA
                            </div>
                            <div className="pay-hint">
                                {t('createProject.payHint')}
                            </div>
                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <Button onClick={() => { setCurrentStep(prev => prev - 1) }} className="btn-grey">{t('common.back')}</Button>}
                        </div>
                        {currentStep < 6 && <div>
                            <Button onClick={() => { setCurrentStep(prev => prev + 1) }} className="btn-green">{t('common.next')}</Button>
                        </div>}
                        {currentStep == 6 && <div>
                            <span className="hint">{t('common.gasFeeHint')}</span>
                            <Button onClick={() => { setCurrentStep(prev => prev + 1) }} className="btn-green">{t('common.confirmInfo')}</Button>
                        </div>}
                        {currentStep == 7 && <div>
                            <Button onClick={() => { message.success('Success') }} className="btn-green">{t('common.pay')}</Button>
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