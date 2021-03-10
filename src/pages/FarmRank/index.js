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
    const output1Raw = new BN(initPrice).div(goalPrice).sqrt().abs().times(asset1)
    const output1PercentRaw = new BN(output1Raw).minus(asset1).div(asset1).times(100)

    const output2Raw = new BN(asset1).times(asset2).div(output1Raw)
    const output2PercentRaw = output2Raw.minus(asset2).div(asset2).times(100)

    setOutputAsset1(output1Raw.toFixed(2))
    setOutputAsset1Percent(output1PercentRaw.toFixed(2))
    setOutputAsset2(output2Raw.toFixed(2))
    setOutputAsset2Percent(output2PercentRaw.toFixed(2))

  }, [asset1, asset2, goalPrice])

  useEffect(() => {
    axios.get("/farmrank").then((res) => {
      if (!res.data) {
        return;
      }
      console.log(res.data)
      setFarmList(res.data)
      // setFarmList([
      //   {
      //     index: 0,
      //     farm: "DAO-USDT",
      //     earn: "CAN",
      //     tvl: "$12.99",
      //     apy: "47.64%",
      //   },
      // ]);
      //get data list here
    });
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (props, record, index) => (<span>
        {index + 1}
      </span>)
    },
    {
      title: t('farmRank.farm'),
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: t('farmRank.pair'),
      dataIndex: "pair",
      key: "pair",
      render: (props, record) => (<span>
        <span>{record.tokens.map(token => (<img className="farm-img" src={token.icon || '/img/default-token.svg'} />))}</span>
        <span>{record.tokens.map((token, index) => (<span>{token.symbol}{index !== record.tokens.length - 1 && '-'}</span>))}</span>
      </span>)
    },
    // {
    //   title: "Earn",
    //   dataIndex: "earn",
    //   key: "earn",
    // },
    {
      title: t('farmRank.tvl'),
      dataIndex: "tvl",
      key: "tvl",
    },
    {
      title: t('farmRank.apy'),
      dataIndex: "yearAPY",
      key: "yearAPY",
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      render: (props, record) => (
        <a href={record.website} target="_blank">
          <Button className="btn-blue">{t('farmRank.goFarm')}!</Button>
        </a>
      ),
    },
  ];

  return (
    <div className="farm-rank">
      <Header hideAction={false} />
      <Row gutter={20}>
        <Col md={18}>
          <div className="table-list">
              {/* <div className="table-tab">
                  <div className={`tab-item ${currentTab === 'eth' ? 'active' : ''}`} onClick={()=>{setCurrentTab('eth')}}>ETH</div>
                  <div className={`tab-item ${currentTab === 'heco' ? 'active' : ''}`} onClick={()=>{setCurrentTab('heco')}}>HECO</div>
                  <div className={`tab-item ${currentTab === 'bsc' ? 'active' : ''}`} onClick={()=>{setCurrentTab('bsc')}}>BSC</div>
                  <div className={`tab-item ${currentTab === 'okchain' ? 'active' : ''}`} onClick={()=>{setCurrentTab('okchain')}}>OKchain</div>
                  <div className={`tab-item ${currentTab === 'single' ? 'active' : ''}`} onClick={()=>{setCurrentTab('single')}}>Single Token</div>
                  <div className={`tab-item ${currentTab === 'lp' ? 'active' : ''}`} onClick={()=>{setCurrentTab('lp')}}>LPToken</div>
              </div> */}
            <Table pagination={false} dataSource={farmList} columns={columns} />
          </div>
        </Col>
        <Col md={6}>
          <div className="block-card">
            <div className="title">{t('farmRank.calculateTitle')}</div>
            <div className="form">
              <div className="form-item">
                <div className="form-label">{t('farmRank.inputAsset')} 1</div>
                <Input onChange={e => setAsset1(e.target.value) } />
              </div>
              <div className="form-item">
                <div className="form-label">{t('farmRank.inputAsset')} 2</div>
                <div className="form-value">{asset2 || 0}</div>
              </div>
              <div className="form-item">
                <div className="form-label">{t('farmRank.inputPrice')}({t('farmRank.assetPair')})</div>
                <Input onChange={e => setInitPrice(e.target.value)} />
              </div>
            </div>

            <div className="title">{t('common.output')}</div>
            <div className="form">
              <div className="form-item">
                <div className="form-label">{t('farmRank.goalPrice')}({t('farmRank.assetPair')})</div>
                <Input onChange={e => setGoalPrice(e.target.value)} />
              </div>
              <div className="form-item">
                <div className="form-label">{t('farmRank.outputAsset')} 1</div>
                <div className="form-value">{isNaN(outputAsset1) ? 0 : outputAsset1} {!isNaN(outputAsset1Percent) && <span className={`percent ${outputAsset1Percent > 0 ? 'green' : 'red'}`}>{outputAsset1Percent}%</span>}</div>
              </div>
              <div className="form-item">
                <div className="form-label">{t('farmRank.outputAsset')} 2</div>
                <div className="form-value">{isNaN(outputAsset2) ? 0 : outputAsset2} {!isNaN(outputAsset2Percent) && <span className={`percent ${outputAsset2Percent > 0 ? 'green' : 'red'}`}>{outputAsset2Percent || 0}%</span>}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
