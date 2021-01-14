import React from 'react'
import { useParams } from 'react-router-dom'
import AppSidebar from 'components/AppSidebar'
import Header from 'components/Header'
import { Row, Col } from 'antd'
import './style.scss'

export default function Homepage() {
    const { page } = useParams()
    return (<div className={`coming-page ${page}`}>
        <Row>
            <Col xs={0} lg={4} xxl={3}>
                <AppSidebar />
            </Col>
            <Col xs={24} lg={20} xxl={21}>
                <div className="content-wrapper">
                    <Header hideAction={true} />
                    <div className="coming-text">
                        COMING SOON
                </div>
                </div>
            </Col>
        </Row>
    </div >)
}