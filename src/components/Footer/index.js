import React from 'react'
import { Row, Col } from 'antd'
// import SocialIcons from '../../assets/socials.png'
import Twiiter from '../../assets/socials/twitter.svg'
import Discord from '../../assets/socials/discord.svg'
import Medium from '../../assets/socials/medium.svg'
import Telegram from '../../assets/socials/telegram.svg'

import './style.scss'
import LogoBlue from "../../assets/logo-blue.png";

export default function Footer() {

    return (<div className="container">
        <footer className="footer">
            <Row>
                <Col xs={12} md={6}>
                    <img src={LogoBlue} className="footer-logo" />
                </Col>
                <Col xs={12} md={6}>
                    <ul>
                        <li>
                            <a href="https://dd.finance/app">DeFi APP</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://doc.dd.finance">Doc</a>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} md={6}>
                    <ul>
                        <li><a href="mailto:contact@dd.finance">contact@dd.finance</a></li>
                        <li><a href="mailto:media@dd.finance">media@dd.finance</a></li>
                    </ul>
                </Col>
                <Col xs={24} md={6} className="text-align-right">
                    <a target="_blank" href="https://twitter.com/FinanceDada">
                        <img src={Twiiter} className="social-icon" />
                    </a>
                    <a target="_blank">
                        <img src={Discord} className="social-icon" />
                    </a>
                    <a target="_blank">
                        <img src={Medium} className="social-icon" />
                    </a>
                    <a target="_blank">
                        <img src={Telegram} className="social-icon" />
                    </a>
                </Col>
            </Row>
        </footer>
    </div >)
}