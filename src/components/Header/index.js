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

    const languageMenu = <Menu>
        <Menu.Item>
            <a onClick={() => { changeLanguage('zh') }}>简体中文</a>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => { changeLanguage('en') }}>English</a>
        </Menu.Item>
    </Menu>

    return (<header className="header">
        <div className="container">
            <a href="/">
                <img src={Logo} className="logo" />
            </a>
            <nav>
                {/* <a style={{ marginRight: '16px' }}>Project</a> */}
                {/* <span className="hint">
                    Project in working progress
                </span> */}
                <Dropdown overlay={languageMenu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {i18n.language === 'en' ? 'English' : '简体中文'} <DownOutlined className="dropdown-icon" />
                    </a>
                </Dropdown>
                {wallet.status === 'connected' ? <Tooltip title={window.ethereum.selectedAddress}>
                    <Button className="btn-green btn-green-wallet">{window.ethereum.selectedAddress.slice(0, 4) + '...' + window.ethereum.selectedAddress.slice(-4)}</Button>
                </Tooltip>
                    : <Button className="btn-green btn-green-wallet" onClick={() => { wallet.connect() }}>Connect Wallet</Button>}
                <div className="mobile-hint">
                    Project in working progress
                </div>
            </nav>
        </div>
    </header>)
}