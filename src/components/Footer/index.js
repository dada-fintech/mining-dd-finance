import React from 'react'
import { Row, Col } from 'antd'
import SocialIcons from '../../assets/socials.png'

import './style.scss'

export default function Footer() {

    return (<div className="container">
        <footer className="footer">
            <Row>
                <Col xs={12} md={4}>
                    <ul>
                        <li>Resources</li>
                        <li>Doc</li>
                        <li>FAQs</li>
                        <li>Service Status</li>
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
                    <img alt="" className="social-icon" src={SocialIcons} />
                </Col>
            </Row>
        </footer>
    </div >)
}