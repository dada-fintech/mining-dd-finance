import React, { useEffect } from 'react'
import Logo from '../../assets/logo.png'
import { Tooltip } from 'antd'
import { useWallet } from 'use-wallet'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'i18next'


import './style.scss'

export default function Header() {
    const wallet = useWallet()
    const { t } = useTranslation()
    const role = useSelector(state => state.setting.role)
    const dispatch = useDispatch()
    useEffect(() => {
        wallet.connect()
    }, [])

    const changeLanguage = language => {
        localStorage.setItem('language', language)
        i18n.changeLanguage(language)
    }

    // const changeRole = role => {
    //     dispatch({
    //         type: 'SWITCH_ROLE',
    //         payload:{
    //             role: role
    //         }
    //     })
    // }

    // const roleMenu = <Menu>
    //     <Menu.Item onClick={changeRole('1')}>
    //         项目贡献者
    //     </Menu.Item>
    //     <Menu.Item onClick={changeRole('2')}>
    //         项目管理人
    //     </Menu.Item>
    //     <Menu.Item onClick={changeRole('3')}>
    //         委员会委员
    //     </Menu.Item>
    // </Menu>

    return (<header className="header">
        <div className="container">
            <a href="/">
                <img src={Logo} className="logo" />
            </a>
            <nav>
                <a>{t('common.projectList')}</a>
                {wallet.status === 'connected' ? <Tooltip title={window.ethereum.selectedAddress}>
                    <a className="line-btn">{window.ethereum.selectedAddress.slice(0, 4) + '...' + window.ethereum.selectedAddress.slice(-4)}</a>
                </Tooltip>
                    : <a onClick={() => { wallet.connect() }}>Connect Wallet</a>}
                <a onClick={() => { changeLanguage(i18n.language === 'en' ? 'zh' : 'en') }}>
                    {i18n.language === 'en' ? '简体中文' : 'English'}
                </a>
            </nav>
        </div>
    </header>)
}