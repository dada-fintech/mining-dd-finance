import React from 'react'
import { Row, Col } from 'antd'
import Header from 'components/Header'
import MediaChainnews from 'assets/medias/chainnews.svg'
import MediaOdaily from 'assets/medias/odaily.svg'
import MediaTheblock from 'assets/medias/theblock.svg'
import MediaSosob from 'assets/medias/sosob.svg'

import './style.scss'

const mediaMapping = {
    medium: {
        link: 'medium.com',
        img: '/img/blog/medium.png',
    },
    chainnews: {
        link: 'chainnews.com',
        img: '/img/blog/chainnews.png',
    },
    weixin: {
        link: 'weixin.qq.com',
        img: ''
    }
}

const blogList = [
    {
        title: 'Crypto Market Value Hits Record $1T, Here Comes the Liquidity Provider to the Real-Economy',
        desc: 'In an epic crypto boom, DADA Finance is the only DeFi platform that does not profit from just loaning and trading, but by growing real value in the real economy —Bitcoin, Ethereum mining, and more, with 20% APY.',
        link: 'https://ddfinance.medium.com/crypto-market-value-hits-record-1t-hear-the-sound-of-reason-39946aab376',
        img: '/img/blog/11.png',
        source: 'medium'
    },
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
        source: 'medium',
        img: '/img/blog/10.png',
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
    {
        title: '三分钟了解 DeFi 一站式智能投顾平台 DADA',
        desc: 'DADA 金融和在迪拜 , 上海和香港有投资咨询公司的 Dynamigs 联手探索通过区块链代币化技术，将尼日利亚的一个大型商城分解成小单元可交易资产的可能性。',
        link: 'https://www.chainnews.com/articles/809652537467.htm',
        img: '/img/blog/12.png',
        source: 'chainnews'
    },
    {
        title: 'Bulk preorders for the latest bitcoin ASIC miners are sold out until next spring',
        desc: 'DAO 在信息不对称领域可发挥重要作用，加密货币矿业可将矿机、矿场、矿池等生产数据上链，为 DAO 治理提供可靠数据。',
        link: 'https://www.chainnews.com/articles/896772592545.htm',
        img: '/img/blog/13.png',
        source: 'chainnews'
    },
]

export default function Blog() {
    return (<div className={`blog-page`}>

        <Header hideAction={true} />
        <div className="page-title">DADA Blog</div>
        <div className="page-desc">
            News, stories, and announcements from DADA.
                    </div>
        <Row gutter={{lg: 44}}>
            <Col xs={24} lg={18}>
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
                                {mediaMapping[item.source] && mediaMapping[item.source].img && <img src={mediaMapping[item.source].img} />}
                            </div>
                        </div>
                    ))}
                </div>
            </Col>
            <Col xs={0} lg={6}>
                <div className="media-list">
                    <a href="https://www.chainnews.com/u/785055704172.htm" target="_blank">
                        <img src={MediaChainnews} />
                    </a>
                    <a href="https://www.odaily.com/post/5160033" target="_blank">
                        <img src={MediaOdaily} />
                    </a>
                    <a href="https://www.theblockcrypto.com/post/84781/bulk-preorders-bitcoin-miners-spring-2021" target="_blank">
                        <img src={MediaTheblock} />
                    </a>
                    <a href="https://www.sosob.com/hot/26028.html" target="_blank">
                        <img src={MediaSosob} />
                    </a>
                </div>
            </Col>
        </Row>



    </div >)
}