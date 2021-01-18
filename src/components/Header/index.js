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
    //         项目贡献者s
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
    useEffect(()=>{
        wallet.connect()
    }, [])

    return (<header className="header">
        <MenuOutlined className="mobile-menu" onClick={() => { setDrawerVisible(true) }} />

        {!hideAction && <>
            {breadCrumb && <ul className="main-breadcrumb">
                {breadCrumb.map((item, index) => (
                    <li key={index} className={index === breadCrumb.length - 1 ? 'done' : ''}>{item}</li>
                ))}
            </ul>}
            <nav>
                {role ? (<div className="role">
                    {role === 'manager' ? t('project.role.manager') : (role === 'committee' ? t('project.role.committee') : (role === 'invester' ? t('project.role.supporter') : t('project.role.visitor')))}
                    <div className="title">{t('common.role')}</div>
                </div>) : ''}
                {wallet.status === 'connected' ? <Tooltip title={wallet.account}>
                    {wallet.account && <a className="btn-connect"><span className="green-dot"></span>{t('common.walletConnected')}</a>}
                </Tooltip>
                    : <a className="btn-connect" onClick={() => { wallet.connect() }}><span className="red-dot"></span>{t('common.connectWallet')}</a>}
            </nav>
        </>}
        {drawerVisible && <Drawer visible={true} placement="left" onClose={() => { setDrawerVisible(false) }}>
            <AppSidebar />
        </Drawer>}
    </header>)
}