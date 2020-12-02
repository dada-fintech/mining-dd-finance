import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, Tooltip, InputNumber, Popconfirm } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined, MinusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
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
            let newArr = prev
            newArr[number][name] = value
            return [
                ...newArr
            ]
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
        setProcessList(prev => {
            return [
                ...prev,
                {}
            ]
        })
    }


    const removeProcess = (number) => {
        setProcessList(prev => {
            let newArr = prev
            newArr.splice(number, 1)
            return [
                ...prev
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

    const removeCouncilMember = (number) => {
        setProjectInfo(prev => {
            let newObj = prev
            newObj.member_address.splice(number, 1)
            return {
                ...newObj
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

    const goNextStep = () => {
        // 进行步骤跳转以及字段校验
        if (currentStep === 1) {
            if (!projectInfo.project_name) {
                message.error('请填写项目名称')
                return false
            }
            if (!projectInfo.white_paper) {
                message.error('请上传白皮书')
                return false
            }
        }

        if (currentStep === 2) {
            if (!projectInfo.project_token_symbol) {
                message.error('请填写项目币名称')
                return false
            }
            if (!projectInfo.receiver) {
                message.error('请填写基金持有地址')
                return false
            }
            //检测重复地址
            if (projectInfo.member_address.length > 1) {
                let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
                const duplicateArr = findDuplicates(projectInfo.member_address)
                if (duplicateArr.length > 0) {
                    message.error('理事会成员地址有重复')
                    return false
                }
            }
        }

        if (currentStep === 3) {
            if (!fundraising.start_time || !fundraising.end_time) {
                message.error('请选择筹款期')
                return false
            }
            if (!fundraising.softtop) {
                message.error('请填写最低启动金额')
                return false
            }
            if (!projectInfo.income_settlement_time) {
                message.error('请选择回款日期')
                return false
            }
            if (!projectInfo.expected_apy) {
                message.error('请填写预期APY')
                return false
            }
        }

        if (currentStep === 4) {
            if (processList.length < 2) {
                message.error('至少要有两个进程')
                return false
            }
            let pass = true
            processList.forEach(item => {
                if (!item.unlock_time || !item.unlock_percentage || !item.vote_start_time || !item.vote_end_time) {
                    console.log(item.unlock_time, item.unlock_percentage, item.vote_start_time, item.vote_end_time)
                    pass = false
                }
            })
            if (!pass) {
                message.error('请检查所有必填字段')
                return false
            }
        }

        //when all required fields are filled
        setCurrentStep(prev => prev + 1)
    }

    const whitePaperUpload = {
        name: 'file',
        action: 'https://mining-api.dd.finance/project/upload',
        showUploadList: false,
        beforeUpload(file) {
            if (file.type !== 'application/pdf') {
                message.error('请上传PDF格式文件')
                return false
            }
        },
        onChange(info) {
            console.log(info)
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                changeProjectInfo('white_paper', { file_name: info.file.name })
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const removeWhitePaper = () => {
        changeProjectInfo('white_paper', { file_name: '' })
    }

    const otherUpload = {
        name: 'file',
        action: 'https://mining-api.dd.finance/project/upload',
        showUploadList: false,
        onChange(info) {
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                let previousArr = projectInfo.other_file || []
                previousArr.push({
                    file_name: info.file.name
                })
                changeProjectInfo('other_file', previousArr)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const removeOtherFile = (index) => {
        let previousArr = projectInfo.other_file || []
        previousArr.splice(index, 1)
        changeProjectInfo('other_file', previousArr)
    }

    const disable5Days = current => {
        return current && current < moment().add(5, 'days').endOf('day');
    }

    const confirmInfo = () => {
        let finalInfo = {
            project_info: projectInfo,
            fundraising: fundraising,
            process: processList,
        }
        finalInfo.project_info.expected_apy = String(finalInfo.project_info.expected_apy)
        finalInfo.process.forEach(item => {
            item.unlock_percentage = String(item.unlock_percentage)
        })
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
                                <div className="label required">{t('createProject.projectName')}</div>
                                <Input value={projectInfo.project_name} onChange={(e) => { changeProjectInfo('project_name', e.target.value) }} style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectIntro')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" value={projectInfo.description} onChange={(e) => { changeProjectInfo('description', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label required">{t('createProject.whitepaper')}</div>
                                <Upload {...whitePaperUpload}>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                    <span style={{ marginLeft: '12px', color: '#707070' }}>*.pdf</span>
                                </Upload>
                                {projectInfo.white_paper && projectInfo.white_paper.file_name && <div className="uploaded-box">
                                    {projectInfo.white_paper.file_name} <CloseCircleOutlined onClick={() => { removeWhitePaper() }} />
                                </div>}
                            </div>
                        </div>}
                        {currentStep === 2 && <div className="step-2">
                            <div className="form-item">
                                <div className="label required">{t('createProject.nameOfToken')}</div>
                                <Input style={{ width: '360px' }} value={projectInfo.project_token_symbol} onChange={(e) => { changeProjectInfo('project_token_symbol', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label required">{t('createProject.addWallet')}</div>
                                <Input style={{ width: '500px' }} value={projectInfo.receiver} onChange={(e) => { changeProjectInfo('receiver', e.target.value) }} />
                                <div className="hint red">{t('createProject.addWalletHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label required">{t('createProject.profitAddr')}</div>
                                <Input style={{ width: '500px' }} value={projectInfo.profit} onChange={(e) => { changeProjectInfo('profit', e.target.value) }} />
                                <div className="hint red">{t('createProject.profitAddrHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.boardMembers')}</div>
                                {projectInfo.member_address.map((item, index) => <div>
                                    <Input value={item} onChange={(e) => { changeMemberAddress(index, e.target.value) }} style={{ width: '500px', marginBottom: '12px' }} />
                                    {index != projectInfo.member_address.length - 1 && <Popconfirm title="确定删除该地址吗？" onConfirm={() => { removeCouncilMember(index) }}><MinusCircleOutlined className="handle-icon" /></Popconfirm>}
                                    {index == projectInfo.member_address.length - 1 && <PlusCircleOutlined onClick={() => { addCouncilMember() }} className="handle-icon" />}
                                </div>)}

                                <div className="hint">{t('createProject.boardMembersHint')}</div>
                            </div>
                        </div>}
                        {currentStep === 3 && <div className="step-3">

                            <div className="form-item">
                                <div className="label required">{t('createProject.fundraisingPeriod')}</div>
                                <DatePicker.RangePicker disabledDate={disable5Days} value={fundraising.start_time && [moment(fundraising.start_time), moment(fundraising.end_time)]} onChange={value => dateRangeChange('fundraising', value)} />
                                <div className="hint">{t('createProject.fundraisingPeriodHint')}</div>
                            </div>

                            <div className="form-item">
                                <div className="label required">{t('createProject.fundraisingGoal')}</div>
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
                                <div className="label required">{t('createProject.redemptionDate')}</div>
                                <DatePicker value={projectInfo.income_settlement_time && moment(projectInfo.income_settlement_time)} onChange={value => { console.log(value.valueOf()); changeProjectInfo('income_settlement_time', value.valueOf()) }} />
                            </div>
                            <div className="form-item">
                                <div className="label required">{t('common.apy')}</div>
                                <InputNumber formatter={value => `${value ? value : 0} %`} parser={value => parseInt(value)} value={projectInfo.expected_apy} onChange={e => changeProjectInfo('expected_apy', e)} style={{ width: '180px' }} />
                            </div>
                        </div>}
                        {currentStep === 4 && <div className="step-4">
                            <div className="assets-rule-title">{t('createProject.assetsRuleHint')}</div>
                            {processList.map((item, index) => <>
                                <div className="asset-id"># {index + 1}</div>
                                <div className="assets-rule-item">
                                    {processList.length > 1 && <Popconfirm title="确定删除该进程吗？" onConfirm={() => { removeProcess(index) }}><CloseCircleOutlined className="remove-btn" /></Popconfirm>}
                                    <Row gutter={24}>
                                        <Col md={12}>
                                            <div className="form-item">
                                                <div className="label required">{t('createProject.votingDate')}</div>
                                                <DatePicker.RangePicker disabledDate={current => current && current < moment(fundraising.end_time)} value={item.vote_start_time && [moment(item.vote_start_time), moment(item.vote_end_time)]} onChange={value => { changeProcess(index, 'vote_start_time', value[0].valueOf()); changeProcess(index, 'vote_end_time', value[1].valueOf()) }} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label required">{t('createProject.unlockDate')}</div>
                                                <DatePicker disabledDate={current => current && current < moment(item.vote_end_time)} value={item.unlock_time && moment(item.unlock_time)} onChange={value => changeProcess(index, 'unlock_time', value.valueOf())} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label required">{t('createProject.shares')}</div>
                                                <InputNumber max={index === 0 ? 80 : 100} min={0} formatter={value => `${value ? value : 0} %`} parser={value => parseInt(value)} value={item.unlock_percentage} onChange={e => changeProcess(index, 'unlock_percentage', e)} style={{ width: '180px' }} />
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
                                {
                                    projectInfo.other_file && projectInfo.other_file.length > 0 && <div className="uploaded-box">
                                        {projectInfo.other_file.map((item, index) => (
                                            <div>
                                                {item.file_name} <CloseCircleOutlined onClick={() => { removeOtherFile(index) }} />
                                            </div>
                                        ))}
                                    </div>
                                }

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
                                    <div className="value">{new Date(fundraising.start_time).toLocaleDateString()} {new Date(fundraising.end_time).toLocaleDateString()}</div>
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
                                    <div className="value">{new Date(projectInfo.income_settlement_time).toLocaleDateString()}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundAddress')}</div>
                                    <div className="value"><Tooltip title={projectInfo.receiver}>{projectInfo.receiver}</Tooltip></div>
                                </div>
                                {projectInfo.member_address.filter(item => item).length > 0 && <div className="line">
                                    <div className="name">{t('createProject.councilAddress')}</div>
                                    <div className="value">
                                        {projectInfo.member_address.map(item => (
                                            <>
                                                <Tooltip title={item}>{item}</Tooltip><br />
                                            </>
                                        ))}
                                    </div>
                                </div>}

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
                                        <div className="name">{t('project.voteTime')}</div>
                                        <div className="value">{new Date(item.vote_start_time).toLocaleDateString()} - {new Date(item.vote_end_time).toLocaleDateString()}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.unlockingTime')}</div>
                                        <div className="value">{new Date(item.unlock_time).toLocaleDateString()}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.description}</div>
                                    </div>
                                </div>

                            </>)}
                            <div>
                                <div className="title" style={{ marginTop: '56px' }}>{t('createProject.additionalDoc')}</div>
                                <div className="confirm-box">
                                    {projectInfo.white_paper && projectInfo.white_paper.file_name}<br />{projectInfo.other_file && projectInfo.other_file[0].file_name}
                                </div>
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
                            <Button onClick={() => { goNextStep() }} className="btn-green">{t('common.next')}</Button>
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