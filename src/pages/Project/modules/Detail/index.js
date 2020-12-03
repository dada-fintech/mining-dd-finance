import React from 'react'
import { Document } from 'react-pdf'
import './style.scss'


export default function Detail(props) {
    const {fullDesc} = props
    console.log('pdf source', fullDesc)
    return (<div className="detail-module">
        <Document url={fullDesc}/>
    </div>)
}
