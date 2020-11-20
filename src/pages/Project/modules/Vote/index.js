import React from 'react'
import { useTranslation } from 'react-i18next'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import VoteStatus from '../../../../components/VoteStatus'
import './style.scss'

const voteList = [
    {
        title: 'Vote #3',
        due: 'close',
        date: 'October 05, 2020',
        status: 'pass',
        description: `Unlock Value: <strong>300,000USDT(30%)</strong><br/><br/>Do you approve PIP-7:Unlock 10% in advance for deposit <br/><br/>Since the project has entered the site and the project is progressing rapidly, 10% of the fund originally scheduled to be released on October 10 is about 100000 US dollars, and the deposit needs to be unlocked in advance. Therefore, the proposal is applied<br/><br/>contact address: 0x654asd798FASDF4654sadf411sfasdfFDAds`,
        approve: 70,
        object: 30,
    },
    {
        title: 'Vote #2',
        due: 'close',
        date: 'October 03, 2020',
        status: 'pass',
        description: `Unlock Value: <strong>300,000USDT(30%)</strong><br/><br/>Do you approve PIP-7:Unlock 10% in advance for deposit <br/><br/>Since the project has entered the site and the project is progressing rapidly, 10% of the fund originally scheduled to be released on October 10 is about 100000 US dollars, and the deposit needs to be unlocked in advance. Therefore, the proposal is applied<br/><br/>contact address: 0x654asd798FASDF4654sadf411sfasdfFDAds`,
        approve: 70,
        object: 30,
    },
    {
        title: 'Vote #1',
        due: 'close',
        date: 'October 03, 2020',
        status: 'fail',
        description: `Unlock Value: <strong>300,000USDT(30%)</strong><br/><br/>Do you approve PIP-7:Unlock 10% in advance for deposit <br/><br/>Since the project has entered the site and the project is progressing rapidly, 10% of the fund originally scheduled to be released on October 10 is about 100000 US dollars, and the deposit needs to be unlocked in advance. Therefore, the proposal is applied<br/><br/>contact address: 0x654asd798FASDF4654sadf411sfasdfFDAds`,
        approve: 70,
        object: 30,
    },

]

export default function Vote() {
    const { t } = useTranslation()

    return (<div className="vote-module">
        {voteList.map(item => (
            <div className="vote-item">
                <div className="top">
                    <div className="title">{item.title}</div>
                    <div>
                        <div className="date">{item.due} - {item.date} </div>
                        <div className={'status ' + item.status} >
                            {item.status === 'pass' ? <CheckOutlined /> : <CloseOutlined />}{item.status}
                        </div>
                    </div>
                </div>
                <div className="desc-title">
                    {t('common.description')}
                </div>
                <div className="description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                <div className="votes-title">
                    {t('common.votes')}
                </div>
                <VoteStatus approve={item.approve} object={item.object} />

            </div>
        ))}
    </div>)
}
