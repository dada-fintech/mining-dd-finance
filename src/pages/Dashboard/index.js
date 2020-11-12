import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Progress } from 'antd'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import VoteModule from './modules/Vote'
import ProcessModule from './modules/Process'
import DetailModule from './modules/Detail'
import CommentsModule from './modules/Comments'



import './style.scss'

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState('vote')
    return (<div className="dashboard-page">
        <Header />

        <div className="container">
            <Row gutter={24}>
                <Col md={18}>
                    <div className="project-intro">
                        <div className="top">
                            <div className="title">MINE FUND - October 01, 2020</div>
                            <div className="apy">Except APY 15%</div>
                        </div>
                        <div className="desc">
                            The fund will provide investors with access to physical mines, quality mines and miners that will provide rich returns for each investor.
                        </div>
                        <ul className="tabs">
                            <li className={currentTab === 'vote' && 'active'} onClick={() => { setCurrentTab('vote') }}>Vote</li>
                            <li className={currentTab === 'process' && 'active'} onClick={() => { setCurrentTab('process') }}>Process</li>
                            <li className={currentTab === 'detail' && 'active'} onClick={() => { setCurrentTab('detail') }}>Project detail</li>
                            <li className={currentTab === 'comments' && 'active'} onClick={() => { setCurrentTab('comments') }}>Comments</li>
                        </ul>
                    </div>
                    <div className="project-content">
                        {currentTab === 'vote' && <VoteModule/>}
                        {currentTab === 'process' && <ProcessModule/>}
                        {currentTab === 'detail' && <DetailModule/>}
                        {currentTab === 'comments' && <CommentsModule/>}
                    </div>
                </Col>
                <Col md={6}>
                    <Sidebar />
                </Col>
            </Row>
        </div>
        <Footer />
    </div>)
}