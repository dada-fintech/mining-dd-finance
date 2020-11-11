import React from 'react'
import './style.scss'

export default function Sidebar() {
    return (<div className="sidebar">
        <div className="block">
            <div className="title">Supporters</div>
            <div className="box">
                <div className="box-item">
                    <div>
                        37.09%(39.403.85 USDT)
                    </div>
                    <div>
                        0x98...4651
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        37.09%(39.403.85 USDT)
                    </div>
                    <div>
                        0x98...4651
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        37.09%(39.403.85 USDT)
                    </div>
                    <div>
                        0x98...4651
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        37.09%(39.403.85 USDT)
                    </div>
                    <div>
                        0x987s9...4651
                    </div>
                </div>
            </div>
        </div>
        <div className="block">
            <div className="title">History</div>
            <div className="box">
                <div className="box-item">
                    <div>
                        PIP-7
                    </div>
                    <div className="status-pass">
                        PASS
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        PIP-1
                    </div>
                    <div className="status-fail">
                        FAIL
                    </div>
                </div>
            </div>
        </div>
        <div className="block">
            <div className="title">Stats</div>
            <div className="box">
                <div className="box-item">
                    <div>
                        Total asset
                    </div>
                    <div>
                        1,000,000 USD
                    </div>
                </div>
                <div className="box-item">
                    <div>
                        Total Vote
                    </div>
                    <div>
                        1,000,000 DUSD
                    </div>
                </div>
            </div>
        </div>
    </div>)
}