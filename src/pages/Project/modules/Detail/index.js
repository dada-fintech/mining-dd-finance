import React from 'react'
import { Document } from 'react-pdf'
import './style.scss'


export default function Detail(props) {
    const {fullDesc} = props
    return (<div className="detail-module">
        <Document url={fullDesc}/>
    </div>)
}
