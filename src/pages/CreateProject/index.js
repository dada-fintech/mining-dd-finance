import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, Tooltip, InputNumber, Popconfirm, notification, Slider } from 'antd'
import LinkArrow from 'assets/link-arrow.svg'
import LinkArrowBack from 'assets/link-arrow-back.svg'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined, MinusCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import QuestionIcon from 'assets/question.svg'
import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import moment from 'moment'
import axios from 'utils/axios'
import mm from 'components/mm'
import web3 from 'components/web3'
import config from 'config'

import './style.scss'

export default function CreateProject() {
    const [currentStep, setCurrentStep] = useState(0)
    const [projectInfo, setProjectInfo] = useState({ member_address: [''], profit_token: 'USDT', other_file: [] })
    const [fundraising, setFundraising] = useState({})
    const [payStatus, setPayStatus] = useState('')
    const [createLoading, setCreateLoading] = useState(false)

    const [processList, setProcessList] = useState([{}, {}])
    const [approveBalance, setApproveBalance] = useState(0)
    const [dadaApproved, setDadaApproved] = useState(false)
    const [callData, setCallData] = useState(false)
    const [USDTBalance, setUSDTBalance] = useState(0)

    const wallet = useWallet()


    const { t, i18n } = useTranslation()

    const sidebarList = i18n.language === 'en' ? [
        'Create the project', 'Project Info', 'Add Addresses', 'Fundraising Info', 'Rules for Unlock', 'Upload Files', 'Confirmation'
    ] : [
            '创建项目', '项目信息', '添加地址', '筹款信息', '解锁规则', '上传文件', '确认信息'
        ]


    useEffect(() => {
        const projectInfo = JSON.parse(localStorage.getItem('projectInfo'))
        const fundraising = JSON.parse(localStorage.getItem('fundraising'))
        const processList = JSON.parse(localStorage.getItem('processList'))

        if (projectInfo) {
            setProjectInfo(projectInfo)
        }
        if (fundraising) {
            setFundraising(fundraising)
        }
        if (processList) {
            setProcessList(processList)
        }

        const currentStep = Number(localStorage.getItem('currentStep'))
        if (currentStep) {
            setCurrentStep(currentStep)
        }

    }, [])

    useEffect(() => {
        // 只有主网才去获取
        if (config.chainId == 1 && wallet.account) {
            getUSDTBalance()
        }
    }, [wallet.account])


    useEffect(() => {
        if (fundraising.softtopPercent) {
            fundraisingSofttopChange(fundraising.softtopPercent)
        }
    }, [fundraising.max_amount])

    const getUSDTBalance = async () => {
        let CONTRACT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'
        const contract = new web3.eth.Contract(config.commonABI, CONTRACT_ADDRESS)
        const result = await contract.methods.balanceOf(wallet.account).call({ from: wallet.account })
        setUSDTBalance(web3.utils.fromWei(result, 'mwei'))
    }

    useEffect(() => {
        localStorage.setItem('projectInfo', JSON.stringify(projectInfo))
        localStorage.setItem('fundraising', JSON.stringify(fundraising))
        localStorage.setItem('processList', JSON.stringify(processList))
    }, [fundraising, processList, projectInfo])

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
        if (!value) {
            value = [0, 0]
        }
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
            message.error(i18n.language === 'en' ? 'Max 3 addresses' : '最多3个理事会成员地址')
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
        setProjectInfo(prev => {
            let newObj = prev
            newObj.member_address[number] = value;

            return {
                ...newObj
            }
        })
    }

    const fundraisingSofttopChange = (percent) => {
        changeFundraising('softtopPercent', percent)
        const softtopCalc = fundraising.max_amount * percent / 100

        changeFundraising('min_amount', softtopCalc)
    }

    const goNextStep = () => {

        const customHint = i18n.language === 'en' ? 'Please check the required fields' : ''
        // 进行步骤跳转以及字段校验
        if (currentStep === 1) {
            if (!projectInfo.project_name) {
                message.error(customHint || '请填写项目名称')
                return false
            }
            if (!projectInfo.project_profile) {
                message.error(customHint || '请填写项目简介')
                return false
            }
            if (!projectInfo.creater_email) {
                message.error(customHint || '请填写项目订阅邮箱')
                return false
            }
        }

        if (currentStep === 2) {
            if (!projectInfo.creater_name) {
                message.error(customHint || '请填写项目发起人姓名')
                return false
            }
            if (!projectInfo.creater_profile) {
                message.error(customHint || '请填写项目发起人简介')
                return false
            }
            if (!projectInfo.project_description) {
                message.error(customHint || '请填写项目详情')
                return false
            }
            if (!projectInfo.project_strategy) {
                message.error(customHint || '请填写项目策略')
                return false
            }
            if (!projectInfo.white_paper) {
                message.error(customHint || '请上传项目计划书')
                return false
            }
        }

        if (currentStep === 3) {
            if (!projectInfo.project_token_symbol) {
                message.error(customHint || '请填写项目币名称')
                return false
            }
            if (!projectInfo.receiver) {
                message.error(customHint || '请填写收款地址')
                return false
            }
            if (!projectInfo.profit) {
                message.error(customHint || '请填写收益地址')
                return false
            }
            if (!projectInfo.profit_token) {
                message.error(customHint || '请选择收益币种')
                return false
            }

            //检测重复地址
            if (projectInfo.member_address.length > 1) {
                let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
                const duplicateArr = findDuplicates(projectInfo.member_address)
                if (duplicateArr.length > 0) {
                    message.error(customHint || '理事会成员地址有重复')
                    return false
                }
            }

        }

        if (currentStep === 4) {
            if (!fundraising.start_time || !fundraising.end_time) {
                message.error(customHint || '请选择筹款期限')
                return false
            }
            if (!fundraising.max_amount) {
                message.error(customHint || '请填写最高募集金额')
                return false
            }
            if (!fundraising.min_amount) {
                message.error(customHint || '请选择最低启动金额')
                return false
            }

            if (!fundraising.expected_apy) {
                message.error(customHint || '请填写预期APY')
                return false
            }


        }

        if (currentStep === 5) {
            if (!projectInfo.income_settlement_time) {
                message.error(customHint || '请填写赎回日期')
                return false
            }
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

                totalPercent += Number(item.unlock_percentage)
            })

            if (!pass) {
                message.error(customHint || '请检查所有必填字段')
                return false
            }
            if (totalPercent !== 100) {
                message.error(customHint || '份额相加需等于100%')
                return false
            }
        }


        //when all required fields are filled
        setCurrentStep(prev => prev + 1)
        localStorage.setItem('currentStep', currentStep + 1)
    }

    const whitePaperUpload = {
        name: 'file',
        action: 'https://mining-api.dd.finance/project/upload',
        showUploadList: false,
        beforeUpload(file) {
            if (file.type !== 'application/pdf') {
                message.error('Only PDF format is supported')
                return false
            }
        },
        onChange(info) {
            notification.open({
                key: info.file.name,
                message: `Uploading ${info.file.name}`,
                duration: null,
                icon: <LoadingOutlined />
            })
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                notification.close(info.file.name)
                // message.success(`${info.file.name} file uploaded successfully`);
                changeProjectInfo('white_paper', { file_name: info.file.response.file_name })
            } else if (info.file.status === 'error') {
                notification.error({
                    message: `${info.file.name} file upload failed.`
                })
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
        multiple: true,
        onChange(info) {
            notification.open({
                key: info.file.name,
                message: `Uploading ${info.file.name}`,
                duration: null,
                icon: <LoadingOutlined />
            })
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                notification.close(info.file.name)
                // message.success(`${info.file.name} file uploaded successfully`);
                let previousArr = projectInfo.other_file
                previousArr.push({
                    file_name: info.file.response.file_name
                })
                changeProjectInfo('other_file', previousArr)

            } else if (info.file.status === 'error') {
                notification.error({
                    message: `${info.file.name} file upload failed.`
                })
            }
        },
    };

    const removeOtherFile = (index) => {
        let previousArr = projectInfo.other_file || []
        previousArr.splice(index, 1)
        changeProjectInfo('other_file', previousArr)
    }

    // const disable5Days = current => {
    //     return current && current < moment().add(5, 'days').endOf('day');
    // }

    const confirmInfo = () => {
        setCreateLoading(false)

        let finalInfo = {
            project_info: projectInfo,
            fundraising: fundraising,
            process: processList,
        }

        finalInfo.fundraising.expected_apy = String(finalInfo.fundraising.expected_apy)
        finalInfo.fundraising.min_amount = String(finalInfo.fundraising.min_amount)
        finalInfo.fundraising.max_amount = String(finalInfo.fundraising.max_amount)

        finalInfo.project_info.creater_addr = wallet.account

        finalInfo.process.forEach(item => {
            item.unlock_percentage = String(item.unlock_percentage)
        })
        axios.post('/project/create-project', finalInfo).then(res => {
            setDadaApproved(res.data.is_satisfied)
            setApproveBalance(res.data.approve_balance)
            setCallData(res.data.call_contract)
            setCurrentStep(prev => prev + 1)
        }).catch(error => {
            message.error(error.response.data.error)
        }).finally(() => {
            // clearStorage()
        })
    }

    const clearStorage = () => {
        localStorage.setItem('projectInfo', null)
        localStorage.setItem('fundraising', null)
        localStorage.setItem('processList', null)
        localStorage.setItem('currentStep', null)
    }

    const doApprove = async () => {
        const txnParams = {
            from: wallet.account,
            to: callData[0].contract_addr,
            data: callData[0].call_data
        }
        setCreateLoading(true)
        mm.sendTransaction(
            txnParams,
            'Approve',
        ).then(res => {
            setCreateLoading(false)
            if (res) {
                doPay()
            }
        })
    }

    const doPay = async () => {
        const txnParams = {
            from: wallet.account,
            to: callData[1].contract_addr,
            data: callData[1].call_data
        }
        setCreateLoading(true)

        mm.sendTransaction(
            txnParams,
            'Paying'
        ).then(res => {
            setCreateLoading(false)
            if (res) {
                clearStorage()
                setPayStatus('success')
                setCurrentStep(prev => prev + 1)
            } else {
                setPayStatus('error')
                setCurrentStep(prev => prev + 1)
            }
        })

    }

    // const profitTokenSelect = <Select defaultValue="USDT" value={projectInfo.profit_token} onChange={(val) => { setProjectInfo('profit_token', val) }} className="select-after">
    //     <Select.Option value="USDT">USDT(ERC20)</Select.Option>
    //     <Select.Option value="USDC">USDC</Select.Option>
    //     <Select.Option value="BTC">BTC</Select.Option>
    // </Select>


    return (<div className="create-project-page">
        <Header />

        <div className="container create-project-main">
            <Row gutter={{ md: 36, lg: 64, xl: 160 }} align="center">
                <Col xs={24} md={14}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0" dangerouslySetInnerHTML={{ __html: t('createProject.hint') }}>
                        </div>}
                        {currentStep === 1 && <div className="step-1">
                            <div className="hint-block small">
                                {t('createProject.step1Hint')}

                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.projectName')}</div>
                                <Input value={projectInfo.project_name} onChange={(e) => { changeProjectInfo('project_name', e.target.value) }} style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectIntro')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" placeholder={t('createProject.within140')} value={projectInfo.project_profile} onChange={(e) => { changeProjectInfo('project_profile', e.target.value) }} />
                                <div className="hint red">{t('createProject.projectIntroHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.projectEmail')}</div>
                                <Input value={projectInfo.creater_email} onChange={(e) => { changeProjectInfo('creater_email', e.target.value) }} style={{ width: '360px' }} />
                                <div className="hint red">{t('createProject.projectEmailHint')}</div>
                            </div>
                        </div>}
                        {currentStep === 2 && <div className="step-1">
                            <div className="form-item">
                                <div className="label">{t('createProject.managerName')}</div>
                                <Input value={projectInfo.creater_name} onChange={(e) => { changeProjectInfo('creater_name', e.target.value) }} style={{ width: '360px' }} />
                                <div className="hint red">{t('createProject.managerNameHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.managerBio')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" value={projectInfo.creater_profile} onChange={(e) => { changeProjectInfo('creater_profile', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectDetails')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" value={projectInfo.project_description} onChange={(e) => { changeProjectInfo('project_description', e.target.value) }} />
                                <div className="hint red">{t('createProject.projectDetailsHint')}</div>

                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectStrategy')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" value={projectInfo.project_strategy} onChange={(e) => { changeProjectInfo('project_strategy', e.target.value) }} />
                                <div className="hint red">{t('createProject.projectStrategyHint')}</div>
                            </div>

                            <div className="form-item">
                                <div className="label ">{t('createProject.uploadPlan')}</div>
                                <Upload {...whitePaperUpload}>
                                    <Button className="btn-white" style={{ padding: '0 44px' }}>{t('common.upload')}</Button>
                                    <span style={{ marginLeft: '12px', color: '#707070' }}>*.pdf</span>
                                </Upload>
                                {projectInfo.white_paper && projectInfo.white_paper.file_name && <div className="uploaded-box">
                                    {projectInfo.white_paper.file_name.slice(10)} <CloseCircleOutlined onClick={() => { removeWhitePaper() }} />
                                </div>}
                            </div>
                        </div>}
                        {currentStep === 3 && <div className="step-2">
                            <div className="hint-block small" dangerouslySetInnerHTML={{ __html: t('createProject.step2Hint') }}>
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.nameOfToken')}</div>
                                <Input style={{ width: '360px' }} value={projectInfo.project_token_symbol} onChange={(e) => { changeProjectInfo('project_token_symbol', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.managerAddress')}</div>
                                <Input style={{ width: '500px' }} value={projectInfo.receiver} onChange={(e) => { changeProjectInfo('receiver', e.target.value) }} />
                                <div className="hint red">{t('createProject.managerAddressHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.profitAddress')}</div>
                                <Input style={{ width: '500px' }} value={projectInfo.profit} onChange={(e) => { changeProjectInfo('profit', e.target.value) }} />
                                <div className="hint red">{t('createProject.profitAddressHint')}</div>
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.boardMembers')}</div>
                                {projectInfo.member_address.map((item, index) => <div>
                                    <Input value={item} onChange={(e) => { changeMemberAddress(index, e.target.value) }} style={{ width: '500px', marginBottom: '12px' }} />
                                    {index != projectInfo.member_address.length - 1 && <Popconfirm title={t('createProject.sureToDelete')} onConfirm={() => { removeCouncilMember(index) }}><MinusCircleOutlined className="handle-icon" /></Popconfirm>}
                                    {index == projectInfo.member_address.length - 1 && <PlusCircleOutlined onClick={() => { addCouncilMember() }} className="handle-icon" />}
                                </div>)}

                                <div className="hint">
                                    {t('createProject.boardMembersHint')}
                                </div>
                            </div>
                        </div>}
                        {currentStep === 4 && <div className="step-3">
                            <div className="hint-block small" dangerouslySetInnerHTML={{ __html: t('createProject.step3Hint') }}>

                            </div>

                            <div className="form-item">
                                <div className="label ">{t('createProject.fundraisingPeriod')}</div>
                                <DatePicker.RangePicker showTime value={fundraising.start_time && [moment(fundraising.start_time), moment(fundraising.end_time)]} onChange={value => dateRangeChange('fundraising', value)} />
                                <div className="hint">{t('createProject.fundraisingPeriodHint1')}</div>
                                <div className="hint red">{t('createProject.fundraisingPeriodHint2')}</div>
                            </div>

                            <div className="form-item">
                                <div className="label ">{t('common.apy')}</div>
                                <InputNumber formatter={value => `${value ? value : 0} %`} parser={value => parseInt(value)} value={fundraising.expected_apy} onChange={e => changeFundraising('expected_apy', e)} style={{ width: '180px' }} />
                            </div>

                            <div className="form-item">
                                <div className="label">{t('createProject.fundraisingLimit')}</div>
                                <Input value={fundraising.max_amount} onChange={e => changeFundraising('max_amount', e.target.value)} style={{ width: '300px' }} suffix="USDT" />
                                <div className="hint">
                                    {t('createProject.fundraisingLimitHint')}
                                </div>
                                <div className="hint red">
                                    {t('createProject.fundraisingLimitHint2')}
                                </div>
                            </div>
                            {fundraising.max_amount && <div className="form-item">
                                <div className="label ">{t('createProject.softCap')} <Tooltip title={t('createProject.softCapHover')}><img src={QuestionIcon} /></Tooltip></div>
                                <Slider tipFormatter={(val) => (<span>{val}%</span>)} style={{ width: '360px', }} value={fundraising.softtopPercent} tooltipVisible={true} onChange={value => { fundraisingSofttopChange(value) }} />
                                <div className="softtop-value">{fundraising.min_amount} USDT</div>
                                <div className="hint">
                                    {t('createProject.fundraisingGoalHint')}
                                </div>
                            </div>}
                        </div>}
                        {currentStep === 5 && <div className="step-4">
                            <div className="hint-block small" dangerouslySetInnerHTML={{ __html: t('createProject.step4Hint') }}>
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.redemptionDate')}<Tooltip title={t('createProject.redemptionDateHover')}><img src={QuestionIcon} /></Tooltip></div>
                                <DatePicker value={projectInfo.income_settlement_time && moment(projectInfo.income_settlement_time)} onChange={value => { value && changeProjectInfo('income_settlement_time', value.valueOf()) }} />
                                <div className="hint red">
                                    {t('createProject.redemptionDateHint')}
                                </div>
                            </div>
                            <div className="assets-rule-title">{t('createProject.assetsRuleHint')}</div>
                            {processList.map((item, index) => <>
                                <div className="asset-id"># {index + 1}</div>
                                <div className="assets-rule-item">
                                    {processList.length > 1 && <Popconfirm title={t('createProject.sureToDelete')} onConfirm={() => { removeProcess(index) }}><CloseCircleOutlined className="remove-btn" /></Popconfirm>}
                                    <Row gutter={24}>
                                        {index === 0 ? <Col md={12}>
                                            <div className="form-item">
                                                <div className="label ">{t('createProject.unlockDate')} <Tooltip title={t('createProject.unlockDateHover')}><img src={QuestionIcon} /></Tooltip></div>
                                                <DatePicker disabledDate={current => current && current < moment(fundraising.end_time).add(4, 'days').endOf('day')} value={item.vote_start_time && moment(item.vote_start_time)} onChange={value => { value && changeProcess(index, 'vote_start_time', value.valueOf()); }} />
                                            </div>
                                        </Col> : <Col md={12}>
                                                <div className="form-item">
                                                    <div className="label ">{t('createProject.votingDate')} <Tooltip title={t('createProject.votingDateHover')}><img src={QuestionIcon} /></Tooltip></div>
                                                    <DatePicker.RangePicker disabledDate={current => current && current < moment(fundraising.end_time).add(5, 'days').endOf('day')} value={item.vote_start_time && [moment(item.vote_start_time), moment(item.vote_end_time)]} onChange={value => { value && changeProcess(index, 'vote_start_time', value[0].valueOf()); value && changeProcess(index, 'vote_end_time', value[1].valueOf()) }} />
                                                </div>

                                            </Col>}

                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label ">{t('createProject.shares')} <Tooltip title={t('createProject.sharesHover')}><img src={QuestionIcon} /></Tooltip></div>
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
                        {currentStep === 6 && <div className="step-5">
                            <div className="hint-block small">
                                {t('createProject.step5Hint')}
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.additionalDoc')}</div>
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

                                <div className="hint" style={{ marginTop: '160px' }}>
                                    {t('createProject.additionalDocHint')}
                                </div>
                            </div>
                        </div>}
                        {currentStep === 7 && <div className="step-6">
                            <div className="title">{t('createProject.confirm1')}</div>
                            <div className="confirm-box confirm-box-long" style={{ marginBottom: '72px' }}>
                                <div className="line">
                                    <div className="name">{t('createProject.projectName')}</div>
                                    <div className="value">{projectInfo.project_name}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.projectIntro')}</div>
                                    <div className="value">{projectInfo.project_profile}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.projectEmail')}</div>
                                    <div className="value">{projectInfo.creater_email}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.managerName')}</div>
                                    <div className="value">{projectInfo.creater_name}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.managerBio')}</div>
                                    <div className="value">{projectInfo.creater_profile}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.projectDetails')}</div>
                                    <div className="value">{projectInfo.project_description}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.projectStrategy')}</div>
                                    <div className="value">{projectInfo.project_strategy}</div>
                                </div>
                            </div>
                            <div className="title">{t('createProject.confirm2')}</div>
                            <div className="confirm-box confirm-box-long" style={{ marginBottom: '72px' }}>
                                <div className="line">
                                    <div className="name">{t('createProject.tokenName')}</div>
                                    <div className="value">{projectInfo.project_token_symbol}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingPeriod')}</div>
                                    <div className="value">{new Date(fundraising.start_time).toLocaleDateString()} - {new Date(fundraising.end_time).toLocaleDateString()}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('common.apy')}</div>
                                    <div className="value">{fundraising.expected_apy}%</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingGoal')}</div>
                                    <div className="value">{fundraising.min_amount} USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.fundraisingLimit')}</div>
                                    <div className="value">{fundraising.max_amount} USDT</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.redemptionDate')}</div>
                                    <div className="value">{new Date(projectInfo.income_settlement_time).toLocaleDateString()}</div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.managerAddress')}</div>
                                    <div className="value"><Tooltip title={projectInfo.receiver}>{projectInfo.receiver}</Tooltip></div>
                                </div>
                                <div className="line">
                                    <div className="name">{t('createProject.profitAddress')}</div>
                                    <div className="value"><Tooltip title={projectInfo.profit}>{projectInfo.profit}</Tooltip></div>
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

                            <div className="title">{t('createProject.confirm3')}</div>

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
                                    {index === 0 ? <div className="line">
                                        <div className="name">{t('createProject.unlockDate')}</div>
                                        <div className="value">{new Date(item.vote_start_time).toLocaleDateString()}</div>
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
                            <div>
                                <div className="title" style={{ marginTop: '56px' }}>{t('createProject.additionalDoc')}</div>
                                <div className="confirm-box">
                                    {projectInfo.white_paper && projectInfo.white_paper.file_name.slice(10)}<br />
                                    {projectInfo.other_file.map(item => <div>
                                        {item && item.file_name.slice(10)}
                                    </div>)}
                                </div>
                            </div>

                        </div>}
                        {currentStep === 8 && <div className="step-pay">
                            <div className="dada-circle">
                                {approveBalance} USDT
                            </div>
                            {USDTBalance && <div class="your-balance">
                                {t('common.yourBalance')}:{USDTBalance} USDT
                                </div>}
                            <div className="pay-hint">
                                {t('createProject.payHint')}
                            </div>
                        </div>}
                        {currentStep === 9 && <div className="step-pay">
                            {payStatus === 'success' && <>
                                <div className="dada-circle success">
                                    {t('createProject.paySuccess')}
                                </div>
                                <div className="pay-hint" dangerouslySetInnerHTML={{ __html: t('createProject.paySuccessHint') }}>
                                </div>
                            </>}

                            {payStatus === 'error' && <>
                                <div className="dada-circle error">
                                    {t('createProject.payFailed')}

                                </div>
                                <div className="pay-hint">
                                    {t('createProject.payFailedHint')}
                                </div>
                            </>}

                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {((currentStep > 0 && currentStep < 9) || payStatus === 'error') && <div onClick={() => { setCurrentStep(prev => prev - 1) }} className="line-btn line-btn-back">{t('common.back')} <img src={LinkArrowBack} /></div>}
                        </div>
                        {currentStep < 7 && <div>
                            <div onClick={() => { goNextStep() }} className="line-btn line-btn-next"><img src={LinkArrow} /> {t('common.next')}</div>
                        </div>}
                        {currentStep == 7 && <div>
                            <div onClick={() => { confirmInfo() }} className="btn-confirm"> <span className="text">{t('common.confirmInfo')}</span></div>
                            <span className="hint hint-gasfee" dangerouslySetInnerHTML={{ __html: t('common.gasFeeHint') }}></span>
                        </div>
                        }
                        {currentStep == 8 && <div>
                            {dadaApproved ? <div onClick={() => { !createLoading && doPay() }} className="btn-confirm"> <span className="text">{t('common.pay')}</span></div>
                                : <div onClick={() => { !createLoading && doApprove() }} className="btn-confirm"> <span className="text">{t('common.approve')} {createLoading && <LoadingOutlined />}</span></div>}
                        </div>}
                        {currentStep == 9 && <div>
                            <a href="/">
                                <div className="btn-confirm">
                                    <span className="text">
                                        {t('createProject.backHome')}
                                    </span>
                                </div>
                            </a>

                        </div>}
                    </div>
                </Col>
                <Col xs={24} md={6}>
                    <ul className="step-sidebar">
                        {sidebarList.map((item, index) => <li>
                            <div className={'circle ' + (currentStep === (index + 1) ? 'active ' : '') + (currentStep > (index + 1) ? 'done' : '')}></div>
                            <span className={'stepinfo ' + (currentStep >= (index + 1) ? 'done' : '')}>{item}</span>
                        </li>)}
                    </ul>
                </Col>
            </Row>
        </div>
        {/* <Footer /> */}
    </div>)
}