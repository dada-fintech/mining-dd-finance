import React from 'react'
import Logo from '../../assets/logo.png'

import './style.scss'

export default function Header() {
    return (<header className="header">
        <div className="container">
            <img alt="logo" src={Logo} className="logo" />
            <nav>
                <a>Project</a>
            </nav>
        </div>
    </header>)
}