import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useWallet } from 'use-wallet';
import { Empty, Row, Col } from 'antd';
import * as Tools from '../../utils/Tools';
import './index.scss';
import Item from 'antd/lib/list/Item';
import merchdao from '../../assets/logo/merchdao.png';
import oddz from '../../assets/logo/oddz.png';

import binance from '../../assets/network/binance.png';
import Ethereum from '../../assets/network/Ethereum.png';
import heco from '../../assets/network/heco.png';

const CryptoMining = () => {
    const { t } = useTranslation();
    // const wallet = useWallet();
    // const { account, status } = wallet;
    const getPpentime = (time) => {
        if (Tools.sub(time, Tools.div(new Date().getTime(), 1000)) >= 0) {
            return Math.ceil(Tools.sub(time, Tools.div(new Date().getTime(), 1000)) / 86400);
        } else {
            return 0;
        }
    }
    const UpcomingProjects = [
        {
            url: "https://lepricon.io/",
            name: "lepriconio",
            opentime: getPpentime(1615910400),
            network: Ethereum,
            logo: "https://lepricon.io/wp-content/uploads/2021/01/logo-lepricon.png"
        },
        // {
        //     url: "https://deeper.network/",
        //     name: "Deeper network",
        //     opentime: getPpentime(1615910400),
        //     network: Ethereum,
        //     logo: "https://deeper.network/public/img/logo.30e301cf.png"
        // },
        {
            url: "https://merchdao.com/",
            name: "MerchDao",
            opentime: getPpentime(1616774400),
            network: Ethereum,
            logo: merchdao
        },
        {
            url: "https://www.cook.finance/",
            name: "Cook finance",
            opentime: getPpentime(1617033600),
            network: Ethereum,
            logo: "https://www.cook.finance/wp-content/uploads/2020/12/Cook_logo-main-new.svg"
        },
        {
            url: "https://rage.fan/",
            name: "Rage Fan",
            opentime: getPpentime(1615910400),
            network: Ethereum,
            logo: "https://rage.fan/images/logo/RF-logo-dark.svg"
        },
        {
            url: "https://seedify.fund/",
            name: "Seedify Fund",
            opentime: getPpentime(1617120000),
            network: binance,
            logo: "https://seedify.fund/wp-content/uploads/2021/01/Asset-7.png"
        },
        {
            url: "https://oddz.fi/",
            name: "Oddz Finance",
            opentime: getPpentime(1615996800),
            network: Ethereum,
            logo: oddz
        }
    ]
    const UpcomingPools = [
        {
            logo: "https://pbs.twimg.com/profile_images/1363084192523972613/vPaFsw6X_400x400.jpg",
            websiteUrl: "https://blockchaincuties.com/",
            opentime: getPpentime(1615824000),
            title: "Blockchain Cuties",
            raise: "$440k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Access: "Private",
        },
        {
            logo: "https://pbs.twimg.com/profile_images/1341383409210249216/u4dvYoST_400x400.jpg",
            websiteUrl: "https://www.konomi.network/",
            opentime: getPpentime(1615824000),
            title: "Konomi Network",
            raise: "$200k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Access: "Private"

        },
        {
            logo: "https://pbs.twimg.com/profile_images/1338749281973334017/7Itmn_aD_400x400.png",
            websiteUrl: "https://oddz.fi/",
            opentime: getPpentime(1615996800),
            title: "Oddz Finance",
            raise: "$150k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Access: "Private"
        },
        {
            logo: "https://pbs.twimg.com/profile_images/1365396936958889988/VurTEfLC_400x400.jpg",
            websiteUrl: "https://www.shyft.network/",
            opentime: getPpentime(1616515200),
            title: "Shyft Network",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Access: "Private"
        }, {
            logo: 'https://pbs.twimg.com/profile_images/1362355470858547200/zDwA_x9H_400x400.jpg',
            websiteUrl: "https://conv.finance/",
            opentime: getPpentime(1616601600),
            title: "Convergence Finance",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Access: "Private"
        }
    ]



    return (
        <div className="crypto-mining">
            <div className="crypto-mining-title">
                {t('Upcoming_Projects')}
            </div>
            <div className="crypto-mining-list">

                {UpcomingProjects && UpcomingProjects.length ? <Row>
                    {UpcomingProjects.map((item, index) => {
                        return (
                            <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                                <a href={item.url} target="_blank" rel="noreferrer" >
                                    <div className="item">
                                        <span>{item.name || ""}</span>
                                        <img className="network" src={item.network} alt="" />
                                        <img src={item.logo || ""} alt="" />
                                        <div>{item.opentime ? `start in ${item.opentime} days - Register Now` : "Whitelist open - Register Now"}</div>
                                    </div>
                                </a>

                            </Col>
                        )
                    })}
                </Row> : <Empty />}


            </div>

            <div className="crypto-mining-title">
                {t('Upcoming_Pools')}
            </div>
            <div className="upcoming-pools-list">

                {UpcomingPools && UpcomingPools.length ? <Row>
                    {UpcomingPools.map((item, index) => {
                        return (
                            <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                                <a href={item.websiteUrl} target="_blank" rel="noreferrer" >
                                    <div className="item">
                                        <div className="top">
                                            <img src={item.logo} alt="" />
                                            <span>{item.opentime ? `in${item.opentime} Days` : "Active"}</span>
                                        </div>
                                        <div className="name">{item.title || ""}</div>
                                        <p className="raise">Total Raise</p>
                                        <p className="raise-data">{Item.raise || 0}</p>
                                        <div className="data-list">
                                            <div className="data-list-item">
                                                <p>Min Allocation</p>
                                                <span>{item.minAllocation || 0}</span>
                                            </div>
                                            <div className="data-list-item">
                                                <p>Max Allocation</p>
                                                <span>{item.MaxAllocation || 'TBA'}</span>
                                            </div>
                                            <div className="data-list-item">
                                                <p>Access</p>
                                                <span>{item.Access || 'Private'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </Col>
                        )
                    })}

                </Row> : <Empty />}

            </div>
        </div>
    );
};

export default CryptoMining;
