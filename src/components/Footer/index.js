import React from 'react'
import { Row, Col } from 'antd'
import SocialIcons from '../../assets/socials.png'
import FaceBook from '../../assets/socials/facebook.svg'
import Twiiter from '../../assets/socials/twiiter.svg'
import WeChat from '../../assets/socials/wechat.svg'
import WeiBo from '../../assets/socials/weibo.svg'

import './style.scss'
import Logo from "../../assets/logo.png";

export default function Footer() {

    return (<div className="container">
        <footer className="footer">
            <Row>
                <Col xs={12} md={4}>
                    <ul>
                        {/* <li>Resources</li> */}
                        <li><a target="_blank" href="https://doc.dd.finance">Doc</a></li>
                        {/* <li>FAQs</li>
                        <li>Service Status</li> */}
                    </ul>
                </Col>
                <Col xs={12} md={4}>
                    <ul>
                        <li>Product</li>
                    </ul>
                </Col>
                <Col xs={12} md={4}>
                    <ul>
                        <li>Developers</li>

                    </ul>
                </Col>
                <Col xs={12} md={4}>
                    <ul>
                        <li>Foundation</li>
                        <li>Team</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>
                </Col>
                <Col xs={24} md={8} className="text-align-right">
                    <img src={FaceBook} className="social-icon" />
                    <a target="_blank" href="https://twitter.com/FinanceDada">
                        <img src={Twiiter} className="social-icon" />
                    </a>
                    <img src={WeChat} className="social-icon" />
                    <img src={WeiBo} className="social-icon" />
                </Col>
            </Row>
        </footer>
    </div >)
}