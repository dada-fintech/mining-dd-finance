import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, InputNumber, Popconfirm, Tooltip } from 'antd'
import LinkArrow from 'assets/link-arrow.svg'
import LinkArrowBack from 'assets/link-arrow-back.svg'
import QuestionIcon from 'assets/question.svg'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import axios from 'utils/axios'
import { useParams } from 'react-router-dom'
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
            processList.forEach((item, index) => {
                if (index === 0) {
                    if (!item.unlock_percentage || !item.unlock_time) {
                        pass = false
                    }
                } else {
                    if (!item.unlock_percentage || !item.vote_start_time || !item.vote_end_time) {
                        pass = false
                    }
                }

                totalPercent += Number(item.unlock_percentage)

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
        //🈯只传过去Future
        let finalProcessList = processList.filter(item => (item.status === 'Future' || !item.status))

        console.log(finalProcessList, 'bbfuture')

        finalProcessList.forEach(item => {
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
                            <div className="hint-block small">
                                这些设置是用来配置项目的阶段性进展与解锁规则，请根据原定项目计划修改解锁计划。<br />
                                *计划变更投票期限为4天（1天为公示期，3天为投票期），已完成计划不可变更
                            </div>
                            <div className="title">变更投票信息</div>
                            <div className="confirm-box">
                                <div className="form-item">
                                    <div className="label">投票期限 <Tooltip title="投票期限无法更改，合约创建时开始生效。公示期：24小时，投票期：24小时-96小时。"><img src={QuestionIcon} /></Tooltip></div>
                                    <div>
                                        {moment().add(1, 'days').format('MMMM Do YYYY')} - {moment().add(4, 'days').format('MMMM Do YYYY')}
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="label">变更说明</div>
                                    <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" value={description} onChange={(e) => { console.log(e); setDescription(e.target.value) }} />
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="label">请上传其它相关文件</div>
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
                            {processList.map((item, index) => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{index + 1}</div>
                                </div>
                                <div className="confirm-box">
                                    {(item.status === 'Future' || !item.status) && <Popconfirm title="确定删除该进程吗？" onConfirm={() => { removeProcess(index) }}><CloseCircleOutlined className="remove-btn" /></Popconfirm>}
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
                                    {index === 0 ? <div className="line">
                                        <div className="name required">{t('createProject.unlockDate')}</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? `${new Date(item.unlock_time).toLocaleDateString()}` :
                                                <DatePicker value={item.unlock_time && moment(item.unlock_time)} onChange={value => { changeProcess(index, 'unlock_time', value.valueOf()); }} />
                                            }
                                        </div>
                                    </div> : <div className="line">
                                            <div className="name required">{t('createProject.votingDate')}</div>
                                            <div className="value">
                                                {(item.status && item.status !== 'Future') ? `${new Date(item.vote_start_time).toLocaleDateString()}-${new Date(item.vote_end_time).toLocaleDateString()}` :
                                                    <DatePicker.RangePicker value={item.vote_start_time && [moment(item.vote_start_time), moment(item.vote_end_time)]} onChange={value => { changeProcess(index, 'vote_start_time', value[0].valueOf()); changeProcess(index, 'vote_end_time', value[1].valueOf()) }} />
                                                }
                                            </div>
                                        </div>}

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

                        </div>}

                        {currentStep === 2 && <div className="step-1">
                            <div className="title">变更投票信息</div>
                            <div className="confirm-box">
                                <div className="form-item">
                                    <div className="label">投票期限 <Tooltip title="投票期限无法更改，合约创建时开始生效。公示期：24小时，投票期：24小时-96小时。"><img src={QuestionIcon} /></Tooltip></div>
                                    <div>{moment().add(1, 'days').format('MMMM Do YYYY')} - {moment().add(4, 'days').format('MMMM Do YYYY')}</div>
                                </div>
                                <div className="form-item">
                                    <div className="label">变更说明</div>
                                    <div>{description}</div>
                                </div>
                            </div>
                            {
                                projectInfo.other_file && projectInfo.other_file.length > 0 && <>
                                    <div className="title" style={{ marginTop: '56px' }}>{t('createVote.additionalDoc')}</div>
                                    <div className="confirm-box">
                                        {
                                            <div className="uploaded-box">
                                                {projectInfo.other_file.map((item, index) => (
                                                    <div>
                                                        {item.file_name.slice(10)}
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </>
                            }


                            {processList.map((item, index) => <>
                                <div className="process-top">
                                    <div>{t('project.progress')} #{index}</div>
                                </div>
                                <div className="confirm-box">
                                    <div className="line">
                                        <div className="name">解锁额度</div>
                                        <div className="value">{item.unlock_percentage}%</div>
                                    </div>
                                    {index === 0 ? <div className="line">
                                        <div className="name">{t('createProject.unlockDate')}</div>
                                        <div className="value">{new Date(item.unlock_time).toLocaleDateString()}</div>
                                    </div> : <div className="line">
                                            <div className="name">{t('project.voteTime')}</div>
                                            <div className="value">{new Date(item.vote_start_time).toLocaleDateString()} - {new Date(item.vote_end_time).toLocaleDateString()}</div>
                                        </div>}

                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.description}</div>
                                    </div>
                                </div>
                            </>)}

                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <div onClick={() => { setCurrentStep(prev => prev - 1) }} className="line-btn">{t('common.back')} <img src={LinkArrowBack} /></div>}
                        </div>
                        {currentStep < 2 && <div>
                            <div onClick={() => { goNextStep() }} className="line-btn"><img src={LinkArrow} /> {t('common.next')}</div>
                        </div>}
                        {currentStep == 2 && <div>
                            <span className="hint">{t('common.gasFeeHint')}</span>
                            <div onClick={() => { confirmInfo() }} className="line-btn"><img src={LinkArrow} /> {t('common.confirmInfo')}</div>
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
    </div >)
}