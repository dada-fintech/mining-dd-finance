import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Timer from 'react-compound-timer'
import { Input } from 'antd'

import './style.scss'

export default function Timespan(props) {
    const { t } = useTranslation()
    const { fieldChange } = props
    const [days, setDays] = useState('')
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

    useEffect(() => {
        let finalTime = 0
        if (days) {
            finalTime += days * 24 * 60 * 60 * 1000
        }
        if (hours) {
            finalTime += hours * 60 * 60 * 1000
        }
        if (minutes) {
            finalTime += minutes * 60 * 1000
        }
        if (seconds) {
            finalTime += seconds * 1000
        }
        fieldChange(finalTime)
    }, [days, hours, minutes, seconds])


    const timeChange = (value, field) => {
        const isClear = !value
        const parsedValue = isClear ? '' : parseInt(value)

        if (isClear || Number.isInteger(parseInt(value))) {
            switch (field) {
                case 'days':
                    setDays(parsedValue); break;
                case 'hours':
                    (isClear || parsedValue < 24) && setHours(parsedValue); break;
                case 'minutes':
                    (isClear || parsedValue < 60) && setMinutes(parsedValue); break;
                case 'seconds':
                    (isClear || parsedValue < 60) && setSeconds(parsedValue); break;
            }
        }
    }

    return (<div className="timespan">
        <Input className="num" value={days} onChange={(e) => { timeChange(e.target.value, 'days') }} />
        <div className="unit">天</div>
        <Input className="num" value={hours} onChange={(e) => { timeChange(e.target.value, 'hours') }} />
        <div className="unit">时</div>
        <Input className="num" value={minutes} onChange={(e) => { timeChange(e.target.value, 'minutes') }} />
        <div className="unit">分</div>
        <Input className="num" value={seconds} onChange={(e) => { timeChange(e.target.value, 'seconds') }} />
        <div className="unit">秒</div>
    </div >)
}