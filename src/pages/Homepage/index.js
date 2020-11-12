import React, {useEffect} from 'react'
import { Button, Row, Col, Progress } from 'antd'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './style.scss'

export default function Homepage() {
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
                    MINING ECOSYSTEM AGGREGATOR
            </div>
                <div className="subtitle">
                    Find the best investment for every investor
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
                                <div className="project-name">MINE FUND APG</div>
                                <div className="date">&nbsp;- October 01, 2020</div>
                            </div>
                            <div className="info">
                                <div className="apy">Expected APY 15%</div>
                            </div>
                        </div>
                        <div className="desc">
                            The fund will provide investors access to buy the newest miners. The fund will be distributed into 3 stages.
                </div>
                        <div className="bottom">
                            <Button className="btn-trans">View project</Button>
                            <Progress strokeColor="#3FAA4D" status="active" percent={42} className="progress-bar" />
                        </div>
                    </div>
                    <div className="project-item">
                        <div className="top">
                            <div className="title">
                                <div className="project-name">Sichuan Mine Construction</div>
                                <div className="date">&nbsp;- October 01, 2020</div>
                            </div>
                            <div className="info">
                                <div className="apy">Expected APY 25%</div>
                            </div>
                        </div>
                        <div className="desc">
                            The fund is dedicated to building a government-proved data center in Sichuan.
                </div>
                        <div className="bottom">
                            <Button className="btn-trans">View project</Button>
                            <Progress strokeColor="#3FAA4D" status="active" percent={56} className="progress-bar" />
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
        <Footer />
    </div>)
}