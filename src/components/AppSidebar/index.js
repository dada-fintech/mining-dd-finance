import React from 'react'
import { useTranslation } from 'react-i18next'
import { Popover } from 'antd'
import i18n from 'i18next'
import './style.scss'
import LogoBlue from "assets/logo-blue.svg";
import SidebarLogo from "assets/sidebar-logo.svg";
import CryptoMiningIcon from 'assets/sidebar/crypto-mining.svg'
import MiningSwapIcon from 'assets/sidebar/mining-swap.svg'
import DashboardIcon from 'assets/sidebar/dashboard.svg'
import Twiiter from 'assets/socials/twitter.svg'
import Discord from 'assets/socials/discord.svg'
import Medium from 'assets/socials/medium.svg'
import Telegram from 'assets/socials/telegram.svg'
import Weixin from 'assets/socials/weixin.svg'
import WeixinQR from 'assets/qr-code.jpeg'

export default function AppSidebar() {
    const { t } = useTranslation()
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
                <li>
                    <a href="/projects"><img src={CryptoMiningIcon} />Crypto Mining</a>
                    <a href="/create-project">
                        <div className="btn-create">Create</div>
                    </a>
                </li>
                <li><a href="/"><img src={MiningSwapIcon} />Mining Swap</a></li>
                <li><a href="/"><img src={DashboardIcon} />Dashboard</a></li>
            </ul>
        </div>
        <div className="bottom">
            <div className="more-links">
                <a onClick={() => { changeLanguage(i18n.language === 'en' ? 'zh' : 'en') }}>
                    {i18n.language === 'en' ? '简体中文' : 'English'}
                </a>
                <a href="https://doc.dd.finance" target="_blank">{t('homepage.footer.documentation')}</a>
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
    </div >)
}