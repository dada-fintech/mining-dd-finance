import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Input, Upload, message, DatePicker, Tooltip, InputNumber, Popconfirm, Select, Slider } from 'antd'
import LinkArrow from 'assets/link-arrow.svg'
import LinkArrowBack from 'assets/link-arrow-back.svg'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined, MinusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
// import { useWallet } from 'use-wallet'
import QuestionIcon from 'assets/question.svg'
import Header from '../../components/Header'
import moment from 'moment'
// import Footer from '../../components/Footer'
import axios from 'utils/axios'
import mm from 'components/mm'

import './style.scss'

export default function CreateProject() {
    const [currentStep, setCurrentStep] = useState(0)
    const [projectInfo, setProjectInfo] = useState({ member_address: [''], profit_token: 'USDT' })
    const [fundraising, setFundraising] = useState({})
    const [processList, setProcessList] = useState([{}, {}])
    const [approveBalance, setApproveBalance] = useState(0)
    const [dadaApproved, setDadaApproved] = useState(false)
    const [callData, setCallData] = useState(false)


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
        // 进行步骤跳转以及字段校验
        if (currentStep === 1) {
            if (!projectInfo.project_name) {
                message.error('请填写项目名称')
                return false
            }
            if (!projectInfo.project_profile) {
                message.error('请填写项目简介')
                return false
            }
            if (!projectInfo.creater_email) {
                message.error('请填写项目订阅邮箱')
                return false
            }
        }

        if (currentStep === 2) {
            if (!projectInfo.creater_name) {
                message.error('请填写项目发起人姓名')
                return false
            }
            if (!projectInfo.creater_profile) {
                message.error('请填写项目发起人简介')
                return false
            }
            if (!projectInfo.project_description) {
                message.error('请填写项目详情')
                return false
            }
            if (!projectInfo.project_strategy) {
                message.error('请填写项目策略')
                return false
            }
            if (!projectInfo.white_paper) {
                message.error('请上传项目计划书')
                return false
            }
        }

        if (currentStep === 3) {
            if (!projectInfo.project_token_symbol) {
                message.error('请填写项目币名称')
                return false
            }
            if (!projectInfo.receiver) {
                message.error('请填写收款地址')
                return false
            }
            if (!projectInfo.profit) {
                message.error('请填写收益地址')
                return false
            }
            if (!projectInfo.profit_token) {
                message.error('请选择收益币种')
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

        if (currentStep === 4) {
            if (!fundraising.start_time || !fundraising.end_time) {
                message.error('请选择筹款期限')
                return false
            }
            if (!fundraising.max_amount) {
                message.error('请填写最高募集金额')
                return false
            }
            if (!fundraising.min_amount) {
                message.error('请选择最低启动金额')
                return false
            }

            if (!fundraising.expected_apy) {
                message.error('请填写预期APY')
                return false
            }


        }

        if (currentStep === 5) {
            if (!projectInfo.income_settlement_time) {
                message.error('请填写赎回日期')
                return false
            }
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
                totalPercent += Number(item.unlock_percentage)
            })

            console.log(totalPercent, 'total per')
            if (!pass) {
                message.error('请检查所有必填字段')
                return false
            }
            if (totalPercent !== 100) {
                message.error('份额相加需等于100%')
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

                changeProjectInfo('white_paper', { file_name: info.file.response.file_name })
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

    const disable5Days = current => {
        return current && current < moment().add(5, 'days').endOf('day');
    }

    const confirmInfo = () => {
        let finalInfo = {
            project_info: projectInfo,
            fundraising: fundraising,
            process: processList,
        }

        finalInfo.fundraising.expected_apy = String(finalInfo.fundraising.expected_apy)
        finalInfo.fundraising.min_amount = String(finalInfo.fundraising.min_amount)
        finalInfo.fundraising.max_amount = String(finalInfo.fundraising.max_amount)

        finalInfo.project_info.creater_addr = window.ethereum.selectedAddress

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
        })
    }

    const doApprove = async () => {
        const txnParams = {
            from: window.ethereum.selectedAddress,
            to: callData[0].contract_addr,
            data: callData[0].call_data
        }
        await mm.sendTransaction(
            txnParams,
            '授权',
            {
                from: window.ethereum.selectedAddress,
                to: callData[1].contract_addr,
                data: callData[1].call_data
            }
        )
    }

    const doPay = async () => {
        const txnParams = {
            from: window.ethereum.selectedAddress,
            to: callData[1].contract_addr,
            data: callData[1].call_data
        }
        await mm.sendTransaction(
            txnParams,
            '支付中'
        )

    }

    const profitTokenSelect = <Select defaultValue="USDT" value={projectInfo.profit_token} onChange={(val) => { setProjectInfo('profit_token', val) }} className="select-after">
        <Select.Option value="USDT">USDT(ERC20)</Select.Option>
        <Select.Option value="USDC">USDC</Select.Option>
        <Select.Option value="BTC">BTC</Select.Option>
    </Select>


    return (<div className="create-project-page">
        <Header />

        <div className="container create-project-main">
            <Row gutter={{ md: 32 }}>
                <Col xs={24} md={18}>
                    <div className="main-content">
                        {currentStep === 0 && <div className="step-0" dangerouslySetInnerHTML={{ __html: t('createProject.hint') }}>
                        </div>}
                        {currentStep === 1 && <div className="step-1">
                            <div className="hint-block small">
                                这些设置都将展示在项目详情页中，所有设置均为必填项，请规范项目计划书的内容，并确保为PDF格式，我们将会把您上传的内容全部展示出来。
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.projectName')}</div>
                                <Input value={projectInfo.project_name} onChange={(e) => { changeProjectInfo('project_name', e.target.value) }} style={{ width: '360px' }} />
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.projectIntro')}</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" placeholder="限制140字以内" value={projectInfo.project_profile} onChange={(e) => { changeProjectInfo('project_profile', e.target.value) }} />
                                <div className="hint red">*简单介绍项目的概况、优势等，限制字数140字内</div>
                            </div>
                            <div className="form-item">
                                <div className="label ">项目订阅邮箱</div>
                                <Input value={projectInfo.creater_email} onChange={(e) => { changeProjectInfo('creater_email', e.target.value) }} style={{ width: '360px' }} />
                                <div className="hint red">*务必填写一个可验证的邮箱，接收项目的各阶段推送消息</div>
                            </div>
                        </div>}
                        {currentStep === 2 && <div className="step-1">
                            <div className="form-item">
                                <div className="label ">项目发起人姓名</div>
                                <Input value={projectInfo.creater_name} onChange={(e) => { changeProjectInfo('creater_name', e.target.value) }} style={{ width: '360px' }} />
                                <div className="hint red">*请填写真实信息，该信息将会记录到声誉系统中</div>
                            </div>
                            <div className="form-item">
                                <div className="label">项目发起人简介</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" value={projectInfo.creater_profile} onChange={(e) => { changeProjectInfo('creater_profile', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label">项目详情</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" value={projectInfo.project_description} onChange={(e) => { changeProjectInfo('project_description', e.target.value) }} />
                                <div className="hint red">*请详细描述项目相关细节</div>

                            </div>
                            <div className="form-item">
                                <div className="label">项目策略</div>
                                <Input.TextArea autoSize={{ minRows: 6 }} maxLength="140" value={projectInfo.project_strategy} onChange={(e) => { changeProjectInfo('project_strategy', e.target.value) }} />
                                <div className="hint red">*请详细介绍该项目收益策略</div>
                            </div>

                            <div className="form-item">
                                <div className="label ">上传项目计划书</div>
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
                            <div className="hint-block small">
                                这项设置将会配置代表该项目的代币，该代币将可以通过投资筹款来获得。<br />
                                本合约协议体系将会把大部分治理权限授予项目投资人，以保护他们的权益。<br />
                                然而，为了避免一些情况的发生，本项目的变更投票决定必须由发起人或者理事成员公开发起。
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.nameOfToken')}</div>
                                <Input style={{ width: '360px' }} value={projectInfo.project_token_symbol} onChange={(e) => { changeProjectInfo('project_token_symbol', e.target.value) }} />
                            </div>
                            <div className="form-item">
                                <div className="label ">项目经理收款地址</div>
                                <Input style={{ width: '500px' }} value={projectInfo.receiver} onChange={(e) => { changeProjectInfo('receiver', e.target.value) }} />
                                <div className="hint red">*该地址将作为项目唯一指定收款地址，无法更改</div>
                            </div>
                            <div className="form-item">
                                <div className="label ">项目收益地址（共管钱包）</div>
                                <Input style={{ width: '500px' }} value={projectInfo.profit} addonAfter={profitTokenSelect} onChange={(e) => { changeProjectInfo('profit', e.target.value) }} />
                                <div className="hint red">*该地址为项目收益地址，矿池收款地址，务必为可验证的多签共管钱包地址，无法更改</div>
                            </div>
                            <div className="form-item">
                                <div className="label">{t('createProject.boardMembers')}</div>
                                {projectInfo.member_address.map((item, index) => <div>
                                    <Input value={item} onChange={(e) => { changeMemberAddress(index, e.target.value) }} style={{ width: '500px', marginBottom: '12px' }} />
                                    {index != projectInfo.member_address.length - 1 && <Popconfirm title="确定删除该地址吗？" onConfirm={() => { removeCouncilMember(index) }}><MinusCircleOutlined className="handle-icon" /></Popconfirm>}
                                    {index == projectInfo.member_address.length - 1 && <PlusCircleOutlined onClick={() => { addCouncilMember() }} className="handle-icon" />}
                                </div>)}

                                <div className="hint">
                                    最多可添加3个地址，该地址仅具有<strong>创建变更提案投票、上传项目附件</strong>的权限，可为空
                                </div>
                            </div>
                        </div>}
                        {currentStep === 4 && <div className="step-3">
                            <div className="hint-block small">
                                这些设置将会配置该项目的基础信息，并确定代币分发总额，所有的计费参数均以最高募集金额作为基准。<br />
                            为确保项目顺利开展，请认真填写项目收益情况，该设置为项目承诺收益。
                            </div>

                            <div className="form-item">
                                <div className="label ">{t('createProject.fundraisingPeriod')}</div>
                                <DatePicker.RangePicker disabledDate={disable5Days} value={fundraising.start_time && [moment(fundraising.start_time), moment(fundraising.end_time)]} onChange={value => dateRangeChange('fundraising', value)} />
                                <div className="hint">请确认您的筹款开始日期和结束日期</div>
                                <div className="hint red">*项目专业委员会审核期为5天，筹款开始时间需为5个自然日后</div>
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
                                    *审计费用、保证金费用均以该额度作为基准数据
                                </div>
                            </div>
                            {fundraising.max_amount && <div className="form-item">
                                <div className="label ">最低启动金额 <Tooltip title="作为该项目的最低筹资限额"><img src={QuestionIcon} /></Tooltip></div>
                                <Slider tipFormatter={(val) => (<span>{val}%</span>)} style={{ width: '360px', }} value={fundraising.softtopPercent} tooltipVisible={true} onChange={value => { fundraisingSofttopChange(value) }} />
                                <div className="softtop-value">{fundraising.min_amount} USDT</div>
                                <div className="hint">
                                    {t('createProject.fundraisingGoalHint')}
                                </div>
                            </div>}
                        </div>}
                        {currentStep === 5 && <div className="step-4">
                            <div className="hint-block small">
                                这些设置是用来配置项目的阶段性进展与解锁规则，请根据项目计划分阶段填写解锁计划。<br />
                                关于投票期限及解锁日期请认真填写，所有的变更计划只能在进程间添加，请预留充足的时间并做好计划。<br />
                                该环节为项目治理的重要环节，请务必认真填写。<br />
                            </div>
                            <div className="form-item">
                                <div className="label ">{t('createProject.redemptionDate')}</div>
                                <DatePicker value={projectInfo.income_settlement_time && moment(projectInfo.income_settlement_time)} onChange={value => { console.log(value.valueOf()); changeProjectInfo('income_settlement_time', value.valueOf()) }} />
                                <div className="hint red">
                                    *项目专业委员会审核期为5天，筹款开始时间需为5个自然日后
                                </div>
                            </div>
                            <div className="assets-rule-title">{t('createProject.assetsRuleHint')}</div>
                            {processList.map((item, index) => <>
                                <div className="asset-id"># {index + 1}</div>
                                <div className="assets-rule-item">
                                    {processList.length > 1 && <Popconfirm title="确定删除该进程吗？" onConfirm={() => { removeProcess(index) }}><CloseCircleOutlined className="remove-btn" /></Popconfirm>}
                                    <Row gutter={24}>
                                        <Col md={12}>
                                            <div className="form-item">
                                                <div className="label ">{t('createProject.votingDate')} <Tooltip title="该时期为本阶段治理投票的时间区间"><img src={QuestionIcon} /></Tooltip></div>
                                                <DatePicker.RangePicker disabledDate={current => current && current < moment(fundraising.end_time).add(3, 'days').endOf('day')} value={item.vote_start_time && [moment(item.vote_start_time), moment(item.vote_end_time)]} onChange={value => { changeProcess(index, 'vote_start_time', value[0].valueOf()); changeProcess(index, 'vote_end_time', value[1].valueOf()) }} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-item">
                                                <div className="label ">{t('createProject.shares')} <Tooltip title="本阶段放款金额"><img src={QuestionIcon} /></Tooltip></div>
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
                                该设置需要添加更多其他关于项目的证明文件，包括但不限于项目计划书、合规性文件、业绩证明、身份证明等，可以为您的项目顺利开展提供更多的支持。
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
                            <div className="title">项目基础信息</div>
                            <div className="confirm-box confirm-box-long" style={{marginBottom: '72px'}}>
                                <div className="line">
                                    <div className="name">{t('createProject.projectName')}</div>
                                    <div className="value">{projectInfo.project_name}</div>
                                </div>
                                <div className="line">
                                    <div className="name">项目简介</div>
                                    <div className="value">{projectInfo.project_profile}</div>
                                </div>
                                <div className="line">
                                    <div className="name">订阅邮箱</div>
                                    <div className="value">{projectInfo.creater_email}</div>
                                </div>
                                <div className="line">
                                    <div className="name">创建者姓名</div>
                                    <div className="value">{projectInfo.creater_name}</div>
                                </div>
                                <div className="line">
                                    <div className="name">创建者简介</div>
                                    <div className="value">{projectInfo.creater_profile}</div>
                                </div>
                                <div className="line">
                                    <div className="name">项目详情</div>
                                    <div className="value">{projectInfo.project_description}</div>
                                </div>
                                <div className="line">
                                    <div className="name">项目策略</div>
                                    <div className="value">{projectInfo.project_strategy}</div>
                                </div>
                            </div>
                            <div className="title">项目治理信息</div>
                            <div className="confirm-box confirm-box-long" style={{marginBottom: '72px'}}>
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
                                    <div className="name">项目收款地址</div>
                                    <div className="value"><Tooltip title={projectInfo.receiver}>{projectInfo.receiver}</Tooltip></div>
                                </div>
                                <div className="line">
                                    <div className="name">项目收益地址</div>
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

                            <div className="title">资金解锁计划</div>

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
                                    {/* <div className="line">
                                        <div className="name">{t('project.unlockingTime')}</div>
                                        <div className="value">{new Date(item.unlock_time).toLocaleDateString()}</div>
                                    </div> */}
                                    <div className="line">
                                        <div className="name">{t('project.event')}</div>
                                        <div className="value">{item.description}</div>
                                    </div>
                                </div>

                            </>)}
                            <div>
                                <div className="title" style={{ marginTop: '56px' }}>{t('createProject.additionalDoc')}</div>
                                <div className="confirm-box">
                                    {projectInfo.white_paper && projectInfo.white_paper.file_name.slice(10)}<br />{projectInfo.other_file && projectInfo.other_file[0].file_name.slice(10)}
                                </div>
                            </div>

                        </div>}
                        {currentStep === 8 && <div className="step-pay">
                            <div className="dada-circle">
                                {approveBalance} DADA
                            </div>
                            <div className="pay-hint">
                                {t('createProject.payHint')}
                            </div>
                        </div>}
                    </div>
                    <div className="step-control">
                        <div>
                            {currentStep > 0 && <div onClick={() => { setCurrentStep(prev => prev - 1) }} className="line-btn">{t('common.back')} <img src={LinkArrowBack} /></div>}
                        </div>
                        {currentStep < 7 && <div>
                            <div onClick={() => { goNextStep() }} className="line-btn"><img src={LinkArrow} /> {t('common.next')}</div>
                        </div>}
                        {currentStep == 7 && <div>
                            <span className="hint">{t('common.gasFeeHint')}</span>
                            <div onClick={() => { confirmInfo() }} className="line-btn"><img src={LinkArrow} /> {t('common.confirmInfo')}</div>
                        </div>}
                        {currentStep == 8 && <div>
                            {dadaApproved ? <div onClick={() => { doPay() }} className="line-btn"><img src={LinkArrow} /> {t('common.pay')}</div>
                                : <div onClick={() => { doApprove() }} className="line-btn"><img src={LinkArrow} /> {t('common.approve')}</div>}

                        </div>}
                    </div>
                </Col>
                <Col xs={24} md={6}>
                    <ul className="step-sidebar">
                        {sidebarList.map((item, index) => <li>
                            <div className={'circle ' + (currentStep === (index + 1) ? 'active ' : '') + (currentStep > (index + 1) ? 'done' : '')}></div>
                            <span>{item}</span>
                        </li>)}
                    </ul>
                </Col>
            </Row>
        </div>
        {/* <Footer /> */}
    </div>)
}