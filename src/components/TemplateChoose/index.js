import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Row, Col, Button } from 'antd'
import DoubleCheckIcon from 'assets/double-check.svg'
import TimeIcon from 'assets/time.svg'
// import i18n from 'i18next'
import './style.scss'

export default function TemplateChoose(props) {
    const { t } = useTranslation()
    const { onCancel } = props

    return (<Modal visible={true} title="请选择一个治理模版" width="80%" footer={null} onCancel={() => { onCancel() }} className="template-choose">
        <div className="modal-title">请选择一个治理模版</div>
        <Row gutter={64}>
            <Col xs={24} lg={12}>
                <div className="template-item">
                    <div className="top">
                        <div className="type">
                            开放式
                        </div>
                        <a href="/create-project?type=open">
                            <Button className="btn-blue">选择该模版</Button>
                        </a>
                    </div>
                    <div className="bottom">
                        <div className="line">
                            <div className="title">
                                筹款规则 <img src={TimeIcon} />
                            </div>
                            <div className="text">
                                筹款规则：根据项目计划，选择筹款方式：定期筹款和定时筹款
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                释放规则 <img src={TimeIcon} />
                            </div>
                            <div className="text">
                                释放规则：根据项目推进情况择时发起款项释放，无需预设定，需要通过投资者投票
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                赎回规则 <img src={TimeIcon} />
                            </div>
                            <div className="text">
                                赎回规则：请在创建时选择用户赎回本金及利息的方式：等额本息和随还随取
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
                        <a href="/create-project?type=close">
                            <Button className="btn-blue">选择该模版</Button>
                        </a>
                    </div>
                    <div className="bottom">
                        <div className="line">
                            <div className="title">
                                筹款规则 <img src={DoubleCheckIcon} />
                            </div>
                            <div className="text">
                                筹款规则：根据项目策略制定完善的筹款计划及额度
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                释放规则 <img src={DoubleCheckIcon} />
                            </div>
                            <div className="text">
                                释放规则：根据项目计划，预先设定款项释放规则
                            </div>
                        </div>
                        <div className="line">
                            <div className="title">
                                赎回规则 <img src={DoubleCheckIcon} />
                            </div>
                            <div className="text">
                                赎回规则：根据项目计划，预先设定回报日期并于规定日期前完成回款
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Modal >)
}