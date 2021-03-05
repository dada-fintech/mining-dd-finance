import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PDFReader } from 'reactjs-pdf-reader';
import { toBr } from 'components/utils'
import config from 'config'
import './style.scss'
//todo,这里暂时需要翻墙，来下载 pdf.js
export default function Detail (props) {
    const { t } = useTranslation()
    const { fullDesc, projectInfo, otherFiles, projectId } = props
    const network = useSelector(state => state.setting.network)
    const [loading, setLoading] = useState(true)
    return (<div className="detail-module">
        <div className="text-line">
            <div>{t('createProject.managerName')}</div>
            <div>{projectInfo.creater_name}</div>
        </div>
        <div className="text-line">
            <div>{t('createProject.projectDetails')}</div>
            <div dangerouslySetInnerHTML={{ __html: toBr(projectInfo.project_description) }}></div>
        </div>
        <div className="text-line">
            <div>{t('createProject.projectStrategy')}</div>
            <div dangerouslySetInnerHTML={{ __html: toBr(projectInfo.project_strategy) }}></div>
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
        <div className="text-line">
            <div>{t('sidebar.documents')}</div>
            <div>
                {otherFiles && otherFiles.length > 0 && <div className="block">
                    <div className="box">
                        {otherFiles.map((item, index) => (
                            <div className="box-item-doc" key={index}>
                                <a target="_blank" rel="noreferrer" href={`${config[network].assetURL}/${projectId}/${item.file_name}`}>
                                    {item.file_name.slice(10)}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>}</div>
        </div>

        <div style={{ color: 'red' }}>
            {t('hint.detailHint')}
        </div>

        <div className="pdf-area">
            {loading && <div>Loading PDF...</div>}
            <PDFReader url={fullDesc} onDocumentComplete={() => { setLoading(false) }} />
        </div>
    </div>)
}
