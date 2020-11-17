import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'

const sidebarList = [
    'Create a new pool', 'Project portfolio', 'Confirm Project Info'
]

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

    return (<div className="create-vote-page">
        <Header />

        <div className="container create-vote-main">
            <Row gutter={{ md: 32 }}>
                <Col xs={24} md={18}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0">
                            Create a new poll for your Project<br /><br />
                        Please fill out the following form carefully and ensure the accuracy of the information, the platform will be based on the data you fill in according to the rules to create the corresponding smart contract and update your project!
                        </div>}

                        {currentStep === 1 && <div className="step-1">
                            <div className="title">ASSETS RULE</div>
                            {assetsRuleList.map(item => <>
                                <div className="process-top">
                                    <div>Process #{item.id}</div>
                                </div>
                                <div className="confirm-box">
                                    <div className="status finish">
                                        FINISH
                                    </div>
                                    <div className="line">
                                        <div className="name">Unlock Value</div>
                                        <div className="value">{item.value}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">Unlock Time</div>
                                        <div className="value">{item.time}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">Vote Period</div>
                                        <div className="value">{item.period}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">Description</div>
                                        <div className="value">{item.desc}</div>
                                    </div>
                                </div>

                            </>)}
                            <div className="add-item-box">
                                <PlusCircleOutlined />
                            </div>
                            <div className="description-block">
                                <div className="process-top">
                                    <div>Edit Description</div>
                                </div>
                                <Input.TextArea autoSize={{ minRows: 5 }} />
                            </div>

                            <div className="form-item">
                                <div className="label">Upload The Supplementary file</div>
                                <Upload>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>Upload</Button>
                                </Upload>
                            </div>
                        </div>}

                        {currentStep === 2 && <div className="step-1">
                            <div className="title" style={{ marginTop: '56px' }}>ASSETS RULE</div>
                            {assetsRuleList.map(item => <>
                                <div className="process-top">
                                    <div>Process #{item.id}</div>
                                </div>
                                <div className="confirm-box">
                                    <div className="line">
                                        <div className="name">Unlock Value</div>
                                        <div className="value">{item.value}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">Unlock Time</div>
                                        <div className="value">{item.time}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">Vote Period</div>
                                        <div className="value">{item.period}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">Description</div>
                                        <div className="value">{item.desc}</div>
                                    </div>
                                </div>

                            </>)}
                            <div className="title" style={{ marginTop: '56px' }}>Other files</div>
                            <div className="confirm-box">
                                WHITEPAPER.DOCX<br />
                                LICENSE.JPG
                            </div>
                            <div className="description-block">
                                <div className="process-top">
                                    <div>Description</div>
                                </div>
                                <div className="">
                                    Since the project has entered the site and the project is progressing rapidly, 10% of the fund originally scheduled to be released on October 10 is about 100000 US dollars, and the deposit needs to be unlocked in advance. Therefore, the proposal is applied. After the proposal takes effect, the unlocking plan of October 10 will be cancelled and the follow-up plan will be advanced.
                                </div>
                            </div>

                        
                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <Button onClick={() => { setCurrentStep(prev => prev - 1) }} className="btn-grey">BACK</Button>}
                        </div>
                        {currentStep < 2 && <div>
                            <Button onClick={() => { setCurrentStep(prev => prev + 1) }} className="btn-green">NEXT</Button>
                        </div>}
                        {currentStep == 2 && <div>
                            <span className="hint">It will cost a certain amount of gas fee to create polling.</span>
                            <Button onClick={() => { message.success('Confirmed!') }} className="btn-green">CONFIRM INFO</Button>
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