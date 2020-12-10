import React, { useEffect, useState } from 'react'
import { PDFReader } from 'reactjs-pdf-reader';
import './style.scss'
//todo,这里暂时需要翻墙，来下载 pdf.js
export default function Detail(props) {
    const { fullDesc, projectInfo } = props
    const [loading, setLoading] = useState(true)
    return (<div className="detail-module">
        <div className="text-line">
            <div>基金发起人</div>
            <div>{projectInfo.creater_name}</div>
        </div>
        <div className="text-line">
            <div>项目详情</div>
            <div>{projectInfo.project_description}</div>
        </div>
        <div className="text-line">
            <div>项目策略</div>
            <div>{projectInfo.project_strategy}</div>
        </div>
        <div className="text-line">
            <div>合约地址</div>
            <div>{projectInfo.contract_address}</div>
        </div>
        <div className="text-line">
            <div>项目经理收款地址</div>
            <div>{projectInfo.receiver}</div>
        </div>
        <div className="text-line">
            <div>收益地址</div>
            <div>{projectInfo.profit}</div>
        </div>

        <div className="pdf-area">
            {loading && <div>Loading PDF...</div>}
            {/* <PDFReader url={fullDesc} onDocumentComplete={() => { setLoading(false) }} /> */}
        </div>
    </div>)
}
