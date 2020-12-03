import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, InputNumber, Popconfirm } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import axios from 'utils/axios'
import { useParams } from 'react-router-dom'
import moment from 'moment'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'

import './style.scss'

export default function CreateVote() {
    const [currentStep, setCurrentStep] = useState(0)
    const [processList, setProcessList] = useState([])
    const [projectInfo, setProjectInfo] = useState({})
    const [fundraising, setFundraising] = useState({})
    const [description, setDescription] = useState('')

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

    const removeProcess = (number) => {
        setProcessList(prev => {
            let newArr = prev
            newArr.splice(number, 1)
            return [
                ...prev
            ]
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

    const addProcessList = () => {
        setProcessList(prev => {
            return [
                ...prev,
                {}
            ]
        })
    }

    const goNextStep = () => {
        // 进行步骤跳转以及字段校验
        if (currentStep === 1) {
            if (processList.length < 2) {
                message.error('至少要有两个进程')
                return false
            }

            let pass = true
            let totalPercent = 0
            processList.forEach(item => {
                if (!item.unlock_percentage || !item.vote_start_time || !item.vote_end_time) {
                    pass = false
                }

                totalPercent += item.unlock_percentage

            })
            if (!pass) {
                message.error('请检查所有必填字段')
                return false
            }

            if (totalPercent !== 100) {
                message.error('份额相加需等于100%')
                return false
            }

            if (!description) {
                message.error('请填写描述')
                return false
            }
        }

        //when all required fields are filled
        setCurrentStep(prev => prev + 1)
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
                    file_name: info.file.response.file_name
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

    const confirmInfo = () => {
        let finalProcessList = processList
        finalProcessList.process.forEach(item => {
            item.unlock_percentage = String(item.unlock_percentage)
        })

        axios.post('/project/change-process', {
            sender: window.ethereum.selectedAddress,
            project_uniq_id: id,
            description: description,
            other_file: projectInfo.other_file,
            new_process: finalProcessList
        }).then(res => {
            message.success('提交成功!')
        })
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
                                        {fundraising.expected_apy}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        筹款目标
                                    </div>
                                    <div className="value">
                                        {fundraising.min_amount}
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="name">
                                        筹款限制
                                    </div>
                                    <div className="value">
                                        {fundraising.max_amount}
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
                            {processList.map((item, index) => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{index + 1}</div>
                                </div>
                                <div className="confirm-box">
                                    {item.status === 'Future' && <Popconfirm title="确定删除该进程吗？" onConfirm={() => { removeProcess(index) }}><CloseCircleOutlined className="remove-btn" /></Popconfirm>}
                                    <div className={'status ' + (item.status === 'Active' ? 'finish' : '')}>
                                        {item.status}
                                    </div>
                                    <div className="line">
                                        <div className="name required">解锁额度</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? (item.unlock_percentage + '%') : <InputNumber max={index === 0 ? 80 : 100} min={0} formatter={value => `${value ? value : 0} %`} parser={value => parseInt(value)} value={item.unlock_percentage} onChange={e => changeProcess(index, 'unlock_percentage', e)} style={{ width: '180px' }} />}
                                        </div>
                                    </div>
                                    {/* <div className="line">
                                        <div className="name required">{t('project.unlockingTime')}</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? new Date(item.unlock_time).toLocaleDateString() : <DatePicker value={item.unlock_time && moment(item.unlock_time)} onChange={value => changeProcess(index, 'unlock_time', value.valueOf())} />}
                                        </div>
                                    </div> */}
                                    <div className="line">
                                        <div className="name required">{t('createProject.votingDate')}</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? `${new Date(item.vote_start_time).toLocaleDateString()}-${new Date(item.vote_end_time).toLocaleDateString()}` :
                                                <DatePicker.RangePicker value={item.vote_start_time && [moment(item.vote_start_time), moment(item.vote_end_time)]} onChange={value => { changeProcess(index, 'vote_start_time', value[0].valueOf()); changeProcess(index, 'vote_end_time', value[1].valueOf()) }} />
                                            }
                                        </div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? item.description : <Input.TextArea value={item.description} onChange={e => changeProcess(index, 'description', e.target.value)} autoSize={{ minRows: 6 }} />}
                                        </div>
                                    </div>
                                </div>
                            </>)}
                            <div className="add-item-box" onClick={() => { addProcessList() }}>
                                <PlusCircleOutlined />
                            </div>
                            <div className="description-block">
                                <div className="process-top">
                                    <div className="required">{t('createVote.editDescription')}</div>
                                </div>
                                <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" value={description} onChange={(e) => { console.log(e); setDescription(e.target.value) }} />
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createVote.additionalDoc')}</div>
                                <Upload {...otherUpload}>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                </Upload>
                                {
                                    projectInfo.other_file && projectInfo.other_file.length > 0 && <div className="uploaded-box">
                                        {projectInfo.other_file.map((item, index) => (
                                            <div>
                                                {item.file_name.slice(10)} <CloseCircleOutlined onClick={() => { removeOtherFile(index) }} />
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>}

                        {currentStep === 2 && <div className="step-1">
                            <div className="title" style={{ marginTop: '56px' }}>{t('createVote.projectInfo')}</div>
                            {processList.map((item, index) => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{index}</div>
                                </div>
                                <div className="confirm-box">
                                    <div className="line">
                                        <div className="name">解锁额度</div>
                                        <div className="value">{item.unlock_percentage}%</div>
                                    </div>
                                    {/* <div className="line">
                                        <div className="name">{t('project.unlockingTime')}</div>
                                        <div className="value">{new Date(item.unlock_time).toLocaleDateString()}</div>
                                    </div> */}
                                    <div className="line">
                                        <div className="name">{t('createProject.votingDate')}</div>
                                        <div className="value">{new Date(item.vote_start_time).toLocaleDateString()}-{new Date(item.vote_end_time).toLocaleDateString()}</div>
                                    </div>
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.description}</div>
                                    </div>
                                </div>
                            </>)}
                            <div className="title" style={{ marginTop: '56px' }}>{t('createVote.additionalDoc')}</div>
                            <div className="confirm-box">
                                {projectInfo.other_file[0].file_name}
                            </div>
                            <div className="description-block">
                                <div className="process-top">
                                    <div>{t('common.description')}</div>
                                </div>
                                <div>
                                    {description}
                                </div>
                            </div>


                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <Button onClick={() => { setCurrentStep(prev => prev - 1) }} className="btn-grey">{t('common.back')}</Button>}
                        </div>
                        {currentStep < 2 && <div>
                            <Button onClick={() => { goNextStep() }} className="btn-green">{t('common.next')}</Button>
                        </div>}
                        {currentStep == 2 && <div>
                            <span className="hint">{t('common.gasFeeHint')}</span>
                            <Button onClick={() => { confirmInfo() }} className="btn-green">{t('common.confirmInfo')}</Button>
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
    </div>)
}