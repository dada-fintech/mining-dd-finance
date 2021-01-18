import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import './index.scss';
import { useWallet } from 'use-wallet';
import { useMedia } from 'react-use';
import { useHistory } from 'react-router-dom';
import BuyButton from '../BuyButton/index.jsx';

const BuyModal = ({
    visible,
    amount,
    text,
    butText,
    buyFun,
    buyButloading,
    disabled,
}) => {
    const { t } = useTranslation();
    const wallet = useWallet();
    const below960 = useMedia('(max-width: 960px)');
    const history = useHistory();

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
            <div className="buy-modal">
                <div className="buy-modal-content">
                    <div className="amount">{amount || 0}</div>
                    <div className="text">{text || ''}</div>
                    <BuyButton
                        butText={butText}
                        disabled={disabled}
                        loading={buyButloading}
                        butClassName={'operation-lightblue-but'}
                        onChangeFun={buyFun}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default BuyModal;
