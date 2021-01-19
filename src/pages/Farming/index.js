import React from 'react';
import { Link } from 'react-router-dom';
import FarmerIcon from 'assets/sidebar/farming.svg';
import Header from 'components/Header';
import DHMIcon from 'assets/farming/dhm.svg';

import { Row, Col, Button } from 'antd';
import './style.scss';

export default function Farming() {
    return (
        <div className={`farming-page`}>
            <Header hideAction={true} />
            <div className="farming-top">
                <img src={FarmerIcon} />
                <div className="title">Earn Tokens with Miners</div>
                <div className="desc">
                    Harvest tokens by staking MINING Tokens.
                </div>
            </div>

            <div className="farming-list">
                <Row justify="space-around">
                    <Col xs={24} md={7}>
                        <div className="farming-item cheese-box">
                            <img src={DHMIcon} className="icon" />
                            <div className="title">Miner Hashrate</div>
                            <div className="desc">
                                Deposit DADA <br />Earn DHM
                            </div>
                            <Link to="/farming-detail">
                                <Button className="btn-cheese">Select</Button>
                            </Link>
                            <div className="apy-box">
                                <div className="apy-title">APY</div>
                                <div className="value">128%</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
