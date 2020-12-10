import React from 'react'
import { useTranslation } from 'react-i18next'

import './style.scss'
import LogoBlue from "../../assets/logo-blue.svg";

export default function Footer() {
    const { t } = useTranslation()

    return (<div className="footer">
        <footer className="container">
            <div>
                <a href="https://doc.dd.finance" target="_blank">{t('homepage.footer.documentation')}</a>
                <img src={LogoBlue} className="footer-logo" />
                <a href="/projects?tab=can_invest_project">{t('homepage.footer.explore')}</a>
            </div>
            <div className="copyright">
                © DD.FINANCE.All rights reserved.
            </div>

        </footer>
    </div >)
}