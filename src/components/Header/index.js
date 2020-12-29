import React, { useEffect, useState } from 'react'
// import Logo from '../../assets/logo.png'
import { Tooltip, Drawer } from 'antd'
import { useWallet } from 'use-wallet'
import AppSidebar from 'components/AppSidebar'
import { MenuOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
// import { useDispatch, useSelector } from 'react-redux'

import './style.scss'

export default function Header(props) {
    const wallet = useWallet()
    const { t } = useTranslation()
    const { role, breadCrumb, hideAction } = props
    const [drawerVisible, setDrawerVisible] = useState(false)

    useEffect(() => {
        wallet.connect()
    }, [])

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

    // if(!role){
    //     role = '123'
    // }

    return (<header className="header">
        <MenuOutlined className="mobile-menu" onClick={() => { setDrawerVisible(true) }} />

        {!hideAction && <>
            {breadCrumb && <ul className="main-breadcrumb">
                {breadCrumb.map((item, index) => (
                    <li className={index === breadCrumb.length - 1 ? 'done' : ''}>{item}</li>
                ))}
            </ul>}
            <nav>
                {role ? (<div className="role">
                    {role === 'manager' ? t('project.role.manager') : (role === 'committee' ? t('project.role.committee') : (role === 'invester' ? t('project.role.supporter') : t('project.role.visitor')))}
                    <div className="title">角色</div>
                </div>) : ''}
                {wallet.status === 'connected' ? <Tooltip title={wallet.account}>
                    {wallet.account && <a className="line-btn">{wallet.account.slice(0, 4) + '...' + wallet.account.slice(-4)}</a>}
                </Tooltip>
                    : <a className="btn-connect" onClick={() => { console.log(11); wallet.connect() }}>Connect Wallet</a>}
            </nav>
        </>}
        {drawerVisible && <Drawer visible={true} placement="left" onClose={() => { setDrawerVisible(false) }}>
            <AppSidebar />
        </Drawer>}
    </header>)
}