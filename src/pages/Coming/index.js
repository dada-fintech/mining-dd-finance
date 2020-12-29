import React from 'react'
import { useParams } from 'react-router-dom'
import AppSidebar from 'components/AppSidebar'
import { Row, Col } from 'antd'
import './style.scss'

export default function Homepage() {
    const { page } = useParams()
    return (<div className={`coming-page ${page}`}>
        <Row>
            <Col md={4} xs={0} xxl={3}>
                <AppSidebar />
            </Col>
            <Col md={20} xs={24} xxl={21}>
                <div className="content-wrapper">
                    COMING SOON
                </div>
            </Col>
        </Row>
    </div >)
}