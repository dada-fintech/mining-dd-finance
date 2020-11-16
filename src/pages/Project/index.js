import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Progress } from 'antd'
import { useParams } from 'react-router-dom'
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
    const { id } = useParams()
    console.log('pro id', id)
    let project = null
    if (id == 1) {
        project = {
            title: 'BTC矿机托管项目 - 2020年11月13日',
            apy: '10%',
            desc: '新疆矿场50台神马M20s矿机托管项目<br/> 该项目将会采购50台神马M20s矿机并托管在位于新疆的矿场，限量10w美金。',
            fullDesc: `
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
                <img src="/img/mining-rig-1.png"/><br/>
            </div>
            　　
            <img src="/img/return-table-1.png"/><br/>
            
            `,
            process: {
                done: true,

                title: '募集完成',
                amount: '100,000 USDT',
                apy: '10%',
                date: '2021年11月12日',
                target: 100,
                voted: 100,
            }
        }
    } else if (id == 2) {
        project = {
            title: 'BTC矿机托管项目 - 2020年11月28日',
            apy: '15%',
            desc: '新疆矿场50台蚂蚁T19矿机托管项目<br/>该项目将会采购50台蚂蚁T19矿机并托管在位于新疆阿克苏的矿场，限量20w美金。',
            fullDesc: `
            <div class="text-line">
            <div class="title">基金发起人</div>
            <p>
            袁孝华<br/>
            从事加密数字货币行业6年，在四川和新疆运行矿机。
            </p>
            
            </div>
            <div class="text-line">
                <div class="title">
                项目描述
                </div>
                <p>本项目以整机矿机为服务单元，提供矿机的限时使用权转让服务。用户不会获得任何矿机本体，所有矿机将部署在新疆阿克苏矿场，投资者将获得相应矿机的使用权，并在投资期限内获得本基金承诺收益。</p>
            </div>
            <div class="text-line">
            <div class="title">
            项目策略
            </div>
            <p>当前神马矿机报价约为15000-17000元/台，故本项目拟筹资200000美金作为项目启动费用，其中100000美金作为矿机采购费用，另外100000美金作为套保币价使用。收益周期为12个月，年化收益率为15%，届时将会公示采购及收益记录。</p>
            
            </div>
            <div class="detail-line">
            <img class="mining-full" src="/img/mining-3.jpeg"/>
            </div>
            
            <p>本项目拟采购50台蚂蚁T19作为投资标的矿机，蚂蚁矿机作为比特大陆的明星产品，多年来占有大量市场份额，19系列更是当前最高性价比的大算力机型之一。</p>
            <p>本项目所采购的型号参数如下：</p>
            <div class="detail-line">
                <div>
            蚂蚁T19-84T 官方参数(标准模式）<br/>
            
                　　算力：84T ±3%<br/>
                
                　　功耗：3150W ± 5%<br/>
                
                　　功耗比：37.5W/T<br/>
                </div>
                <img src="/img/mining-rig-2.png"/><br/>
            </div>
            　　
            <img src="/img/return-table-2.png"/><br/>
            `,
            process: {
                done: false,
                title: '募资进行中',
                amount: '200,000 USDT',
                apy: '15%',
                date: '2021年11月12日',
                target: 100,
                voted: 0,
            }
        }
    }

    return (<div className="project-page">
        <Header />

        <div className="container">
            <div className="project-main">
                <Row gutter={24}>
                    <Col md={18}>
                        <div className="project-intro">
                            <div className="top">
                                <div className="title">{project.title}</div>
                                <div className="apy">年化收益率 {project.apy}</div>
                            </div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: project.desc }}></div>
                            <ul className="tabs">
                                <li className={currentTab === 'process' && 'active'} onClick={() => { setCurrentTab('process') }}>项目进程</li>
                                <li className={currentTab === 'detail' && 'active'} onClick={() => { setCurrentTab('detail') }}>项目详情</li>
                                <li className={currentTab === 'vote' && 'active'} onClick={() => { setCurrentTab('vote') }}>Vote</li>
                                <li className={currentTab === 'comments' && 'active'} onClick={() => { setCurrentTab('comments') }}>Comments</li>
                            </ul>
                        </div>
                        <div className="project-content">
                            {currentTab === 'vote' && <VoteModule />}
                            {currentTab === 'process' && <ProcessModule process={project.process} />}
                            {currentTab === 'detail' && <DetailModule fullDesc={project.fullDesc} />}
                            {currentTab === 'comments' && <CommentsModule />}
                        </div>
                    </Col>
                    <Col md={6}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>

        </div>
        <Footer />
    </div>)
}