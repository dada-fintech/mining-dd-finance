import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button } from "antd";
import ddAxios from "utils/ddAxios";
import Header from "components/Header";
import { useWallet } from "use-wallet";
import TokenSelect from "components/TokenSelect";
import { CaretDownOutlined } from "@ant-design/icons";
import ArrowDown from "assets/arrow-down.svg";
import BigNumber from "bignumber.js";
import web3 from "components/web3";
import mm from 'components/mm'

// import config from "config";
import "./style.scss";

export default function TokenSwap() {
  const wallet = useWallet();
  const [tab, setTab] = useState("swap");
  const [fromToken, setFromToken] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toToken, setToToken] = useState("DAI");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [contractName, setContractName] = useState({});
  const [actionInfo, setActionInfo] = useState({});
  const [tokenSelectType, setTokenSelectType] = useState("");
  const [actionInfoTrigger, setActionInfoTrigger] = useState(1)

  const onSelectToken = async (tokenSelectType, token) => {
    token.balance = await getTokenBalance(token.symbol);
    if (tokenSelectType === "from") {
      setFromToken(token);
    } else if (tokenSelectType === "to") {
      setToToken(token);
    }
  };

  const getTokenBalance = async (tokenSymbol) => {
    if (tokenSymbol === "ETH") {
      const result = await web3.eth.getBalance(wallet.account);
      const balance = new BigNumber(result).shiftedBy(-18).toFixed(4);
      return balance;
    }
    const tokenBalance = await ddAxios.post("/account/balances", {
      address: wallet.account || "0x104f010851236afA2c56974a2Ec84ED8C9bF364f",
      tokens: [tokenSymbol],
    });
    return tokenBalance.data.token_balances[tokenSymbol][0];
  };

  const changeTokenOrder = () => {
    const nextFromToken = toToken;
    const nextToToken = fromToken;
    setFromToken(nextFromToken);
    setToToken(nextToToken);
    setFromAmount(toAmount);
    setToAmount("");
  };

  const doApprove = () => {
    const transactionParameters = {
      from: wallet.account,
      to: actionInfo.from_token_addr,
      data: actionInfo.allowance_data,
    };
    console.log(transactionParameters, 'parammm')
    // do it
    mm.sendTransaction(transactionParameters, 'Approve').then(res => {
      setActionInfoTrigger(prev => prev + 1)
    })
  };

  const doSwap = () => {
    const transactionParameters = {
      from: wallet.account,
      to: actionInfo.contract_addr,
      value: web3.utils.toHex(
        fromToken.symbol === "ETH" ? actionInfo.from_token_amount : 0
      ),
      data: actionInfo.data,
    };
    mm.sendTransaction(transactionParameters, 'Swap').then(res => {

    })

  };

  useEffect(() => {
    if (fromToken.symbol && toToken.symbol && fromAmount) {
      setToAmount("");
      setExchangeRate("");
      setActionInfo({});
      setContractName("");
      ddAxios
        .post("/swap/aggrInfo", {
          from: fromToken.symbol,
          to: toToken.symbol,
          amount: fromAmount.toString(),
        })
        .then((res) => {
          if (res.data.exchange_pairs.length >= 1) {
            const exchangePairs = res.data.exchange_pairs;
            setToAmount(
              new BigNumber(exchangePairs[0].amount_out)
                .shiftedBy(-18)
                .toFixed(4)
            );
            setExchangeRate(
              new BigNumber(exchangePairs[0].exchange_ratio)
                .shiftedBy(-18)
                .toFixed(4)
            );
            setContractName(exchangePairs[0].contract_name);
          }
        });
    }
  }, [fromToken.symbol, toToken.symbol, fromAmount]);

  useEffect(() => {
    if (contractName) {
      ddAxios
        .post("/swap/swapInfo", {
          contract: contractName,
          from: fromToken.symbol,
          to: toToken.symbol,
          amount: fromAmount.toString(),
          user: wallet.account,
          slippage: "500",
        })
        .then((res) => {
          setActionInfo(res.data);
        });
    }
  }, [contractName, actionInfoTrigger]);

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
                {fromToken.balance && (
                  <div>
                    <span className="balance-title">Balance:</span>{" "}
                    <span className="balance-num">{fromToken.balance}</span>
                  </div>
                )}
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
                  <div
                    onClick={() => {
                      setFromAmount(fromToken.balance);
                    }}
                    className="max"
                  >
                    MAX
                  </div>
                  <div
                    className="token-select"
                    onClick={() => setTokenSelectType("from")}
                  >
                    {fromToken.symbol ? (
                      <>
                        <img className="token-logo" src={fromToken.logoURI} />{" "}
                        <span>{fromToken.symbol}</span>
                      </>
                    ) : (
                      <>Select Token</>
                    )}
                    <CaretDownOutlined className="caret" />
                  </div>
                </div>
              </div>
            </div>
            <img
              src={ArrowDown}
              className="arrow-down"
              onClick={changeTokenOrder}
            />
            <div className="token-box">
              <div className="top">
                <div className="title">To:</div>
                {toToken.balance && (
                  <div>
                    <span className="balance-title">Balance:</span>{" "}
                    <span className="balance-num">{toToken.balance}</span>
                  </div>
                )}
              </div>
              <div className="bottom">
                <div>
                  <Input placeholder="0.0" value={toAmount} />
                </div>
                <div>
                  <div
                    className="token-select"
                    onClick={() => setTokenSelectType("to")}
                  >
                    {toToken.symbol ? (
                      <>
                        <img className="token-logo" src={toToken.logoURI} />{" "}
                        <span>{toToken.symbol}</span>
                      </>
                    ) : (
                      <>Select Token</>
                    )}
                    <CaretDownOutlined className="caret" />
                  </div>
                </div>
              </div>
            </div>
            {exchangeRate > 0 && (
              <div className="exchange-rate">
                <span>Exchange Rate:</span>
                <span>
                  1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
                </span>
              </div>
            )}
            <div className="handle-area">
              {Object.keys(actionInfo).length > 0 &&
                !actionInfo.allowance_satisfied && (
                  <Button className="btn-blue" onClick={doApprove}>
                    Approve {fromToken.symbol}
                  </Button>
                )}
              <Button
                disabled={!actionInfo.allowance_satisfied}
                onClick={doSwap}
                className={`${
                  actionInfo.allowance_satisfied ? "btn-blue" : "btn-disabled"
                }`}
              >
                Swap
              </Button>
            </div>
            {/* <div className="advanced-trigger">
              Advanced Setting <CaretDownOutlined className="caret" />
            </div> */}
          </div>
        </Col>
      </Row>
      <TokenSelect
        onSelect={onSelectToken}
        onCancel={() => setTokenSelectType("")}
        tokenSelectType={tokenSelectType}
      />
    </div>
  );
}
