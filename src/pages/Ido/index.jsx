import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useWallet } from 'use-wallet';
import { Empty, Row, Col } from 'antd';
import * as Tools from '../../utils/Tools';
import './index.scss';
import merchdao from '../../assets/logo/merchdao.png';
import oddz from '../../assets/logo/oddz.png';
import orbits from '../../assets/logo/orbits.png';
import IMpermax from '../../assets/logo/IMpermax.png';
import scaleswap from '../../assets/logo/scaleswap.png';

import binance from '../../assets/network/binance.png';
import Ethereum from '../../assets/network/Ethereum.png';
import heco from '../../assets/network/heco.png';

import crypto1 from '../../assets/crypto/1.jpeg';
import crypto2 from '../../assets/crypto/2.png';
import crypto3 from '../../assets/crypto/3.png';
import crypto4 from '../../assets/crypto/4.png';
import crypto5 from '../../assets/crypto/5.png';

const IdoList = () => {
    const { t } = useTranslation();
    // const wallet = useWallet();
    // const { account, status } = wallet;
    const getPpentime = (time) => {
        if (time === 'TBA') {
            return 'TBA';
        } else if (Tools.sub(time, Tools.div(new Date().getTime(), 1000)) >= 0) {
            return Math.ceil(Tools.sub(time, Tools.div(new Date().getTime(), 1000)) / 86400);
        } else {
            return 0;
        }
    }
    const UpcomingProjects = [
        {
            url: "https://lepricon.io/",
            name: "Lepricon",
            opentime: getPpentime(1615910400),
            network: Ethereum,
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
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
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
            logo: merchdao
        },
        {
            url: "https://www.cook.finance/",
            name: "Cook finance",
            opentime: getPpentime(1617033600),
            network: Ethereum,
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
            logo: "https://www.cook.finance/wp-content/uploads/2020/12/Cook_logo-main-new.svg"
        },
        {
            url: "https://rage.fan/",
            name: "Rage Fan",
            opentime: getPpentime(1615910400),
            network: Ethereum,
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
            logo: "https://rage.fan/images/logo/RF-logo-dark.svg"
        },
        {
            url: "https://seedify.fund/",
            name: "Seedify Fund",
            opentime: "TBA",
            network: binance,
            Platforms: "",
            PlatformsURL: "",
            logo: "https://seedify.fund/wp-content/uploads/2021/01/Asset-7.png"
        },
        {
            url: "https://oddz.fi/",
            name: "Oddz Finance",
            opentime: getPpentime(1615996800),
            network: Ethereum,
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            logo: oddz
        },
        // {
        //     url: "https://orbits.finance/",
        //     name: "Orbits",
        //     opentime: 'TBA',
        //     network: heco,
        //     Platforms: "",
        //     PlatformsURL: "",
        //     logo: orbits
        // },
        {
            url: "https://scaleswap.io/",
            name: "Scaleswap",
            opentime: getPpentime(1615996800),
            network: Ethereum,
            Platforms: "",
            PlatformsURL: "",
            logo: scaleswap
        },
        // {
        //     url: "https://illuvium.io/ ",
        //     name: "Illuvium",
        //     opentime: "TBA",
        //     network: Ethereum,
        //     Platforms: "",
        //     PlatformsURL: "",
        //     logo: oddz
        // },
        {
            url: "https://www.tidal.finance/",
            name: "Tidal",
            opentime: getPpentime(1616601600),
            network: Ethereum,
            Platforms: "Balancer",
            PlatformsURL: "https://balancer.exchange/",
            logo: 'https://www.tidal.finance/assets/img/logo.png'
        },
        {
            url: "http://chocoswap.org/",
            name: "Vanilla",
            opentime: getPpentime(1616601600),
            network: heco,
            Platforms: "",
            PlatformsURL: "",
            logo: 'http://chocoswap.org/uploads/allimg/20201026/1-20102620591O16.png'
        },
        {
            url: "https://impermax.finance/",
            name: "Impermax",
            opentime: getPpentime(1616601600),
            network: Ethereum,
            Platforms: "",
            PlatformsURL: "",
            logo: IMpermax
        },
        {
            logo: crypto1,
            websiteUrl: "https://blockchaincuties.com/",
            opentime: getPpentime(1615824000),
            name: "Blockchain Cuties",
            raise: "$440k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private",
        },
        {
            logo: crypto2,
            websiteUrl: "https://www.konomi.network/",
            opentime: getPpentime(1615824000),
            name: "Konomi Network",
            raise: "$200k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"

        },
        {
            logo: crypto3,
            websiteUrl: "https://oddz.fi/",
            opentime: getPpentime(1615996800),
            name: "Oddz Finance",
            raise: "$150k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"
        },
        {
            logo: crypto4,
            websiteUrl: "https://www.shyft.network/",
            opentime: getPpentime(1616515200),
            name: "Shyft Network",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"
        }, {
            logo: crypto5,
            websiteUrl: "https://conv.finance/",
            opentime: getPpentime(1616601600),
            name: "Convergence Finance",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"
        }

    ]
    const UpcomingPools = [
        {
            logo: crypto1,
            websiteUrl: "https://blockchaincuties.com/",
            opentime: getPpentime(1615824000),
            name: "Blockchain Cuties",
            raise: "$440k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private",
        },
        {
            logo: crypto2,
            websiteUrl: "https://www.konomi.network/",
            opentime: getPpentime(1615824000),
            name: "Konomi Network",
            raise: "$200k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"

        },
        {
            logo: crypto3,
            websiteUrl: "https://oddz.fi/",
            opentime: getPpentime(1615996800),
            name: "Oddz Finance",
            raise: "$150k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"
        },
        {
            logo: crypto4,
            websiteUrl: "https://www.shyft.network/",
            opentime: getPpentime(1616515200),
            name: "Shyft Network",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: "Private"
        }, {
            logo: crypto5,
            websiteUrl: "https://conv.finance/",
            opentime: getPpentime(1616601600),
            name: "Convergence Finance",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
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
                                        <span className="name">{item.name || ""}</span>
                                        {item.opentime > 0 ? <span className="days">{item.opentime}Days</span> : <span className="active">Active</span>}
                                        <img className="network" src={item.network} alt="" />
                                        <img className="logo" src={item.logo || ""} alt="" />

                                        <div>{item.Platforms !== "" ? 'IDO Launch' : item.opentime > 0 ? ' Whitelist - Register Now' : "Public sales"}</div>
                                    </div>
                                </a>
                            </Col>
                        )
                    })}
                </Row> : <Empty />}


            </div>

            {/* <div className="crypto-mining-title">
                {t('Upcoming_Pools')}
            </div> */}

        </div >
    );
};

export default IdoList;
