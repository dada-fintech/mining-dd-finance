import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, InputNumber, Popconfirm, Tooltip } from 'antd'
import LinkArrow from 'assets/link-arrow.svg'
import LinkArrowBack from 'assets/link-arrow-back.svg'
import QuestionIcon from 'assets/question.svg'
import { useWallet } from 'use-wallet'
import mm from 'components/mm'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons'

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
    const [changeLoading, setChangeLoading] = useState(false)
    const wallet = useWallet()

    const { t, i18n } = useTranslation()
    const { id } = useParams()

    const sidebarList = i18n.language === 'en' ? [
        'Create the Voting', 'Project Info', 'Confirmation'
    ] : [
            '创建投票', '项目信息', '确认信息'
        ]

    useEffect(() => {
        axios.get('/project/detail/' + id).then(res => {
            if (!res.data.project_info.other_file) {
                res.data.project_info.other_file = []
            }
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

    // const changeFundraising = (name, value) => {
    //     setFundraising(prev => {
    //         return {
    //             ...prev,
    //             [name]: value,
    //         }
    //     })
    // }

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
        const customHint = i18n.language === 'en' ? 'Please check the required fields' : ''
        if (currentStep === 1) {
            if (processList.length < 2) {
                message.error(customHint || '至少要有两个进程')
                return false
            }

            let pass = true
            let totalPercent = 0
            processList.forEach((item, index) => {
                if (index === 0) {
                    if (!item.unlock_percentage || !item.vote_start_time) {
                        pass = false
                    }
                } else {
                    if (!item.unlock_percentage || !item.vote_start_time || !item.vote_end_time) {
                        pass = false
                    }
                }

                if (item.status === 'Finished' || item.status === 'Future' || !item.status) {
                    totalPercent += Number(item.unlock_percentage)
                }
            })
            if (!pass) {
                message.error(customHint || '请检查所有必填字段')
                return false
            }

            if (totalPercent !== 100) {
                message.error(customHint || '份额相加需等于100%')
                return false
            }

            if (!description) {
                message.error(customHint || '请填写描述')
                return false
            }
        }

        setChangeLoading(false)

        //when all required fields are filled
        setCurrentStep(prev => prev + 1)
    }


    const otherUpload = {
        name: 'file',
        action: 'https://mining-api.dd.finance/project/upload',
        showUploadList: false,
        multiple: true,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                let previousArr = projectInfo.other_file
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
        //只传过去Future
        let finalProcessList = processList.filter(item => (item.status === 'Future' || !item.status))

        finalProcessList.forEach(item => {
            item.unlock_percentage = String(item.unlock_percentage)
        })

        setChangeLoading(true)

        axios.post('/project/change-process', {
            sender: wallet.account,
            project_uniq_id: id,
            description: description,
            other_file: projectInfo.other_file,
            new_process: finalProcessList
        }).then(res => {
            mm.sendTransaction({
                from: wallet.account,
                to: res.data.contract_addr,
                data: res.data.call_data
            }, 'Change plan').then(res => {
                setChangeLoading(false)
            })
        })
    }

    return (<div className="create-vote-page">
        <Header />

        <div className="container create-vote-main">
            <Row gutter={{ md: 36, lg: 64, xl: 160 }} align="center">
                <Col xs={24} md={14}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0" dangerouslySetInnerHTML={{ __html: t('createVote.hint') }}>
                        </div>}

                        {currentStep === 1 && <div className="step-1">
                            <div className="hint-block small" dangerouslySetInnerHTML={{__html: t('createVote.step1Hint')}}>
                            </div>
                            <div className="title">{t('createVote.mainTitle')}</div>
                            <div className="confirm-box">
                                <div className="form-item">
                                    <div className="label">{t('createVote.votingPeriod')} <Tooltip title="投票期限无法更改，合约创建时开始生效。公示期：24小时，投票期：24小时-96小时。"><img src={QuestionIcon} /></Tooltip></div>
                                    <div>
                                        {moment().add(1, 'days').format('MMMM Do YYYY')} - {moment().add(4, 'days').format('MMMM Do YYYY')}
                                    </div>
                                </div>
                                <div className="form-item">
                                    <div className="label">{t('createVote.descriptionOfChange')}</div>
                                    <Input.TextArea autoSize={{ minRows: 6 }} placeholder="200 words limit" value={description} onChange={(e) => { console.log(e); setDescription(e.target.value) }} />
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createVote.uploadDoc')}</div>
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
                                    {(item.status === 'Future' || !item.status) && <Popconfirm title={t('common.sureToDelete')} onConfirm={() => { removeProcess(index) }}><CloseCircleOutlined className="remove-btn" /></Popconfirm>}
                                    <div className={'status ' + (item.status === 'Active' ? 'finish' : '')}>
                                        {item.status}
                                    </div>
                                    <div className="line">
                                        <div className="name required">{t('project.unlockingAmount')}</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? (item.unlock_percentage + '%') : <InputNumber max={index === 0 ? 80 : 100} min={0} formatter={value => `${value ? value : 0} %`} parser={value => parseInt(value)} value={item.unlock_percentage} onChange={e => changeProcess(index, 'unlock_percentage', e)} style={{ width: '180px' }} />}
                                        </div>
                                    </div>
                                    {index === 0 ? <div className="line">
                                        <div className="name required">{t('createProject.unlockDate')}</div>
                                        <div className="value">
                                            {(item.status && item.status !== 'Future') ? `${new Date(item.vote_start_time).toLocaleDateString()}` :
                                                <DatePicker value={item.vote_start_time && moment(item.vote_start_time)} onChange={value => { value && changeProcess(index, 'vote_start_time', value.valueOf()); }} />
                                            }
                                        </div>
                                    </div> : <div className="line">
                                            <div className="name required">{t('createProject.votingDate')}</div>
                                            <div className="value">
                                                {(item.status && item.status !== 'Future') ? `${new Date(item.vote_start_time).toLocaleDateString()}-${new Date(item.vote_end_time).toLocaleDateString()}` :
                                                    <DatePicker.RangePicker value={item.vote_start_time && [moment(item.vote_start_time), moment(item.vote_end_time)]} onChange={value => { value && changeProcess(index, 'vote_start_time', value[0].valueOf()); value && changeProcess(index, 'vote_end_time', value[1].valueOf()) }} />
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
                            <div className="title">{t('createVote.mainTitle')}</div>
                            <div className="confirm-box">
                                <div className="form-item">
                                    <div className="label">{t('createVote.votingPeriod')} <Tooltip title="投票期限无法更改，合约创建时开始生效。公示期：24小时，投票期：24小时-96小时。"><img src={QuestionIcon} /></Tooltip></div>
                                    <div>{moment().add(1, 'days').format('MMMM Do YYYY')} - {moment().add(4, 'days').format('MMMM Do YYYY')}</div>
                                </div>
                                <div className="form-item">
                                    <div className="label">{t('createVote.descriptionOfChange')}</div>
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
                                        <div className="name">{t('project.unlockingAmount')}</div>
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
                            {currentStep > 0 && <div onClick={() => { setCurrentStep(prev => prev - 1) }} className="line-btn line-btn-back">{t('common.back')} <img src={LinkArrowBack} /></div>}
                        </div>
                        {currentStep < 2 && <div>
                            <div onClick={() => { goNextStep() }} className="line-btn line-btn-next"><img src={LinkArrow} /> {t('common.next')}</div>
                        </div>}
                        {currentStep == 2 && <div>
                            <div onClick={() => { !changeLoading && confirmInfo() }} className="btn-confirm"><span className="text">{t('common.confirmInfo')} {changeLoading && <LoadingOutlined />}</span> </div>
                            <span className="hint hint-gasfee">{t('common.gasFeeHint')}</span>
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