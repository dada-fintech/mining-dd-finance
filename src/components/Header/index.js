/*
 * @Author: your name
 * @Date: 2020-12-05 22:48:57
 * @LastEditTime: 2020-12-06 00:43:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mining-dd-finance\src\components\Header\index.js
 */
import React, { useEffect } from 'react'
import Logo from '../../assets/logo.png'
import { Tooltip } from 'antd'
import { useWallet } from 'use-wallet'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'i18next'


import './style.scss'

export default function Header(props) {
    const wallet = useWallet()
    const { t } = useTranslation()
    const { role } = props
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
                <a href="/projects">{t('common.projectList')}</a>
                <a onClick={() => { changeLanguage(i18n.language === 'en' ? 'zh' : 'en') }}>
                    {i18n.language === 'en' ? '简体中文' : 'English'}
                </a>
                {wallet.status === 'connected' ? <Tooltip title={wallet.account}>
                    {wallet.account && <a className="line-btn">{wallet.account.slice(0, 4) + '...' + wallet.account.slice(-4)}</a>}
                    {role ? (<sup className="role">{role === 'manager' ? t('project.role.manager') : (role === 'committee' ? t('project.role.committee') : (role === 'invester' ? t('project.role.supporter') : t('project.role.visitor')))}</sup>) : ''}
                </Tooltip>
                    : <a className="border-top-btm" onClick={() => { console.log(11); wallet.connect() }}>Connect Wallet</a>}
            </nav>
        </div>
    </header>)
}