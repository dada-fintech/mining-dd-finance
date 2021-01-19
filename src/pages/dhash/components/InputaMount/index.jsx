import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputNumber, Input } from 'antd';
import './index.scss';

const InputaMount = ({
    onConfirm,
    placeholder,
    balance,
    width,
    sumbol,
    maxBalance,
    balanceSumbol,
}) => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');
    const onChangeSetVal = (value) => {
        // console.log('changed', value);
        setVal(value);
        onConfirm(value);
    };

    const onChangeMaxBalance = () => {
        // console.log(maxBalance);
        setVal(maxBalance);
        onConfirm(maxBalance);
    };

    return (
        <div className="InputaMount">
            <div
                className="inputaMount-content"
                style={{ maxWidth: `${width || 310}px` }}
            >
                <div className="input-box">
                    <p className="balance">
                        {t('v1_Balance_eth', {
                            x: balance || 0,
                            x1: balanceSumbol,
                        })}
                    </p>

                    <div className="input-number">
                        <InputNumber
                            autoFocus
                            min={0}
                            max={maxBalance || balance}
                            type="number"
                            defaultValue={''}
                            placeholder={placeholder}
                            onChange={(value) => onChangeSetVal(value)}
                            value={val}
                        />
                        <div className="conf">
                            <div className="max" onClick={onChangeMaxBalance}>
                                MAX
                            </div>
                            <span>{sumbol || 'USDT'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputaMount;
