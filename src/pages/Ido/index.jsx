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
import Konomi from '../../assets/logo/Konomi.png';
import Shyft from '../../assets/logo/Shyft.svg';
import WATA from '../../assets/logo/WATA.svg';

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
        }, {
            logo: "https://illuvium.io/home/coming-soon@2x.png",
            websiteUrl: "https://illuvium.io/",
            url: "https://illuvium.io/",
            opentime: getPpentime(1617033600),
            name: "Illuvium",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://conv.finance/img/brand/logo-decentral-invert@1.5x.png",
            websiteUrl: "https://conv.finance/",
            url: "https://conv.finance/",
            opentime: getPpentime(1616601600),
            name: "Convergence Finance",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://mdt.io/_nuxt/img/mdt_logo-horizontal-en.9551daf.png",
            websiteUrl: "https://mdt.io/",
            url: "https://mdt.io/",
            opentime: "TBA",
            name: "MeasurableData",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: binance,
            Access: ""
        }, {
            logo: "https://www.oxygen.org/img/logo.svg",
            websiteUrl: "https://www.oxygen.org/",
            url: "https://www.oxygen.org/",
            opentime: getPpentime(1615824000),
            name: "Oxygen",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum, /* solana */
            Access: ""
        }, {
            logo: "https://avatars.githubusercontent.com/u/67821563?s=200&v=4",
            websiteUrl: "https://anchorprotocol.com/",
            url: "https://anchorprotocol.com/",
            opentime: getPpentime(1615824000),
            name: "Visor Finance",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Balancer",
            PlatformsURL: "https://balancer.exchange/#/swap",
            network: Ethereum,
            Access: ""
        }, {
            logo: Konomi,
            websiteUrl: "https://www.konomi.network/#/",
            url: "https://www.konomi.network/#/",
            opentime: getPpentime(1615824000),
            name: "KonomiNetwork",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,  /* Polkadot */
            Access: ""
        }, {
            logo: "https://d33wubrfki0l68.cloudfront.net/2b8fbf1e6c2cda240a9a5252ff23940e7899235d/00ebe/logo_white.svg",
            websiteUrl: "https://polkafoundry.com/",
            url: "https://polkafoundry.com/",
            opentime: getPpentime(1615824000),
            name: "PolkaFoundry",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://www.dafiprotocol.io/images/DAFI-Logo.png",
            websiteUrl: "https://www.dafiprotocol.io/#",
            url: "https://www.dafiprotocol.io/#",
            opentime: getPpentime(1615824000),
            name: "DafiProtocol",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "MakerDAO",
            PlatformsURL: "https://daomaker.com/",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://casper.network/static/logo-color-e34c65d51e0d215db55ec930da51ac7a.png",
            websiteUrl: "https://casper.network/",
            url: "https://casper.network/",
            opentime: getPpentime(1616428800),
            name: "Casper Network",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Coinlist",
            PlatformsURL: "https://coinlist.co/casper",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://lbp.insurace.io/img/logo.632de044.svg",
            websiteUrl: "https://lbp.insurace.io/",
            url: "https://lbp.insurace.io/",
            opentime: getPpentime(1615910400),
            name: "InsurAce",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Rinkeby",
            PlatformsURL: "https://rinkeby.insurace.io/#/dash",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://stater.co/wp-content/uploads/2020/09/mobile-logo.png",
            websiteUrl: "https://stater.co/",
            url: "https://stater.co/",
            opentime: getPpentime(1615910400),
            name: "Stater",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Trustswap",
            PlatformsURL: "https://dashboard.trustswap.org/app/launchpads",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://miro.medium.com/max/552/1*zO0Jim7I5hffP8Q_9y9b5g.jpeg",
            websiteUrl: "https://dorafactory.org/",
            url: "https://dorafactory.org/",
            opentime: "TBA",
            name: "DoraFactory",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://miro.medium.com/fit/c/96/96/1*BEamN9l0B7saYGCBFKenmg.png",
            websiteUrl: "https://fei.money/",
            url: "https://fei.money/",
            opentime: getPpentime(1616342400),
            name: "Fei Protocol",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            network: Ethereum,
            Access: ""
        }, {
            logo: Shyft,
            websiteUrl: "https://www.shyft.network/",
            url: "https://www.shyft.network/",
            opentime: getPpentime(1616515200),
            name: "Shyft Network",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://cash.tech/wp-content/uploads/2021/02/cash-tech-logo-color.svg",
            websiteUrl: "https://cash.tech/",
            url: "https://cash.tech/",
            opentime: "TBA",
            name: "Cash Tech",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "DuckSTARTER",
            PlatformsURL: "https://duckstarter.io/",
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://xend.finance/assets/images/xf-logo.png",
            websiteUrl: "https://xend.finance/",
            url: "https://xend.finance/",
            opentime: getPpentime(1616425200),
            name: "Xend Finance",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Balancer",
            PlatformsURL: "https://balancer.exchange/",
            network: binance,
            Access: ""
        }, {
            logo: WATA,
            websiteUrl: "https://WATA.Finance/",
            url: "https://WATA.Finance/",
            opentime: "Active",
            name: "WATA",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            network: heco,
            Access: ""
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
