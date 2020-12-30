import React, { useEffect, useState } from 'react'
import { Row, Col, Progress, Table, } from 'antd'
// import { useWallet } from 'use-wallet'
import AppSidebar from 'components/AppSidebar'
import HomepageBanner from 'assets/homepage-banner.svg'
import { useTranslation } from 'react-i18next'
import { toBr } from 'components/utils'
import { Link } from 'react-router-dom'
import axios from 'utils/axios'
import Header from 'components/Header'
import Countdown from 'components/Countdown'

import './style.scss'

export default function Homepage() {
    // const wallet = useWallet()
    const [projectList, setProjectList] = useState([])
    const [allProjects, setAllProjects] = useState([])

    const [featuredProject, setFeaturedProject] = useState({})
    const { i18n } = useTranslation()

    const isEn = i18n.language === 'en'
    const statusMapping = {
        'auditing': isEn ? 'Auditing' : '委员会审核中',
        'future': isEn ? 'Project Coming Soon' : '项目即将到来',
        'raising': isEn ? 'In Mid of Fundraising' : '正在筹款',
        'payingInsurance': isEn ? 'Depositing to the Reserve' : '支付安全达',
        'active': isEn ? 'Active' : '进行中',
        'rolling': isEn ? 'Voting On-going' : '正在投票',
        'allPhasesDone': isEn ? 'Project Completes. Waiting for the Redemption' : '项目计划完成，等待获取报酬',
        'repaying': isEn ? 'Users are Receiving the Redemption' : '用户获取回报',
        'finished': isEn ? 'Project Completed' : '项目已完成',
        'refunding': isEn ? 'Refunding' : '退款中',
        'phaseFailed': isEn ? 'Stage Goal Failed' : '进程失败',
        'replanNoticing': isEn ? 'Update to Change the Plan' : '更改计划公示',
        'replanVoting': isEn ? 'Voting on Changing the Plan' : '更改计划投票',
        'replanFailed': isEn ? 'Failed to Change the Plan' : '更改计划失败',
        'liquidating': isEn ? 'Liquidating' : '清算中',
        'failed': isEn ? 'Failed' : '项目失败',
        'preDefined': isEn ? 'On-going' : '进行中',
        // front end defined
        'empty': isEn ? 'None' : '无'
    }

    useEffect(() => {
        axios.get('/project/list').then(res => {
            setProjectList(res.data.filter(item => item.status == 'canInvest'))
            setAllProjects(res.data.filter(item => item.status != 'canInvest'))

            const futureProjects = res.data.filter(item => item.status == 'canInvest')

            if (futureProjects.length > 0) {
                setFeaturedProject(futureProjects[0])
            } else {
                setFeaturedProject('')
            }
        })
    }, [])

    const columns = [
        {
            title: '项目名称（代币名称）',
            dataIndex: 'project_name',
            key: 'project_name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: props => (
                <span>
                    {statusMapping[props] ? statusMapping[props] : props}
                </span>
            )
        },
        {
            title: '年化收益率',
            dataIndex: 'expected_apy',
            key: 'expected_apy',
            render: (props) => (
                <div className="apy">
                    {props}%
                </div>
            )
        },
        {
            title: '项目周期',
            dataIndex: 'end_time',
            key: 'end_time',
            // todo, 这里要改
            render: (props, record) => (
                <div>
                    {new Date(record.project_start_time).toLocaleDateString()} - {new Date(record.project_end_time).toLocaleDateString()}
                </div>
            )
        },
        {
            title: ' ',
            dataIndex: 'action',
            key: 'action',
            // todo, 这里要改
            render: (props, record) => (
                <Link to={`/project/${record.project_uniq_id}`}>
                    详情
                </Link>
            )
        },
    ];


    // const leaveComment = () => {
    //     axios.post('/comment/main-page', comment).then(res => {
    //         message.success(t('common.submitted'))
    //         setComment({})
    //     })
    // }

    // const commentChange = (name, value) => {
    //     setComment(prev => {
    //         return {
    //             ...prev,
    //             [name]: value,
    //         }
    //     })
    // }

    const formatTime = (time) => {
        const myDate = new Date(time)
        return `${myDate.toLocaleDateString()} ${myDate.getHours()}:${myDate.getMinutes()}`
    }

    // const wallet = useWallet()
    return (<div className="homepage">
        <Row>
            <Col lg={4} md={5} xs={0} xxl={3}>
                <AppSidebar />
            </Col>
            <Col lg={20} md={19} xs={24} xxl={21}>
                <div className="content-wrapper">
                    <Header hideAction={true} />
                    {featuredProject && <div className="featured-project">
                        <Row>
                            <Col xs={24} md={10}>
                                <div className="title">{featuredProject.project_name}</div>
                                <div className="desc" dangerouslySetInnerHTML={{ __html: toBr(featuredProject.project_profile) }}></div>
                                {featuredProject.raise_start_time - new Date().valueOf() > 0 && <Countdown timestamp={featuredProject.raise_start_time - new Date().valueOf()} />}
                                <Progress strokeColor="#4CC16D" status="active" percent={((featuredProject.current_raised_money / featuredProject.max_amount) * 100).toFixed(0)} className="progress-bar" />
                                <a className="join-btn" href={'/project/' + featuredProject.project_uniq_id} key={featuredProject.project_uniq_id}>立即参与</a>
                            </Col>
                            <Col xs={24} md={14}>
                                <img src={HomepageBanner} className="homepage-banner" />
                            </Col>
                        </Row>
                    </div>}

                    <div className="project-list">
                        <Row gutter={28}>
                            {projectList && projectList.map(item => (
                                <Col xs={24} sm={12} md={8}>
                                    <div className="project-item">
                                        <div className="project-name">{item.project_name}</div>
                                        <div className="desc" dangerouslySetInnerHTML={{ __html: toBr(item.project_profile) }}>
                                        </div>
                                        <Progress strokeColor="#4CC16D" status="active" percent={((item.current_raised_money / item.max_amount) * 100).toFixed(0)} className="progress-bar" />
                                        <a className="join-btn" href={'/project/' + item.project_uniq_id} key={item.project_uniq_id}>立即参与</a>
                                        <div className="date-wrapper">
                                            <div>
                                                <div>{formatTime(item.raise_start_time)}</div>
                                                <div className="date-title">开始时间</div>
                                            </div>
                                            <div>
                                                <div>{formatTime(item.project_end_time)}</div>
                                                <div className="date-title">结束时间</div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            ))}

                        </Row>

                    </div>
                    <div className="all-projects">

                        <Table pagination={false} dataSource={allProjects} columns={columns} />
                    </div>
                </div>
            </Col>
        </Row>
    </div >)
}