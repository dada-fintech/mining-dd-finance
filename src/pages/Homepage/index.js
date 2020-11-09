import React from 'react'
import { Button, Row, Col, Progress } from 'antd'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'

export default function Homepage() {
    // const wallet = useWallet()
    return (<div className="homepage">
        <div className="banner">
            <Header />
            <div className="container">
                <div className="title">
                    MINING ECOLOGICAL AGGREGATOR
            </div>
                <div className="subtitle">
                    We find a good investment for every investor
            </div>
                <Button className="btn-green">Connect wallet and find more</Button>
                {/* {wallet.status === 'connected' ?  : <div></div>} */}
            </div>
        </div>
        <div className="container">
            <Row gutter={{ md: 32, lg: 80 }} className="feature-list">
                <Col xs={24} md={8}>
                    <div className="feature-item">
                        <div className="title">
                            New Project
    </div>
                        <div className="desc">
                            Create a new investment for the other invest.
    </div>
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <div className="feature-item">
                        <div className="title">
                            Join the investment
    </div>
                        <div className="desc">
                            Find a good investment to get your asset more.
    </div>
                    </div>
                </Col>
                <Col xs={24} md={8}>
                    <div className="feature-item">
                        <div className="title">
                            Polling vote
    </div>
                        <div className="desc">
                            To pooling vote for your project and advance.
    </div>
                    </div>
                </Col>
            </Row>
        </div>


        <div className="active-project-section">
            <div className="container">
                <div className="content-container">
                    <h2 className="section-title">ACTIVE PROJECT</h2>
                    <div className="section-subtitle">
                        Projects in progress
            </div>
                    <div className="project-item">
                        <div className="top">
                            <div className="title">
                                MINE FUND APG
                    </div>
                            <div className="info">
                                <div className="apy">Except APY 15%</div>
                                <div className="date">October 01, 2020</div>
                            </div>
                        </div>
                        <div className="desc">
                            The fund will provide investors access to buy the newest miners. The fund will be distributed into 3 stages.
                </div>
                        <div className="bottom">
                            <Button className="btn-trans">View project</Button>
                            <Progress strokeColor="#3FAA4D" percent={42} className="progress-bar" />
                        </div>
                    </div>
                    <div className="project-item">
                        <div className="top">
                            <div className="title">
                                Sichuan Mine Construction
                    </div>
                            <div className="info">
                                <div className="apy">Except APY 25%</div>
                                <div className="date">October 01, 2020</div>
                            </div>
                        </div>
                        <div className="desc">
                            The fund is dedicated to building a government-proved data center in Sichuan.
                </div>
                        <div className="bottom">
                            <Button className="btn-trans">View project</Button>
                            <Progress strokeColor="#3FAA4D" percent={56} className="progress-bar" />
                        </div>
                    </div>
                </div>
            </div>

        </div>


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
                                MINE FUND - PIP-3 - October 01, 2020
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
                                MINE FUND - PIP-21 - November 11, 2020
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
        <Footer />
    </div>)
}