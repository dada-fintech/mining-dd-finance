import React from 'react'
import Header from 'components/Header'
import { Input } from 'antd'
import InputaMount from 'components/InputaMount';
import './style.scss'

export default function BuyDHM() {
    return (<div className={`buy-dhm-page`}>
        <Header hideAction={true} />
        <div className="apy">
            <div className="num">1645.8%</div>
            <div className="title">APY</div>
        </div>
        <div className="cheese-box info-box">
            <div className="block">
                <div className="num">$6.5</div>
                <div className="title">Current Price</div>
            </div>
            <div className="block">
                <div className="num">3,299</div>
                <div className="title">Available</div>
            </div>
            <div className="block">
                <div className="num">100,0000</div>
                <div className="title">Total supply</div>
            </div>
            <InputaMount
                balance={0}
                maxBalance={'111'}
                onConfirm={() => { console.log(11) }}
                sumbol={'DHM'}
                balanceSumbol={'USDT'}
            />
            {/* <div className="input-box">
                   <InputaMount
                        balance={user.usdt_pretty || 0}
                        maxBalance={balance || 0}
                        onConfirm={getInputaMountNumber}
                        sumbol={OFFICIAL_SYMBOL}
                        balanceSumbol={'USDT'}
                    />
                <Input className="num-input"/>
                <div className="suffix">
                    <span className="max-btn">MAX</span>
                    <span className="unit">DHM</span>
                </div>
            </div> */}
        </div>

    </div >)
}