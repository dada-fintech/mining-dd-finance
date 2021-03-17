import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useWallet } from 'use-wallet';
import { Empty, Row, Col } from 'antd';
import * as Tools from '../../utils/Tools';
import './index.scss';
import Header from '../../components/Header'
import orbits from '../../assets/logo/orbits.png';
import scaleswap from '../../assets/logo/scaleswap.svg';

import binance from '../../assets/network/binance.png';
import Ethereum from '../../assets/network/Ethereum.png';
import heco from '../../assets/network/heco.png';

import crypto1 from '../../assets/crypto/1.jpeg';
import crypto2 from '../../assets/crypto/2.png';
import crypto3 from '../../assets/crypto/3.png';
import crypto4 from '../../assets/crypto/4.png';
import crypto5 from '../../assets/crypto/5.png';

import dafiprotocol from '../../assets/logo/dafiprotocol.svg';
import merchdao from '../../assets/logo/merchdao.svg';
import oddz from '../../assets/logo/oddz.svg';
import cook from '../../assets/logo/cook.svg';
import XendFinance from '../../assets/logo/XendFinance.svg';
import impermax from '../../assets/logo/impermax.svg';
import decentralInvert from '../../assets/logo/decentral-invert.svg';
import Navigation from '../../assets/logo/Navigation.svg';
import dorafactory from '../../assets/logo/dorafactory.svg';
import konomi from '../../assets/logo/konomi.svg';
import lepricon from '../../assets/logo/lepricon.svg';
import stater from '../../assets/logo/stater.svg';
import Tidal from '../../assets/logo/Tidal.svg';
import casper from '../../assets/logo/casper.svg';
import Oxygen from '../../assets/logo/Oxygen.svg';
import illuvium from '../../assets/logo/illuvium.svg';
import cash from '../../assets/logo/cash.svg';
import mdt from '../../assets/logo/mdt.png';
import polkafoundry from '../../assets/logo/polkafoundry.svg';



const IdoList = () => {
    const { t } = useTranslation();
    // const wallet = useWallet();
    // const { account, status } = wallet;

    const [tabindex, setTabindex] = useState(1);

    const [upcomingProjects, setUpcomingProjects] = useState([]);
    const [activeProjects, setActiveProjects] = useState(1);
    const [finishedProjects, setFinishedProjects] = useState(1);


    const getPpentime = (time) => {
        if (isNaN(time)) {
            return time;
        } else if (Tools.sub(time, Tools.div(new Date().getTime(), 1000)) >= 0) {
            return Math.ceil(Tools.sub(time, Tools.div(new Date().getTime(), 1000)) / 86400);
        } else {
            return 0;
        }
    }
    const onSwitchTab = (index) => {
        setTabindex(index || 1)
    }

    const UpcomingProjects = [
        {
            projectsUrl: "https://lepricon.io/",
            name: "Lepricon",
            opentime: getPpentime(1615910400),
            networkname: 'ETH',
            network: Ethereum,
            platforms: "Poolz",
            platformsURL: "https://www.poolz.finance/",
            logo: lepricon,
            status: ""
        },
        {
            projectsUrl: "https://merchdao.com/",
            name: "MerchDao",
            opentime: getPpentime(1616774400),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
            logo: merchdao,
            status: ""
        },
        {
            projectsUrl: "https://www.cook.finance/",
            name: "Cook finance",
            opentime: getPpentime(1617033600),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
            logo: cook,
            status: ""
        },
        {
            projectsUrl: "https://rage.fan/",
            name: "Rage Fan",
            opentime: getPpentime(1615910400),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "Poolz",
            PlatformsURL: "https://www.poolz.finance/",
            logo: "https://rage.fan/images/logo/RF-logo-dark.svg",
            status: ""
        },
        {
            projectsUrl: "https://seedify.fund/",
            name: "Seedify Fund",
            opentime: "TBA",
            networkname: 'BSC',
            network: binance,
            Platforms: "",
            PlatformsURL: "",
            logo: "https://gblobscdn.gitbook.com/spaces%2F-MRhr_ARLx2Wm7kT5ceC%2Favatar-1611382639284.png?alt=media",
            status: ""
        },
        {
            projectsUrl: "https://oddz.fi/",
            name: "Oddz Finance",
            opentime: getPpentime(1615996800),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            logo: oddz,
            status: ""
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
            projectsUrl: "https://scaleswap.io/",
            name: "Scaleswap",
            opentime: getPpentime(1615996800),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "",
            PlatformsURL: "",
            logo: scaleswap,
            status: ""
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
            projectsUrl: "https://www.tidal.finance/",
            name: "Tidal",
            opentime: getPpentime(1616601600),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "Balancer",
            PlatformsURL: "https://balancer.exchange/",
            logo: Tidal,
            status: ""
        },
        {
            projectsUrl: "http://chocoswap.org/",
            name: "Vanilla",
            opentime: getPpentime(1616601600),
            networkname: 'HECO',
            network: heco,
            Platforms: "",
            PlatformsURL: "",
            logo: 'http://chocoswap.org/uploads/allimg/20201026/1-20102620591O16.png',
            status: ""
        },
        {
            projectsUrl: "https://impermax.finance/",
            name: "Impermax",
            opentime: getPpentime(1616601600),
            networkname: 'ETH',
            network: Ethereum,
            Platforms: "",
            PlatformsURL: "",
            logo: impermax,
            status: ""
        },
        {
            logo: crypto1,
            projectsUrl: "https://blockchaincuties.com/",
            opentime: getPpentime(1615824000),
            name: "Blockchain Cuties",
            raise: "$440k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: "Private",
            status: ""
        },
        {
            logo: konomi,
            projectsUrl: "https://www.konomi.network/",
            opentime: getPpentime(1615824000),
            name: "Konomi Network",
            raise: "$200k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: "Private",
            status: ""

        },
        {
            logo: crypto3,
            projectsUrl: "https://oddz.fi/",
            opentime: getPpentime(1615996800),
            name: "Oddz Finance",
            raise: "$150k",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: "Private",
            status: ""
        },
        {
            logo: Navigation,
            projectsUrl: "https://www.shyft.network/",
            opentime: getPpentime(1616515200),
            name: "Shyft Network",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: "Private",
            status: ""
        }, {
            logo: decentralInvert,
            projectsUrl: "https://conv.finance/",
            opentime: getPpentime(1616601600),
            name: "Convergence Finance",
            raise: "TBA",
            minAllocation: "0",
            MaxAllocation: "TBA",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: "Private",
            status: "",
        }, {
            logo: illuvium,
            projectsUrl: "https://illuvium.io/",
            url: "https://illuvium.io/",
            opentime: getPpentime(1617033600),
            name: "Illuvium",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: mdt,
            projectsUrl: "https://mdt.io/",
            url: "https://mdt.io/",
            opentime: "Trading",
            name: "MeasurableData",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'BSC',
            network: binance,
            Access: ""
        }, {
            logo: Oxygen,
            projectsUrl: "https://www.oxygen.org/",
            url: "https://www.oxygen.org/",
            opentime: getPpentime(1615824000),
            name: "Oxygen",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum, /* solana */
            Access: ""
        }, {
            logo: "https://avatars.githubusercontent.com/u/67821563?s=200&v=4",
            projectsUrl: "https://anchorprotocol.com/",
            url: "https://anchorprotocol.com/",
            opentime: 'Trading',
            name: "Visor Finance",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Balancer",
            PlatformsURL: "https://balancer.exchange/#/swap",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: polkafoundry,
            projectsUrl: "https://polkafoundry.com/",
            url: "https://polkafoundry.com/",
            opentime: getPpentime(1615824000),
            name: "PolkaFoundry",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Polkastarter",
            PlatformsURL: "https://www.polkastarter.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: dafiprotocol,
            projectsUrl: "https://www.dafiprotocol.io/#",
            url: "https://www.dafiprotocol.io/#",
            opentime: getPpentime(1615824000),
            name: "DafiProtocol",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "MakerDAO",
            PlatformsURL: "https://daomaker.com/",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: casper,
            projectsUrl: "https://casper.network/",
            url: "https://casper.network/",
            opentime: getPpentime(1616428800),
            name: "Casper Network",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Coinlist",
            PlatformsURL: "https://coinlist.co/casper",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://lbp.insurace.io/img/logo.632de044.svg",
            projectsUrl: "https://lbp.insurace.io/",
            url: "https://lbp.insurace.io/",
            opentime: getPpentime(1615910400),
            name: "InsurAce",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Rinkeby",
            PlatformsURL: "https://rinkeby.insurace.io/#/dash",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: stater,
            projectsUrl: "https://stater.co/",
            url: "https://stater.co/",
            opentime: getPpentime(1615910400),
            name: "Stater",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Trustswap",
            PlatformsURL: "https://dashboard.trustswap.org/app/launchpads",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: dorafactory,
            projectsUrl: "https://dorafactory.org/",
            url: "https://dorafactory.org/",
            opentime: "TBA",
            name: "DoraFactory",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: "https://miro.medium.com/fit/c/96/96/1*BEamN9l0B7saYGCBFKenmg.png",
            projectsUrl: "https://fei.money/",
            url: "https://fei.money/",
            opentime: getPpentime(1616342400),
            name: "Fei Protocol",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: cash,
            projectsUrl: "https://cash.tech/",
            url: "https://cash.tech/",
            opentime: "TBA",
            name: "Cash Tech",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "DuckSTARTER",
            PlatformsURL: "https://duckstarter.io/",
            networkname: 'ETH',
            network: Ethereum,
            Access: ""
        }, {
            logo: XendFinance,
            projectsUrl: "https://xend.finance/",
            url: "https://xend.finance/",
            opentime: getPpentime(1616425200),
            name: "Xend Finance",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "Balancer",
            PlatformsURL: "https://balancer.exchange/",
            networkname: 'BSC',
            network: binance,
            Access: ""
        }, {
            logo: 'https://gblobscdn.gitbook.com/spaces%2F-MVEfjwhFMMyQDunAxHo%2Favatar-1615182753449.png?alt=media', // WATA
            projectsUrl: "https://WATA.Finance/",
            url: "https://WATA.Finance/",
            opentime: "Active",
            name: "WATA",
            raise: "",
            minAllocation: "",
            MaxAllocation: "",
            Platforms: "",
            PlatformsURL: "",
            networkname: 'HECO',
            network: heco,
            Access: ""
        }
    ]


    useEffect(() => {

        setUpcomingProjects(UpcomingProjects.filter(item => {
            return item.opentime === "TBA" || item.opentime > 0
        }).map(item => {
            return item
        }));
        setActiveProjects(UpcomingProjects.filter(item => {
            return item.opentime === "Active" || item.opentime <= 0
        }).map(item => {
            return item
        }));
        setFinishedProjects(UpcomingProjects.filter(item => {
            return item.opentime === "Trading"
        }).map(item => {
            return item
        }));

    }, [])



    return (
        <div className="crypto-mining">
            <Header hideAction={true} />

            <div className="crypto-mining-tab">
                <div className={tabindex === 1 ? 'active' : ""} onClick={() => onSwitchTab(1)}>{t('Upcoming_Projects')}</div>
                <div className={tabindex === 2 ? 'active' : ""} onClick={() => onSwitchTab(2)}>{t('Active_Projects')}</div>
                <div className={tabindex === 3 ? 'active' : ""} onClick={() => onSwitchTab(3)}>{t('Finished_Projects')}</div>
            </div>
            <div className="crypto-mining-list">

                {tabindex === 1 ? <>
                    {upcomingProjects && upcomingProjects.length ? <Row>
                        {upcomingProjects.map((item, index) => {
                            return (
                                <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                                    <div className="item">

                                        <img className="logo" src={item.logo || ""} alt="" />
                                        {item.opentime === 'TBA' ? <span className="days">TBA</span> : item.opentime > 0 ? <span className="days">{item.opentime}Days</span> : <span className="active">Active</span>}
                                        <img className="network" src={item.network} alt="" />
                                        <p className="name">{item.name || ""}</p>
                                        <p className="network-name">{item.networkname}</p>
                                        {item.projectsUrl && item.PlatformsURL ? <div className="multiple">
                                            <a href={item.PlatformsURL} target="_blank" rel="noreferrer"><div>IDO Launch</div></a>
                                            <a href={item.projectsUrl} target="_blank" rel="noreferrer"><div>website</div></a>
                                        </div> : <a href={item.projectsUrl ? item.projectsUrl : item.PlatformsURL} target="_blank" rel="noreferrer"><div className="Asingle">website</div></a>}
                                        {/* <div className="Asingle">IDO Launch</div> */}

                                        {/* <div>{item.Platforms !== "" ? 'IDO Launch' : item.opentime > 0 ? ' Whitelist - Register Now' : "Public sales"}</div> */}
                                    </div>
                                </Col>
                            )
                        })}
                    </Row> : <Empty style={{ margin: '60px auto' }} />}
                </> : ""}

                {tabindex === 2 ? <>
                    {activeProjects && activeProjects.length ? <Row>
                        {activeProjects.map((item, index) => {
                            return (
                                <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                                    <div className="item">
                                        <img className="logo" src={item.logo || ""} alt="" />
                                        <span className="active">● Active</span>
                                        <img className="network" src={item.network} alt="" />
                                        <p className="name">{item.name || ""}</p>
                                        <p className="network-name">{item.networkname}</p>
                                        {item.projectsUrl && item.PlatformsURL ? <div className="multiple">
                                            <a href={item.PlatformsURL} target="_blank" rel="noreferrer"><div>IDO Launch</div></a>
                                            <a href={item.projectsUrl} target="_blank" rel="noreferrer"><div>website</div></a>
                                        </div> : <a href={item.projectsUrl ? item.projectsUrl : item.PlatformsURL} target="_blank" rel="noreferrer"><div className="Asingle">website</div></a>}
                                    </div>
                                </Col>
                            )
                        })}
                    </Row> : <Empty style={{ margin: '60px auto' }} />}
                </> : ""}

                {tabindex === 3 ? <>
                    {finishedProjects && finishedProjects.length ? <Row>
                        {finishedProjects.map((item, index) => {
                            return (
                                <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                                    <div className="item">
                                        <img className="logo" src={item.logo || ""} alt="" />
                                        <div className="finish">{t('finish')}</div>
                                        <img className="network" src={item.network} alt="" />
                                        <p className="name">{item.name || ""}</p>
                                        <p className="network-name">{item.networkname}</p>
                                        {item.projectsUrl && item.PlatformsURL ? <div className="multiple">
                                            <a href={item.PlatformsURL} target="_blank" rel="noreferrer"><div>IDO Launch</div></a>
                                            <a href={item.projectsUrl} target="_blank" rel="noreferrer"><div>website</div></a>
                                        </div> : <a href={item.projectsUrl ? item.projectsUrl : item.PlatformsURL} target="_blank" rel="noreferrer"><div className="Asingle">website</div></a>}
                                    </div>
                                </Col>
                            )
                        })}
                    </Row> : <Empty style={{ margin: '60px auto' }} />}
                </> : ""}



            </div>

            {/* <div className="crypto-mining-title">
                {t('Upcoming_Pools')}
            </div> */}

        </div >
    );
};

export default IdoList;
