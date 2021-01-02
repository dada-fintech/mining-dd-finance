import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover } from 'antd'
import { Link } from 'react-router-dom'
import i18n from 'i18next'
import './style.scss'
import TemplateChoose from 'components/TemplateChoose'
import LogoBlue from "assets/logo-blue.svg";
import SidebarLogo from "assets/sidebar-logo.svg";
import CryptoMiningIcon from 'assets/sidebar/crypto-mining.svg'
import PlusIcon from 'assets/sidebar/plus.svg'
import MiningSwapIcon from 'assets/sidebar/mining-swap.svg'
import DashboardIcon from 'assets/sidebar/dashboard.svg'
import OverviewIcon from 'assets/sidebar/overview.svg'
import QuickSwapIcon from 'assets/sidebar/quick-swap.svg'
import GovernanceIcon from 'assets/sidebar/governance.svg'

import Twiiter from 'assets/socials/twitter.svg'
import Discord from 'assets/socials/discord.svg'
import Medium from 'assets/socials/medium.svg'
import Telegram from 'assets/socials/telegram.svg'
import Weixin from 'assets/socials/weixin.svg'
import WeixinQR from 'assets/qr-code.jpeg'

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
        <div className="top">
            <a href="/">
                <img src={SidebarLogo} className="sidebar-logo" />
            </a>
            <ul className="nav">
                {!hideCreate && <li>
                    <a onClick={() => { setShowTemplateChoose(true) }}>
                        <img src={PlusIcon} />{t('sidebar.create')}</a>
                </li>}
                <li>
                    <Link to="/projects"><img src={CryptoMiningIcon} />{t('sidebar.cryptoMining')}</Link>
                </li>
                <li><Link to="/coming/swap"><img src={MiningSwapIcon} />{t('sidebar.miningSwap')}</Link></li>
                <li><Link to="/coming/dashboard"><img src={DashboardIcon} />{t('sidebar.dashboard')}</Link></li>
            </ul>
            <ul className="nav second">
                <li>
                    <Link to="/coming/overview"><img src={OverviewIcon} />{t('sidebar.overview')}</Link>
                </li>
                <li><Link to="/coming/quick-swap"><img src={QuickSwapIcon} />{t('sidebar.quickSwap')}</Link></li>
                <li><Link to="/coming/governance"><img src={GovernanceIcon} />{t('sidebar.governance')}</Link></li>
            </ul>
        </div>
        <div className="bottom">
            <div className="more-links">
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
            </div>
            <div className="copyright">
                <img src={LogoBlue} className="footer-logo" />
                © DD.FINANCE.All rights reserved
            </div>
        </div>
        { showTemplateChoose && <TemplateChoose onCancel={() => { setShowTemplateChoose(false) }} />}
    </div >)
}