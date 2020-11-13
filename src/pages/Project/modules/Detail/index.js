import React from 'react'
import './style.scss'


export default function Detail(props) {
    const {fullDesc} = props
    return (<div className="detail-module">
        <div className="article" dangerouslySetInnerHTML={{ __html: fullDesc }}></div>
    </div>)
}
