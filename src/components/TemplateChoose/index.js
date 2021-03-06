import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Row, Col, Button } from 'antd'
import DoubleCheckIcon from 'assets/double-check.svg'
import { useHistory } from 'react-router-dom'
import TimeIcon from 'assets/time.svg'
// import i18n from 'i18next'
import './style.scss'

export default function TemplateChoose (props) {
    const { t, i18n } = useTranslation()
    const history = useHistory();
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
        clearStorage();
        onCancel();
        history.push(`/create-project/${tempType}`)
    }

    return (<Modal visible={true} width="80%" footer={null} onCancel={() => { onCancel() }} className={`template-choose ${i18n.language}`}>
        <div className="modal-title">{t('template.title')}</div>
        <Row gutter={64}>
            <Col xs={24} lg={12}>
                <div className="template-item">
                    <div className="top">
                        <div className="type">
                            {t('common.customizable')}
                        </div>
                        <span onClick={() => goPage('open')}>
                            <Button className="btn-blue">{t('template.select')}</Button>
                        </span>
                    </div>
                    <div className="desc">
                        {t('template.open.desc')}
                    </div>
                </div>
            </Col>
            <Col xs={24} lg={12}>
                <div className="template-item">
                    <div className="top">
                        <div className="type">
                            {t('common.standard')}
                        </div>
                        <span onClick={() => goPage('close')}>
                            <Button className="btn-blue">{t('template.select')}</Button>
                        </span>
                    </div>
                    <div className="desc">
                        {t('template.close.desc')}

                    </div>
                </div>
            </Col>
        </Row>
        <div className="features-block">
            <Row gutter={64}>
                <Col xs={24} lg={12}>
                    <div className="bottom">
                        <div className="line">
                            <div className="title">
                                {t('template.fundraisingRules')}
                            </div>
                            <img src={TimeIcon} alt="" />
                            <div className="text">
                                {t('template.open.1')}
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                {t('template.unlockRules')}
                            </div>
                            <img src={TimeIcon} alt="" />
                            <div className="text">
                                {t('template.open.2')}
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                {t('template.redemptionRules')}
                            </div>
                            <img src={TimeIcon} alt="" />
                            <div className="text">
                                {t('template.open.3')}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} lg={12}>
                    <div className="bottom">
                        <div className="line">
                            {/* <div className="title">
                                {t('template.fundraisingRules')}
                            </div> */}
                            <img src={DoubleCheckIcon} alt="" />
                            <div className="text">
                                {t('template.close.1')}
                            </div>
                        </div>
                        <div className="line">
                            {/* <div className="title">
                                {t('template.unlockRules')}
                            </div> */}
                            <img src={DoubleCheckIcon} alt="" />
                            <div className="text">
                                {t('template.close.2')}
                            </div>
                        </div>

                        <div className="line">
                            {/* <div className="title">
                                {t('template.redemptionRules')}
                            </div> */}
                            <img src={DoubleCheckIcon} alt="" />
                            <div className="text">
                                {t('template.close.3')}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </Modal >)
}