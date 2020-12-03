import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'utils/axios'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import VoteModule from './modules/Vote'
import ProcessModule from './modules/Process'
import DetailModule from './modules/Detail'
import CommentsModule from './modules/Comments'



import './style.scss'

export default function Project() {
    const [currentTab, setCurrentTab] = useState('process')
    const [project, setProject] = useState({})
    const { id } = useParams()
    const { t } = useTranslation()
    useEffect(() => {
        axios.get('/project/detail/' + id).then(res => {
            setProject({
                ...res.data,
                percent: parseInt((res.data.fundraising.current_raised_money / res.data.fundraising.max_amount) * 100),
                fullDesc: `https://mining-api.dd.finance/project/download/${res.data.project_info.project_uniq_id}/${res.data.project_info.white_paper.file_name}`
            }
            )
        })
    }, [])

    return (<div className="project-page">
        <Header />

        <div className="container">
            <div className="project-main">
                <Row gutter={{ md: 24, lg: 24 }}>
                    <Col xs={24} md={16} lg={18}>
                        <div className="project-intro">
                            <div className="top">
                                <div className="title">{project.project_info && project.project_info.project_name}</div>
                                <div className="apy">{t('common.apy')} {project.project_info && project.project_info.expected_apy}%</div>
                            </div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: project.project_info && project.project_info.description }}></div>
                            <div className="votes-bar">
                                <div className="done" style={{ width: project.percent + '%' }}></div>
                            </div>
                            <div className="process-tag" style={{ marginLeft: (project.percent > 50 ? (project.percent - 5) : project.percent) + '%' }}>
                                {project.percent}%
                </div>
                            <ul className="tabs">
                                <li className={currentTab === 'process' && 'active'} onClick={() => { setCurrentTab('process') }}>{t('project.progress')}</li>
                                <li className={currentTab === 'detail' && 'active'} onClick={() => { setCurrentTab('detail') }}>{t('project.details')}</li>
                                <li className={currentTab === 'vote' && 'active'} onClick={() => { setCurrentTab('vote') }}>{t('project.vote')}</li>
                                <li className={currentTab === 'comments' && 'active'} onClick={() => { setCurrentTab('comments') }}>{t('project.comments')}</li>
                            </ul>
                        </div>
                        <div className="project-content">
                            {currentTab === 'vote' && <VoteModule />}
                            {currentTab === 'process' && <ProcessModule id={id} processList={project.process || []} />}
                            {currentTab === 'detail' && <DetailModule fullDesc={project.fullDesc} />}
                            {currentTab === 'comments' && <CommentsModule />}
                        </div>
                    </Col>
                    <Col xs={24} md={8} lg={6}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>

        </div>
        <Footer />
    </div>)
}