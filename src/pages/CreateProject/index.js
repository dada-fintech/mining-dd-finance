import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, Tooltip, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import moment from 'moment'
// import Footer from '../../components/Footer'
import axios from 'utils/axios'

import './style.scss'

export default function CreateProject() {
    const [currentStep, setCurrentStep] = useState(0)
    const [projectInfo, setProjectInfo] = useState({ member_address: [''] })
    const [fundraising, setFundraising] = useState({})
    const [processList, setProcessList] = useState([{}])

    const { t, i18n } = useTranslation()

    const sidebarList = i18n.language === 'en' ? [
        'Create the project', 'Project Info', 'Add Addresses', 'Fundraising Info', 'Rules for Unlock', 'Upload Files', 'Confirmation'
    ] : [
            '创建项目', '项目信息', '添加地址', '筹款信息', '解锁规则', '上传文件', '确认信息'
        ]

    const changeProjectInfo = (name, value) => {
        setProjectInfo(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const changeFundraising = (name, value) => {
        setFundraising(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }


    const changeProcess = (number, name, value) => {
        setProcessList(prev => {
            let newObj = prev
            newObj[number][name] = value
            return newObj
        })
    }



    const dateRangeChange = (type, value) => {
        if (type === 'fundraising') {
            setFundraising(prev => {
                return {
                    ...prev,
                    start_time: value[0].valueOf(),
                    end_time: value[1].valueOf()
                }
            })
        }
    }

    const addProcessList = () => {
        console.log('add it')
        setProcessList(prev => {
            return [
                ...prev,
                {}
            ]
        })
    }

    const addCouncilMember = () => {
        if (projectInfo.member_address.length >= 3) {
            message.error('最多3个理事会成员地址')
            return false
        }
        setProjectInfo(prev => {
            let newObj = prev
            newObj.member_address.push('')
            return {
                ...newObj,
            }
        })
    }

    const changeMemberAddress = (number, value) => {
        console.log(number, value)
        setProjectInfo(prev => {
            let newObj = prev
            newObj.member_address[number] = value;

            return {
                ...newObj
            }
        })
    }

    const whitePaperUpload = {
        name: 'file',
        action: 'https://mining-api.dd.finance/project/upload',
        onChange(info) {
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                changeProjectInfo('white_paper', { file_name: info.file.name })
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const otherUpload = {
        name: 'file',
        action: 'https://mining-api.dd.finance/project/upload',
        onChange(info) {
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                changeProjectInfo('other_file', [{ file_name: info.file.name }])
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const confirmInfo = () => {
        let finalInfo = {
            project_info: projectInfo,
            fundraising: fundraising,
            process: processList,
        }
        // finalInfo.project_info.expected_apy = Number(finalInfo.project_info.expected_apy)
        axios.post('/project/create-project', finalInfo).then(res => {
            message.success('保存成功');
            setCurrentStep(prev => prev + 1)
        })
    }


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
                                <Input value={projectInfo.project_name} onChange={(e) => { changeProjectInfo('project_name', e.target.value) }} style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectIntro')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" value={projectInfo.description} onChange={(e) => { changeProjectInfo('description', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.whitepaper')}</div>
                                <Upload {...whitePaperUpload}>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                    <span style={{ marginLeft: '12px', color: '#707070' }}>*.pdf</span>
                                </Upload>
                            </div>
                        </div>}
                        {currentStep === 2 && <div className="step-2">
                            <div className="form-item">
                                <div className="label">{t('createProject.nameOfToken')}</div>
                                <Input style={{ width: '360px' }} value={projectInfo.project_token_symbol} onChange={(e) => { changeProjectInfo('project_token_symbol', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.addWallet')}</div>
                                <Input style={{ width: '500px' }} value={projectInfo.receiver} onChange={(e) => { changeProjectInfo('receiver', e.target.value) }} />
                                <div className="hint red">{t('createProject.addWalletHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.boardMembers')}</div>
                                {projectInfo.member_address.map((item, index) => <Input value={item} onChange={(e) => { changeMemberAddress(index, e.target.value) }} style={{ width: '500px', marginBottom: '12px' }} />)}
                                <PlusCircleOutlined onClick={() => { addCouncilMember() }} className="handle-icon" />
                                <div className="hint">{t('createProject.boardMembersHint')}</div>
                            </div>
                        </div>}
                        {currentStep === 3 && <div className="step-3">

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingPeriod')}</div>
                                <DatePicker.RangePicker value={fundraising.start_time && [moment(fundraising.start_time), moment(fundraising.end_time)]} onChange={value => dateRangeChange('fundraising', value)} />
                                <div className="hint">{t('createProject.fundraisingPeriodHint')}</div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingGoal')}</div>
                                <Input value={fundraising.softtop} onChange={e => changeFundraising('softtop', e.target.value)} style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    {t('createProject.fundraisingGoalHint')}
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingLimit')}</div>
                                <Input value={fundraising.hardtop} onChange={e => changeFundraising('hardtop', e.target.value)} style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    {t('createProject.fundraisingLimitHint')}
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.redemptionDate')}</div>
                                <DatePicker value={projectInfo.income_settlement_time && moment(projectInfo.income_settlement_time)} onChange={value => { console.log(value.valueOf()); changeProjectInfo('income_settlement_time', value.valueOf()) }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('common.apy')}</div>
                                <InputNumber formatter={value => `${value ? value : 0}%`} parser={value => parseInt(value)} value={projectInfo.expected_apy} onChange={e => changeProjectInfo('expected_apy', e)} style={{ width: '180px' }} />
                            </div>
                        </div>}
                        {currentStep === 4 && <div className="step-4">
                            <div className="assets-rule-title">{t('createProject.assetsRuleHint')}</div>
                            {processList.map((item, index) => <>
                                <div className="asset-id"># {index + 1}</div>
                                <div className="assets-rule-item">
                                    <Row gutter={24}>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label">{t('createProject.unlockDate')}</div>
                                                <DatePicker value={item.unlock_time && moment(item.unlock_time)} onChange={value => changeProcess(index, 'unlock_time', value.valueOf())} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label">{t('createProject.shares')}</div>
                                                <InputNumber formatter={value => `${value ? value : 0}%`} parser={value => parseInt(value)} value={item.unlock_percentage} onChange={e => changeProcess(index, 'unlock_percentage', e)} style={{ width: '180px' }} />
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="form-item">
                                                <div className="label">{t('createProject.votingDate')}</div>
                                                <DatePicker.RangePicker value={item.vote_start_time && [moment(item.vote_start_time), moment(item.end_time)]} onChange={value => { changeProcess(index, 'vote_start_time', value[0].valueOf()); changeProcess(index, 'end_time', value[1].valueOf()) }} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="form-item">
                                        <div className="label">{t('common.description')}</div>
                                        <Input.TextArea value={item.description} onChange={e => changeProcess(index, 'description', e.target.value)} autoSize={{ minRows: 6 }} />
                                    </div>
                                </div>

                            </>)}
                            <div className="add-item-box" onClick={() => { addProcessList() }}>
                                <PlusCircleOutlined />
                            </div>
                        </div>}
                        {currentStep === 5 && <div className="step-5">
                            <div className="form-item">
                                <div className="label">{t('createProject.additionalDoc')}</div>
                                <Upload {...otherUpload}>
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
                                    <div className="value">{projectInfo.project_name}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingPeriod')}</div>
                                    <div className="value">{fundraising.start_time} {fundraising.end_time}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.tokenName')}</div>
                                    <div className="value">{projectInfo.project_token_symbol}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('common.apy')}</div>
                                    <div className="value">{projectInfo.expected_apy}%</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingGoal')}</div>
                                    <div className="value">{fundraising.softtop} USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingLimit')}</div>
                                    <div className="value">{fundraising.hardtop} USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.redemptionDate')}</div>
                                    <div className="value">{projectInfo.income_settlement_time}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundAddress')}</div>
                                    <div className="value"><Tooltip title={projectInfo.receiver}>{projectInfo.receiver}</Tooltip></div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.councilAddress')}</div>

                                    <div className="value">
                                        {projectInfo.member_address.map(item => (
                                            <>
                                                <Tooltip title={item}>{item}</Tooltip><br />
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="title" style={{ marginTop: '56px' }}>ASSETS RULE</div> */}
                            {processList.map((item, index) => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{index + 1}</div>
                                    {/* <div>{item.time}</div> */}
                                </div>
                                <div className="confirm-box">
                                    <div className="line">
                                        <div className="name">{t('project.unlockingAmount')}</div>
                                        <div className="value">{item.unlock_percentage}%</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.unlockingTime')}</div>
                                        <div className="value">{item.unlock_time}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.description}</div>
                                    </div>
                                </div>

                            </>)}
                            <div className="title" style={{ marginTop: '56px' }}>{t('createProject.additionalDoc')}</div>
                            <div className="confirm-box">
                                {projectInfo.white_paper && projectInfo.white_paper.file_name}<br />{projectInfo.other_file && projectInfo.other_file[0].file_name}
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
                            <Button onClick={() => { console.log(projectInfo, fundraising, processList,); setCurrentStep(prev => prev + 1) }} className="btn-green">{t('common.next')}</Button>
                        </div>}
                        {currentStep == 6 && <div>
                            <span className="hint">{t('common.gasFeeHint')}</span>
                            <Button onClick={() => { confirmInfo() }} className="btn-green">{t('common.confirmInfo')}</Button>
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
        {/* <Footer /> */}
    </div>)
}