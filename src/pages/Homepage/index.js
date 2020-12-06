import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Tooltip, Progress, Input, Checkbox, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useWallet } from 'use-wallet'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import LinkArrow from 'assets/link-arrow.svg'
import OngoingImg from 'assets/ongoing-img.svg'
import OngoingImgEn from 'assets/ongoing-img-en.svg'
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
    const { t, i18n } = useTranslation()

    useEffect(() => {
        axios.get('/project/active-items').then(res => {
            setProjectList(res.data.ActiveProjectOut)
        })

    }, [])

    const leaveComment = () => {
        axios.post('/comment/main-page', comment).then(res => {
            message.success(t('common.submitted'))
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
        <div className="social-icons left-icons">
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
            <a className="line-top-bottom" href="https://doc.dd.finance">{t('common.readTheDoc')}</a>
        </div>
        <div className="banner">
            <Header />

            <div className="container">
                <Row type="flex" align="middle" justify="center">
                    <Col xs={24} md={24} align="center">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="353" height="98.572" viewBox="0 0 353 98.572">
                        <defs>
                            <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                            <stop offset="0" stop-color="#48cccc"/>
                            <stop offset="1" stop-color="#273460"/>
                            </linearGradient>
                        </defs>
                        <g id="组_166" data-name="组 166" transform="translate(-760 -183)">
                            <path id="路径_990" data-name="路径 990" d="M3533.834,5465.443H3478V5367h55.833a7.346,7.346,0,0,1,7.346,7.347v83.75a7.347,7.347,0,0,1-7.346,7.347Zm-51.426-94.036v89.627h49.221a5.516,5.516,0,0,0,5.51-5.51v-78.608a5.516,5.516,0,0,0-5.51-5.509Z" transform="translate(-2718 -5184)" fill="url(#linear-gradient)"/>
                            <path id="路径_992" data-name="路径 992" d="M3533.834,5465.443H3478V5367h55.833a7.346,7.346,0,0,1,7.346,7.347v83.75a7.347,7.347,0,0,1-7.346,7.347Zm-51.426-94.036v89.627h49.221a5.516,5.516,0,0,0,5.51-5.51v-78.608a5.516,5.516,0,0,0-5.51-5.509Z" transform="translate(-2525.889 -5184)" fill="url(#linear-gradient)"/>
                            <path id="路径_989" data-name="路径 989" d="M3482.409,5465.572h0a7.35,7.35,0,0,1-4.407-6.735v-84.491a7.346,7.346,0,0,1,7.346-7.347h51.793a7.346,7.346,0,0,1,7.347,7.347v84.491a7.346,7.346,0,0,1-4.041,6.562v-47.7h-58.037Zm5.51-94.131a5.516,5.516,0,0,0-5.51,5.51v36.681h58.037v-36.681a5.516,5.516,0,0,0-5.51-5.51Z" transform="translate(-2623.598 -5184)" fill="url(#linear-gradient)"/>
                            <path id="路径_991" data-name="路径 991" d="M3482.409,5465.572h0a7.35,7.35,0,0,1-4.407-6.735v-84.491a7.346,7.346,0,0,1,7.346-7.347h51.793a7.346,7.346,0,0,1,7.347,7.347v84.491a7.346,7.346,0,0,1-4.041,6.562v-47.7h-58.037Zm5.51-94.131a5.516,5.516,0,0,0-5.51,5.51v36.681h58.037v-36.681a5.516,5.516,0,0,0-5.51-5.51Z" transform="translate(-2431.486 -5184)" fill="url(#linear-gradient)"/>
                        </g>
                    </svg>
                        {i18n.language === 'zh' ? <div className="banner-title">
                            矿业生态聚合器
                        </div> : <div className="banner-title">
                                Crypto Mining Aggregator
                        </div>}

                        <div className="subtitle">{t('homepage.subtitle')}</div>
                        <a href="/create-project" className="banner-btn">
                            <div className="btn-before">
                                <span>{t('common.createNewProject')}</span>
                            </div>
                        </a>
                        {/* <ul className="feature-list">
                            <li>{t('homepage.banner.feature.1')}</li>
                            <li>{t('homepage.banner.feature.2')}</li>
                            <li>{t('homepage.banner.feature.3')}</li>
                            <li>{t('homepage.banner.feature.4')}</li>
                            <li>{t('homepage.banner.feature.5')}</li>
                            <li className="li-line">{t('homepage.banner.feature.6')}</li>
                        </ul>
                        <a className="line-top-bottom" href="https://doc.dd.finance">{t('common.readTheDoc')}</a> */}
                    </Col>
                    {/* <Col xs={24} md={10} style={{ textAlign: 'right' }}>
                        <a href="/create-project" className="banner-btn">
                            <div className="btn-before">
                                <span>{t('common.createNewProject')}</span>
                            </div>
                        </a>
                    </Col> */}
                </Row>
            </div>
        </div>
        <div className="section-projects">
            <img src={ProjectListTriangle} className="triangle" />
            <div className="container">
                <Row gutter={{ md: 24, lg: 96 }} justify="end">

                    <Col md={17} lg={15}>
                        <div className="show-on-mobile">
                            <div className="section-title">
                                <span>
                                    {t('homepage.inFundraisingTitle')}
                                </span></div>
                            <ul className="feature-list">
                                <li>{t('homepage.inFundraising.1')}</li>
                                <li>{t('homepage.inFundraising.2')}</li>
                                <li>{t('homepage.inFundraising.3')}</li>
                                <li>{t('homepage.inFundraising.4')}</li>
                                <li>{t('homepage.inFundraising.5')}</li>
                                <li>{t('homepage.inFundraising.6')}</li>
                            </ul>
                            <div className="handle-btn">
                                <img src={LinkArrow} /> {t('common.toReadMore')}
                            </div>
                        </div>
                        <div className="project-list">
                            {projectList && projectList.map(item => (
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
                                    <div className="bottom">
                                        <Progress strokeColor="#3FAA4D" status="active" percent={((item.current_raised_money / item.hardtop) * 100).toFixed(0)} className="progress-bar" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </Col>
                    <Col xs={0} md={7} lg={7}>
                        <div className="section-title">
                            <span>
                                {t('homepage.inFundraisingTitle')}
                            </span></div>
                        <ul className="feature-list">
                            <li>{t('homepage.inFundraising.1')}</li>
                            <li>{t('homepage.inFundraising.2')}</li>
                            <li>{t('homepage.inFundraising.3')}</li>
                            <li>{t('homepage.inFundraising.4')}</li>
                            <li>{t('homepage.inFundraising.5')}</li>
                            <li>{t('homepage.inFundraising.6')}</li>
                        </ul>
                        <div className="handle-btn">
                            <img src={LinkArrow} /> {t('common.toReadMore')}
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
                        <div className="section-title"><span>{t('homepage.onGoingTitle')}</span></div>
                        <ul className="feature-list">
                            <li>{t('homepage.onGoing.1')}</li>
                            <li>{t('homepage.onGoing.2')}</li>
                            <li>{t('homepage.onGoing.3')}</li>
                            <li>{t('homepage.onGoing.4')}</li>
                            <li>{t('homepage.onGoing.5')}</li>
                        </ul>
                        <div className="handle-btn">
                            <img src={LinkArrow} /> {t('common.participateGov')}
                        </div>
                    </Col>
                    <Col md={18}>
                        {i18n.language === 'zh' ? <img src={OngoingImg} /> : <img src={OngoingImgEn} />}
                    </Col>
                </Row>
            </div>
        </div>
        <div className="section-about">
            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <div className="section-title">
                        <span>
                            {t('homepage.safd.title')}
                        </span>
                    </div>
                </div>
                <Row align="middle">
                    <Col xs={24} md={12}>
                        <div className="desc">
                            {t('homepage.safd.subtitle')}
                        </div>
                        <div className="slogan">
                            {t('homepage.safd.slogan.1')}
                            <br />
                            <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                <div className="with-line"><span>{t('homepage.safd.slogan.2')}</span></div>
                            </div>
                        </div>
                        <div className="handle-btn">
                            <img src={LinkArrow} /> {t('common.toLearnMore')}
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
                <Row gutter={{ md: 24 }}>
                    <Col xs={24} md={12}>
                        <div className="section-title">
                            <span>{t('homepage.contact.title')}</span>
                        </div>
                        <div className="desc" dangerouslySetInnerHTML={{ __html: t('homepage.contact.desc') }}>
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
                            {t('homepage.contact.thanks')}
                        </div>
                        <Row gutter={{ md: 32 }}>
                            <Col md={10}>
                                <div className="form-item">
                                    <div className="form-item-title">
                                        {t('homepage.contact.form.lastName')}
                                    </div>
                                    <Input className="form-input" value={comment.first_name} onChange={e => commentChange('first_name', e.target.value)} />
                                </div>
                            </Col>
                            <Col md={14}>
                                <div className="form-item">
                                    <div className="form-item-title">
                                        {t('homepage.contact.form.firstName')}
                                    </div>
                                    <Input className="form-input" value={comment.last_name} onChange={e => commentChange('last_name', e.target.value)} />
                                </div>
                            </Col>
                        </Row>
                        <div className="form-item">
                            <div className="form-item-title">
                                {t('homepage.contact.form.email')}

                            </div>
                            <Input className="form-input" value={comment.mail_box} onChange={e => commentChange('mail_box', e.target.value)} />
                        </div>
                        <div className="form-item">
                            <div className="form-item-title">
                                {t('homepage.contact.form.message')}

                            </div>
                            <Input.TextArea autoSize={{ minRows: 4 }} className="form-input" value={comment.message} onChange={e => commentChange('message', e.target.value)} />
                        </div>
                        <div className="form-item">
                            <Checkbox style={{ color: '#273460' }} onChange={e => commentChange('accept_notify', e.target.checked)}>
                                {t('homepage.contact.form.checkHint')}
                            </Checkbox>
                        </div>
                        <div className="action-btn" onClick={() => { leaveComment() }}>
                            <img src={LinkArrow} /> {t('homepage.contact.form.message')}
                        </div>
                    </Col>
                </Row>

            </div>


        </div>
        <Footer />
    </div >)
}