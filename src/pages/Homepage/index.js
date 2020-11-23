import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Tooltip, Progress, Input, Checkbox, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import LinkArrow from 'assets/link-arrow.svg'
import OngoingImg from 'assets/ongoing-img.svg'
import AboutImg from 'assets/about-img.svg'
import Twiiter from '../../assets/socials/twitter.svg'
import Discord from '../../assets/socials/discord.svg'
import Medium from '../../assets/socials/medium.svg'
import Telegram from '../../assets/socials/telegram.svg'

import ProjectListTriangle from '../../assets/project-list-triangle.svg'
import OngoingTriangle from '../../assets/ongoing-triangle.svg'


import Footer from '../../components/Footer'
import axios from 'utils/axios'

import './style.scss'

export default function Homepage() {
    const wallet = useWallet()
    const [projectList, setProjectList] = useState([])
    const [comment, setComment] = useState({})
    const { t } = useTranslation()

    useEffect(() => {
        axios.get('/project/active-items').then(res => {
            setProjectList(res.data.ActiveProjectOut)
        })

    }, [])

    const leaveComment = () => {
        axios.post('/comment/main-page', comment).then(res => {
            message.success('留言成功！')
            setComment({})
        })
    }

    const commentChange = (name, value) => {
        setComment(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    // const wallet = useWallet()
    return (<div className="homepage">
        <div className="banner">
            <Header />
            <div className="container">
                <Row type="flex" align="middle">
                    <Col xs={24} md={12}>
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
                    <Col xs={24} md={12} style={{ textAlign: 'right' }}>
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
            <img src={ProjectListTriangle} className="triangle" />
            <div className="container">
                <Row gutter={{md: 24, lg:64}}>
                    <Col md={17} lg={18}>
                        <div className="show-on-mobile">
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
                            </div>
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
                    <Col xs={0} md={7} lg={6}>
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
            <img src={OngoingTriangle} className="triangle" />
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
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <div className="section-title">
                        <span>
                            关于安全达（SAFD）
                    </span>
                    </div>
                </div>
                <Row align="middle">
                    <Col xs={24} md={12}>
                        <div className="desc">
                            安全达（SAFD）是DADA推出的一项为保障投资人本金而设立的专项赔付体系，为此我们做了充足的准备，为每一位投资人提供最安心的投资保障。
                        </div>
                        <div className="slogan">
                            为共同构建最优质的信誉体系<br />
                            <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                <div className="with-line"><span>提供最充足的保障</span></div>
                            </div>
                        </div>
                        <div className="handle-btn">
                            <img src={LinkArrow} /> 了解更多
                    </div>

                    </Col>
                    <Col xs={24} md={12}>
                        <img src={AboutImg} className="about-img" />
                    </Col>
                </Row>
            </div>

        </div>
        <div className="section-contact">
            <div className="container">
                <Row gutter={{md: 24}}>
                    <Col xs={24} md={12}>
                        <div className="section-title">
                            <span>联系我们</span>
                        </div>
                        <div className="desc">
                            如果您对我们感兴趣<br />
                        如果您对我们有建议<br />
                        如果您对我们有帮助<br /><br />
                        欢迎联系我们！
                    </div>

                        <div className="social-icons">
                            <a target="_blank" href="https://twitter.com/FinanceDada">
                                <img src={Twiiter} className="social-icon" />
                            </a>
                            <a target="_blank">
                                <img src={Discord} className="social-icon" />
                            </a>
                            <a target="_blank">
                                <img src={Medium} className="social-icon" />
                            </a>
                            <a target="_blank">
                                <img src={Telegram} className="social-icon" />
                            </a>
                        </div>

                        <ul className="emails">
                            <li><a href="mailto:contact@dd.finance">contact@dd.finance</a></li>
                            <li><a href="mailto:media@dd.finance">media@dd.finance</a></li>
                        </ul>



                    </Col>
                    <Col xs={24} md={12}>
                        <div className="form-title">
                            非常感谢您对我们的支持！
                    </div>
                        <Row gutter={{md: 32}}>
                            <Col md={10}>
                                <div className="form-item">
                                    <div className="form-item-title">
                                        姓
                                </div>
                                    <Input className="form-input" value={comment.first_name} onChange={e => commentChange('first_name', e.target.value)} />
                                </div>
                            </Col>
                            <Col md={14}>
                                <div className="form-item">
                                    <div className="form-item-title">
                                        名
                                </div>
                                    <Input className="form-input" value={comment.last_name} onChange={e => commentChange('last_name', e.target.value)} />
                                </div>
                            </Col>
                        </Row>
                        <div className="form-item">
                            <div className="form-item-title">
                                邮箱
                                </div>
                            <Input className="form-input" value={comment.mail_box} onChange={e => commentChange('mail_box', e.target.value)} />
                        </div>
                        <div className="form-item">
                            <div className="form-item-title">
                                留言
                                </div>
                            <Input.TextArea autoSize={{ minRows: 4 }} className="form-input" value={comment.message} onChange={e => commentChange('message', e.target.value)} />
                        </div>
                        <div className="form-item">
                            <Checkbox style={{ color: '#273460' }} onChange={e => commentChange('accept_notify', e.target.checked)}>勾选时将会接受新项目推送</Checkbox>
                        </div>
                        <div className="action-btn" onClick={() => { leaveComment() }}>
                            <img src={LinkArrow} /> 留言
                        </div>
                    </Col>
                </Row>

            </div>


        </div>
        <Footer />
    </div >)
}