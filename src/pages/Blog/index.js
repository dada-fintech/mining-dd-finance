import React from 'react'
import AppSidebar from 'components/AppSidebar'
import { Row, Col } from 'antd'
import Header from 'components/Header'
import './style.scss'

const mediaMapping = {
    medium: {
        link: 'medium.com',
        img: '/img/blog/medium.png',
    },
    chainnews:{
        link: 'chainnews.com',
        img:'/img/blog/chainnews.png',
    },
    weixin: {
        link: 'weixin.qq.com',
        img: ''
    }
}

const blogList = [
    {
        title: 'DADA 进军传统行业，将房地产代币化 DAO',
        desc: 'DADA 金融和在迪拜 , 上海和香港有投资咨询公司的 Dynamigs 联手探索通过区块链代币化技术，将尼日利亚的一个大型商城分解成小单元可交易资产的可能性。',
        link: 'https://www.chainnews.com/articles/012620418725.htm',
        img: '/img/blog/5.png',
        source: 'chainnews'
    },
    {
        title: 'Five Mining Projects Kick-starts: Investors Received 177,776 DADA as Rewards',
        desc: 'Hello and happy new year! We are proud to say, in Q4 2020, we completed the raising and governance of 5 mining projects on DADA Finance.',
        link: 'https://ddfinance.medium.com/five-projects-completed-fundraise-and-governance-on-dada-finance-in-q4-2020-d8ded8d66003',
        img: '/img/blog/4.png',
        source: 'medium'
    },
    {
        title: 'DADA Crypto Mining Hedging Strategy Demystified',
        desc: 'The legacy derivatives have futures markets, where the investors long and short the stock to lock in the profits before a rally or a crash. Because Bitcoin behaves like a stock, and its price remains the biggest variable in a miner’s profit, for successful miners, part of their job is to manage risk hedging against the Bitcoin price.',
        link: 'https://ddfinance.medium.com/dada-crypto-mining-hedging-strategy-demystified-f7b7f24ff90b',
        img: '/img/blog/3.png',
        source: 'medium'
    },
    {
        title: 'CeFi, DeFi, or a DAO Platform — Who is the Fastest and Steadiest Horse in 2021？',
        desc: 'In an arena set with negative real interest rates, fund managers and retail investors are racing to the fastest horse under the profit-maximizing strategy.',
        link: 'https://ddfinance.medium.com/cefi-defi-or-a-dao-platform-d1940084e4da',
        source: 'medium'
    },
    {
        title: 'DADA将在Polkadot上推出DAO平台',
        desc: '如果说，互联网实现商业化的原因是连接了信息；那么区块链可以打破数据孤岛，连接互联网和实体资产，链接一切。目前的区块链环境仍处于数据割据状态。而DADA金融正在打造一个互通的DAO协议，旨在为不同的链上项目实现即插即用。跨平台账户数据一体化，并在数据共享过程中通过同态加密进行隐私保护。',
        link: 'https://mp.weixin.qq.com/s/CXRSBC993B3tsEWuAQIgDA',
        img: '/img/blog/2.png',
        source: 'weixin'
    },
    {
        title: 'Open the black box — Are Bitcoin Mining Companies a Good Investment?',
        desc: 'On Nov. 24th, DADA investor, veteran miner Kenny Ge spoke about the consolidation phase mining space is witnessing and his solutions at the BEYOND-2020 Blockchain Industry Summit and Awards Ceremony in Shenzhen.',
        link: 'https://ddfinance.medium.com/open-the-black-box-are-bitcoin-mining-companies-a-good-investment-37bb0db20364',
        img: '/img/blog/1.png',
        source: 'medium'
    },
]

export default function Blog() {
    return (<div className={`blog-page`}>

        <Row>
            <Col lg={4} md={5} xs={0} xxl={3}>
                <AppSidebar />
            </Col>
            <Col lg={20} md={19} xs={24} xxl={21}>
                <div className="content-wrapper">
                    <Header hideAction={true} />
                    <div className="page-title">DADA Blog</div>
                    <div className="page-desc">
                        News, stories, and announcements from DADA.
                    </div>
                    <div className="article-list">
                        {blogList.map((item, index) => (
                            <div key={index} className="article-item">
                                <a target="_blank" className="title" href={item.link}>{item.title}</a>
                                <div className="main-text">
                                    {item.img && <img src={item.img} />}
                                    <div className="text">
                                        {item.desc}
                                    </div>
                                </div>
                                <div className="source">
                                    From {mediaMapping[item.source] && mediaMapping[item.source].link}
                                    {mediaMapping[item.source] && mediaMapping[item.source].img && <img src={mediaMapping[item.source].img}/>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Col>
        </Row>
    </div >)
}