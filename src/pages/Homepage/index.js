import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Tooltip, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'utils/axios'

import './style.scss'

export default function Homepage() {
    const wallet = useWallet()
    const [projectList, setProjectList] = useState([])
    const { t } = useTranslation()

    useEffect(() => {
        axios.get('/project/active-items').then(res => {
            setProjectList(res.data.ActiveProjectOut)
        })

    }, [])

    useEffect(() => {

        //实现project-item的随滚轮渐入效果
        const rows = document.querySelectorAll('.project-item');
        const elem = document.documentElement;

        document.addEventListener('scroll', (e) => {
            let scrolled = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);

            let total = 0.8 / rows.length;

            for (let [index, row] of rows.entries()) {
                let start = total * index;
                let end = total * (index + 1);

                let progress = (scrolled - start) / (end - start);

                if (progress >= 1) progress = 1;
                if (progress <= 0) progress = 0;

                row.style.setProperty('--progress', progress)
            }
        })
        //
    }, [])



    // const wallet = useWallet()
    return (<div className="homepage">
        <div className="banner">
            <Header />
            <div className="container">
                <div className="title">
                    {t('banner.title')}
                </div>
                <div className="subtitle">
                    {t('banner.subtitle')}
                </div>
                {wallet.status === 'connected' ? <Tooltip placement="bottom" title={window.ethereum.selectedAddress}><Button className="btn-green btn-action">{t('common.walletConnected')}</Button> </Tooltip> : <Button className="btn-green btn-action" onClick={() => { wallet.connect() }}>{t('common.connectWallet')}</Button>}
                {/* {wallet.status === 'connected' ?  : <div></div>} */}
            </div>
        </div>
        <div className="container">
            <Row gutter={{ md: 32, lg: 80 }} className="feature-list">
                <Col xs={24} md={8}>
                    <div className="feature-item">
                        <div className="title">
                            {t('feature.1.title')}
                        </div>
                        <div className="desc">
                            {t('feature.1.desc')}
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <div className="feature-item">
                        <div className="title">
                            {t('feature.2.title')}
                        </div>
                        <div className="desc">
                            {t('feature.2.desc')}
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <div className="feature-item">
                        <div className="title">
                            {t('feature.3.title')}

                        </div>
                        <div className="desc">
                            {t('feature.3.desc')}

                        </div>
                    </div>
                </Col>
            </Row>
        </div>


        <div className="active-project-section">
            <div className="container">
                <div className="content-container">
                    <h2 className="section-title">{t('onGoingProjects')}</h2>
                    {projectList.map(item => (
                        <div className="project-item">
                            <div className="top">
                                <div className="title">
                                    <div className="project-name">{item.project_name}</div>
                                    <div className="date">&nbsp; - {new Date(item.start_time * 1000).toLocaleDateString()}</div>
                                </div>
                                <div className="info">
                                    <div className="apy">{t('common.apy')} {item.expected_apy}%</div>
                                </div>
                            </div>
                            <div className="desc">
                                {item.description}
                            </div>
                            <div className="bottom">
                                <a href={'/project/' + item.project_uniq_id}>
                                    <Button className="btn-trans">{t('common.viewAll')}</Button>
                                </a>
                                <Progress strokeColor="#3FAA4D" status="active" percent={((item.current_raised_money / item.hardtop) * 100).toFixed(0)} className="progress-bar" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* 
        <div className="voting-project-section">
            <div className="container">
                <div className="content-container">
                    <h2 className="section-title">VOTING PROJECT</h2>
                    <div className="section-subtitle">
                        Projects under verification
            </div>
                    <div className="project-item">
                        <div className="top">
                            <div className="title">
                                <div className="project-name">MINE FUND - PIP-3</div>
                                <div className="date">&nbsp;- October 01, 2020</div>
                            </div>
                            <div className="info">
                                <div className="votes-available">YOU HAVE 1,592 VOTES</div>
                            </div>
                        </div>
                        <div className="desc">
                            The fund will provide investors with access to physical mines, quality mines and miners that will provide rich returns for each investor.
                </div>
                        <div className="bottom">
                            <Button className="btn-trans">View project</Button>
                            <div className="votes-num">
                                15,321,987 Votes
                            </div>
                        </div>
                    </div>
                    <div className="project-item">
                        <div className="top">
                            <div className="title">
                                <div className="project-name">MINE FUND - PIP-21</div>
                                <div className="date">&nbsp;- November 11, 2020</div>
                            </div>
                            <div className="info">
                                <div className="votes-none">YOU HAVE NO VOTES</div>
                            </div>
                        </div>
                        <div className="desc">
                            The fund will provide investors with access to physical mines, quality mines and miners that will provide rich returns for each investor.
                </div>
                        <div className="bottom">
                            <Button className="btn-trans">View project</Button>
                            <div className="votes-num">
                                15,321,987 Votes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
         */}
        <Footer />
    </div >)
}