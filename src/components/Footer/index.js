import React from 'react'
import { Row, Col } from 'antd'

import './style.scss'
import LogoBlue from "../../assets/logo-blue.svg";

export default function Footer() {

    return (<div className="footer">
        <footer className="container">
            <div>
                <a href="https://doc.dd.finance">阅读文档</a>
                <img src={LogoBlue} className="footer-logo" />
                <a>发现更多</a>
            </div>
            <div className="copyright">
                © DD.FINANCE.All rights reserved.
            </div>

        </footer>
    </div >)
}