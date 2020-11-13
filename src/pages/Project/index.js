import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Progress } from 'antd'
import { useParams } from 'react-router-dom'
// import { useWallet } from 'use-wallet'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
// import VoteModule from './modules/Vote'
import ProcessModule from './modules/Process'
import DetailModule from './modules/Detail'
// import CommentsModule from './modules/Comments'



import './style.scss'

export default function Project() {
    const [currentTab, setCurrentTab] = useState('process')
    const { id } = useParams()
    console.log('pro id', id)
    let project = null
    if (id == 1) {
        project = {
            title: 'BTC矿机托管项目 - 2020年11月13日',
            apy: '18%',
            desc: '新疆矿场100台神马M20s矿机托管项目<br/>该项目将会采购100台神马M20s矿机并托管在位于新疆的矿场，限量10w美金。',
            fullDesc: `
            <p>挖矿行业发展到现阶段，已经高度集中化、规模化和专业化，不仅如此，城市电费高企，一般矿工及投资者缺乏对矿机的运维能力，个人散户的参与成本越来越高。因此，将矿机放置矿场进行托管就成为一种经济又便捷的方式。</p>
            <p>本项目以整机矿机为服务单元，提供矿机的限时使用权转让服务。用户不会获得任何矿机本体，所有矿机已经部署在新疆矿场，投资者将获得相应矿机的使用权，并在投资期限内获得矿机所有的实际挖矿收益。</p>
            <div class="detail-line">
            <img class="mining-full" src="/img/mining-3.jpeg"/>
            </div>
            <p>本项目拟采购100台神马M31s+作为投资标的矿机，神马矿机一直属于BTC挖矿行业的翘楚品牌，高算力，高性价比的特性已经得到了市场的认可。</p>
            <div class="detail-line">
                <div>
                本项目所采购的型号参数如下：<br/>
                　　神马M20S-68T 官方参数(标准模式）<br/>
                
                　　算力：80T ±5%<br/>
                
                　　功耗：3360W ±10%<br/>
                
                　　功耗比：42W/T<br/>
                </div>
                <img src="/img/mining-rig-2.png"/><br/>
            </div>
            　　
            <img src="/img/return-table-2.png"/><br/>
            
            <p>当前神马矿机报价约为12000-16000元/台，故本项目拟筹资200000美金作为项目启动费用，收益周期为6个月，预期年化收益率为20%，届时将会公示采购及收益记录。</p>
            `
        }
    } else if (id == 2) {
        project = {
            title: 'BTC矿机托管项目 - 2020年11月13日',
            apy: '15%',
            desc: '新疆矿场100台神马M20s矿机托管项目<br/>该项目将会采购100台神马M20s矿机并托管在位于新疆的矿场，限量10w美金。',
            fullDesc: `
            <p>挖矿行业发展到现阶段，已经高度集中化、规模化和专业化，不仅如此，城市电费高企，一般矿工及投资者缺乏对矿机的运维能力，个人散户的参与成本越来越高。因此，将矿机放置矿场进行托管就成为一种经济又便捷的方式。</p>
            <p>本项目以整机矿机为服务单元，提供矿机的限时使用权转让服务。用户不会获得任何矿机本体，所有矿机已经部署在新疆矿场，投资者将获得相应矿机的使用权，并在投资期限内获得矿机所有的实际挖矿收益。</p>
            
            <div class="detail-line">
            <img class="mining-img" src="/img/mining-1.jpeg"/>
            <img class="mining-img" src="/img/mining-2.jpeg"/>
            </div>
            
            <p>本项目拟采购100台神马M20s作为投资标的矿机，神马矿机一直属于BTC挖矿行业的翘楚品牌，高算力，高性价比的特性已经得到了市场的认可。</p>
            <div class="detail-line">
                <div>
            本项目所采购的型号参数如下：<br/>
            
            神马M20S-68T 官方参数(标准模式）<br/>
            
                　　算力：68T ±5%<br/>
                
                　　功耗：3260W ±10%<br/>
                
                　　功耗比：48W/T<br/>
                </div>
                <img src="/img/mining-rig.png"/><br/>
            </div>
            　　
            <img src="/img/return-table.png"/><br/>
            
            <p>当前神马矿机报价约为6000-8000元/台，故本项目拟筹资100000美金作为项目启动费用，收益周期为6个月，预期年化收益率为18%，届时将会公示采购及收益记录。</p>
            `
        }
    }

    return (<div className="project-page">
        <Header />

        <div className="container">
            <Row gutter={24}>
                <Col md={18}>
                    <div className="project-intro">
                        <div className="top">
                            <div className="title">{project.title}</div>
                            <div className="apy">Expected APY {project.apy}</div>
                        </div>
                        <div className="desc" dangerouslySetInnerHTML={{ __html: project.desc }}></div>
                        <ul className="tabs">
                            <li className={currentTab === 'process' && 'active'} onClick={() => { setCurrentTab('process') }}>Process</li>
                            <li className={currentTab === 'detail' && 'active'} onClick={() => { setCurrentTab('detail') }}>Detail</li>
                            {/* <li className={currentTab === 'vote' && 'active'} onClick={() => { setCurrentTab('vote') }}>Vote</li> */}
                            {/* <li className={currentTab === 'comments' && 'active'} onClick={() => { setCurrentTab('comments') }}>Comments</li> */}
                        </ul>
                    </div>
                    <div className="project-content">
                        {/* {currentTab === 'vote' && <VoteModule/>} */}
                        {currentTab === 'process' && <ProcessModule />}
                        {currentTab === 'detail' && <DetailModule fullDesc={project.fullDesc} />}
                        {/* {currentTab === 'comments' && <CommentsModule/>} */}
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