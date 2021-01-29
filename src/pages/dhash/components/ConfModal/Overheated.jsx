import React from 'react';
import { Modal, Statistic } from 'antd';
import { useMedia } from 'react-use';
import '../UnlockWallet/network.scss';
const { Countdown } = Statistic;

const Overheated = ({ text, visible = true }) => {
    const below960 = useMedia('(max-width: 960px)');
    const deadline = 1611894600000; // 
    return (
        <div
            width={!below960 ? 'auto' : '80%'}
            className="Overheated-Modal"
        >
            <div className="network-modal">
                <div className="network-modal-content">
                    <div className="text">{text}</div>
                    <Countdown value={deadline} format="HH:mm:ss:SSS" />
                </div>
            </div>
        </div>
    );
};

export default Overheated;
