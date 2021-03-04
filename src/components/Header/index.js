import React, { useEffect, useState } from 'react';
// import Logo from '../../assets/logo.png'
import { Tooltip, Drawer, Modal, Button } from 'antd';
import { useWallet } from 'use-wallet';
import AppSidebar from 'components/AppSidebar';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import config from 'config'
// import { useDispatch, useSelector } from 'react-redux'
import './style.scss';

export default function Header (props) {
    const wallet = useWallet();
    const { t } = useTranslation();
    const { role, breadCrumb, hideAction } = props;
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [networkError, setNetworkError] = useState('')
    const network = useSelector((state) => state.setting.network);

    const chainIdMapping = {
        1: 'ETH Mainnet',
        56: 'BSC Mainnet',
        128: 'HECO Mainnet',
        97: 'BSC Testnet'
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
    const connectWallet = () => {
        if (window.ethereum) {
            const configChainId = config[network].chainId
            const walletChainId = parseInt(window.ethereum.chainId)
            if (configChainId !== walletChainId) {
                setNetworkError(chainIdMapping[configChainId])
            }
            if (wallet && wallet.status !== 'connected') {
                wallet.connect();
            }
        }
    }

    useEffect(() => {
        // other code
        connectWallet()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="header">
            <MenuOutlined
                className="mobile-menu"
                onClick={() => {
                    setDrawerVisible(true);
                }}
            />

            {!hideAction && (
                <>
                    {breadCrumb && (
                        <ul className="main-breadcrumb">
                            {breadCrumb.map((item, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === breadCrumb.length - 1
                                            ? 'done'
                                            : ''
                                    }
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                    <nav>
                        {role ? (
                            <div className="role">
                                {role === 'manager'
                                    ? t('project.role.manager')
                                    : role === 'committee'
                                        ? t('project.role.committee')
                                        : role === 'invester'
                                            ? t('project.role.supporter')
                                            : t('project.role.visitor')}
                                <div className="title">{t('common.role')}</div>
                            </div>
                        ) : (
                                ''
                            )}
                        {wallet.status === 'connected' ? (
                            <Tooltip title={wallet.account}>
                                {wallet.account && (
                                    <span className="btn-connect">
                                        <span className="green-dot"></span>
                                        {t('common.walletConnected')}
                                    </span>
                                )}
                            </Tooltip>
                        ) : (
                                <span
                                    className="btn-connect"
                                    onClick={() => {
                                        connectWallet()
                                    }}
                                >
                                    <span className="red-dot"></span>
                                    {t('common.connectWallet')}
                                </span>
                            )}
                    </nav>
                </>
            )}
            {drawerVisible && (
                <Drawer
                    visible={true}
                    placement="left"
                    onClose={() => {
                        setDrawerVisible(false);
                    }}
                >
                    <AppSidebar />
                </Drawer>
            )}

            {networkError !== '' ? <Modal visible={true} title="Network Error" footer={null} onCancel={() => setNetworkError('')}>
                <div style={{ color: '#15163d', marginBottom: '24px', fontSize: '16px' }}>
                    Please switch network to {networkError}
                </div>
                <Button style={{ padding: '0 32px' }} className="btn-blue" onClick={() => setNetworkError('')}>OK</Button>
            </Modal> : ""}
        </header>
    );
}
