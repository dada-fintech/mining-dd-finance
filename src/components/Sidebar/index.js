import React from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'

const supporterList = [
    {
        address: '0x98...5643',
        amount: 393
    },
    {
        address: '0x98...5643',
        amount: 263
    },
    {
        address: '0x98...5643',
        amount: 212
    },
    {
        address: '0x98...5643',
        amount: 198
    },
    {
        address: '0x98...5643',
        amount: 65
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
    {
        address: '0x98...5643',
        amount: 21
    },
]
const supporterOwner = [
    {
        address: '0x98...5643',
        amount: 393
    },
]

let totalAmount = 0
supporterList.map(item => {
    totalAmount += item.amount
})

export default function Sidebar() {
    const { t } = useTranslation()

    return (<div className="sidebar">
        <div className="block">
            <div className="title">{t('sidebar.yourShares')}</div>
            <div className="box supporter-box">
                {supporterOwner.map(item => (
                    <div className="box-item" key={item.address}>
                        <div className="progress" style={{width: (item.amount / totalAmount) * 100 + '%'}}></div>
                        <div className="texts">
                            <div>{((item.amount / totalAmount) * 100).toFixed(2)}% ({item.amount} USDT)</div>
                            <div>{item.address}</div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="title">{t('sidebar.investors')}</div>
            <div className="box supporter-box">

                {supporterList.map(item => (
                    <div className="box-item">
                        <div className="progress" style={{width: (item.amount / totalAmount) * 100 + '%'}}></div>
                        <div className="texts">
                            <div>{((item.amount / totalAmount) * 100).toFixed(2)}% ({item.amount} USDT)</div>
                            <div>{item.address}</div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        <div className="block">
            <div className="title">{t('sidebar.documents')}</div>
            <div className="box">
                <div className="box-item-doc">
                    <div>
                        WhitePaper.docx
                    </div>
                    {/*<div className="status-pass">*/}
                    {/*    PASS*/}
                    {/*</div>*/}
                </div>
                <div className="box-item-doc">
                    <div>
                        LICENSE.JPG
                    </div>
                    {/*<div className="status-fail">*/}
                    {/*    FAIL*/}
                    {/*</div>*/}
                </div>
                <div className="box-item-doc">
                    <div>
                        PURCHASE CONTRACT.JPG
                    </div>
                </div>
            </div>
        </div>
        {/*<div className="block">*/}
        {/*    <div className="title">History</div>*/}
        {/*    <div className="box">*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                PIP-7*/}
        {/*            </div>*/}
        {/*            <div className="status-pass">*/}
        {/*                PASS*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                PIP-1*/}
        {/*            </div>*/}
        {/*            <div className="status-fail">*/}
        {/*                FAIL*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {/*<div className="block">*/}
        {/*    <div className="title">Stats</div>*/}
        {/*    <div className="box">*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                Total asset*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                1,000,000 USD*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*        <div className="box-item">*/}
        {/*            <div>*/}
        {/*                Total Vote*/}
        {/*            </div>*/}
        {/*            <div>*/}
        {/*                1,000,000 DUSD*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>)
}