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
                percent: parseInt((res.data.fundraising.current_raised_money / res.data.fundraising.hardtop) * 100),
                fullDesc: `
                        <div>(此处为示范，后期会改成PDF形式)<br/><br/></div>
                        <div class="text-line">
                        <div class="title">基金发起人</div>
                        <p>
                            范喜明<br/>2017年进入数字货币挖矿行业，目前管理算力超过300P。
                        </p>
                        
                        </div>
                        <div class="text-line">
                        <div class="title">项目描述</div>
                        <p>本项目以整机矿机为服务单元，提供矿机的限时使用权转让服务。用户不会获得任何矿机本体，所有矿机将部署在新疆准东矿场，投资者将获得相应矿机的使用权，并在投资期限内获得本基金承诺收益。</p>
                        
                        </div>
            
                        <div class="text-line">
                        <div class="title">项目策略</div>
                        <p>当前神马矿机报价约为6000-8000元/台，故本项目拟筹资100000美金作为项目启动费用，其中50000美金作为矿机采购费用，另外50000美金作为套保币价使用。收益周期为12个月，年化收益率为10%，届时将会公示采购及收益记录。</p>
                        
                        </div>
                        <div class="detail-line">
                        <img class="mining-img" src="/img/mining-1.jpeg"/>
                        <img class="mining-img" src="/img/mining-2.jpeg"/>
                        </div>
            
                        <p>本项目拟采购50台神马M20s作为投资标的矿机，神马矿机一直属于BTC挖矿行业的翘楚品牌，高算力，高性价比的特性已经得到了市场的认可。</p>
                        <p>本项目所采购的型号参数如下：</p>
                        <div class="detail-line">
                            <div>
                            　　神马M20S-68T 官方参数(标准模式）<br/>
                            
                            　　算力：68T ±5%<br/>
                            
                            　　功耗：3260W ±10%<br/>
                            
                            　　功耗比：48W/T<br/>
                            </div>
                            <img class="mining-rig" src="/img/mining-rig-1.png"/><br/>
                        </div>
                        　　
                        <img src="/img/return-table-1.png"/><br/>
                        `
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