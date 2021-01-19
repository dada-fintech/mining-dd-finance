import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Alert } from 'antd';
import Header from 'components/Header';
import FarmerIcon from 'assets/sidebar/farming.svg';
import BTCIcon from 'assets/farming/btc.svg';
import BuyButton from '../components/BuyButton';
import InputBoxMount from '../components/InputaMount';
import UnlockWalletpage from '../components/UnlockWallet/UnlockWalletpage.jsx';
import { useWallet } from 'use-wallet';
import {
    contractTransaction,
    checkApprove,
} from '../../../utils/ContractTransaction.js';
import * as Tools from '../../../utils/Tools';
import {
    ApiAppStake,
    ApiAppWithdraw,
    ApiAppClaim,
    ApiAppTotalTakes,
    ApiToClaimBalances,
    ApiAppUserBalances,
    ApiAppSupply,
    ApiLatestepochReward,
    ApiUserStaked,
    ApiAppSellprice,
    ApiTotalRewarded,
    ApiAppTotalBurnt,
} from '../../../services/index.js';
import {
    REWARD_SYMBOL,
    OFFICIAL_SYMBOL,
    EXECUTION_TIME,
} from '../../../constants';
import BuyModal from '../components/ConfModal';
import './mine.scss';

const Mine = () => {
    const { t } = useTranslation();
    const wallet = useWallet();
    const { account, status } = wallet;
    const [amount, setAmount] = useState(0); // 输入框值
    const [stakeButLoading, setStakeButLoading] = useState(false); // stake加载状态
    const [claimButLoading, setClaimButLoading] = useState(false); // claim加载状态
    const [stopButLoading, setStopButLoading] = useState(false); // stop加载状态
    const [apy, setApy] = useState(0); // APY
    const [tokenStaken, setTokenStaken] = useState(0); // 总抵押量
    const [user, setUser] = useState({}); // 用户余额
    const [stakedRate, setStakedRate] = useState(0); // stakedRate // 总质押量/总流通量
    const [userStaked, setUStaked] = useState(0); // 当前用户的质押量
    const [rewardToClaim, setRewardToClaim] = useState(0); // 用户可领取的奖励
    const [btcInfo, setBtcInfo] = useState({}); // BTC当日价格 昨日分发BTC
    const [showBtcInfoErr, setShowBtcInfoErr] = useState({
        code: 200,
        msg: '',
    }); // BTC当日价格 昨日分发BTC
    const [currentPrice, setCurrentPrice] = useState(0); // 当前价格
    const [disabled, setDisabled] = useState(true); // 按钮状态
    const [totalRewarded, setTotalRewarded] = useState(0); // 全网总奖励
    const [visible, setVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [modalState, setModalState] = useState(0); // 弹窗 0:授权 1授权中 2交易中 3交易成功 -1交易失败; 4 授权完成
    const getInputaMountNumber = (val) => {
        console.log(val);
        setAmount(val);
        setDisabled(val <= 0);
    };
    // START;
    const startFun = () => {
        ApiAppStakeFun();
    };
    // CLAIM;
    const claimFun = () => {
        console.log('CLAIM');
        ApiAppClaimFun();
    };
    // STOP
    const stopFun = () => {
        ApiAppWithdrawFun();
    };

    // 当前价格 current Price
    const getApiAppSellprice = async () => {
        ApiAppSellprice()
            .then((res) => {
                console.log(res);
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

    // BTC当日价格 昨日分发BTC
    const getApiLatestepochReward = async (staken) => {
        await ApiLatestepochReward()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setBtcInfo({
                        btc_price: res.data.btc_price || 0,
                        amount_pretty: res.data.reward.amount_pretty || 0,
                    });
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
    // 质押
    const ApiAppStakeFun = async () => {
        setStakeButLoading(true);
        await ApiAppStake(account, amount)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    if (res.data.txs.length > 1) {
                        setModalState(1);
                        setVisible(true);
                        contractTransaction(
                            account,
                            res.data.txs[0].contract,
                            res.data.txs[0].calldata,
                            () => {
                                checkApprove(account, 'DHM', () => {
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
                                                setStakeButLoading(false);
                                                setIsUpdate(true);
                                            }, EXECUTION_TIME);
                                        },
                                        () => {
                                            setStakeButLoading(false);
                                            setVisible(false);
                                            setModalState(-1);
                                        }
                                    );
                                });
                            },
                            () => {
                                setVisible(false);
                                setStakeButLoading(false);
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
                                    setStakeButLoading(false);
                                    setIsUpdate(true);
                                }, EXECUTION_TIME);
                            },
                            () => {
                                setModalState(-1);
                                setStakeButLoading(false);
                                setVisible(false);
                            }
                        );
                    }
                } else {
                    setStakeButLoading(false);
                    message.warning(t('v1_Failed'));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                return {};
            });
    };
    //
    const ApiAppWithdrawFun = async () => {
        setStopButLoading(true);
        await ApiAppWithdraw(account)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    contractTransaction(
                        account,
                        res.data.txs[0].contract,
                        res.data.txs[0].calldata,
                        () => {
                            setStopButLoading(false);
                            message.warning(t('v1_Pendding'));
                            setTimeout(() => {
                                getApiAppUserBalances();
                            }, EXECUTION_TIME);
                        },
                        () => {
                            setStopButLoading(false);
                        }
                    );
                } else {
                    setStopButLoading(false);
                    message.warning(t('v1_Failed'));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setStopButLoading(false);
                return {};
            });
    };

    // claim
    const ApiAppClaimFun = async () => {
        setClaimButLoading(true);
        await ApiAppClaim(account)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    contractTransaction(
                        account,
                        res.data.txs[0].contract,
                        res.data.txs[0].calldata,
                        () => {
                            setClaimButLoading(false);
                            message.warning(t('v1_Pendding'));
                            setTimeout(() => {
                                getApiAppUserBalances();
                            }, EXECUTION_TIME);
                        },
                        () => {
                            setClaimButLoading(false);
                        }
                    );
                } else {
                    setClaimButLoading(false);
                    message.warning(t('v1_Failed'));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setClaimButLoading(false);
                return {};
            });
    };
    // 总抵押量
    const getApiAppTotalTakes = async () => {
        await ApiAppTotalTakes()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setTokenStaken(res.data.amount_pretty);
                    getApiAppTotalBurnt(res.data.amount_pretty);
                    getApiLatestepochReward(res.data.amount_pretty);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setTokenStaken(0);
                return 0;
            });
    };

    // 当前用户质押量
    const getApiUserStaked = async () => {
        await ApiUserStaked(account)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setUStaked(Tools.toThousands(res.data.amount_pretty || 0));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setTokenStaken(0);
                return 0;
            });
    };
    // 用户可领取的奖励
    const getApiToClaimBalances = async () => {
        await ApiToClaimBalances(account)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setRewardToClaim(
                        Tools.toThousands(res.data.amount_pretty || 0)
                    );
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setTokenStaken(0);
                return 0;
            });
    };

    // 全网总奖励
    const getApiTotalRewarded = async () => {
        await ApiTotalRewarded()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setTotalRewarded(
                        Tools.toThousands(res.data.amount_pretty || 0)
                    );
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setTotalRewarded(0);
                return 0;
            });
    };

    // 总校销毁量 total Burned
    const getApiAppTotalBurnt = async (totalSupply) => {
        ApiAppTotalBurnt()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    getApiAvailable(totalSupply, res.data.total_pretty || 0);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                return 0;
            });
    };

    // 流通量
    const getApiAvailable = async (staken, totalBurnt) => {
        await ApiAppSupply()
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    // setAvailable(Tools.toThousands(res.data.amount_pretty));
                    console.log(staken, res.data.amount_pretty);
                    setStakedRate(
                        res.data.amount_pretty <= 0
                            ? 0
                            : Tools.fmtDec(
                                  Tools.div(
                                      staken,
                                      Tools.sub(
                                          res.data.amount_pretty,
                                          totalBurnt
                                      )
                                  ),
                                  4
                              )
                    );
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                return 0;
            });
    };

    // 余额
    const getApiAppUserBalances = async () => {
        await ApiAppUserBalances(account)
            .then((res) => {
                console.log('ApiAppUserBalances:', res);
                if (res.code === 200) {
                    setUser(res.data);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setUser({});
                return 0;
            });
    };

    // 更新
    useEffect(() => {
        let timer = undefined;
        if (!account || !isUpdate) {
            clearInterval(timer);
            return;
        }

        if (!timer || isUpdate) {
            timer = setInterval(() => {
                getApiAppTotalTakes();
                if (account) {
                    getApiAppUserBalances(); // 余额
                    getApiUserStaked(); // 用户质押量
                    getApiToClaimBalances(); //用户可领取的奖励
                }
            }, 5000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isUpdate, account]);

    useEffect(() => {
        if (account && status === 'connected') {
            getApiTotalRewarded();
            Promise.all([getApiAppSellprice()])
                .then((result) => {
                    getApiAppTotalTakes();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [status, account]);

    useEffect(() => {
        console.log(account && status === 'connected');
        if (account && status === 'connected') {
            getApiAppUserBalances(); // 余额
            getApiUserStaked(); // 用户质押量
            getApiToClaimBalances(); //用户可领取的奖励
        }
    }, [account, status]);

    return (
        <div className="mine-page">
            <Header hideAction={true} />

            {wallet && !account && status !== 'connected' ? (
                <UnlockWalletpage />
            ) : (
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
                    <div className="farming-top">
                        <img src={FarmerIcon} />
                        <div className="desc">{t('v1_EARN_wBTC')}</div>
                    </div>

                    <div className="mine-content">
                        <div className="data-item box-left">
                            <div className="data">
                                <div className="data-border cheese-box">
                                    <div className="text price">
                                        {t('v1_DHM_TOKEN_STAKED')}
                                    </div>
                                    <div className="amount ">
                                        {userStaked || 0}
                                    </div>
                                    <div className="start">
                                        <InputBoxMount
                                            balance={Tools.numFmt(
                                                user.dhm_pretty || 0,
                                                4
                                            )}
                                            maxBalance={Tools.numFmt(
                                                user.dhm_pretty || 0,
                                                4
                                            )}
                                            width={'250'}
                                            onConfirm={getInputaMountNumber}
                                            sumbol={OFFICIAL_SYMBOL}
                                        />
                                    </div>
                                    <BuyButton
                                        loading={stakeButLoading}
                                        butText={t('v1_START')}
                                        disabled={
                                            disabled || user.dhm_pretty <= 0
                                        }
                                        butClassName={'btn-cheese'}
                                        onChangeFun={startFun}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="data-item ">
                            <div className="data">
                                <div className="data-border cheese-box">
                                    <div className="apy">
                                        <div className="value">
                                            {(isNaN(apy)
                                                ? 0
                                                : Tools.numFmt(apy * 100, 2)) ||
                                                0}
                                            %
                                        </div>
                                        <div className="title">
                                            {t('v1_APY')}
                                        </div>
                                    </div>
                                    <img src={BTCIcon} className="icon" />
                                    <div className="text price">
                                        {t('v1_wBTC_EARNED')}
                                    </div>
                                    <div className="amount ">
                                        {rewardToClaim || 0}
                                    </div>
                                    <div className="claim">
                                        <BuyButton
                                            loading={claimButLoading}
                                            butText={t('v1_CLAIM')}
                                            disabled={rewardToClaim <= 0}
                                            butClassName={
                                                'btn-cheese'
                                            }
                                            onChangeFun={claimFun}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <p className="desc">
                                {t('v1_calculated_income_EST')}
                            </p>
                            <p className="desc">{t('v1_Settlement_date')}</p> */}
                        </div>
                    </div>

                    <BuyButton
                        loading={stopButLoading}
                        butText={t('v1_STOP')}
                        disabled={userStaked <= 0}
                        butClassName={'btn-cheese'}
                        onChangeFun={stopFun}
                    />

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
                                ? t('v1_You_will_staked')
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
                                ? t('v1_BACK')
                                : modalState === 4
                                ? t('v1_START')
                                : modalState === -1
                                ? t('v1_Fail')
                                : ''

                            // v1_Approve
                        }
                        buyFun={() => {
                            switch (modalState) {
                                case 0:
                                    ApiAppStakeFun();
                                    break;
                                default:
                                    setVisible(false);
                                    return false;
                            }
                        }}
                    ></BuyModal>

                    <p className="clues">{t('v1_automagically_wbtc')}</p>
                </>
            )}
        </div>
    );
};

export default Mine;
