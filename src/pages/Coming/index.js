import React from 'react'
import { useParams } from 'react-router-dom'
import AppSidebar from 'components/AppSidebar'
import { Row, Col } from 'antd'
import './style.scss'

export default function Homepage() {
    const { page } = useParams()
    return (<div className={`coming-page ${page}`}>
        <Row>
            <Col lg={4} md={5} xs={0} xxl={3}>
                <AppSidebar />
            </Col>
            <Col lg={20} md={19} xs={24} xxl={21}>
                <div className="content-wrapper">
                    COMING SOON
                </div>
            </Col>
        </Row>
    </div >)
}