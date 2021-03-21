import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Popover } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import i18n from "i18next";
import config from "config";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import TemplateChoose from "components/TemplateChoose";
import LogoBlue from "assets/logo-blue.svg";
import NetworkEthereum from "assets/network-ethereum.svg";
import NetworkBinance from "assets/network-binance.svg";
import NetworkHeco from "assets/network-heco.svg";
import SidebarLogoEther from "assets/sidebar-logo-ether.svg";
import SidebarLogoBinance from "assets/sidebar-logo-binance.svg";
import SidebarLogoHeco from "assets/sidebar-logo-heco.svg";
import CryptoMiningIcon from "assets/sidebar/crypto-mining.svg";
import CommunityProjectIcon from "assets/sidebar/community-project.svg";
import PlusIcon from "assets/sidebar/plus.svg";
import MiningSwapIcon from "assets/sidebar/mining-swap.svg";
import DashboardIcon from "assets/sidebar/dashboard.svg";
import IDOListIcon from "assets/sidebar/idolisticon.svg";
// import OverviewIcon from 'assets/sidebar/overview.svg'
// import QuickSwapIcon from 'assets/sidebar/quick-swap.svg'
// import GovernanceIcon from 'assets/sidebar/governance.svg'
import BlogIcon from "assets/sidebar/blog.svg";
import Twiiter from "assets/socials/twitter.svg";
import Discord from "assets/socials/discord.svg";
import Medium from "assets/socials/medium.svg";
import Telegram from "assets/socials/telegram.svg";
import Weixin from "assets/socials/weixin.svg";
import WeixinQR from "assets/qr-code.jpeg";
import Linkedin from "assets/socials/linkedin.svg";




import ChinaFlag from "assets/chinaflag.svg";
import UsFlag from "assets/usflag.svg";

import ClaimContractApi from "../../contract/ClaimContractApi";
import { useWallet } from "use-wallet";

export default function AppSidebar (props) {
    const { t } = useTranslation();
    const location = useLocation();
    const wallet = useWallet();
    const [showTemplateChoose, setShowTemplateChoose] = useState(false);
    const [hideCreate, setHideCreate] = useState(false);
    const [claimBalance, setClaimBalance] = useState(0);
    const network = useSelector((state) => state.setting.network);
    const dispatch = useDispatch();

    const { ethereum, account } = wallet;

    const changeLanguage = (language) => {
        localStorage.setItem("language", language);
        i18n.changeLanguage(language);
    };
    const WeixinContent = (
        <img src={WeixinQR} style={{ width: "140px" }} alt="" />
    );

    useEffect(() => {
        if (
            location.pathname === "/create-project/close" ||
            location.pathname === "/create-project/open"
        ) {
            setHideCreate(true);
        } else {
            setHideCreate(false);
        }
    }, [location]);

    const switchNetwork = (network) => {
        dispatch({
            type: "SWITCH_NETWORK",
            payload: {
                network: network,
            },
        });
        // 有些组件是在react体系外的，所以需要reload让它们也重新连接
        window.location.reload();
    };

    const claimFun = async () => {
        await ClaimContractApi.claim(
            account,
            ethereum,
            (transactionHash) => {
                console.log("pending", transactionHash);
            },
            (receipt) => {
                console.log("receipt", receipt);
                setClaimBalance(0);
            },
            () => {
                console.log("err");
            }
        );
    };

    useEffect(() => {
        const getCanClaimFun = async () => {
            await ClaimContractApi.getCanClaim(account).then((res) => {
                setClaimBalance(res || 0);
            });
        };
        getCanClaimFun();
    }, [account]);

    return (
        <div className="app-sidebar">
            <div className="top">
                <a
                    href="/"
                    className="top-link"
                    // target="_blank"
                    rel="noreferrer"
                >
                    {network === "ethereum" && (
                        <img src={SidebarLogoEther} className="sidebar-logo" alt="" />
                    )}
                    {(network === "binance" || network === "test") && (
                        <img src={SidebarLogoBinance} className="sidebar-logo" alt="" />
                    )}
                    {network === "heco" && (
                        <img src={SidebarLogoHeco} className="sidebar-logo" alt="" />
                    )}
                </a>
                <ul className="nav">
                    {!hideCreate && network !== "heco" && (
                        <li>
                            <span
                                className={`nowrap ${location.pathname === "/community-projects"
                                    ? "bottom-curve"
                                    : ""
                                    }`}
                                onClick={() => {
                                    setShowTemplateChoose(true);
                                }}
                            >
                                <img src={PlusIcon} alt="" />
                                {t("sidebar.create")}
                            </span>
                        </li>
                    )}
                    {network !== "heco" && (
                        <li>
                            <NavLink
                                className={`nowrap ${location.pathname === "/projects" ? "bottom-curve" : ""
                                    }`}
                                activeClassName="active"
                                to="/community-projects"
                            >
                                <img src={CommunityProjectIcon} alt="" />
                                {t("sidebar.communityProjects")}
                            </NavLink>
                        </li>
                    )}
{/* 
                    {network !== "heco" && (
                        <li>
                            <NavLink
                                className={`nowrap ${location.pathname === "/community-projects" ? "top-curve" : ""
                                    } ${location.pathname === "/buy-dhm" ? "bottom-curve" : ""}`}
                                activeClassName="active"
                                to="/projects"
                            >
                                <img src={CryptoMiningIcon} alt="" />
                                {t("sidebar.cryptoMining")}
                            </NavLink>
                        </li>
                    )} */}

                    {/* {(network === 'heco' || network === 'ethereum') && <li>
                        <NavLink
                            className={`nowrap ${location.pathname === '/projects'
                                ? 'top-curve'
                                : ''
                                } ${location.pathname === '/farming-detail'
                                    ? 'bottom-curve'
                                    : ''
                                }`}
                            activeClassName="active"
                            to="/buy-dhm"
                        >
                            <img src={BuyDHMIcon} alt="" />
                            {t('sidebar.buyDHM')}
                        </NavLink>
                    </li>} */}

                    {/* {network === 'heco' && <li>
                        <NavLink
                            className={`nowrap ${location.pathname === '/buy-dhm'
                                ? 'top-curve'
                                : ''
                                } ${location.pathname === '/coming/swap'
                                    ? 'bottom-curve'
                                    : ''
                                }`}
                            activeClassName="active"
                            to="/farming-detail"
                        >
                            <img src={FarmingIcon} alt="" />
                            {t('sidebar.farming')}
                        </NavLink>
                    </li>} */}

                    {/* <li>
                        <NavLink
                            className={`nowrap ${location.pathname === "/farming-detail" ? "top-curve" : ""
                                } ${location.pathname === "/coming/dashboard" ? "bottom-curve" : ""
                                }`}
                            activeClassName="active"
                            to="/token-swap"
                        >
                            <img src={MiningSwapIcon} alt="" />
                            {t("sidebar.tokenSwap")}
                        </NavLink>
                    </li> */}

                    <li>
                        <NavLink
                            className={`nowrap ${location.pathname === "/ido" ? "top-curve" : ""}`}
                            activeClassName="active"
                            to="/ido"
                        >
                            <img src={IDOListIcon} alt="" />
                            {t('IDOList')}
                        </NavLink>
                    </li>


                    {/* <li>
                        <NavLink
                            className={`nowrap ${location.pathname === "/token-swap" ? "top-curve" : ""
                                } ${location.pathname === "/blog" ? "bottom-curve" : ""}`}
                            activeClassName="active"
                            to="/farm-rank"
                        >
                            <img src={DashboardIcon} alt="" />
                            {t('sidebar.farmRank')}
                        </NavLink>
                    </li> */}

                    {/* <li>
            <NavLink
              className={`nowrap ${
                location.pathname === "/coming/swap" ? "top-curve" : ""
              } ${location.pathname === "/blog" ? "bottom-curve" : ""}`}
              activeClassName="active"
              to="/coming/dashboard"
            >
              <img src={DashboardIcon} alt="" />
              {t("sidebar.dashboard")}
            </NavLink>
          </li> */}
                    <li>
                        <NavLink
                            className={`nowrap ${location.pathname === "/coming/dashboard" ? "top-curve" : ""
                                }`}
                            activeClassName="active"
                            to="/blog"
                        >
                            <img src={BlogIcon} alt="" />
                            {t("sidebar.blog")}
                        </NavLink>
                    </li>

                    <li>
                        <span
                            className={`nowrap ${location.pathname === "/blog" ? "top-curve" : ""
                                }`}
                        ></span>
                    </li>
                </ul>
                {/* <ul className="nav second">
            <li>
                <Link to="/coming/overview"><img src={OverviewIcon} />{t('sidebar.overview')}</Link>
            </li>
            <li><Link to="/coming/quick-swap"><img src={QuickSwapIcon} />{t('sidebar.quickSwap')}</Link></li>
            <li><Link to="/coming/governance"><img src={GovernanceIcon} />{t('sidebar.governance')}</Link></li>
        </ul> */}
            </div>

            {claimBalance > 0 ? (
                <div className="claim">
                    <div
                        className="claim-dada"
                        onClick={() => {
                            claimFun();
                        }}
                    >
                        <p>{t("ClaimYourDADA")}</p>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="bottom">
                <div className="more-links">
                    {/* hide on heco */}
                    {config[network].mode === "prod" && (
                        <div className={`network-switch ${network}`}>
                            Network{" "}
                            <img
                                src={
                                    network === "ethereum"
                                        ? NetworkEthereum
                                        : network === "heco"
                                            ? NetworkHeco
                                            : NetworkBinance
                                }
                                alt=""
                            />
                            {network !== "ethereum" && (
                                <span
                                    onClick={() => {
                                        switchNetwork("ethereum");
                                    }}
                                >
                                    <img src={NetworkEthereum} alt="" />
                                </span>
                            )}
                            {network !== "heco" && (
                                <span
                                    onClick={() => {
                                        switchNetwork("heco");
                                    }}
                                >
                                    <img src={NetworkHeco} alt="" />
                                </span>
                            )}
                            {network !== "binance" && (
                                <span
                                    onClick={() => {
                                        switchNetwork("binance");
                                    }}
                                >
                                    <img src={NetworkBinance} alt="" />
                                </span>
                            )}
                        </div>
                    )}
                    <span
                        onClick={() => {
                            changeLanguage(i18n.language === "en" ? "zh" : "en");
                        }}
                    >
                        {i18n.language === "en" ? (
                            <>
                                {" "}
                                English <img src={UsFlag} className="flag" alt="" />{" "}
                            </>
                        ) : (
                            <>
                                {" "}
                                简体中文 <img src={ChinaFlag} className="flag" alt="" />{" "}
                            </>
                        )}
                    </span>
                    <a
                        href={
                            i18n.language === "en"
                                ? "https://doc-en.dd.finance"
                                : "https://doc.dd.finance"
                        }
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t("homepage.footer.documentation")}
                    </a>
                    <a href="mainto:contact@dd.finance">contact@dd.finance</a>
                    <a href="mainto:media@dd.finance">media@dd.finance</a>
                </div>
                <div className="social-icons">
                    <a
                        target="_blank"
                        href="https://twitter.com/FinanceDada"
                        rel="noreferrer"
                    >
                        <img src={Twiiter} className="social-icon" alt="" />
                    </a>
                    <a
                        target="_blank"
                        href="https://discord.gg/KgT7j6YvPK"
                        rel="noreferrer"
                    >
                        <img src={Discord} className="social-icon" alt="" />
                    </a>
                    <a
                        target="_blank"
                        href="https://ddfinance.medium.com/"
                        rel="noreferrer"
                    >
                        <img src={Medium} className="social-icon" alt="" />
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://t.me/joinchat/AAAAAEVqGZbYVB7eR7qFlg"
                    >
                        <img src={Telegram} className="social-icon" alt="" />
                    </a>
                    <span>
                        <Popover content={WeixinContent}>
                            <img src={Weixin} className="social-icon" alt="" />
                        </Popover>
                    </span>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.linkedin.com/company/dadafinance/"
                    >
                        <img src={Linkedin} className="social-icon" alt="" />
                    </a>
                </div>
                <div className="copyright">
                    <img src={LogoBlue} className="footer-logo" alt="" />© DD.FINANCE.All
                    rights reserved
                </div>
            </div>
            {showTemplateChoose && (
                <TemplateChoose
                    onCancel={() => {
                        setShowTemplateChoose(false);
                    }}
                />
            )}
        </div>
    );
}
