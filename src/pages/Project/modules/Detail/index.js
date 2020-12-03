import React, {useEffect, useState} from 'react'
import { PDFReader } from 'reactjs-pdf-reader';
import './style.scss'
//todo,这里暂时需要翻墙，来下载 pdf.js
export default function Detail(props) {
    const { fullDesc } = props
    const [loading, setLoading] = useState(true)
    return (<div className="detail-module">
        {loading && <div>Loading PDF...</div>}
        <PDFReader url={fullDesc} onDocumentComplete={()=>{setLoading(false)}}/>
    </div>)
}
