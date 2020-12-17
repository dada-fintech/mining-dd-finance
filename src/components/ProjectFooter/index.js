import React from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Popover } from 'antd'
import Twiiter from '../../assets/socials/twitter.svg'
import Discord from '../../assets/socials/discord.svg'
import Medium from '../../assets/socials/medium.svg'
import Telegram from '../../assets/socials/telegram.svg'
import Weixin from '../../assets/socials/weixin.svg'
import WeixinQR from '../../assets/qr-code.jpeg'

import './style.scss'
import LogoBlue from "../../assets/logo-blue.svg";

export default function ProjectFooter() {
    const { t } = useTranslation()
    const weixinContent = (<img src={WeixinQR} style={{width: '140px'}}/>)

    return (<div className="project-footer">
        <footer className="container border-line">
            <Row>
                <Col xs={24} md={6}>
                    <img src={LogoBlue} className="footer-logo" />

                </Col>
                <Col xs={24} md={6}>
                    <a className="link" href="https://doc.dd.finance" target="_blank">{t('homepage.footer.documentation')}</a>
                    <div></div>
                    <a className="link" href="/projects?tab=can_invest_project">{t('homepage.footer.explore')}</a>
                </Col>
                <Col xs={24} md={6}>
                    <a className="email" href="mailto:contact@dd.finance">contact@dd.finance</a>
                    <a className="email" href="mailto:media@dd.finance">media@dd.finance</a>
                </Col>
                <Col xs={24} md={6}>
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
                            <Popover content={weixinContent}>
                                <img src={Weixin} className="social-icon" />
                            </Popover>
                        </a>
                    </div>
                </Col>

            </Row>
        </footer>
    </div >)
}