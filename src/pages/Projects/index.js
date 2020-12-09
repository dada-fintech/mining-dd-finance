/*
 * @Author: your name
 * @Date: 2020-12-05 22:48:58
 * @LastEditTime: 2020-12-06 19:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mining-dd-finance\src\pages\Projects\index.js
 */
import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Button, message } from 'antd'

import LinkArrow from 'assets/link-arrow.svg'
import ProjectsTop from 'assets/projects-top.svg'

import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import axios from 'utils/axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'

export default function Projects() {
    const [currentTab, setCurrentTab] = useState('can_invest_project')
    const [projects, setProjects] = useState({})
    const locate = useLocation()

    const { t } = useTranslation()
    useEffect(() => {
        axios.get('/project/list').then(res => {
            setProjects({
                ...res.data,
            }
            )
        })

        if(locate.search){
            setCurrentTab(locate.search.split('=')[1])
        }
    }, [])

    return (<div className="projects-page">
        <div className="top-area">
            <Header />
            <div className="container">
                <div className="project-intro">
                    <div className="top">
                        <div className="title with-line"><span>项目列表</span></div>
                    </div>
                    <Row type="flex" justify="space-around">
                        <Col md={8}>
                            <div className="desc">
                                臻选好项目<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;收益更轻松
                            </div>
                        </Col>
                        <Col md={8}>
                            <img src={ProjectsTop} className="top-img"/>
                        </Col>

                    </Row>

                </div>
            </div>
        </div>
        <div className="middle-area">
            <div className="container">
                <ul className="tabs">
                    {projects.can_invest_project && <li className={currentTab === 'can_invest_project' && 'active'} onClick={() => { setCurrentTab('can_invest_project') }}>可参与</li>}
                    {projects.active_project && <li className={currentTab === 'active_project' && 'active'} onClick={() => { setCurrentTab('active_project') }}>运行中</li>}
                    {projects.finished_project && <li className={currentTab === 'finished_project' && 'active'} onClick={() => { setCurrentTab('finished_project') }}>已完成</li>}
                </ul>
                <div>
                    <ul className="tabs">
                        {projects.auditing_project && <li className={currentTab === 'auditing_project' && 'active'} onClick={() => { setCurrentTab('auditing_project') }}>公示中-审核期</li>}
                    </ul>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="project-list">
                {projects && projects[currentTab] && projects[currentTab].map(item => (
                    <a className="project-item" href={'/project/' + item.project_uniq_id} key={item.project_uniq_id}>
                        <div className="top">
                            <div className="title">
                                <div className="project-name">{item.project_name}</div>
                                <div className="date">&nbsp; - {new Date(item.start_time).toLocaleDateString()}</div>
                            </div>
                            <div className="info">
                                <div className="apy">{t('common.apy')} {item.expected_apy}%</div>
                            </div>
                        </div>
                        <div className="desc">
                            {item.description}
                        </div>
                        <div className="go-detail">
                            <img src={LinkArrow} /> 
                        </div>
                    </a>
                ))}
            </div>
        </div>
        <Footer />
    </div>)
}