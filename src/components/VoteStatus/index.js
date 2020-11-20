import React from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'

export default function VoteStatus(props) {
    const { approve, object } = props
    const { t } = useTranslation()

    return (
        <div className="vote-status">
            <div className="votes-bar">
                <div className="approve" style={{ width: (approve / (approve + object)) * 100 + '%' }}></div>
                <div className="object" style={{ width: (object / (approve + object)) * 100 + '%' }}></div>
            </div>
            <div className="votes-analyze">
                <div>
                    {approve} {t('project.approve')}
        </div>
                <div>
                    {object} {t('project.object')}
        </div>
            </div>
        </div>

    )
}