import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'

const sidebarList = [
    'Create a project', 'Project portfolio', 'Add Council Address', 'Fundrasing Info', 'Assets Rule', 'Upload other file', 'Confirm Project Info'
]

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

    const addCouncilMemberAddress = () => {
        message.info('Function under development')
    }

    const assetsRuleList = [
        { id: 1 },
        { id: 2 }
    ]

    return (<div className="create-project-page">
        <Header />

        <div className="container create-project-main">
            <Row gutter={{ md: 44, lg: 64 }}>
                <Col md={18}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0">
                            Create a new DAO for your Project<br /><br />
                        Please fill out the following form carefully and ensure the accuracy of the information, the platform will be based on the data you fill in according to the rules to create the corresponding smart contract and upload the data to the blockchain! <br /><br />
                        You needs to buy/raise 0.5% of the desired raising amount worth of DADA to submit the proposal to the governance council for approval/verification. You can click here to swap some DADA.
                        </div>}
                        {currentStep === 1 && <div className="step-1">
                            <div className="form-item">
                                <div className="label">Project Name</div>
                                <Input style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">Project Introduction</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" />
                            </div>
                            <div className="form-item">
                                <Upload>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>Upload</Button>
                                    <span style={{ marginLeft: '12px', color: '#707070' }}>*.pdf</span>
                                </Upload>
                            </div>
                        </div>}
                        {currentStep === 2 && <div className="step-2">
                            <div className="form-item">
                                <div className="label">Token Name</div>
                                <Input style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">Add Fund Holding Address</div>
                                <Input style={{ width: '500px' }} />
                                <div className="hint red">This address will be the only address for holding the fund</div>
                            </div>
                            <div className="form-item">
                                <div className="label">Add Council Member Address</div>
                                {councilMemberAddressList.map(item => <Input style={{ width: '500px' }} />)}
                                <PlusCircleOutlined onClick={addCouncilMemberAddress} className="handle-icon" />
                                <div className="hint">Create up to 3 Council member addresses that only have permission to create votes.</div>
                            </div>
                        </div>}
                        {currentStep === 3 && <div className="step-3">
                            <Row gutter={32}>
                                <Col md={12}>
                                    <div className="form-item">
                                        <div className="label">Fundrasing Period</div>
                                        <DatePicker.RangePicker />
                                        <div className="hint">Must to confirm the date of Fundrasing start and close.</div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-item">
                                        <div className="label">Redemption Date</div>
                                        <DatePicker />
                                    </div>
                                </Col>
                            </Row>
                            <div className="form-item">
                                <div className="label">Expected APY</div>
                                <Input style={{ width: '180px' }} suffix="%" />
                            </div>
                            <div className="form-item">
                                <div className="label">Fundrasing Goal</div>
                                <Input style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    This is the <strong>MIN limit fundrasing</strong> for the project.
                                </div>
                            </div>
                            <div className="form-item">
                                <div className="label">Fundrasing Hard Limit</div>
                                <Input style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    This is the <strong>Hardtop fundrasing</strong> for the project.
                                </div>
                            </div>
                        </div>}
                        {currentStep === 4 && <div className="step-4">
                            <div className="assets-rule-title">ASSETS RULE</div>
                            {assetsRuleList.map(item => <>
                                <div className="asset-id"># {item.id}</div>
                                <div className="assets-rule-item">
                                    <Row gutter={24}>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label">Unlock time</div>
                                                <DatePicker />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label">Amount</div>
                                                <Input suffix="%" />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="form-item">
                                                <div className="label">Vote Period</div>
                                                <DatePicker.RangePicker />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="form-item">
                                        <div className="label">Description</div>
                                        <Input.TextArea autoSize={{ minRows: 6 }} />
                                    </div>
                                </div>

                            </>)}
                            <div className="add-item-box">
                                <PlusCircleOutlined />
                            </div>
                            <div className="form-item">
                                <div className="hint">New project locked 8% of Total fund to add in insure pool.</div>
                            </div>
                        </div>}
                        {currentStep === 5 && <div className="step-5">
                            <div className="form-item">
                                <div className="label">Upload The Other file</div>
                                <Upload>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>Upload</Button>
                                </Upload>
                                <div className="hint" style={{ marginTop: '160px' }}>
                                    Please Upload the other file about the project. include whitepaper, photo, manager portfolio, or the other file about project information.
                                </div>
                            </div>
                        </div>}
                        {currentStep === 6 && <div className="step-6">
                            <div className="title">FUND INFORMATION</div>
                            <div className="confirm-box">
                                <div className="line">
                                    <div className="name">Fund Name</div>
                                    <div className="value">MINING FUND</div>
                                </div>
                                <div className="line">
                                    <div className="name">Token Name</div>
                                    <div className="value">DADA-MF</div>
                                </div>
                                <div className="line">
                                    <div className="name">Fundraising Period</div>
                                    <div className="value">Oct 01,2020 - Oct 05,2020</div>
                                </div>
                                <div className="line">
                                    <div className="name">Except APY</div>
                                    <div className="value">15%</div>
                                </div>
                                <div className="line">
                                    <div className="name">Fundraising Goal</div>
                                    <div className="value">800,000 USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">Fundraising HardTop</div>
                                    <div className="value">1,000,000 USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">Redemption Date</div>
                                    <div className="value">Oct 01,2021</div>
                                </div>
                                <div className="line">
                                    <div className="name">Fund Holding Address</div>
                                    <div className="value">0xaaAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                                </div>
                                <div className="line">
                                    <div className="name">Council Member Address</div>
                                    <div className="value">0xbbBBbbbbbbbbbbbbbbbbbbbbbbbbbbb<br />0xbbBBbbbbbbbbbbbbbbbbbbbbbbbbbbb</div>
                                </div>
                            </div>
                            <div className="title" style={{ marginTop: '56px' }}>ASSETS RULE</div>
                            {confirmAssetsRuleList.map(item => <>
                                <div className="process-top">
                                    <div>Process #{item.id}</div>
                                    <div>{item.time}</div>
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
                        </div>}
                        {currentStep === 7 && <div className="step-pay">
                            <div class="dada-circle">
                                10000 DADA
                            </div>
                            <div className="pay-hint">
                                You needs to buy/raise 0.5% of the desired raising amount worth of DADA to submit the proposal to the governance council for approval/verification.
                            </div>
                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <Button onClick={() => { setCurrentStep(prev => prev - 1) }} className="btn-grey">BACK</Button>}
                        </div>
                        {currentStep < 6 && <div>
                            <Button onClick={() => { setCurrentStep(prev => prev + 1) }} className="btn-green">NEXT</Button>
                        </div>}
                        {currentStep == 6 && <div>
                            <span className="hint">It will cost a certain amount of gas fee to create.</span>
                            <Button onClick={() => { setCurrentStep(prev => prev + 1) }} className="btn-green">CONFIRM INFO</Button>
                        </div>}
                        {currentStep == 7 && <div>
                            <Button onClick={() => { message.success('Success') }} className="btn-green">PAY</Button>
                        </div>}
                    </div>
                </Col>
                <Col md={6}>
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