import React, { useEffect } from 'react'
import Logo from '../../assets/logo.png'
import { Button, Tooltip, Dropdown, Menu } from 'antd'
import { useWallet } from 'use-wallet'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'


import './style.scss'

export default function Header() {
    const wallet = useWallet()
    useEffect(() => {
        wallet.connect()

    }, [])

    const changeLanguage = language => {
        localStorage.setItem('language', language)
        i18n.changeLanguage(language)
    }


    return (<header className="header">
        <div className="container">
            <a href="/">
                <img src={Logo} className="logo" />
            </a>
            <nav>
                <a>项目列表</a>
                {wallet.status === 'connected' ? <Tooltip title={window.ethereum.selectedAddress}>
                    <a className="line-btn">{window.ethereum.selectedAddress.slice(0, 4) + '...' + window.ethereum.selectedAddress.slice(-4)}</a>
                </Tooltip>
                    : <a onClick={() => { wallet.connect() }}>Connect Wallet</a>}
                {/* <a onClick={() => { changeLanguage(i18n.language === 'en' ? 'zh' : 'en') }}>
                    {i18n.language === 'en' ? 'English' : '简体中文'}
                </a> */}
            </nav>
        </div>
    </header>)
}