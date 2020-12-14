import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { PDFReader } from 'reactjs-pdf-reader';
import './style.scss'
//todo,这里暂时需要翻墙，来下载 pdf.js
export default function Detail(props) {
    const { t, i18n } = useTranslation()
    const { fullDesc, projectInfo } = props
    const [loading, setLoading] = useState(true)
    return (<div className="detail-module">
        <div className="text-line">
            <div>{t('createProject.managerName')}</div>
            <div>{projectInfo.creater_name}</div>
        </div>
        <div className="text-line">
            <div>{t('createProject.projectDetails')}</div>
            <div>{projectInfo.project_description}</div>
        </div>
        <div className="text-line">
            <div>{t('createProject.projectStrategy')}</div>
            <div>{projectInfo.project_strategy}</div>
        </div>
        <div className="text-line">
            <div>{t('createProject.contractAddress')}</div>
            <div>{projectInfo.contract_address}</div>
        </div>
        <div className="text-line">
            <div>{t('createProject.managerAddress')}</div>
            <div>{projectInfo.receiver}</div>
        </div>
        <div className="text-line">
            <div>{t('createProject.profitAddr')}</div>
            <div>{projectInfo.profit}</div>
        </div>
        <div style={{color: 'red'}}>
            {t('hint.detailHint')}
        </div>
        <div className="pdf-area">
            {loading && <div>Loading PDF...</div>}
            <PDFReader url={fullDesc} onDocumentComplete={() => { setLoading(false) }} />
        </div>
    </div>)
}
