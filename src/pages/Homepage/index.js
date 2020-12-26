import React, { useEffect, useState } from 'react'
import { Row, Col, Progress, Table, } from 'antd'
// import { useWallet } from 'use-wallet'
import AppSidebar from 'components/AppSidebar'
import HomepageBanner from 'assets/homepage-banner.svg'
import { toBr } from 'components/utils'
import axios from 'utils/axios'
import Countdown from 'components/Countdown'

import './style.scss'

export default function Homepage() {
    // const wallet = useWallet()
    const [projectList, setProjectList] = useState([])
    const [allProjects, setAllProjects] = useState({})

    const [featuredProject, setFeaturedProject] = useState({})

    // const [comment, setComment] = useState({})
    // const { t, i18n } = useTranslation()

    useEffect(() => {
        axios.get('/project/active-items').then(res => {
            setProjectList(res.data.ActiveProjectOut.slice(1))
            setFeaturedProject(res.data.ActiveProjectOut[0])
        })
        axios.get('/project/list').then(res => {
            setAllProjects({
                ...res.data,
            })
        })
    }, [])

    const dataSource = [
        {
            project_name: '123123',
            status: '23213',
            expected_apy: '5%',
            end_time: '2012',
        }
    ]

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
        },
        {
            title: '年化收益率',
            dataIndex: 'expected_apy',
            key: 'expected_apy',
            render: (props) => (
                <div className="apy">
                    {props}
                </div>
            )
        },
        {
            title: '项目周期',
            dataIndex: 'end_time',
            key: 'end_time',
            // todo, 这里要改
            render: (props) => (
                <div>
                    {new Date(props).toLocaleDateString()}
                    {/* {new Date(props.end_time).toLocaleDateString()} - {new Date(props.income_settlement_time).toLocaleDateString()} */}
                </div>
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
            <Col md={4} xs={0}>
                <AppSidebar />
            </Col>
            <Col md={20} xs={24}>
                <div className="content-wrapper">
                    <div className="featured-project">
                        <Row>
                            <Col xs={24} md={10}>
                                <div className="title">{featuredProject.project_name}</div>
                                <div className="desc" dangerouslySetInnerHTML={{ __html: toBr(featuredProject.project_profile) }}></div>
                                {featuredProject.income_settlement_time - new Date().valueOf() > 0 && <Countdown timestamp={featuredProject.income_settlement_time - new Date().valueOf()} />}
                                <Progress strokeColor="#4CC16D" status="active" percent={((featuredProject.current_raised_money / featuredProject.max_amount) * 100).toFixed(0)} className="progress-bar" />
                                <a className="join-btn" href={'/project/' + featuredProject.project_uniq_id} key={featuredProject.project_uniq_id}>立即参与</a>
                            </Col>
                            <Col xs={24} md={14}>
                                <img src={HomepageBanner} className="homepage-banner" />
                            </Col>
                        </Row>

                    </div>
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
                                                <div>{formatTime(item.start_time)}</div>
                                                <div className="date-title">开始时间</div>
                                            </div>
                                            <div>
                                                <div>{formatTime(item.income_settlement_time)}</div>
                                                <div className="date-title">结束时间</div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            ))}

                        </Row>

                    </div>
                    <div className="all-projects">
                        <Table pagination={false} dataSource={dataSource || allProjects} columns={columns} />
                    </div>
                </div>
            </Col>
        </Row>
    </div >)
}