import React, { useEffect } from 'react'
import Logo from '../../assets/logo.png'
import { Button, Tooltip } from 'antd'
import { useWallet } from 'use-wallet'


import './style.scss'

export default function Header() {
    const wallet = useWallet()
    useEffect(() => {
        wallet.connect()

    }, [])
    return (<header className="header">
        <div className="container">
            <a href="/">
                <img src={Logo} className="logo" />
            </a>
            <nav>
                {/* <a style={{ marginRight: '16px' }}>Project</a> */}
                <span className="hint">
                Project in working progress
                </span>
                {wallet.status === 'connected' ? <Tooltip title={window.ethereum.selectedAddress}>
                    <Button className="btn-green">{window.ethereum.selectedAddress.slice(0, 4) + '...' + window.ethereum.selectedAddress.slice(-4)}</Button>
                </Tooltip>
                    : <Button className="btn-green" onClick={() => { wallet.connect() }}>Connect Wallet</Button>}
            </nav>
        </div>
    </header>)
}