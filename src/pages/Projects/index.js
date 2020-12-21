/*
 * @Author: your name
 * @Date: 2020-12-05 22:48:58
 * @LastEditTime: 2020-12-06 19:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mining-dd-finance\src\pages\Projects\index.js
 */
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'

import LinkArrow from 'assets/link-arrow.svg'
import ProjectsTop from 'assets/projects-top.svg'
import ProjectsEmpty from 'assets/project-empty.svg'

import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import axios from 'utils/axios'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'
import ProjectFooter from "../../components/ProjectFooter";

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

        if (locate.search) {
            setCurrentTab(locate.search.split('=')[1])
        }
    }, [])

    return (<div className="projects-page">
        <div className="top-area">
            <Header />
            <div className="container">
                <div className="project-intro">
                    <div className="top">
                        <div className="title with-line"><span>{t('projectList.title')}</span></div>
                    </div>
                    <Row type="flex" justify="space-around">
                        <Col xs={24} md={12} lg={12}>
                            <div className="desc">
                                {t('projectList.slogan1')}<br />
                                &nbsp;&nbsp;{t('projectList.slogan2')}
                            </div>
                        </Col>
                        <Col xs={0} md={0} lg={4}>
                            <img src={ProjectsTop} className="top-img" />
                        </Col>

                    </Row>

                </div>
            </div>
        </div>
        <div className="middle-area">
            <div className="container">
                <ul className="tabs">
                    <li className={currentTab === 'can_invest_project' && 'active'} onClick={() => { setCurrentTab('can_invest_project') }}>{t('project.category.open')}</li>
                    <li className={currentTab === 'active_project' && 'active'} onClick={() => { setCurrentTab('active_project') }}>{t('project.category.ongoing')}</li>
                    <li className={currentTab === 'finished_project' && 'active'} onClick={() => { setCurrentTab('finished_project') }}>{t('project.category.completed')}</li>
                </ul>
                <div>
                    <ul className="tabs">
                        <li className={currentTab === 'auditing_project' && 'active'} onClick={() => { setCurrentTab('auditing_project') }}>{t('project.category.announced')}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="project-list">
                {projects && projects[currentTab] ? projects[currentTab].map(item => (
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
                )) : <div className="projects-empty">
                        <img src={ProjectsEmpty} />
                        <div>{t('hint.projectsEmpty')}</div>

                    </div>}
            </div>
        </div>
        <ProjectFooter />
    </div>)
}