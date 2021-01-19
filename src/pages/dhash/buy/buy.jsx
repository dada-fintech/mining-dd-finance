import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import { message, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import InputaMount from '../components/InputaMount';
import BuyButton from '../components/BuyButton/index';
import UnlockWalletpage from '../components/UnlockWallet/UnlockWalletpage';
import BuyModal from '../components/ConfModal';
import * as Tools from '../../../utils/Tools';
import { useWallet } from 'use-wallet';
import {
    ApiAppBuy,
    ApiAppSellprice,
    ApiAppSupply,
    ApiAppUserBalances,
    ApiLatestepochReward,
    ApiDhmAvailable,
    ApiAppTotalBurnt,
} from '../../../services/index.js';
import {
    contractTransaction,
    checkApprove,
} from '../../../utils/ContractTransaction.js';
import { OFFICIAL_SYMBOL, EXECUTION_TIME } from '../../../constants';
import './buy.scss';

const Buy = () => {
    const { t } = useTranslation();
    const wallet = useWallet();
    const { account, status } = wallet;
    const history = useHistory();
    const [balance, setBalance] = useState(0); // USDT转DHM 余额
    const [currentPrice, setCurrentPrice] = useState(0); // 当前价格
    const [totalBurned, setTotalBurned] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [buyState, setBuyState] = useState(false);
    const [visible, setVisible] = useState(false);
    const [amount, setAmount] = useState(0); // 输入框值
    const [buyButLoading, setBuyButLoading] = useState(false); // 按钮加载状态
    // 年化收益率 = 当日分发BTC × 当日BTC价格 / 6.5 / 抵押数量
    const [apy, setApy] = useState(0); // APY
    const [available, setAvailable] = useState(0); // 售卖中
    const [user, setUser] = useState({}); // 用户余额
    const [tokenStaken, setTokenStaken] = useState(0); // 总抵押量
    const [disabled, setDisabled] = useState(true); // 按钮状态
    const [modalState, setModalState] = useState(0); // 弹窗 0:授权 1授权中 2交易中 3交易成功 -1交易失败; 4 授权完成
    const [btcInfo, setBtcInfo] = useState({}); // BTC当日价格 昨日分发BTC
    const [showBtcInfoErr, setShowBtcInfoErr] = useState({
        code: 200,
        msg: '',
    }); // BTC当日价格 昨日分发BTC

    const getInputaMountNumber = useCallback((val) => {
        // console.log(val);
        setAmount(val);
        setDisabled(val <= 0);
    });

    // BTC当日价格 昨日分发BTC
    const getApiLatestepochReward = async () => {
        await ApiLatestepochReward()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setBtcInfo(res.data);
                    // 年化收益率 = 当日分发BTC × 当日BTC价格 / 6.5 / 抵押数量 *365
                    // 年化收益率 = 总奖励 * 当日BTC价格 / 总抵押数量 / dhm 价格
                    // 年化收益率 = 总奖励 * 当日BTC价格 / 总抵押数量 / dhm 价格 /epochs * 365
                    console.log(res.data.reward.amount !== '-1');
                    setApy(
                        res.data.reward.amount !== '-1'
                            ? tokenStaken > 0
                                ? Tools.mul(
                                      Tools.div(
                                          Tools.div(
                                              Tools.mul(
                                                  Number(
                                                      res.data.reward
                                                          .amount_pretty || 0
                                                  ),
                                                  Number(
                                                      res.data.btc_price || 0
                                                  )
                                              ),
                                              Number(currentPrice || 6.5)
                                          ),
                                          Number(tokenStaken)
                                      ),
                                      365
                                  )
                                : 0
                            : Tools.mul(
                                  Tools.div(
                                      Tools.div(
                                          Tools.div(
                                              Tools.mul(
                                                  Number(
                                                      res.data.total_rewarded
                                                  ),
                                                  Number(res.data.btc_price)
                                              ),
                                              Number(res.data.total_stakes)
                                          ),
                                          Number(currentPrice || 6.5)
                                      ),
                                      Number(res.data.epochs)
                                  ),
                                  365
                              )
                    );
                } else {
                    setShowBtcInfoErr({
                        code: res.code,
                        msg: res.msg + ' please be nice and patient',
                    });
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setBtcInfo({});
                setApy(0);
                return 0;
            });
    };

    // 当前价格 current Price
    const getApiAppSellprice = async () => {
        ApiAppSellprice()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    setCurrentPrice(Tools.toThousands(res.data.price_pretty));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setCurrentPrice(0);
                return 0;
            });
    };

    // 流通量
    const getApiAvailable = async () => {
        ApiDhmAvailable()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    setAvailable(Tools.toThousands(res.data.amount_pretty));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setAvailable(0);
                return 0;
            });
    };

    // 顶
    const getApiAppSupply = async () => {
        ApiAppSupply()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    setTotalSupply(res.data.amount_pretty);
                    // Tools.toThousands(res.data.amount_pretty)
                    getApiAppTotalBurnt(res.data.amount_pretty);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setTotalSupply(0);
                return 0;
            });
    };

    // 总校销毁量 total Burned
    const getApiAppTotalBurnt = async (totalSupply) => {
        ApiAppTotalBurnt()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    // 总销毁量
                    setTotalBurned(
                        Tools.sub(totalSupply, res.data.total_pretty || 0)
                    );
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setTotalBurned(0);
                return 0;
            });
    };

    // 余额
    const getApiAppUserBalances = async () => {
        ApiAppUserBalances(account)
            .then((res) => {
                console.log('ApiAppUserBalances:', res);
                if (res.code === 200) {
                    setUser(res.data);
                    setBalance(
                        Tools.fmtDec(
                            Tools.div(
                                res.data.usdt_pretty,
                                currentPrice || 6.5
                            ),
                            4
                        )
                    );
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setUser({});
                return 0;
            });
    };

    // BUY
    const ApiAppBuyFun = async () => {
        setBuyButLoading(true);
        await ApiAppBuy(account, amount)
            .then((res) => {
                console.log(res.data.txs[0].contract);
                if (res.code === 200) {
                    console.log(res.data.txs.length);
                    if (res.data.txs.length > 1) {
                        setModalState(1);
                        setVisible(true);
                        contractTransaction(
                            account,
                            res.data.txs[0].contract,
                            res.data.txs[0].calldata,
                            () => {
                                checkApprove(account, 'USDT', () => {
                                    console.log('授权成功');
                                    setModalState(4);
                                    contractTransaction(
                                        account,
                                        res.data.txs[1].contract,
                                        res.data.txs[1].calldata,
                                        () => {
                                            // setModalnfoState(1);
                                            setModalState(2);
                                            message.warning(t('v1_Pendding'));
                                            setVisible(true);
                                            setTimeout(() => {
                                                setModalState(3);
                                                setBuyButLoading(false);
                                                setBuyState(true);
                                            }, EXECUTION_TIME);
                                        },
                                        () => {
                                            setModalState(-1);
                                            setBuyButLoading(false);
                                            setVisible(false);
                                        }
                                    );
                                });
                            },
                            () => {
                                setBuyButLoading(false);
                                setVisible(false);
                            }
                        );
                    } else {
                        contractTransaction(
                            account,
                            res.data.txs[0].contract,
                            res.data.txs[0].calldata,
                            () => {
                                // setModalnfoState(1);
                                setModalState(2);
                                message.warning(t('v1_Pendding'));
                                setVisible(true);
                                setTimeout(() => {
                                    setModalState(3);
                                    setBuyButLoading(false);
                                    setBuyState(true);
                                }, EXECUTION_TIME);
                            },
                            () => {
                                setModalState(-1);
                                setBuyButLoading(false);
                                setVisible(false);
                            }
                        );
                    }
                } else {
                    setBuyButLoading(false);
                    message.warning(t('v1_Failed'));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setBuyButLoading(false);
                return [];
            });
    };

    const getAlldata = async () => {
        await getApiAppSellprice(); // 当前价格 current Price
        await getApiAvailable(); // 流通量
        await getApiAppSupply(); // DHM 硬顶
    };

    useEffect(async () => {
        if (account && status === 'connected') {
            console.log('getApiAppUserBalances');
            getApiAppUserBalances(); // 用户余额
        }
    }, [account, status]);

    useEffect(async () => {
        if (account && status === 'connected') {
            Promise.all([getAlldata()])
                .then((result) => {
                    getApiLatestepochReward();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [status, account]);

    return (
        <div className="buy">
            <Header hideAction={true} />

            {wallet && !account ? (
                <UnlockWalletpage />
            ) : account && !buyState && status === 'connected' ? (
                <>
                    {showBtcInfoErr.code !== 200 ? (
                        <div className="Alert-err">
                            <Alert
                                message={showBtcInfoErr.msg || ''}
                                type="info"
                                showIcon
                                closable
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="apy">
                        <div className="amount">
                            {(isNaN(apy) ? 0 : Tools.numFmt(apy * 100, 2)) || 0}
                            %
                        </div>
                        <div className="desc">{t('v1_APY')}</div>
                    </div>
                    <div className="buy-content">
                        <div className="data cheese-box">
                            <div className="data-border ">
                                <div className="amount price">
                                    ${currentPrice || 0}
                                </div>
                                <div className="text">
                                    {t('v1_Current_Price')}
                                </div>
                                <div className="amount available">
                                    {available || 0}
                                </div>
                                <div className="text">{t('v1_Available')}</div>
                                <div className="total">
                                    <div className="amount">
                                        {Tools.toThousands(totalBurned)}
                                    </div>
                                    <div className="text">
                                        {t('v1_Total_supply')}
                                    </div>
                                </div>
                            </div>
                            <InputaMount
                                balance={user.usdt_pretty || 0}
                                maxBalance={
                                    balance >= available
                                        ? available
                                        : balance || 0
                                }
                                onConfirm={getInputaMountNumber}
                                sumbol={OFFICIAL_SYMBOL}
                                balanceSumbol={'USDT'}
                            />
                        </div>
                    </div>

                    <BuyButton
                        loading={buyButLoading}
                        disabled={disabled || user.usdt_pretty <= 0}
                        butText={t('v1_BUY_but')}
                        butClassName={'btn-cheese'}
                        onChangeFun={() => {
                            console.log('ApiAppBuyFun');
                            ApiAppBuyFun();
                        }}
                    />
                </>
            ) : (
                <div className="success">
                    <div className="success-border">
                        <div className="amount price">{amount}</div>
                        <div className="text">{t('v1_Success')}</div>
                        <BuyButton
                            loading={false}
                            butText={t('v1_START_MINE')}
                            butClassName={'btn-cheese'}
                            onChangeFun={() => {
                                history.push('/mine');
                            }}
                        />
                    </div>
                </div>
            )}
            {/* //amount, text, butText, buyFun */}
            <BuyModal
                amount={amount}
                visible={visible}
                buyButloading={modalState !== 3 && modalState !== -1}
                disabled={modalState !== 3}
                text={
                    modalState === 0 ||
                    modalState === 1 ||
                    modalState === 2 ||
                    modalState === 4
                        ? t('v1_You_will_buy')
                        : modalState === 3
                        ? t('v1_Success_s')
                        : modalState === -1
                        ? t('v1_Fail')
                        : ''
                }
                butText={
                    modalState === 0
                        ? t('v1_Approve')
                        : modalState === 1
                        ? t('v1_authorization')
                        : modalState === 2
                        ? t('v1_Pendding')
                        : modalState === 3
                        ? t('v1_START_MINE')
                        : modalState === 4
                        ? t('v1_BUY_but')
                        : modalState === -1
                        ? t('v1_Fail')
                        : ''

                    // v1_Approve
                }
                buyFun={() => {
                    switch (modalState) {
                        case 0:
                            ApiAppBuyFun();
                            break;
                        case 3:
                            history.push('/farming');
                            break;
                        case -1:
                            setVisible(false);
                            break;
                        default:
                            return false;
                    }
                }}
            ></BuyModal>
        </div>
    );
};

export default Buy;
