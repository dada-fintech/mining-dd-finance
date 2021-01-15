import React, { useEffect, useState } from 'react'
import { Row, Col, Progress, Table, } from 'antd'
// import { useWallet } from 'use-wallet'
import HomepageBanner from 'assets/homepage-banner.svg'
import { useTranslation } from 'react-i18next'
import { toBr } from 'components/utils'
import { Link } from 'react-router-dom'
import axios from 'utils/axios'
import Header from 'components/Header'
import Countdown from 'components/Countdown'
import config from 'config'

import './style.scss'

export default function Projects() {
    // const wallet = useWallet()
    const [projectList, setProjectList] = useState([])
    const [allProjects, setAllProjects] = useState([])

    const [featuredProject, setFeaturedProject] = useState({})
    const [featuredCountdown, setFeaturedCountdown] = useState(0)

    const { i18n, t } = useTranslation()

    const isEn = i18n.language === 'en'
    const statusMapping = {
        'auditing': isEn ? 'Auditing' : '委员会审核中',
        'future': isEn ? 'Project Coming Soon' : '项目即将到来',
        'raising': isEn ? 'In Mid of Fundraising' : '正在筹款',
        'payingInsurance': isEn ? 'Depositing to the Reserve' : '支付押金',
        'active': isEn ? 'Active' : '进行中',
        'rolling': isEn ? 'Voting On-going' : '正在投票',
        'allPhasesDone': isEn ? 'Governance completed. Waiting for the Redemption' : '项目计划完成，等待获取报酬',
        'repaying': isEn ? 'Users are Receiving the Redemption' : '用户获取回报',
        'finished': isEn ? 'Governance completed' : '项目已完成',
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
            // setProjectList(res.data.filter(item => item.status == 'canInvest'))
            // setAllProjects(res.data.filter(item => item.status != 'canInvest'))
            if (!res.data) {
                return
            }
            setProjectList(res.data.slice(0, 3))
            setAllProjects(res.data)
            var futureProjects = []
            if (config.featuredId) {
                futureProjects = res.data.filter(item => item.project_uniq_id)
            } else {
                futureProjects = res.data.filter(item => (item.status == 'canInvest' || item.status == 'raising' || item.status == 'active'))
            }

            if (futureProjects.length > 0) {
                setFeaturedProject(futureProjects[0])
                const status = futureProjects[0].status
                const dateNow = new Date().valueOf()
                let time = 0
                if (status === 'canInvest') {
                    time = futureProjects[0].raise_start_time - dateNow
                } else if (status === 'raising') {
                    time = futureProjects[0].project_start_time - dateNow
                } else if (status === 'active') {
                    time = futureProjects[0].project_end_time - dateNow
                } else if (status === 'allPhaseDone') {
                    time = futureProjects[0].project_end_time - dateNow
                }
                setFeaturedCountdown(time)
            } else {
                setFeaturedProject('')
            }
        })
    }, [])

    const columns = [
        {
            title: t('project.name'),
            dataIndex: 'project_name',
            key: 'project_name',
        },
        {
            title: t('project.status'),
            dataIndex: 'status',
            key: 'status',
            render: props => (
                <span>
                    {statusMapping[props] ? statusMapping[props] : props}
                </span>
            )
        },
        {
            title: t('common.apy'),
            dataIndex: 'expected_apy',
            key: 'expected_apy',
            render: (props) => (
                <div className="apy">
                    {props}%
                </div>
            )
        },
        {
            title: t('sidebar.cycle'),
            dataIndex: 'end_time',
            key: 'end_time',
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
            render: (props, record) => (
                <Link to={`/project/${record.project_uniq_id}`}>
                    {t('common.detail')}
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
        const myHour = myDate.getHours()
        const myMinutes = myDate.getMinutes()
        return `${myDate.toLocaleDateString()} ${myHour <= 9 ? '0' + myHour : myHour}:${myMinutes <= 9 ? '0' + myMinutes : myMinutes}`
    }

    // const wallet = useWallet()
    return (<div className="projects">

        <Header hideAction={true} />
        {featuredProject && <div className="featured-project">
            <Row>
                <Col xs={24} md={10}>
                    <div className="title">{featuredProject.project_name}</div>
                    <div className="desc" dangerouslySetInnerHTML={{ __html: toBr(featuredProject.project_profile) }}></div>
                    {featuredCountdown > 0 && <Countdown timestamp={featuredCountdown} />}
                    {(featuredProject.status === 'raising' || featuredProject.status === 'canInvest') && <Progress strokeColor="#4CC16D" status="active" percent={((featuredProject.current_raised_money / featuredProject.max_amount) * 100).toFixed(0)} className="progress-bar" />}
                    <Link className="join-btn" to={'/project/' + featuredProject.project_uniq_id} key={featuredProject.project_uniq_id}>{t('common.viewProject')}</Link>
                </Col>
                <Col xs={24} md={14}>
                    <img src={HomepageBanner} className="homepage-banner" />
                </Col>
            </Row>
        </div>}

        <div className="project-list">
            <Row gutter={28}>
                {projectList && projectList.map(item => (
                    <Col xs={24} sm={12} md={24} lg={12} xl={8}>
                        <div className="project-item">
                            <div className="project-name nowrap">{item.project_name}</div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: toBr(item.project_profile) }}>
                            </div>
                            {(item.status === 'raising' || item.status === 'canInvest') && <Progress strokeColor="#4CC16D" status="active" percent={((item.current_raised_money / item.max_amount) * 100).toFixed(0)} className="progress-bar" />}
                            <a className="join-btn" href={'/project/' + item.project_uniq_id} key={item.project_uniq_id}>{t('common.viewProject')}</a>
                            <div className="date-wrapper">
                                <div>
                                    <div>{formatTime(item.raise_start_time)}</div>
                                    <div className="date-title">{t('common.fundStartTime')}</div>
                                </div>
                                <div>
                                    <div>{formatTime(item.project_end_time)}</div>
                                    <div className="date-title">{t('common.fundEndTime')}</div>
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

    </div >)
}