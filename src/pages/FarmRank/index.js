import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "utils/axios";
import Header from "components/Header";
import { useSelector } from "react-redux";
import BN from 'bignumber.js'
import config from "config";
import "./style.scss";

export default function FarmRank() {
  // const wallet = useWallet()
  const [farmList, setFarmList] = useState([]);
  const [currentTab, setCurrentTab] = useState('eth')
  const [asset1, setAsset1] = useState('')
  const [outputAsset1, setOutputAsset1] = useState('')
  const [outputAsset1Percent, setOutputAsset1Percent] = useState('')
  const [asset2, setAsset2] = useState('')
  const [outputAsset2, setOutputAsset2] = useState('')
  const [outputAsset2Percent, setOutputAsset2Percent] = useState('')
  const [initPrice, setInitPrice] = useState('')
  const [goalPrice, setGoalPrice] = useState('')

  const network = useSelector((state) => state.setting.network);
  const { i18n, t } = useTranslation();

  useEffect(()=>{
    const result = new BN(asset1).times(initPrice)
    console.log(Number(asset1), Number(asset2))
    setAsset2(Number(result))
  }, [asset1, initPrice])

  useEffect(() => {
    const output1Raw = new BN(initPrice).div(goalPrice).sqrt().abs()
    const output1PercentRaw = new BN(output1Raw).minus(asset1).div(asset1)

    const output2Raw = new BN(asset1).times(asset2).div(output1Raw)
    const output2PercentRaw = output2Raw.minus(asset2).div(asset2)

    setOutputAsset1(output1Raw.toFixed(2))
    setOutputAsset1Percent(output1PercentRaw.toFixed(2))
    setOutputAsset2(output2Raw.toFixed(2))
    setOutputAsset2Percent(output2PercentRaw.toFixed(2))

  }, [asset1, asset2, goalPrice])

  useEffect(() => {
    axios.get("/project/list").then((res) => {
      if (!res.data) {
        return;
      }
      setFarmList([
        {
          index: 0,
          farm: "DAO-USDT",
          earn: "CAN",
          tvl: "$12.99",
          apy: "47.64%",
        },
      ]);
      //get data list here
    });
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Farm",
      dataIndex: "farm",
      key: "farm",
    },
    {
      title: "Earn",
      dataIndex: "earn",
      key: "earn",
    },
    {
      title: "TVL",
      dataIndex: "tvl",
      key: "tvl",
    },
    {
      title: "APY",
      dataIndex: "apy",
      key: "apy",
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      render: (props, record) => (
        <Link to={`/project/${record.project_uniq_id}`}>
          <Button className="btn-blue">Go Farm!</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="farm-rank">
      <Header hideAction={false} />
      <Row gutter={20}>
        <Col md={18}>
          <div className="table-list">
              <div className="table-tab">
                  <div className={`tab-item ${currentTab === 'eth' ? 'active' : ''}`} onClick={()=>{setCurrentTab('eth')}}>ETH</div>
                  <div className={`tab-item ${currentTab === 'heco' ? 'active' : ''}`} onClick={()=>{setCurrentTab('heco')}}>HECO</div>
                  <div className={`tab-item ${currentTab === 'bsc' ? 'active' : ''}`} onClick={()=>{setCurrentTab('bsc')}}>BSC</div>
                  <div className={`tab-item ${currentTab === 'okchain' ? 'active' : ''}`} onClick={()=>{setCurrentTab('okchain')}}>OKchain</div>
                  <div className={`tab-item ${currentTab === 'single' ? 'active' : ''}`} onClick={()=>{setCurrentTab('single')}}>Single Token</div>
                  <div className={`tab-item ${currentTab === 'lp' ? 'active' : ''}`} onClick={()=>{setCurrentTab('lp')}}>LPToken</div>
              </div>
            <Table pagination={false} dataSource={farmList} columns={columns} />
          </div>
        </Col>
        <Col md={6}>
          <div className="block-card">
            <div className="title">Impermanent Loss Calculation</div>
            <div className="form">
              <div className="form-item">
                <div className="form-label">Input Assset 1</div>
                <Input onChange={e => setAsset1(e.target.value) } />
              </div>
              <div className="form-item">
                <div className="form-label">Input Assset 2</div>
                <div className="form-value">{asset2}</div>
              </div>
              <div className="form-item">
                <div className="form-label">Input Price(Asset1/Asset2)</div>
                <Input onChange={e => setInitPrice(e.target.value)} />
              </div>
            </div>

            <div className="title">Output</div>
            <div className="form">
              <div className="form-item">
                <div className="form-label">Goal Price(Asset1/Asset2)</div>
                <Input onChange={e => setGoalPrice(e.target.value)} />
              </div>
              <div className="form-item">
                <div className="form-label">Output Asset 1</div>
                <div className="form-value">{outputAsset1} <span className="percent green">{outputAsset1Percent}%</span></div>
              </div>
              <div className="form-item">
                <div className="form-label">Output Asset 2</div>
                <div className="form-value">{outputAsset2} <span className="percent red">{outputAsset2Percent}%</span></div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
