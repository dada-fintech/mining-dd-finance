import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover } from 'antd'
import { NavLink } from 'react-router-dom'
import i18n from 'i18next'
import config from 'config'
import './style.scss'
import TemplateChoose from 'components/TemplateChoose'
import LogoBlue from "assets/logo-blue.svg";
import NetworkEthereum from "assets/network-ethereum.svg";
import NetworkBinance from "assets/network-binance.svg";

import SidebarLogoEther from "assets/sidebar-logo-ether.svg";
import SidebarLogoBinance from "assets/sidebar-logo-binance.svg";
import CryptoMiningIcon from 'assets/sidebar/crypto-mining.svg'
import CommunityProjectIcon from 'assets/sidebar/community-project.svg'
import PlusIcon from 'assets/sidebar/plus.svg'
import MiningSwapIcon from 'assets/sidebar/mining-swap.svg'
import DashboardIcon from 'assets/sidebar/dashboard.svg'
import OverviewIcon from 'assets/sidebar/overview.svg'
import QuickSwapIcon from 'assets/sidebar/quick-swap.svg'
import GovernanceIcon from 'assets/sidebar/governance.svg'
import BlogIcon from 'assets/sidebar/blog.svg'

import Twiiter from 'assets/socials/twitter.svg'
import Discord from 'assets/socials/discord.svg'
import Medium from 'assets/socials/medium.svg'
import Telegram from 'assets/socials/telegram.svg'
import Weixin from 'assets/socials/weixin.svg'
import WeixinQR from 'assets/qr-code.jpeg'
import Linkedin from 'assets/socials/linkedin.svg'


export default function AppSidebar(props) {
    const { t } = useTranslation()
    const { hideCreate } = props
    const [showTemplateChoose, setShowTemplateChoose] = useState(false)
    const changeLanguage = language => {
        localStorage.setItem('language', language)
        i18n.changeLanguage(language)
    }
    const WeixinContent = (<img src={WeixinQR} style={{ width: '140px' }} />)

    return (<div className="app-sidebar">
        <a href="/" className="top-link">
            {config.network === 'ethereum' ? <img src={SidebarLogoEther} className="sidebar-logo" /> :
                <img src={SidebarLogoBinance} className="sidebar-logo" />}
        </a>
        <ul className="nav">
            {!hideCreate && <li>
                <a onClick={() => { setShowTemplateChoose(true) }}>
                    <img src={PlusIcon} />{t('sidebar.create')}</a>
            </li>}
            <li>
                <NavLink className="nowrap" activeClassName="active" to="/community-projects"><img src={CommunityProjectIcon} />{t('sidebar.communityProjects')}</NavLink>
            </li>
            <li>
                <NavLink className="nowrap" activeClassName="active" to="/projects"><img src={CryptoMiningIcon} />{t('sidebar.cryptoMining')}</NavLink>
            </li>
            <li><NavLink className="nowrap" activeClassName="active" to="/coming/swap"><img src={MiningSwapIcon} />{t('sidebar.miningSwap')}</NavLink></li>
            <li><NavLink className="nowrap" activeClassName="active" to="/coming/dashboard"><img src={DashboardIcon} />{t('sidebar.dashboard')}</NavLink></li>
            <li>
                <NavLink className="nowrap" activeClassName="active" to="/blog"><img src={BlogIcon} />{t('sidebar.blog')}</NavLink>
            </li>
        </ul>
        {/* <ul className="nav second">
            <li>
                <Link to="/coming/overview"><img src={OverviewIcon} />{t('sidebar.overview')}</Link>
            </li>
            <li><Link to="/coming/quick-swap"><img src={QuickSwapIcon} />{t('sidebar.quickSwap')}</Link></li>
            <li><Link to="/coming/governance"><img src={GovernanceIcon} />{t('sidebar.governance')}</Link></li>
        </ul> */}
        <div className="bottom">
            <div className="more-links">
                {/** 暂时不显示 */}
                {config.mode === 'prod' && <div className={`network-switch ${config.network}`}>
                    Network <img src={config.network === 'ethereum' ? NetworkEthereum : NetworkBinance} />
                    <a href={config.network === 'ethereum' ? 'https://mining-binance.dd.finance/' : 'https://mining.dd.finance/'}><img src={config.network === 'ethereum' ? NetworkBinance : NetworkEthereum} /></a>
                </div>}
                <a onClick={() => { changeLanguage(i18n.language === 'en' ? 'zh' : 'en') }}>
                    {i18n.language === 'en' ? '简体中文' : 'English'}
                </a>
                <a href={i18n.language === 'en' ? 'https://doc-en.dd.finance' : 'https://doc.dd.finance'} target="_blank">{t('homepage.footer.documentation')}</a>
                <a href="mainto:contact@dd.finance">contact@dd.finance</a>
                <a href="mainto:media@dd.finance">media@dd.finance</a>
            </div>
            <div className="social-icons">
                <a target="_blank" href="https://twitter.com/FinanceDada">
                    <img src={Twiiter} className="social-icon" />
                </a>
                <a target="_blank" href="https://discord.gg/KgT7j6YvPK">
                    <img src={Discord} className="social-icon" />
                </a>
                <a target="_blank" href="https://ddfinance.medium.com/">
                    <img src={Medium} className="social-icon" />
                </a>
                <a target="_blank" href="https://t.me/joinchat/AAAAAEVqGZbYVB7eR7qFlg">
                    <img src={Telegram} className="social-icon" />
                </a>
                <a target="_blank">
                    <Popover content={WeixinContent}>
                        <img src={Weixin} className="social-icon" />
                    </Popover>
                </a>
                <a target="_blank" href="https://www.linkedin.com/company/dadafinance/">
                    <img src={Linkedin} className="social-icon" />
                </a>
            </div>
            <div className="copyright">
                <img src={LogoBlue} className="footer-logo" />
                © DD.FINANCE.All rights reserved
            </div>
        </div>
        { showTemplateChoose && <TemplateChoose onCancel={() => { setShowTemplateChoose(false) }} />}
    </div >)
}