import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Row, Col, Button } from 'antd'
import DoubleCheckIcon from 'assets/double-check.svg'
import { useHistory } from 'react-router-dom'
import TimeIcon from 'assets/time.svg'
// import i18n from 'i18next'
import './style.scss'

export default function TemplateChoose(props) {
    const { t } = useTranslation()
    const history = useHistory()
    const { onCancel } = props
    const clearStorage = () => {
        localStorage.setItem('projectInfo', null)
        localStorage.setItem('fundraising', null)
        localStorage.setItem('processList', null)
        localStorage.setItem('currentStep', null)
        localStorage.setItem('raisingMethod', null)
        localStorage.setItem('repayMethod', null)
        localStorage.setItem('withdrawMethod', null)
    }

    const goPage = (tempType) => {
        clearStorage()
        history.push(`/create-project/${tempType}`)
    }

    return (<Modal visible={true} width="80%" footer={null} onCancel={() => { onCancel() }} className="template-choose">
        <div className="modal-title">{t('template.title')}</div>
        <Row gutter={64}>
            <Col xs={24} lg={12}>
                <div className="template-item">
                    <div className="top">
                        <div className="type">
                            开放式
                        </div>
                        <a onClick={() => goPage('open')}>
                            <Button className="btn-blue">{t('template.select')}</Button>
                        </a>
                    </div>
                    <div className="bottom">
                        <div className="line">
                            <div className="title">
                                {t('template.fundraisingRules')} <img src={TimeIcon} />
                            </div>
                            <div className="text">
                                {t('template.open.1')}
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                {t('template.unlockRules')} <img src={TimeIcon} />
                            </div>
                            <div className="text">
                                {t('template.open.2')}
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                {t('template.redemptionRules')} <img src={TimeIcon} />
                            </div>
                            <div className="text">
                                {t('template.open.3')}
                            </div>
                        </div>
                    </div>
                </div>

            </Col>
            <Col xs={24} lg={12}>
                <div className="template-item">
                    <div className="top">
                        <div className="type">
                            闭合式
                        </div>
                        <a onClick={() => goPage('close')}>
                            <Button className="btn-blue">{t('template.select')}</Button>
                        </a>
                    </div>
                    <div className="bottom">
                        <div className="line">
                            <div className="title">
                                {t('template.fundraisingRules')} <img src={DoubleCheckIcon} />
                            </div>
                            <div className="text">
                                {t('template.close.1')}
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                {t('template.unlockRules')} <img src={DoubleCheckIcon} />
                            </div>
                            <div className="text">
                                {t('template.close.2')}

                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                {t('template.redemptionRules')} <img src={DoubleCheckIcon} />
                            </div>
                            <div className="text">
                                {t('template.close.3')}

                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Modal >)
}