import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import { useWallet } from 'use-wallet';
import { useMedia } from 'react-use';
import { CHAINID } from '../../constants';
import BuyButton from '../BuyButton/index.jsx';
import './network.scss';

const SwitchNetwork = () => {
    const { t } = useTranslation();
    const wallet = useWallet();
    const { chainId, status, account } = wallet;
    const below960 = useMedia('(max-width: 960px)');
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (status && chainId && account) {
            setVisible(false);
        } else {
            if (
                (chainId && Number(chainId) !== CHAINID) ||
                status !== 'connected'
            ) {
                // 显示网络错误
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    }, [chainId, status]);

    return (
        <Modal
            footer={null}
            title={null}
            visible={visible}
            width={!below960 ? 'auto' : '80%'}
            centered
            closable={false}
            style={{
                borderRadius: '15px',
            }}
            bodyStyle={{
                borderRadius: '15px',
            }}
        >
            <div className="network-modal">
                <div className="network-modal-content">
                    <div className="text">{t('v1_switch_network')}</div>
                    <BuyButton
                        butText={'OK'}
                        butClassName={'network-lightblue-but'}
                        onChangeFun={() => {
                            setVisible(false);
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SwitchNetwork;
