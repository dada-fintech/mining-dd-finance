import React from 'react'
import { useTranslation } from 'react-i18next'
import Timer from 'react-compound-timer'

import './style.scss'

export default function Countdown(props) {
    const { t } = useTranslation()
    const { timestamp } = props

    console.log(timestamp, 1111)

    return (<div className="countdown">
        {<Timer initialTime={timestamp} direction="backward" checkpoints={[{ time: 0, callback: () => console.log('do something') }]}>
            <div className="num">
                <Timer.Days />
            </div>
            <div className="unit">天</div>
            <div className="num">
                <Timer.Hours />
            </div>
            <div className="unit">时</div>
            <div className="num">
                <Timer.Minutes />
            </div>
            <div className="unit">分</div>
            <div className="num">
                <Timer.Seconds />
            </div>
            <div className="unit">秒</div>
        </Timer>}

    </div >)
}