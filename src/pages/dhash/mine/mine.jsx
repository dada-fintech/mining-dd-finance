import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Alert, Statistic } from 'antd';
import Header from 'components/Header';
import FarmerIcon from 'assets/sidebar/farming.svg';
import BTCIcon from 'assets/farming/btc.svg';
import BuyButton from '../components/BuyButton';
import InputBoxMount from '../components/InputaMount';
import UnlockWalletpage from '../components/UnlockWallet/UnlockWalletpage.jsx';
import { useWallet } from 'use-wallet';
import UserAddress from 'components/UserAddress';
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
    ApiPartialclaim
} from '../../../services/index.js';
import {
    REWARD_SYMBOL,
    OFFICIAL_SYMBOL,
    EXECUTION_TIME,
    DEFAULT_CURRENT_PRICE
} from '../../../constants';
import BuyModal from '../components/ConfModal';
import './mine.scss';
import store from '../../../redux/store';
import Config from "../../../config";

const Mine = () => {
    const { setting } = store.getState();
    const { t } = useTranslation();
    const wallet = useWallet();
    const { account, status } = wallet;
    const { Countdown } = Statistic;
    const [amount, setAmount] = useState(0); // 输入框值
    const [stakeButLoading, setStakeButLoading] = useState(false); // stake加载状态
    const [estimatedClaimNum, setEstimatedClaimNum] = useState(0); // 预估claim
    const [claimButLoading, setClaimButLoading] = useState(false); // claim加载状态
    const [partialButLoading, sePpartialButLoading] = useState(false); // 多次未领取加载状态
    const [stopButLoading, setStopButLoading] = useState(false); // stop加载状态
    const [apy, setApy] = useState(0); // APY
    const [tokenStaken, setTokenStaken] = useState(0); // 总抵押量
    const [user, setUser] = useState({}); // 用户余额
    const [stakedRate, setStakedRate] = useState(0); // stakedRate // 总质押量/总流通量
    const [userStaked, setUStaked] = useState(0); // 当前用户的质押量
    const [rewardToClaim, setRewardToClaim] = useState(0); // 用户可领取的奖励
    const [btcInfo, setBtcInfo] = useState(0); // BTC当日价格 昨日分发BTC
    const [showBtcInfoErr, setShowBtcInfoErr] = useState({
        code: 200,
        msg: '',
    }); // BTC当日价格 昨日分发BTC
    const [currentPrice, setCurrentPrice] = useState(DEFAULT_CURRENT_PRICE); // 当前价格
    const [disabled, setDisabled] = useState(true); // 按钮状态
    const [totalRewarded, setTotalRewarded] = useState(0); // 全网总奖励
    const [visible, setVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [modalState, setModalState] = useState(0); // 弹窗 0:授权 1授权中 2交易中 3交易成功 -1交易失败; 4 授权完成
    const getInputaMountNumber = (val) => {
        setAmount(val);
        setDisabled(val <= 0);
    };

    // const [receive, setReceive] = useState(false); // 多期未领取
    // const [epoch, setEpoch] = useState({ currentEpoch: 0, nextEpoch: 0 }); // 当前epoch，下一个epoch时间
    // START;
    const startFun = () => {
        ApiAppStakeFun();
    };
    // CLAIM;
    const claimFun = () => {
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
                // console.log(res);
                if (res.code === 200) {
                    setCurrentPrice(res.data.price_pretty || 0);
                    getApiLatestepochReward(res.data.price_pretty);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setCurrentPrice(0);
                return 0;
            });
    };

    // BTC当日价格 昨日分发BTC
    const getApiLatestepochReward = async (price) => {
        await ApiLatestepochReward()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    setBtcInfo(res.data.reward.amount_pretty);
                    // 年化收益率 = 当日分发BTC × 当日BTC价格 / 6.5 / 抵押数量 *365
                    // 年化收益率 = 总奖励 * 当日BTC价格 / 总抵押数量 / dhm 价格
                    // 年化收益率 = 总奖励 * 当日BTC价格 / 总抵押数量 / dhm 价格 /epochs * 365

                    setApy(
                        res.data.reward.amount !== '-1' || res.data.reward.amount !== '0'
                            ? Number(res.data.total_stakes) > 0
                                ? Tools.mul(
                                    Tools.div(
                                        Tools.div(
                                            Tools.mul(
                                                Number(
                                                    res.data.total_rewarded || 0
                                                ),
                                                Number(
                                                    res.data.btc_price || 0
                                                )
                                            ),
                                            Number(price || DEFAULT_CURRENT_PRICE)
                                        ),
                                        Number(res.data.total_stakes)
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
                                        Number(price || DEFAULT_CURRENT_PRICE)
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
                setBtcInfo(0);
                setApy(0);
                return 0;
            });
    };

    // 质押
    const ApiAppStakeFun = async () => {
        setStakeButLoading(true);
        await ApiAppStake(account, amount)
            .then((res) => {
                // console.log(res);
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
                setStakeButLoading(false);
                setVisible(false);
                return false;
            });
    };
    // Withdraw
    const ApiAppWithdrawFun = async () => {
        setStopButLoading(true);
        await ApiAppWithdraw(account)
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    contractTransaction(
                        account,
                        res.data.txs[0].contract,
                        res.data.txs[0].calldata,
                        () => {
                            setStopButLoading(false);
                            message.warning(t('v1_Pendding'));
                            setTimeout(() => {
                                getApiAppUserBalances(); // 余额
                                getApiUserStaked(); // 用户质押量
                                getApiToClaimBalances(); //用户可领取的奖励
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
                return false;
            });
    };

    // claim
    const ApiAppClaimFun = async () => {
        setClaimButLoading(true);

        await ApiAppClaim(account)
            .then((res) => {
                // console.log(res);
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
                                getApiToClaimBalances();
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
                return false;
            });
    };


    const ApiPartialclaimFun = async () => {
        sePpartialButLoading(true);
        await ApiPartialclaim()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    contractTransaction(
                        account,
                        res.data.txs[0].contract,
                        res.data.txs[0].calldata,
                        () => {
                            sePpartialButLoading(false);
                            message.warning(t('v1_Pendding'));
                            setTimeout(() => {
                                getApiAppUserBalances();
                                getApiToClaimBalances();
                            }, EXECUTION_TIME);
                        },
                        () => {
                            sePpartialButLoading(false);
                        }
                    );
                } else {
                    sePpartialButLoading(false);
                    message.warning(t('v1_Failed'));
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                sePpartialButLoading(false);
                return false;
            });
    };




    // 总抵押量
    const getApiAppTotalTakes = async () => {
        await ApiAppTotalTakes()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
                    setTokenStaken(res.data.amount_pretty);
                    getApiAppTotalBurnt(res.data.amount_pretty);

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
                // console.log(res);
                if (res.code === 200) {
                    setUStaked(res.data.amount_pretty || 0);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setUStaked(0);
                return 0;
            });
    };
    // 用户可领取的奖励
    const getApiToClaimBalances = async () => {
        await ApiToClaimBalances(account)
            .then((res) => {
                if (res.code === 200) {
                    setRewardToClaim(res.data.amount_pretty || 0);
                } else if (res.code === 1005) {
                    console.log('Receive');
                    // setReceive(true);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                setRewardToClaim(0);
                return 0;
            });
    };

    // 全网总奖励
    const getApiTotalRewarded = async () => {
        await ApiTotalRewarded()
            .then((res) => {
                // console.log(res);
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
                // console.log(res);
                if (res.code === 200) {
                    getApiAvailable(totalSupply, res.data.total_pretty || 0);
                }
            })
            .catch((err) => {
                console.log('发生错误！', err);
                getApiAvailable(0)
                return 0;
            });
    };

    // 流通量
    const getApiAvailable = async (staken, totalBurnt) => {
        await ApiAppSupply()
            .then((res) => {
                // console.log(res);
                if (res.code === 200) {
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
                setStakedRate(0)
                return 0;
            });
    };

    // 余额
    const getApiAppUserBalances = async () => {
        await ApiAppUserBalances(account)
            .then((res) => {
                // console.log('ApiAppUserBalances:', res);
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

    // claim 随时间增长
    useEffect(() => {
        let timers = undefined;
        if (timers) {
            clearInterval(timers);
        }
        const setClaimNumer = (val, dayIncome = 0.02, time = 50) => {
            // if (Tools.GT(val, 0)) {
            let maxNumer = Tools.plus(val, dayIncome);  // 当日最大可收益
            let secondIncome = Tools.fmtDec(Tools.div(dayIncome, 86400000), 14);  // 每毫秒收益
            let date = Tools.plus(new Date(new Date().toLocaleDateString()).getTime(), 28800000) // 上午八点到目前时长毫秒
            let LengthTime = 0;
            if (new Date().getTime() <= date) { // 12点以后
                LengthTime = Math.abs(Tools.sub(new Date().getTime(), new Date(new Date().toLocaleDateString()).getTime()));
                val = Tools.plus(Tools.plus(Number(val), Number(LengthTime) * Number(secondIncome)), (dayIncome / 3) * 2)
                // console.log('12点以后', Tools.sub(new Date().getTime(), new Date(new Date().toLocaleDateString()).getTime()))
                // console.log(val)
            } else { // 12 点前
                LengthTime = Tools.sub(new Date().getTime(), date); // 上午八点到目前的收益
                val = Tools.plus(Number(val), Tools.mul(Number(LengthTime), Number(secondIncome)))
                // console.log(val)
                // console.log(secondIncome)
                // console.log(LengthTime)
                // console.log('12点以前', Tools.sub(secondIncome, Tools.sub(date, new Date().getTime())))
            }

            var income = val;
            if (Tools.LT(estimatedClaimNum, maxNumer)) {
                timers = setInterval(() => {
                    income = Tools.plus(Number(income), Number(secondIncome));
                    // console.log(Number(income).toFixed(14))
                    setEstimatedClaimNum(Number(income).toFixed(14));
                }, time);
            } else {
                console.log(maxNumer)
                setEstimatedClaimNum(maxNumer);
                clearInterval(timers);
            }
        }

        if (userStaked > 0) {
            // console.log((0.2 / 1000000) * userStaked);
            let mydayIncome = Tools.fmtDec((0.2 / 1000000) * userStaked, 8)
            setClaimNumer(rewardToClaim, mydayIncome);
        }

        return () => {
            clearInterval(timers);
        }
    }, [userStaked]);

    // 更新
    useEffect(() => {
        let timer = undefined;
        if (!account || !isUpdate || timer) {
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
            getApiAppSellprice();
        }
    }, [status, account]);

    // useEffect(() => {
    //     // 当前epoch = 向下取整(当前时间/86400 )
    //     // 下一个epoch时间 = 当前epoch+1 * 86400
    //     console.log(Number(new Date().getTime()))
    //     let timeDay = 1000;
    //     const currentEpoch = Tools.sub(Math.floor(Tools.div(Number(new Date().getTime()) / 1000, timeDay)), 1611307);
    //     const nextEpoch = Math.floor(Tools.plus(Tools.sub(Tools.plus(currentEpoch, 1), timeDay * 1000), new Date().getTime()));

    //     setEpoch({ currentEpoch: currentEpoch, nextEpoch: nextEpoch });
    //     console.log(nextEpoch)
    // }, []);

    useEffect(() => {
        getApiAppTotalTakes();
    }, []);

    useEffect(() => {
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
                        {account && <UserAddress address={account} />}
                        <div className="farming-top">
                            <img src={FarmerIcon} />
                            <div className="desc">{t('v1_EARN_wBTC', { x: Config[setting.network].REWARD_SYMBOL || 'wBTC' })}</div>
                        </div>

                        <div className="mine-content">
                            <div className="data-item box-left">
                                <div className="data">
                                    <div className="data-border cheese-box left-box">
                                        <div className="amount ">
                                            {Tools.toThousands(
                                                Tools.fmtDec(userStaked, 4)
                                            ) || 0}
                                        </div>
                                        <div className="text price">
                                            {t('v1_DHM_TOKEN_STAKED')}
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
                                                balanceSumbol={Config[setting.network].OFFICIAL_SYMBOL}
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
                                            butClassName={'dd-lightblue-but'}
                                            onChangeFun={startFun}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="data-item ">
                                <div className="data">
                                    <div className="data-border cheese-box right-box">
                                        <div className="apy">
                                            <div className="value">
                                                {(isNaN(apy) ? 0 : Tools.numFmt(apy * 100 * 2.345678, 2)) || 0}
                                            %
                                        </div>
                                            <div className="title">
                                                {t('v1_APY')}
                                            </div>
                                        </div>
                                        <img src={BTCIcon} className="icon" />
                                        <div className="amount">
                                            {Tools.toThousands(
                                                Tools.fmtDec(rewardToClaim, 8) || 0
                                            )}
                                        </div>
                                        <div className="text price">
                                            {t('v1_wBTC_EARNED', { x: Config[setting.network].REWARD_SYMBOL || 'wBTC' })}
                                        </div>
                                        <div className="rewards-today">
                                            <p> {estimatedClaimNum} {Config[setting.network].REWARD_SYMBOL || 'wBTC'}</p>
                                            <p> {t("v1_Estimated_RewardsToday")}</p>
                                        </div>

                                        <div className="claim">
                                            <BuyButton
                                                loading={claimButLoading}
                                                butText={t('v1_CLAIM')}
                                                disabled={rewardToClaim <= 0}
                                                butClassName={'dd-lightblue-but'}
                                                onChangeFun={claimFun}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="desc">
                                    {t('v1_calculated_income_EST')}
                                </p>
                                <p className="desc">{t('v1_Settlement_date')}</p>
                            </div>
                        </div>

                        <BuyButton
                            loading={stopButLoading}
                            butText={t('v1_STOP')}
                            disabled={userStaked <= 0}
                            butClassName={'dd-lightpink-but'}
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

                        <p className="clues">{t('v1_automagically_wbtc', { x: Config[setting.network].REWARD_SYMBOL || 'wBTC' })}</p>
                    </>
                )}
        </div>
    );
};

export default Mine;
