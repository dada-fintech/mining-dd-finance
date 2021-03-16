import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button } from "antd";
import ddAxios from "utils/ddAxios";
import Header from "components/Header";
import { CaretDownOutlined } from "@ant-design/icons";
import ArrowDown from "assets/arrow-down.svg";

// import config from "config";
import "./style.scss";

export default function TokenSwap() {
  const [tab, setTab] = useState("swap");
  const [fromToken, setFromToken] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toToken, setToToken] = useState("DAI");
  const [toAmount, setToAmount] = useState("");
  const [needApprove, setNeedApprove] = useState(false);

  return (
    <div className="token-swap">
      <Header hideAction={false} />
      <Row>
        <Col xs={24} lg={10}>
          <div className="swap-card">
            <div className="tabs">
              <span
                onClick={() => setTab("swap")}
                className={`tab ${tab === "swap" ? "active" : ""}`}
              >
                Swap
              </span>
              <span
                onClick={() => setTab("liquidity")}
                className={`tab ${tab === "liquidity" ? "active" : ""}`}
              >
                +Liquidity
              </span>
            </div>
            <div className="token-box">
              <div className="top">
                <div className="title">From:</div>
                <div>
                  <span className="balance-title">Balance:</span>{" "}
                  <span className="balance-num">32234</span>
                </div>
              </div>
              <div className="bottom">
                <div>
                  <Input
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                  />
                </div>
                <div>
                  <div className="max">MAX</div>
                  <div className="token-select">
                    Select Token <CaretDownOutlined className="caret" />
                  </div>
                </div>
              </div>
            </div>
            <img src={ArrowDown} className="arrow-down" />
            <div className="token-box">
              <div className="top">
                <div className="title">To:</div>
                <div>
                  <span className="balance-title">Balance:</span>{" "}
                  <span className="balance-num">32234</span>
                </div>
              </div>
              <div className="bottom">
                <div>
                  <Input placeholder="0.0" value={fromAmount} />
                </div>
                <div>
                  <div className="max">MAX</div>
                  <div className="token-select">
                    Select Token <CaretDownOutlined className="caret" />
                  </div>
                </div>
              </div>
            </div>
            <div className="exchange-rate">
              <span>Exchange Rate:</span>
              <span>1 ETH = 574.123 DAI</span>
            </div>
            <div className="handle-area">
              <Button className="btn-blue">Approve USDT</Button>
              <Button className="btn-disabled">Swap</Button>
            </div>
            <div className="advanced-trigger">
              Advanced Setting <CaretDownOutlined className="caret" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
