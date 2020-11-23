import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Tooltip, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import LinkArrow from 'assets/link-arrow.svg'
import OngoingImg from 'assets/ongoing-img.svg'
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

    // useEffect(() => {

    //     //实现project-item的随滚轮渐入效果
    //     const rows = document.querySelectorAll('.project-item');
    //     const elem = document.documentElement;

    //     document.addEventListener('scroll', (e) => {
    //         let scrolled = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);

    //         let total = 0.8 / rows.length;

    //         for (let [index, row] of rows.entries()) {
    //             let start = total * index;
    //             let end = total * (index + 1);

    //             let progress = (scrolled - start) / (end - start);

    //             if (progress >= 1) progress = 1;
    //             if (progress <= 0) progress = 0;

    //             row.style.setProperty('--progress', progress)
    //         }
    //     })
    //     //
    // }, [])



    // const wallet = useWallet()
    return (<div className="homepage">
        <div className="banner">
            <Header />
            <div className="container">
                <Row type="flex" align="middle">
                    <Col md={12}>
                        <div className="banner-title">
                            矿业<span className="highlight">生态</span><br />
                            聚合器
                        </div>
                        <ul className="feature-list">
                            <li>去中心化自治</li>
                            <li>锁定合约规则</li>
                            <li>整合链下资源</li>
                            <li>构建声誉网络</li>
                            <li>全链路透明</li>
                            <li>让矿圈出圈</li>
                        </ul>
                    </Col>
                    <Col md={12} style={{ textAlign: 'right' }}>
                        <div className="banner-btn">
                            <div>
                                <img src={LinkArrow} />即刻参与
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>
        <div className="section-projects">
            <div className="container">
                <Row gutter={92}>
                    <Col md={18} style={{ marginTop: '120px' }}>
                        <div className="project-list">
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
                                        <Progress strokeColor="#3FAA4D" status="active" percent={((item.current_raised_money / item.hardtop) * 100).toFixed(0)} className="progress-bar" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="section-title">
                            <span>
                                可参与项目
                                </span></div>
                        <ul className="feature-list">
                            <li>甄选品质项目</li>
                            <li>充分尽职背调</li>
                            <li>唯一身份验证</li>
                            <li>声誉网络背书</li>
                            <li>详尽项目策略</li>
                            <li>收益更轻松</li>
                        </ul>
                        <div className="handle-btn">
                            <img src={LinkArrow} /> 查看更多
                    </div>
                    </Col>
                </Row>
            </div>


        </div>
        <div className="section-ongoing">
            <div className="container">
                <Row gutter={44}>
                    <Col md={6}>
                        <div className="section-title"><span>进行中项目</span></div>
                        <ul className="feature-list">
                            <li>全程投票自治</li>
                            <li>参与项目决策</li>
                            <li>推进项目发展</li>
                            <li>权益转让自由</li>
                            <li>资产托管安全</li>
                            <li>信息更透明</li>
                        </ul>
                        <div className="handle-btn">
                            <img src={LinkArrow} /> 参与治理
                    </div>
                    </Col>
                    <Col md={18}>
                        <img src={OngoingImg} />
                    </Col>
                </Row>
            </div>
        </div>
        <div className="section-about">

        </div>
        <div className="section-contact">

        </div>
        <Footer />
    </div >)
}